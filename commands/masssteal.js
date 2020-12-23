module.exports = {
    name: 'masssteal',
    description: 'Steal emojis',
    ownerOnly: true,
    guildOnly: true,
    args: true,
    cooldown: 3,
    usage: '',
    category: "fun",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
        const pattern = /[0-9]{18}/g
        const ids = msg.content.match(pattern)
        msg.channel.send(ids)
    }
}