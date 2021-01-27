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
    msg.delete();
    const id = args[0];
    if (id.length !== 18) {
      return msg.channel.send(
        `you're the fucking owner you should know how ids work`
      );
    }
    const rawMessage = msg.content.replace(`${prefix}imitate `, ``);
    const message = rawMessage.replace(id, ``);

    const user = client.users.fetch(id).then(function (user) {
      msg.channel.fetchWebhooks().then(function (webhooks) {
        if (!webhooks.size) {
          msg.channel
            .createWebhook(client.user.username, {
              avatar: avatar,
              reason: "Needed a cool new Webhook",
            })
            .then(function (webhook) {
              webhook.send(message, {
                username: user.username,
                avatarURL: user.avatarURL(),
              });
            });
        } else {
          webhooks.first().send(message, {
            username: user.username,
            avatarURL: user.avatarURL(),
          });
        }
      });
    });
  },
};
