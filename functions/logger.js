module.exports = {
  log(rawlogType, message, avatar, username) {
    require("toml-require").install({toml: require("toml")});
    const config = require("../config.toml");
    if (!config.logging.system) {
      return;
    }
    const types = ["info", "shard", "database", "error"];
    if (types.indexOf(rawlogType.toLowerCase()) === -1) {
      throw "Invalid log type";
    }
    const logType = types.indexOf(rawlogType.toLowerCase());

    if (!message) {
      message = "No message specified";
    }

    const typeData = [
      {
        type: "Info",
        color: 3066993,
      },
      {
        type: "Shard",
        color: 16770692,
      },
      {
        type: "Database",
        color: 11223295,
      },
      {
        type: "Error",
        color: 16607336,
      },
    ];

    const axios = require("axios");
    const data = {
      content: null,
      embeds: [
        {
          author: {
            name: typeData[logType].type,
            icon_url: config.logging.avatar,
          },
          description: message,
          color: typeData[logType].color,
        },
      ],
      username: config.logging.username,
      avatar_url: config.logging.avatar,
    };
    axios.post(process.env.WEBHOOK_URL, data);
  },
};
