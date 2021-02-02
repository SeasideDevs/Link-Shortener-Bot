module.exports = {
  name: "help",
  description: "I think this one is self explanatory",
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const { commands } = msg.client;

    if (!args.length) {
      const embed = new Discord.MessageEmbed().setColor(config.colors.main);
      // Here we declare the arrays were the commands will be sorted into
      let owner = [];
      let admin = [];
      let info = [];
      let moderation = [];
      let fun = [];
      let utility = [];
      let miscellaneous = [];
      // This function sorts commands into their category. If they don't have one they go in the miscellaneous category
      const filter = (command) => {
        if (!command.category) {
          miscellaneous.push(command.name);
        }

        if (command.ownerOnly) {
          owner.push(command.name);
          command.category = `no`;
        }

        if (command.category === `admin`) {
          admin.push(command.name);
        }

        if (command.category === `info`) {
          info.push(command.name);
        }

        if (command.category === `moderation`) {
          moderation.push(command.name);
        }

        if (command.category === `fun`) {
          fun.push(command.name);
        }

        if (command.category === `utility`) {
          utility.push(command.name);
        }
      };

      const list = commands.map(filter);

      // Checks if they user if the owner and if so it adds a owner command field
      if (msg.author.id === config.ownerid) {
        let ownerJoined = `\`${owner.join(" ")}\``;
        if (owner.length === 0) {
          ownerJoined = `No Commands In This Category`;
        }
        embed.addField(`Owner`, ownerJoined);
      }
      // This basiclly joins the array containing the commands in that category and puts a backtick around the the joined array so it's in a codeblock when sent to Discord
      let adminJoined = `\`${admin.join(" ")}\``;
      let infoJoined = `\`${info.join(" ")}\``;
      let moderationJoined = `\`${moderation.join(" ")}\``;
      let funJoined = `\`${fun.join(" ")}\``;
      let utilityJoined = `\`${utility.join(" ")}\``;

      // These if statements check if the arrays were emphty after being sorted if so the descriptiond of that categories field gets set to a different message stating that the category has no commands
      if (admin.length === 0) {
        adminJoined = `No Commands In This Category`;
      }

      if (info.length === 0) {
        infoJoined = `No Commands In This Category`;
      }

      if (moderation.length === 0) {
        moderationJoined = `No Commands In This Category`;
      }
      if (fun.length === 0) {
        funJoined = `No Commands In This Category`;
      }

      if (utility.length === 0) {
        utilityJoined = `No Commands In This Category`;
      }

      // This part makes the categories using the strings generated before
      embed.addField(`Admin`, adminJoined);
      embed.addField(`Info`, infoJoined);
      embed.addField(`Moderation`, moderationJoined);
      embed.addField(`Fun`, funJoined);
      embed.addField(`Utility`, utilityJoined);

      // Sets the title of the embeds
      embed.setTitle("Commands");
      // Sends the embed
      msg.channel.send(embed);
    } else {
      // This code is if they do provide an argument
      const embed = new Discord.MessageEmbed().setColor(config.colors.main);
      // This comment is to make sure you know this is a embeded if statement
      const command = commands.get(args[0]);
      if (!command || (command.ownerOnly && msg.author.id !== config.ownerid)) {
        msg.channel.send(`${args[0]} is a not a valid command`);
      } else {
        let description = command.description;
        let cooldown = command.cooldown;
        let usage = `${prefix}${command.name} ${command.usage}`;
        if (!command.description) {
          description = `There is no description available for this command`;
        }
        if (!command.cooldown) {
          cooldown = `${config.defaultCooldown}`;
        }
        embed.setTitle(command.name);
        embed.addField(`Description`, description);
        embed.addField(`Cooldown`, cooldown);
        embed.addField(`Usage`, usage);
        msg.channel.send(embed);
      }
      // End of embeded if statement
    }
  },
};
