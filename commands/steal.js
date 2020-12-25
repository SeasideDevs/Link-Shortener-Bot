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
        const limit = 10;
        const emotePattern = /<(a|):[A-z]{1,32}:[0-9]{18}>/g
        const idPattern = /[0-9]{18}/g
        const namePattern = /<:[A-z]{1,32}:/g
        const animatedNamePattern = /<a:[A-z]{1,32}:/g

        const emotes = msg.content.match(emotePattern);
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
            const id = normalMatch[0].match(idPattern)
            let name = normalMatch[0].replace('<:', '')
            name = name.replace(':', '')
            normal.push({
              name: name,
              id: id[0],
              animated: false
            })
          }

          if (animatedMatch) {
            const id = animatedMatch[0].match(idPattern)
            let name = animatedMatch[0].replace('<a:', '')
            name = name.replace(':', '')
            animated.push({
              name: name,
              id: id[0],
              animated: true
            })
          }
          console.log(`test`)
        }

        console.log(normal)
        console.log(animated)
        const embed = new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setTitle(`Emote Results`)
        .addField(`Total Emotes:`, `${emotes.length}`)
        .addField(`Emotes`, ` \`\`\`${emotes.join("\n\\")}\`\`\` `)


        msg.channel.send(embed)
    }
}