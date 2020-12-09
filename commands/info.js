module.exports = {
  name: 'info',
  description: 'Shows info about Seashell\'s and it\s history',
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: '',
  category: "info",
 execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    let oldEmbed =  {
        color: config.mainColor,
        title: `About Me`,
        description: `I started off as a side project meant to put my owners skills to the test in combining various things that I learned throughout my coding journer. I'm the first bot that my owner made to actually be published. This means that support will probably be nonexistent and downtime might happen more often than expected`,
        fields: [
          {
		    	  name: 'Code',
			      value: 'The code of the bot is open source. This mean you can host it yourself it. Click [here](https://github.com/TheLimifiedLime/Link-Shortner-Bot) to see the code.',
		      }
        ],
        author: {
		    name: `Info`,
		    icon_url: avatar
      }
    }
    const embed = new Discord.MessageEmbed()
    .setColor(config.mainColor)
    .setAuthor(`Info`, avatar)
    .setTitle(`About Me`)
    .setDescription(`I started off as a side project meant to put my owners skills to the test in combining various things that he learned throughout his coding journey. I'm the first bot that my owner made to actually be published. I also started of as a a bot meant to shorten links but I started to become more general purpose. Plus I'm open source. The code is available [here](https://github.com/TheLimifiedLime/Link-Shortner-Bot) if you wish to view/selfhost it`)

    msg.channel.send(embed)
  }
}