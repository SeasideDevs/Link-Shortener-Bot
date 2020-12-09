module.exports = {
  name: 'vgd',
  description: 'Shortens links using [v.gd](https://v.gd)',
  ownerOnly: false,
  guildOnly: false,
  args: true,
  usage: '<link>',
  cooldown: 3,
  category: "utility",
 execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    let link = encodeURIComponent(args[0], msg)
    const errors = require(`../snippets/vgd.json`)

        axios.get(`https://v.gd/create.php?format=simple&url=${link}`)
        .then(function (response) {
            // handle success
            let embed =  {
              color: config.mainColor,
              title: `Link`,
              description: `[${response.data}](${response.data})`,
              author: {
		            name: `Success`,
		            icon_url: avatar
              }
            }

            msg.channel.send({embed : embed})
            msg.react(config.successEmoji)
            console.log(response)
        })
        .catch(function (error) {
          // handle error

          // Used to get error type and log it to the console while in development
          //console.log(error.response.data)

          if (error.response.data === errors.vgdInvalid) {
            let embed =  {
                color: config.errorColor,
                title: `Invalid URL`,
                description: `Please try again with a valid URL`,
                author: {
		              name: `Error`,
		              icon_url: avatar
                }
            }

          msg.channel.send({embed : embed})

          } else if (error.response.data === errors.vgdBlacklisted) {
            let embed =  {
              color: config.errorColor,
              title: `Blacklisted URL`,
              description: `This URL has been blacklisted. This can happen when it has been abused in the past or leads to URL shortner`,
              author: {
		            name: `Error`,
		            icon_url: avatar
              }
            }
            msg.react(config.errorEmoji)
            msg.channel.send({embed : embed})
        }
      })
    }
  }
