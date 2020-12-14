module.exports = {
    name: 'choose',
    description: 'Are you unsure about something? Let Seashell choose! Seperate your items with a `|` character',
    ownerOnly: false,
    guildOnly: false,
    args: true,
    cooldown: 3,
    usage: '<choice> | <choice>',
    category: "fun",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
        const joined = args.join(' ')
        const split = joined.split('|')
        const min = 0
        const max = split.length - 1
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        const embed = new Discord.MessageEmbed()
            .setColor(config.mainColor)
            .setAuthor(`I choose...`, avatar)
            .setDescription(`${split[randomNum]}`)

        msg.channel.send(embed)
    }
}