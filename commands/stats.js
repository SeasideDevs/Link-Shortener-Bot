module.exports = {
  name: "newstats",
  description: "Shows bot statistics",
  ownerOnly: true,
  guildOnly: false,
  args: false,
  cooldown: 10,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const file = require("../package.json");
    const rawDependencies = Object.entries(file.dependencies);
    const sysInfo = require("systeminformation");
    let dependencies = [];
    for (const dependency of rawDependencies) {
      const version = dependency[1].replace("^", "v");
      const combined = `${dependency[0]}: **${version}**`;
      dependencies.push(combined);
    }
    // Slices the previous variable to get rid of the
    let os;
    let cpuLoad;
    let totalMemory;
    let usingMemory;

    async function stats() {
      let osResponse;
      let cpuResponse;
      let memResponse;
      let percenteage;

      await sysInfo
        .mem()
        .then((data) => (memResponse = data))
        .catch((error) => console.error(error));

      usingMemory = Math.round(memResponse.active / 1000000);
      totalMemory = Math.round(memResponse.total / 1000000);
      percentage = Math.round((usingMemory / totalMemory) * 100);

      await sysInfo
        .osInfo()
        .then((data) => (osResponse = data))
        .catch((error) => console.log(error));

      await sysInfo
        .currentLoad()
        .then((data) => (cpuResponse = data))
        .catch((error) => console.log(error));

      cpuLoad = Math.round(cpuResponse.currentload);

      os = osResponse.distro;

      let serverCount;
      let userCount;
      let channelCount;
      let emojiCount;

      await client.shard
        .fetchClientValues("guilds.cache.size")
        .then((results) => {
          const reducer = (accumulator, shardGuilds) =>
            accumulator + shardGuilds;
          const reduced = results.reduce(reducer);
          serverCount = reduced;
        });

      await client.shard
        .fetchClientValues("users.cache.size")
        .then((results) => {
          const reducer = (accumulator, shardGuilds) =>
            accumulator + shardGuilds;
          const reduced = results.reduce(reducer);
          userCount = reduced;
        });

      await client.shard
        .fetchClientValues("channels.cache.size")
        .then((results) => {
          const reducer = (accumulator, shardGuilds) =>
            accumulator + shardGuilds;
          const reduced = results.reduce(reducer);
          channelCount = reduced;
        });

        await client.shard
        .fetchClientValues("emojis.cache.size")
        .then((results) => {
          const reducer = (accumulator, shardGuilds) =>
            accumulator + shardGuilds;
          const reduced = results.reduce(reducer);
          emojiCount = reduced;
        });

      let embed = new Discord.MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor(`Stats`, avatar)
        .addField(
          `Bot Stats`,
          `Servers: **${serverCount}\n**Channels: **${channelCount}**\nUsers: **${userCount}**\nEmotes: **${emojiCount}**`
        )
        .addField(`Utilities`, `${dependencies.join("\n")}`)
        .addField(
          `System`,
          `OS: **${os}**\nCPU: **${cpuLoad}%**\nMemory: **${percentage}% (${usingMemory}MB/${totalMemory}MB)**`
        );

      msg.channel.send(embed);
    }

    stats();
  },
};
