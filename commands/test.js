const Discord = require('discord.js');
const MessageEmbed = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor(`GREEN`)
    .setDescription(`✅ **Ok!**`)
    message.channel.send(embed);
}

module.exports.config = {
    name: 'test',
    aliases: [],
    description: 'Tests',
};