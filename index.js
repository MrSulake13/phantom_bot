const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const config = require('./settings.json');
const mongoose = require('mongoose');
const { loadCommands } = require('./utils/loadCommands');
const mongoCurrency = require('discord-mongo-currency');
const Levels = require('discord-xp');

mongoose.connect(config.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true, })
mongoose.set('useFindAndModify', false);

mongoCurrency.connect(config.MongoDB);
Levels.setURL("mongodb+srv://Andrey:nrLdm6MqJF6ILdFi@personalbot.gkzwl.mongodb.net/DataBase");

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Map()

loadCommands(bot);


bot.on("message", async message => {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    const randomXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
  
    if(hasLeveledUp) {
      const MessageEmbed = require('discord.js');
        
      const embedlvl = new Discord.MessageEmbed()
        .setTitle(`🥳 Level Up!`)
        .setDescription(`Congratulations ${message.author}!\nYou have advanced to **Level ${user.level + 1}**!`)
        .setThumbnail(`${message.author.displayAvatarURL()}`)
        .setColor(`GREEN`)
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        return message.channel.send(embedlvl);
  
    }});
  
bot.login(config.token);