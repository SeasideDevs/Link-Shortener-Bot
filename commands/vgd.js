module.exports = {
  name: "vgd",
  description: "Shortens links using [v.gd](https://v.gd)",
  aliases: [],
  ownerOnly: false,
  guildOnly: false,
  args: true,
  usage: "<link>",
  cooldown: 3,
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    let link = encodeURIComponent(args[0], msg);
    let embed = new Discord.MessageEmbed();
    const errors = require(`../snippets/vgd.json`);

    axios
      .get(`https://v.gd/create.php?format=simple&url=${link}`)
      .then(function (response) {
        // handle success
        embed.setColor(config.colors.main);
        embed.setAuthor(`Success`, avatar);
        embed.setTitle(`Link`);
        embed.setDescription(`${response.data}`);

        msg.channel.send({
          embed,
        });
        msg.react(config.emojis.success);
      })
      .catch(function (error) {
        // handle error

        // Used to get error type and log it to the console while in development
        //console.log(error.response.data)

        if (error.response.data === errors.vgdInvalid) {
          const embed = new Discord.MessageEmbed()
            .setColor(config.colors.error)
            .setAuthor(`Invalid URL`, avatar)
            .setDescription(`Please try again with a valid URL`);

          msg.channel.send({
            embed,
          });
        } else if (error.response.data === errors.vgdBlacklisted) {
          const embed = new Discord.MessageEmbed()
            .setColor(config.colors.error)
            .setAuthor(`Blacklisted URL`, avatar)
            .setDescription(
              `This URL has been blacklisted. This can happen when it has been abused in the past or leads to another URL shortner`
            );

          msg.react(config.emojis.error);
          msg.channel.send({
            embed,
          });
        }
      });
  },
};
