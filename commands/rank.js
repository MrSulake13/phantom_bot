const Discord = require('discord.js');
const MessageEmbed = require('discord.js');
const Levels = require('discord-xp');

module.exports.run = async (bot, message, args) => {
    const target = message.mentions.users.first() || message.author;
    const user = await Levels.fetch(target.id, message.guild.id);

    if(!user){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like the user in not in the Data Base.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed)
    };

    const embed = new Discord.MessageEmbed()
          .setTitle(`${target.tag}'s Level Stats`)
          .setColor(`BLUE`)
          .addFields(
            { name: `Name`, value: `${target}`, inline: true},
            { name: `Level`, value: `${user.level}/100`, inline: true },
            { name: `XP`, value: `${user.xp}`, inline: true} )
          .setThumbnail(`${target.displayAvatarURL({dynamic: true})}`)
          .setFooter(message.guild.name, message.guild.iconURL())
          .setTimestamp()
          message.channel.send(embed);
}

module.exports.config = {
    name: 'rank',
    aliases: [],
};