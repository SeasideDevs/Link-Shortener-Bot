module.exports = {
    name: 'status',
    description: 'Updates the bots status. This command is a work in progress and is owner only.',
    ownerOnly: true,
    guildOnly: false,
    cooldown: 3,
    usage: '<name> <activity>',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
        const joined = args.join(' ')
        const split = joined.split('|')

        const presence = split[0].trim()
        const temp = split[1].trim()
        const status = split[2].trim()
        console.log(`"${presence}" `)
        console.log(`"${temp}" `)
        console.log(`"${status}" `)

        client.user.setPresence({
            activity: {
                name: presence
            }
        })
        client.user.setStatus(status)
        msg.channel.send(`Updated!`)
    }
}