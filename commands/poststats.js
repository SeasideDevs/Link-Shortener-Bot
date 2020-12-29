module.exports = {
    name: 'poststats',
    description: 'Shows the bots latency',
    ownerOnly: true,
    guildOnly: false,
    args: false,
    cooldown: 3,
    usage: '',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
        async function post() {
            let guilds;
            await client.shard.fetchClientValues('guilds.cache.size')
                .then(results => {
                    const reducer = (accumulator, shardGuilds) => accumulator + shardGuilds;
                    const reduced = results.reduce(reducer);
                    serverCount = reduced;
                });

            //blapi.manualPost(guilds, client.bot.id, apiKeys[, shardID, shardCount[, shardsArray]]);
        }
        post()
    }
}