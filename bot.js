const fs = require('fs');
const { MongoClient} = require('mongodb');
const db = new MongoClient(process.env.DB_URL, {useUnifiedTopology: true});
let collection;
let database;
const Discord = require('discord.js');
const Statcord = require("statcord.js");
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
const status = { activity: { name: prefix + 'help', type: 'LISTENING' }, status: 'online' };
const axios = require('axios');
const chalk = require('chalk')
const blapi = require('blapi')

//blapi.handle(client, apikeys, 120)

// Makes a new collection with all the files in /commands

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Loops through the commands then requires them and adds them to the collection

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Fires once the bot is ready and logs it to the console then sets it status
async function dbConnect() {
  try {
    await db.connect();

    database = await db.db('databases');

    // Query for a movie that has the title 'Back to the Future'
    //const query = { title: 'Back to the Future' };
    //const movie = await collection.findOne(query);

    //console.log(movie);
  } catch (e) {
      console.log(e)
  } finally {
    console.log(`done`)
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

dbConnect()

client.on('ready', () => {
  console.log(chalk.yellow(`INFO`), `Logged in as ${client.user.tag}!`);

  client.user.setPresence(status)
    .then(console.log(chalk.yellow(`INFO`), `Status Set`))
    .catch(console.error);
});


// Fires when a new message is received
client.on('guildCreate', guild => {
  if (!config.guildLoggingChannel) return;
  const avatar = client.user.displayAvatarURL();

  try {
    const humans = guild.members.cache.filter(member => !member.user.bot).size
    const bots = guild.members.cache.filter(member => member.user.bot).size

    let embed = new Discord.MessageEmbed()
      .setColor(config.mainColor)
      .setAuthor(`Joined ${guild.name}!`)
      .setDescription(`**Owner:** ${guild.owner.user.tag}\n**Owner ID:** ${guild.ownerID}\n**Server ID:** ${guild.id}\n**Total Members:** ${guild.memberCount}\n**Humans:** ${humans}\n**Bots:** ${bots}`)
      .setThumbnail(guild.iconURL())

    client.channels.cache.get(config.guildLoggingChannel).send(embed)

    guild.owner.send(`Thanks for adding me to ${guild.name}! To get started run \`${prefix}help\` `)
  } catch (e) {
    console.log(chalk.bgRedBright(`ERROR`), e)
  }
})

client.on('guildDelete', guild => {
  if (!config.guildLoggingChannel) return;
  const avatar = client.user.displayAvatarURL();

  try {
    const humans = guild.members.cache.filter(member => !member.user.bot).size
    const bots = guild.members.cache.filter(member => member.user.bot).size

    let embed = new Discord.MessageEmbed()
      .setColor(config.errorColor)
      .setAuthor(`Left ${guild.name}`)
      .setDescription(`**Owner:** ${guild.owner.user.tag}\n**Owner ID:** ${guild.ownerID}\n**Server ID:** ${guild.id}\n**Total Members:** ${guild.memberCount}\n**Humans:** ${humans}\n**Bots:** ${bots}`)
      .setThumbnail(guild.iconURL())

    client.channels.cache.get(config.guildLoggingChannel).send(embed)
  } catch (e) {
    console.log(chalk.bgRedBright(`ERROR`), e)
  }
})

client.on('message', async msg => {
  if (msg.content === `<@!${client.user.id}>`) {
    msg.channel.send(`Hey I'm ${client.user.username}! My prefix is ${prefix}.`)
  }

  if (!msg.guild) {
    guildPrefix = prefix
  } else {
    const query = {guildID: msg.guild.id}
    database = db.db('database');
    const collection = database.collection('guilds');
    const data = await collection.findOne(query)
    if (!data) {
      console.log(`do data lul`)
      guildPrefix = prefix
    } else {
      if (!data.prefix) {
        guildPrefix = prefix
      } else {
        guildPrefix = data.prefix
      }

    }
  }
  // If the command doesn't start with the prefix or is sent by a bot return
  
  if (!msg.content.startsWith(guildPrefix) || msg.author.bot) return;

  // Cuts off the prefix and .trim removes useless spaces .split seperates the string into words and puts it in a array

  const args = msg.content.slice(guildPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const avatar = client.user.displayAvatarURL();
  const command = client.commands.get(commandName)

  Statcord.ShardingClient.postCommand(commandName, msg.author.id, client);

  if (command.ownerOnly && msg.author.id !== config.ownerID) return;

  if (command.args && !args.length) {
    let message = `You are missing some required arguments`

    if (command.usage) {
      message += ` The correct usage is \`${guildPrefix}${command.name} ${command.usage}\``
    }

    let embed = new Discord.MessageEmbed()
      .setColor(config.errorColor)
      .setAuthor(`Error`, avatar)
      .setTitle(`Missing Arguments`)
      .setDescription(message)

    return msg.channel.send(embed)
  }

  if (command.guildOnly && !msg.guild) {
    return msg.channel.send(`This command does not work in private messages`)
  }

  try {
    command.execute(msg, args, client, config, guildPrefix, axios, Discord, avatar);
  } catch (e) {
    const random = require('./functions/random-letters.js')
    const id = random.random(5)
    const embed = new Discord.MessageEmbed()
      .setColor(config.errorColor)
      .setAuthor(`Error`, avatar)
      .setDescription(`An error occured while attempting to run your command. Make sure I have the required permissions with \`${guildPrefix}diagnose\`. If this continues happening please report this error ID to the [support server](https://dsc.gg/sea).`)
      .addField(`Error ID`, id)
    msg.channel.send(embed)
    console.log(chalk.red(`ERROR`), `An error occured. Error ID: ${id}`)
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let guildID;
    let guildName;

    if (!msg.guild) {
      guildID = `This command wasn't run in a server`
      guildName = `This command wasn't run in a server`
    } else {
      guildID = msg.guild.id
      guildName = msg.guild.name
    }

    const file = JSON.stringify({
      "id": id,
      "message": msg.content,
      "date": date,
      "guild": {
        "ID": guildID,
        "name": guildName
      },
      "author": {
        "ID": msg.author.id,
        "name": msg.author.tag
      },
      "channelID": msg.channel.id,
      "error": e.name + ' ' + e.message
    })


    console.log(e)
    fs.writeFile(`errors/${id}.txt`, file, function(err) {
      return
    })

  };

})

client.login(process.env.BOT_TOKEN);