module.exports = {
  name: "newhelp",
  description: "I think this one is self explanatory",
  aliases: ["newcommands"],
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    // Gets the commands collection from the client
    const { commands } = client;
    // Declares an array with data about each catergory
    const categories = [{
      name: "owner",
      friendlyName: "Owner",
      description: "Owner only commands.",
      hidden: true,
    },
    {
      name: "info",
      friendlyName: "Info",
      description: "Learn more about the bot with these commands!",
      hidden: false,
    },
    {
      name: "moderation",
      friendlyName: "Moderation",
      description: "Moderation related commands",
      hidden: false,
    },
    {
      name: "config",
      friendlyName: "Config",
      description: "Commands to configure the bot!",
      hidden: false,
    },
    {
      name: "fun",
      friendlyName: "Fun",
      description: "Fun related commands!",
      hidden: false,
    },
    {
      name: "utility",
      friendlyName: "Utility",
      description: "Some really helpful commands!",
      hidden: false,
    }]

      let embed = new Discord.MessageEmbed()
      .setColor(config.colors.main)
      .setTitle(`Commands`)

      for (category of categories) {
        const e = categories.indexOf(category)
        console.log(e)
      }

    /* if (args) {

    } */


  },
};
