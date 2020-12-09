module.exports = {
  name: 'purge',
  description: 'Bulk deletes messages in the channel it\'s used in',
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: '',
  category: "moderation",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    const amount = parseInt(args[0]);
    if (amount > 100) {
      return msg.channel.send(`You can only delete up to 100 messages`)
    }
    msg.delete()
    msg.channel.bulkDelete(amount, true)
    .then(function (messages) {
      async function run() {
        let m = await msg.channel.send(`Deleted ${messages.size} messages`)
        m.react('785686207597379615')
      }
      run()
    })
  .catch(console.error);

      const embed = new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setAuthor(`Success`, avatar)
        .setDescription(`Testing connection...`)


  }
}