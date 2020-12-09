module.exports = {
  name: 'reload',
  description: 'Reloads a command. Owner only',
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: '<command name>',
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, blacklist) {
    const commandName = args[0].toLowerCase()
    const command = msg.client.commands.find(cmd => cmd.name === commandName)
    
    if (!command) return msg.channel.send(`There is no command with the name provided`)

    delete require.cache[require.resolve(`./${command.name}.js`)];
    
    const newCommand = require(`./${command.name}.js`)
    msg.client.commands.set(newCommand.name,newCommand)
    msg.channel.send(`Successfully reloaded **${command.name}**`)
  }
}