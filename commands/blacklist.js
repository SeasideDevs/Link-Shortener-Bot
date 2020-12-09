module.exports = {
  name: 'blacklist',
  description: 'Prevent someone from using the bot',
  ownerOnly: true,
  guildOnly: false,
  args: true,
  usage: '<user>',
  cooldown: 3,
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    const chalk = require('chalk');
    const id = args[0]

    async function run() {
      const data = await blacklist.get(id)
      if (data) {
        return msg.channel.send(`That user is already blacklisted`)
      }
      try {
        const fetched = await client.users.fetch(id)
        const m = await msg.channel.send(`Are you sure you want to blacklist **${fetched.tag}**`)
        m.react('✅')
        .then(m.react('❌'))
        let confirmation;

        const filter = (reaction, user) => {
          return user.id === config.ownerID
        };

        await m.awaitReactions(filter, { max:1, time: 5000, errors: ['time'] })
    	  .then(collected => {
          const reaction = collected.first()
          if (reaction.emoji.name === `✅`) {
            confirmation = true
          } else {
            confirmation = false
          }
        })
	      .catch(collected => {
		      m.reactions.removeAll()
	      });

        console.log(confirmation)
        //await blacklist.set(id, 'blacklist')
        //msg.channel.send(`Blacklisted **${fetched.tag}**`)
      } catch (e) {
        console.log(e)
        msg.channel.send(`There was an error while attempting to blacklist that user`)
      }

    }

    run()
  }
}