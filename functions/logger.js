module.exports = {
  log(rawlogType, message, avatar, username) {
    const types = ["info", "shard", "database, error"];
    if (types.indexOf(rawlogType.toLowerCase()) === -1) {
      throw "Invalid log type";
    }
    const logType = types.indexOf(rawlogType.toLowerCase());

    if (!message) {
      throw "No message specified";
    }

    const typeData = [
      {
        type: "Info",
        color: 8257405,
      },
      {
        type: "Shard",
        color: 16763904,
      },
      {
        type: "Database",
        color: 9371903,
      },
      {
        type: "Error",
        color: 16711680,
      },
    ];

    const axios = require("axios");
    const config = require("../config.json");
    const data = {
      content: null,
      embeds: [
        {
          title: typeData[logType].type,
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
