module.exports = {
  handle(error, Discord, client, msg, guild, config, avatar) {
    const chalk = require('chalk')
    const random = require('./random.js')
    const id = random.generateString(5)
    const embed = new Discord.MessageEmbed()
      .setColor(config.errorColor)
      .setAuthor(`Error`, avatar)
      .setDescription(`An error occurred while attempting to run your command. Make sure I have the required permissions with \`${guildPrefix}diagnose\`. If this continues happening please report this error ID to the [support server](https://dsc.gg/sea).`)
      .addField(`Error ID`, id)
    msg.channel.send(embed)
    console.log(chalk.red(`ERROR`), `An error occurred. Error ID: ${id}`)
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
      "error": error.name + ' ' + error.message
    })


    console.log(error)
    /* fs.writeFile(`errors/${id}.txt`, file, function(err) {
      return
    }) */
  }


}