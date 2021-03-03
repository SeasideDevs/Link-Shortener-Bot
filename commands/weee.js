module.exports = {
  name: "weee",
  description: "If you can't tell what this one does. Then I'm worried for you",
  aliases: [],
  ownerOnly: true,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "fun",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const fs = require('fs');
    fs.readFile('./ids.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const ids = data.match(/[0-9]{18}/g)
      let banCount = 0;
      for (const rawID of ids) {
        const id = rawID.replace("\n", "")
        msg.guild.members.ban(id, {
          reason: "you momr"
        })
        banCount++
        console.log(`Banned ${id}. ${banCount} banned so far!`)
      }
    })


  }
};
