module.exports = {
    name: 'random',
    description: 'Generates a random set of characters. Not polished enough for the pubic',
    ownerOnly: true,
    guildOnly: false,
    args: true,
    cooldown: 3,
    usage: '',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
        const random = require('../functions/random-letters.js')
        async function run() {
            msg.channel.send(await random.random(args[0]))
        }

        run()
    }
}