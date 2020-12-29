module.exports = {
    name: 'setprefix',
    description: 'Updates the prefix of the bot for the server it is used in',
    ownerOnly: true,
    guildOnly: true,
    args: false,
    cooldown: 3,
    usage: '',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
        const collection = database.collection('guilds');
        const data = collection.findOne({guildID: msg.guild.id})
        async function run() {
        if (!data) {
          return msg.channel.send(`No data found for guild`)
        } else {
          const filter = { guildID: msg.guild.id };
            const updatedDocument = {
              $set: {
                prefix: args[0]
              }
            }

            const result = await collection.updateOne(filter, updatedDocument);
            console.log(result)
          }

        }
        run()
    }
}