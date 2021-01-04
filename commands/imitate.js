module.exports = {
  name: "imitate",
  description: "whats this?",
  ownerOnly: true,
  guildOnly: true,
  args: true,
  cooldown: 3,
  usage: "<part after the links slash>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const id = args[0];
    if (id.length !== 18) {
      msg.channel.send(`you're the fucking owner you should know how ids work`);
    }

    msg.guild
      .fetchWebhooks()
      .then((webhooks) => {
        co;
        //webhooks.filter(webhooks)
      })
      .catch(console.error);
  },
};
