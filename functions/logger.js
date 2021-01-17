module.exports = {
  log(rawlogType, message, avatar, username) {
    const config = require("../config.json");
    if (!config.webookLogging) {
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
            icon_url: config.loggingAvatar,
          },
          description: message,
          color: typeData[logType].color,
        },
      ],
      username: config.loggingUsername,
      avatar_url: config.loggingAvatar,
    };
    axios.post(process.env.WEBHOOK_URL, data);
  },
};
