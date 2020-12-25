module.exports = {
    name: 'steal',
    description: 'Steal emojis',
    ownerOnly: true,
    guildOnly: true,
    args: true,
    cooldown: 3,
    usage: '',
    category: "fun",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
        const limit = 100;
        const emotePattern = /<(a|):[A-z0-9]{1,32}:[0-9]{18}>/g
        const idPattern = /[0-9]{18}/g
        const namePattern = /<:[A-z0-9]{1,32}:/g
        const animatedNamePattern = /<a:[A-z0-9]{1,32}:/g

        const emotes = msg.content.match(emotePattern);
        if (!emotes) {
          return msg.channel.send(`There are no emotes in your message`)
        }
        if (emotes.length > limit) {
          return msg.channel.send(`Sorry but I cannot steal more than ${limit} emotes at once. Please try again with 10 or less emotes`)
        }

        let normal = [];
        let animated = [];
        for (const emote of emotes) {
          const normalMatch = emote.match(namePattern)
          const animatedMatch = emote.match(animatedNamePattern)
          if (!normalMatch) {
            console.log(`e`)
          }
          if (!animatedMatch) {
            console.log(`a`)
          }

          if (normalMatch) {
            const id = emote.match(idPattern)
            let name = normalMatch[0].replace('<:', '')
            name = name.replace(':', '')
            normal.push({
              name: name,
              id: id[0],
              animated: false
            })
          }

          if (animatedMatch) {
            const id = emote.match(idPattern)
            let name = animatedMatch[0].replace('<a:', '')
            name = name.replace(':', '')
            animated.push({
              name: name,
              id: id[0],
              animated: true
            })
          }
        }

        
        for (const emote of normal) {
          msg.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emote.id}.png`, emote.name, {
            reason: `Created with ${client.user.tag} using the steal command. This command was run by ${msg.author.tag}(${msg.author.id})`
          })
        }

        for (const emote of animated) {
          msg.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emote.id}.gif`, emote.name, {
            reason: `Created with ${client.user.tag} using the steal command. This command was run by ${msg.author.tag}(${msg.author.id})`
          })
        }

        msg.channel.send(`Successfully completed operation`)
    }
}