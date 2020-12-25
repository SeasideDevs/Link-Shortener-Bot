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
        //const idPattern = /[0-9]{18}/g
        //const namePattern = /<:[A-z]{1,32}:/g
        //const animatedNamePattern = /a:[A-z]{1,32}:/g

        const emotes = msg.content.match(emotePattern);
        if (emotes.length > limit) {
          return msg.channel.send(`Sorry but I cannot steal more than ${limit} emotes at once. Please try again with 10 or less emotes`)
        }

        for (const emote of emotes) {
          
        }

        console.log(emotes)
        const embed = new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setTitle(`Emote Results`)
        .addField(`Total Emotes:`, `${emotes.length}`)
        .addField(`Emotes`, ` \`\`\`${emotes.join("\n\\")}\`\`\` `)


        msg.channel.send(embed)
    }
}