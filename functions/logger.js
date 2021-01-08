module.exports = {
  log(logType, message, avatar, username) {
    const types = ['info', 'shard', 'database, error']
    if (types.indexOf(logType.toLowerCase()) === -1) {
      return throw "Invalid log type"
    }
    const typeData = [{
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
    }];

    if (!type) {
      return throw "No type specified"
    }
    if (!message) {
      return throw "No message specified"
    }

    const axios = require('axios')
    const data = {
      "content": null,
      "embeds": [
        {
          "title": typeData[logType].type,
          "description": message,
          "color": typeData[logType].color
        }
      ],
      "username": client.user.username,
      "avatar_url": client.user.avatarURL()
    }
    axios.post(process.env.WEBHOOK_URL, data)



  }
}