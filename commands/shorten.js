module.exports = {
    name: 'shorten',
    description: 'Shorterns links using [is.gd](https://is.gd). Currently disabled',
    ownerOnly: false,
    guildOnly: false,
    args: false,
    cooldown: 3,
    usage: '<link>',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
        {
            msg.channel.send(`This command has been temporarly disabled. Try using \`${prefix}vgd [url]\` instead`)
            /*     let link = encodeURIComponent(args[0], msg)
                const errors = require(`../snippets/isgd.json`)

                axios.get(`https:/is.gd/create.php?format=simple&url=${link}`)
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

                      if (error.response.data === errors.isgdInvalid) {
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

                      } else if (error.response.data === errors.isgdBlacklisted) {
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
                  }) */
        }
    }
}