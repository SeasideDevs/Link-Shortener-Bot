module.exports = {
  name: "filecoffee",
  description: "Magical magic",
  ownerOnly: true,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "utility",
  async execute(
    msg,
    args,
    client,
    config,
    prefix,
    axios,
    Discord,
    avatar,
    database
  ) {
    const FormData = require("form-data");
    const fs = require("fs");
    const url = `https://file.coffee/api/v1/upload?key=${process.env.FILE_COFFEE_TOKEN}`;
    console.log(msg.attachments.first());
    const form = await new FormData();
    await axios
      .get(msg.attachments.first().url)
      .then(function (res) {
        form.append("file", res.data);
      })
      .catch(function (e) {
        console.log(e);
      });

    try {
      form.submit(url, function (err, res) {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
