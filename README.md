## About

![Discord Server](https://img.shields.io/badge/Discord-dsc.gg/sea-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)  
[![top.gg](https://top.gg/api/widget/755474829364428840.svg)](https://top.gg/bot/755474829364428840)  
[![discord.boats](https://discord.boats/api/widget/755474829364428840)](https://discord.boats/bot/755474829364428840)

Link Shortener is a open source Discord Bot which uses various api's to shorten links. Current supported shorteners include [is.gd](https://is.gd) and [v.gd](https://v.gd). There are plans to add more in the future. You can invite the bot [here](https://dsc.gg/link)

## Self Hosting

**THE CODEBASE IS BEING IMPROVED AND WORKED ON. THERE WILL BE NO SUPPORT PROVIDED TO SELFHOSTERS UNTIL THE CODE HAS BEEN IMPROVED. YOU MAY STILL SELFHOST BUT THERE WILL BE NO SUPPORT PROVIDED**
If you wish to self host you will need to make some small edits to the code before starting the bot. This guide will assume you already have a Discord Developer Application, that node.js is installed, and that you know how to install dependencies. You can use Google to find out how to do these things if you don't know how.

1. Rename the example.env file and place your bot token after the `BOT_TOKEN=` part
2. Edit the config.json file to your liking. Make sure the pingRequire variable is set to true if you are going to need to ping your project with something like Uptime Robot
3. Now you must install the required dependencies for the bot to function properly. These include [discord.js](https://www.npmjs.com/package/discord.js), [axios](https://www.npmjs.com/package/axios), [systeminformation](https://www.npmjs.com/package/systeminformation), and [chalk](https://www.npmjs.com/package/chalk). If you are going to use the pinging code you must also install [express](https://www.npmjs.com/package/express).
4. Now assuming you followed this guide correctly your bot should now be ready to start. You can use `node bot.js` to start the bot up in normal mode. For sharded mode (your shouldn't need this at all) you can use `node bot.js` If the bot is running correctly it should log the bot logging in.

If you find these instructions too complicated you can also run this on [repl.it](https://repl.it) using this button:
[![Run on Repl.it](https://repl.it/badge/github/TheLimifiedLime/Link-Shortener-Bot)](https://repl.it/github/TheLimifiedLime/Link-Shortener-Bot)
Dependencies are automatically installed and you start the bot by using the run button at the top of the UI. This method will need the project to be pinged every so often (5 minutes works great in my testing). You can use a site like [Uptime Robot](https://uptimerobot.com) and their free plan to set up a http monitor to ping your project. If you cannot get the bot working there will be no support provided.

## License

View the License [here](https://github.com/SeasideDevs/Link-Shortener-Bot/blob/master/LICENSE)
