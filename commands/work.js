module.exports = {
    name: 'work',
    description: 'If you can\'t tell what this one does. Then I\'m worried for you',
    ownerOnly: true,
    guildOnly: false,
    args: false,
    cooldown: 3,
    usage: '',
    category: "fun",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
        client.emit('guildCreate', msg.guild)

    }
}