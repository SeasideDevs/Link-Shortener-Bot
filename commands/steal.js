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
        console.log(msg.content)
        const limit = 10;
        const idPattern = /[0-9]{18}/g
        const namePattern = /<:[A-z]{1,32}:/g
        const animatedNamePattern = /a:[A-z]{1,32}:/g
        
        const ids = msg.content.match(idPattern)
        const names = msg.content.match(namePattern)
        const animatedNames = msg.content.match(animatedNamePattern)
        if (ids.length > limit) {
          return msg.channel.send(`Sorry but I cannot steal more than ${limit} emojis at once. Please try again`)
        }

        for (const match of animatedNamePattern) {
          match.replace('#', '')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setTitle(`Emoji Results`)
        .addField(`IDs`, `${ids.join("\n")}`)
        .addField(`Normal Emojis`, `${names.join("\n")}`)
        .addField(`Animated Emojis`, `${animatedNames.join("\n")}`)


        msg.channel.send(embed)
    }
}