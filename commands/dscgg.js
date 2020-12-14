module.exports = {
  name: 'dscgg',
  description: 'Gets info on a [dsc.gg](https://dsc.gg) link.',
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: '<part after the links slash>',
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    const errors = require(`../snippets/dscgg.json`)
    const Link = require('dsc.js')
    const dscgg = new Link.Client({
      api_key: process.env.DSCGG_TOKEN,
      version: 2
    })

    console.log(args)
    dscgg.fetchLink(args[0])
    .then((link) => {
      console.log(link)
      const embed = new Discord.MessageEmbed()
    })
    .catch((error) => {
      console.log(error)
      msg.channel.send(`There was an error getting your link. Make sure you used a valid [dsc.gg](https://dsc.gg) link`)
    })


  }
}