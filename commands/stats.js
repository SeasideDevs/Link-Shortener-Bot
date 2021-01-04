module.exports = {
  name: "stats",
  description: "Shows bot statistics",
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 10,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const dependencies = require("../package.json");
    const sysInfo = require("systeminformation");
    let discordjsVersionRaw = dependencies["dependencies"]["discord.js"];
    let axiosVersionRaw = dependencies.dependencies.axios;
    let expressVersionRaw = dependencies.dependencies.express;
    let sysInfoVersionRaw = dependencies.dependencies.systeminformation;
    // Slices the previous variable to get rid of the
    let discordjsVersion = `v` + discordjsVersionRaw.slice(1);
    let axiosVersion = `v` + axiosVersionRaw.slice(1);
    let expressVersion = `v` + expressVersionRaw.slice(1);
    let sysInfoVersion = `v` + sysInfoVersionRaw.slice(1);
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

      let embed = new Discord.MessageEmbed()
        .setColor(config.mainColor)
        .setAuthor(`Stats`, avatar)
        .addField(
          `Bot Stats`,
          `Servers: **${serverCount}\n**Channels: **${channelCount}**\nUsers: **${userCount}**`
        )
        .addField(
          `Utilities`,
          `Nodejs: **${process.version}**\nDiscord.js: **${discordjsVersion}**\nAxios: **${axiosVersion}**\nExpress: **${expressVersion}**\nSystem Information: **${sysInfoVersion}**`
        )
        .addField(
          `System`,
          `OS: **${os}**\nCPU: **${cpuLoad}%**\nMemory: **${percentage}% (${usingMemory}MB/${totalMemory}MB)**`
        );

      msg.channel.send(embed);
    }

    stats();
  },
};
