module.exports = {
  name: 'purge',
  description: 'Bulk deletes messages in the channel it\'s used in',
  ownerOnly: true,
  guildOnly: true,
  args: true,
  cooldown: 3,
  usage: '',
  category: "moderation",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const amount = parseInt(args[0]);
    
    msg.delete()
    const bulkDelete = (amount) => {
      msg.channel.bulkDelete(amount, true)
      .then(async function (messages) {
        let m;
        // This if else checks if the amount is more than 1 and updates the message to be plural
        if (amount === 1) {
          m = await msg.channel.send(`Deleted ${messages.size} message`)
        } else {
          m = await msg.channel.send(`Deleted ${messages.size} messages`)
        }
        m.react('785686207597379615')
        m.delete({timeout: 5000})
    
      })
      .catch(console.error);
    }

    const checkAmount = () => {
      if (amount > 100) {
        amount -= 100;
        bulkDelete(100)
      }
    }

  }
}