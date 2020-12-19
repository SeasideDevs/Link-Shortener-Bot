module.exports = {
    name: 'poll',
    description: 'I think this one is fucking obvious too',
    ownerOnly: false,
    guildOnly: true,
    args: true,
    cooldown: 3,
    usage: '<question>',
    category: "utility",
    execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
      async function run() {
      const subcommands = ['material']
      if (subcommands[0] === args[0]) {
        args.shift()
        const embed = new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setAuthor(`New Poll by ${msg.author.tag}!`, avatar)
        .setDescription(`${args.join(" ")}?`)
        .setFooter(`Vote by clicking one of the reactions below!`)

        const m = await msg.channel.send(embed)
        m.react('787095063649321021')
        m.react('787095093323890698')
      } else {
          const embed = new Discord.MessageEmbed()
          .setColor(config.mainColor)
          .setAuthor(`New Poll by ${msg.author.tag}!`, avatar)
          .setDescription(`${args.join(" ")}?`)
          .setFooter(`Vote by clicking one of the reactions below!`)

          const m = await msg.channel.send(embed)
          m.react('👍')
          m.react('👎')
      }
      
    }

    run()
  } 
}