module.exports = {
    name: 'error',
    description: 'Shows the bots latency',
    ownerOnly: true,
    guildOnly: false,
    args: true,
    cooldown: 3,
    usage: '',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
        const fs = require('fs')
        fs.readFile(`/home/runner/Link-Shortener-Bot-Canary/errors/${args[0]}.txt`, function(err, data) {
            if (!data) {
                return msg.channel.send(`There is no error with that ID`)
            }
            const file = JSON.parse(data)
            const author = `**Author Name:** ${file.author.name}\n**Author ID:** ${file.author.ID}`
            const guild = `**Guild Name:** ${file.guild.name}\n**Guild ID:** ${file.guild.ID}`

            let embed = new Discord.MessageEmbed()
                .setColor(config.mainColor)
                .setAuthor(`Error`, avatar)
                .addField(`Date`, file.date)
                .addField(`Author`, author)
                .addField(`Guild`, guild)
                .addField(`Channel ID`, file.channelID)
                .addField(`Message Content`, file.message)
                .addField(`Error`, file.error)
            msg.channel.send(embed)
        })
    }
}