module.exports = {
  name: 'ping',
  description: 'Shows the bots latency',
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: '',
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    async function ping() {
      const embed = await new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setAuthor(`Pong?`, avatar)
        .setDescription(`Testing connection...`)
      const m = await msg.channel.send(embed);

      m.edit(embed.setDescription(`**Latency:** ${m.createdTimestamp - msg.createdTimestamp}ms\n**API:** ${Math.round(client.ws.ping)}ms`));

      m.edit(embed.setAuthor(`Pong!`, avatar));
    }

    ping()
  }
}