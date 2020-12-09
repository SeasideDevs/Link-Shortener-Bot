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
    const dscClient = new Link.Client({
      api_key: process.env.DSCGG_Token,
      version: 2
    })

    dscClient.fetchLink(args[0])
    .then((link) => {
      console.log(e)
    })
    .catch((error) => {
      msg.channel.send(`There was an error getting your link. Make sure you used a valid [dsc.gg](https://dsc.gg) link`)
    })

    // V1 CODE

    axios.get(`https://dsc.gg/api/link/${args[0]}`)
    .then(function (response) {
      // Here we split the type of link provided into an array
      let typeRaw = response.data.type.split("")
      // Then we take the first letter and make it uppercasethen save it
      typeRaw[0] = typeRaw[0].toUpperCase()
      // Then we turn it back into one string again
      let type = typeRaw.join("")

      let embed = new Discord.MessageEmbed()
      .setColor(config.mainColor)
      .setAuthor(`Link Info ${args[0]}`, avatar)
      .addField(`Owner:`, `**Name:** NOT DONE\n**ID:** ${response.data.owner}`)
      .addField(`Type:`, `${type}`)
      .addField(`Clicks:`, `**Unique Clicks:** ${response.data.unique}\n**Total Clicks:** ${response.data.clicks}`)
      .addField(`Leads To:`, `||${response.data.redirect}||`)
      .addField(`Recent Click:`, `${response.data.recent}`)

      msg.channel.send(embed)
      //console.log(response)
    })
    .catch(function (error) {
      //if (error.data)


      const embed = new Discord.MessageEmbed()
      .setColor(config.errorColor)
      .setAuthor(`Error`, avatar)
      .setDescription(`An error occured while getting your link. Make sure your link is valid`)

      msg.channel.send(embed)
      console.log(error)
      console.log(`************************************************`)
      console.log(error)
    })
  }
}