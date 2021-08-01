const Discord = require('discord.js');
const bot = new Discord.Client();
const Levels = require('discord-xp');
const mongoose = require('mongoose');

Levels.setURL("mongodb+srv://Andrey:nrLdm6MqJF6ILdFi@personalbot.gkzwl.mongodb.net/DataBase");

bot.on("ready", bot => {
  console.log('The Bot is Online!')
})

bot.on("message", async message => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const prefix = '!';

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const user = await Levels.fetch(message.author.id, message.guild.id);

  const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
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

  };




  //Help
  if(command === "help") {
    const MessageEmbed = require('discord.js');
    const embedhelp = new Discord.MessageEmbed()
    .setTitle(`Support Category`)
    .addFields(
      { name: `🛠️ Moderation`, value: `!help-moderation`, inline: true },
      { name: `📩 Support`, value: `!help-support`, inline: true },
      { name: `😂 Fun Commands`, value: `!help-fun`, inline: true },
      { name: `👛 Leveling System`, value: `!help-levels`, inline: true },
      { name: `✅ Status`, value: `!status`, inline: true },
      { name: `💓 Ping`, value: `!ping`, inline: true }
    )
    .setDescription(`Please remember that this bot is updated daily and sometimes the commands may not work or have a big delay. You can always check the bot's status on our discord server and always be up to date. **Discord Server:** https://discord.io/phantomcom`)
    .setColor(`BLUE`)
    return message.channel.send(embedhelp);
    
  };



  if(command === "help-moderation") {
    const MessageEmbed = require('discord.js');
    const embedhelp = new Discord.MessageEmbed()
    .setTitle(`Support Category`)
    .addFields(
      { name: `⛔ Ban`, value: `!ban [user] [time] [reason]`, inline: true },
      { name: `🥾 Kick`, value: `!kick [user] [reason]`, inline: true },
      { name: `🔇 Mute`, value: `!mute [user] [time] [reason]`, inline: true },
      { name: `🔊 Unmute`, value: `!unmute [user]`, inline: true },
      { name: `❌ Warn`, value: `!warn [user] [reason]`, inline: true },
      { name: `👍🏼 Unwarn`, value: `!unwarn [user] [warnid]`, inline: true }
    )
    .setDescription(`Here are all the moderation commands for the bot. The usage of them in under the function name.`)
    .setColor(`RED`)
    return message.channel.send(embedhelp);    
  };



  if(command === "help-support") {
    const MessageEmbed = require('discord.js');
    const embedhelp = new Discord.MessageEmbed()
    .setTitle(`Support Category`)
    .addFields(
      { name: `⛔ Ban`, value: `!ban [user] [time] [reason]`, inline: true },
      { name: `🥾 Kick`, value: `!kick [user] [reason]`, inline: true },
      { name: `🔇 Mute`, value: `!mute [user] [time] [reason]`, inline: true },
      { name: `🔊 Unmute`, value: `!unmute [user]`, inline: true },
      { name: `❌ Warn`, value: `!warn [user] [reason]`, inline: true },
      { name: `👍🏼 Unwarn`, value: `!unwarn [user] [warnid]`, inline: true }
    )
    .setDescription(`Here are all the moderation commands for the bot. The usage of them in under the function name.`)
    .setColor(`RED`)
    return message.channel.send(embedhelp);    
  };



  if(command === "help-fun") {
    const MessageEmbed = require('discord.js');
    const embedhelp = new Discord.MessageEmbed()
    .setTitle(`Support Category`)
    .addFields(
      { name: `💬 Say`, value: `!say [message]`, inline: true },
      { name: `👛 Coinflip`, value: `!coinflip`, inline: true },
      { name: `😡 Roast`, value: `!roast [user]`, inline: true },
      { name: `👴🏼 Urban`, value: `!urban [word]`, inline: true },
      { name: `🙌🏼 Motivate`, value: `!motivate [user/none]`, inline: true },
      { name: `🧮 Calculator`, value: `!calculate [ecuation]`, inline: true },
      { name: `🐸 Meme`, value: `!meme`, inline: true },
      { name: `🖼️ Avatar`, value: `!avatar [user]`, inline: true },
      { name: `🟠 Ph Comment`, value: `!phcom [user/none] [text]`, inline: true },
    )
    .setDescription(`Here are all the fun commands for the bot. The usage of them in under the function name.`)
    .setColor(`BLUE`)
    return message.channel.send(embedhelp);    
  };



  if(command === "help-levels") {
    const MessageEmbed = require('discord.js');
    const embedhelp = new Discord.MessageEmbed()
    .setTitle(`Support Category`)
    .addFields(
      { name: `💾 Rank`, value: `!rank [user/none]`, inline: true },
      { name: `🎩 Leaderboard`, value: `!lb / !leaderboard`, inline: true },
      { name: `✅ Add XP`, value: `!addxp [user] [amount]`, inline: true },
      { name: `❌ Remove XP`, value: `!rmvxp [user] [amount]`, inline: true },
      { name: `✅ Set Level`, value: `!setlvl [user] [level]`, inline: true },
      { name: `👍🏼 More Soon`, value: `Nothing here.`, inline: true }
    )
    .setDescription(`Here are all the level commands for the bot. The usage of them in under the function name.`)
    .setColor(`PURPLE`)
    return message.channel.send(embedhelp);    
  };




  //Status
  if(command === "status") {
    if(Math.round(bot.ws.ping) <= 150) {
    const MessageEmbed = require('discord.js');
    const embedstat1 = new Discord.MessageEmbed()
    .setTitle(`🟢 The bot is fully operational!`)
    .setDescription(`You will not experience any problems with the bot!`)
    .setColor(`GREEN`)
    return message.channel.send(embedstat1);
    };

    if(Math.round(bot.ws.ping)>=150 && Math.round(bot.ws.ping)<=250) {
    const embedstat2 = new Discord.MessageEmbed()
    .setTitle(`🟡 The bot is operating well!`)
    .setDescription(`The bot is working but you may have some problems.`)
    .setColor(`YELLOW`)
    return message.channel.send(embedstat2);
    };

    if(Math.round(bot.ws.ping) >= 250) {
      const embedstat2 = new Discord.MessageEmbed()
      .setTitle(`🔴 The bot is not operating so well!`)
      .setDescription(`The bot will be hard to use and you will experience problems.`)
      .setColor(`#FF0000`)
      return message.channel.send(embedstat2);
      };
  };





  //Ping
  if(command === "ping") {
    const MessageEmbed = require('discord.js');
    let ping = message.createdTimestamp - message.createdTimestamp
            const embedping = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(`<:hourglass_flowing_sand:699128011743690794> ${ping} Delay\n\n💓 ${Math.round(bot.ws.ping)} Ping`)
            return message.channel.send(embedping);
  };
  



  //Meme
  if(command === "meme") {
    const MessageEmbed = require('discord.js');
    const randomPuppy = require("random-puppy");
    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);

    const embed = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setImage(img)
    .setURL(`https://reddit.com/r/${random}`)
    message.channel.send(embed);
  };




  //Avatar
  if(command === "avatar") {
    const MessageEmbed = require('discord.js');
    const member = message.mentions.users.first() || message.author;

    const embed = new Discord.MessageEmbed()
    .setTitle(`${member.username}'s Avatar Pic`)
    .setImage(`${member.displayAvatarURL({dynamic: true, size: 4096})}`)
    .setColor(`BLUE`)
    .setTimestamp()
    message.channel.send(embed);
  };




  //Ph Comment
  if(command === "phcom" || command === "phcomment") {
    const MessageEmbed = require('discord.js');
    const fetch = require("node-fetch");
    const member = message.mentions.users.first();


    if(!member){
      const com = args.slice(0).join(" ");

      if(!com){
        const eembed = new Discord.MessageEmbed()
        .setTitle(`:no_entry: Error!`)
        .setDescription(`Oops. You need to specify a comment.`)
        .setColor(`#FF0000`)
        .setTimestamp()
        return message.channel.send(eembed);
      }

      let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${message.author.username}&image=${message.author.displayAvatarURL({ format: "png", size: 512 })}&text=${com}`));
      let json = await res.json();
      let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
      message.channel.send(attachment);
    } else{
      const com = args.slice(1).join(" ");

      if(!com){
        const eembed = new Discord.MessageEmbed()
        .setTitle(`:no_entry: Error!`)
        .setDescription(`Oops. You need to specify a comment.`)
        .setColor(`#FF0000`)
        .setTimestamp()
        return message.channel.send(eembed);
      }

      let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${member.username}&image=${member.displayAvatarURL({ format: "png", size: 512 })}&text=${com}`));
      let json = await res.json();
      let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
      message.channel.send(attachment);
    }};




  //Calculate
  if(command === "calculate") {
    const MessageEmbed = require('discord.js');
    const math = require('mathjs');
    const calc = args.slice(0).join(" ");

    if(!calc){
      const eembed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. You need to specify a calculation.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(eembed);
    }
    
    let result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));

    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`${bot.user.username} Calculator`, message.author.displayAvatarURL({ dynamic: true }))
    .addField("**Operation**", `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
    .addField("**Result**", `\`\`\`Js\n${result}\`\`\``)
    .setTimestamp()
    message.channel.send(embed);
  };




  //Motivate
  if(command === "motivational" || command === "motivate") {
    const MessageEmbed = require('discord.js');
    const jsonQuotes = require('./motivational.json')
    const member = message.mentions.users.first() || message.author;
    const randomQuote = jsonQuotes.quotes[Math.floor((Math.random() * jsonQuotes.quotes.length))];

    const quoteEmbed = new Discord.MessageEmbed()
      .setTitle(randomQuote.author)
      .setDescription(randomQuote.text)
      .setColor('GREEN')
      .setFooter(member.tag, member.displayAvatarURL())
      .setTimestamp()
      return message.channel.send(quoteEmbed);
  };




  //Urban Disctionary
  if(command === "urban" || command === "urbandictionary") {
    const MessageEmbed = require('discord.js');
    const urban = require('relevant-urban');
    const search = args.slice(0).join(" ");
    let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";

    if(!search){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. You need to enter something to search.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    }

    let res = await urban(args.join(' '))

    if (!res) {
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. No results found for this topic.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

    const uembed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`Searched Word - ${word}`)
    .setThumbnail(image)
    .setDescription(`**Defintion:**\n*${definition || "No definition"}*\n\n**Example:**\n${example || "No Example"}`)
    .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
    .addField("**Link**",  `[link to ${word}](${urbanURL})`)
    .addField("**Author:**", `${author || "unknown"}`)
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp()
    message.channel.send(uembed)
  };




  //Say
  if(command === "say") {
    const MessageEmbed = require('discord.js');
    const msg = args.slice(0).join(" ");

  if(!msg) {
    const sembed = new Discord.MessageEmbed()
    .setTitle(`:no_entry: Error!`)
    .setDescription(`Oops. You need to enter some text.`)
    .setColor(`#FF0000`)
    .setTimestamp()
    return message.channel.send(sembed);
  } else {
    const rembed = new Discord.MessageEmbed()
    .setTitle(`Saying Something!`)
    .setDescription(`${msg}`)
    .setColor(`GREEN`)
    .setTimestamp()
    message.channel.send(rembed);
  }};



  //Coin Flip
  if(command === "coinflip") {
    const MessageEmbed = require('discord.js');
    const n = Math.floor(Math.random() * 2);

  if(n === 1){
    const sembed = new Discord.MessageEmbed()
    .setTitle(`Coinflip!`)
    .setDescription(`${message.author} **Flipped Heads!**`)
    .setThumbnail(`https://imgur.com/CnlkCrw.png`)
    .setColor(`GREEN`)
    .setTimestamp()
    return message.channel.send(sembed);
  } else {
    const sembed = new Discord.MessageEmbed()
    .setTitle(`Coinflip!`)
    .setDescription(`${message.author} **Flipped Tails!**`)
    .setThumbnail(`https://imgur.com/ZhPIukF.png`)
    .setColor(`GREEN`)
    .setTimestamp()
    return message.channel.send(sembed);
  }};



  //Roast
  if(command === "roast") {
    const MessageEmbed = require('discord.js');
    const roasts = require('./roast.json');
    const member = message.mentions.users.first();
    const roast = roasts.roast[Math.floor((Math.random() * roasts.roast.length))];

  if(!member) {
    const sembed = new Discord.MessageEmbed()
    .setTitle(`:no_entry: Error!`)
    .setDescription(`Oops. You can not roast yourself.`)
    .setColor(`#FF0000`)
    .setTimestamp()
    return message.channel.send(sembed);
  }

  if(member) {
    const rembed = new Discord.MessageEmbed()
    .setTitle(`Roasting Someone!`)
    .setDescription(`${roast}`)
    .setFooter(`Roasted ${member.tag}`)
    .setColor(`RANDOM`)
    .setTimestamp()
    return message.channel.send(rembed);
  }};



  //Rank
  if(command === "rank") {
    const target2 = message.mentions.users.first() || message.author;
    const user = await Levels.fetch(target2.id, message.guild.id);
    const MessageEmbed = require('discord.js');

    if(!user){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like you don't have any XP.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed)
    };

    const embed = new Discord.MessageEmbed()
          .setTitle(`${target2.tag}'s Level Stats`)
          .setColor(`BLUE`)
          .addFields(
            { name: `Name`, value: `${target2}`, inline: true},
            { name: `Level`, value: `${user.level}/100`, inline: true },
            { name: `XP`, value: `${user.xp}`, inline: true} )
          .setThumbnail(`${target2.displayAvatarURL({dynamic: true})}`)
          .setFooter(message.guild.name, message.guild.iconURL())
          .setTimestamp()
          message.channel.send(embed);
  };



  //Add XP
  if(command === "addxp") {
    const target = message.mentions.users.first();
    const user = await Levels.fetch(target.id, message.guild.id);
    const addxp = args.slice(1).join(" ");

    if (!message.member.hasPermission('ADMINISTRATOR')){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like you don't have permission to do that.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(!user) {
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like that user is not in the Data Base.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(!addxp){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. You need to specify the XP to add.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(addxp>100000){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. The maximum XP to add is 100000.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    Levels.appendXp(message.author.id, message.guild.id, addxp);

    const embed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: Success!`)
    .setDescription(`Successfully added **${addxp} XP** to ${target}!`)
    .setColor(`GREEN`)
    .setTimestamp()
    return message.channel.send(embed);

  };
  


  //Set Level
  if(command === "setlevel" || command === "setlvl") {
    const target = message.mentions.users.first();
    const user = await Levels.fetch(target.id, message.guild.id);
    const setlvl = args.slice(1).join(" ");

    if (!message.member.hasPermission('ADMINISTRATOR')){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like you don't have permission to do that.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(!user) {
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like that user is not in the Data Base.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(!setlvl){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. You need to specify the Level to set.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(setlvl>100){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. The maximum level to add is 100.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    Levels.setLevel(message.author.id, message.guild.id, setlvl);

    const embed5 = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: Success!`)
    .setDescription(`Successfully set **Level ${setlvl}** to ${target}!`)
    .setColor(`GREEN`)
    .setTimestamp()
    return message.channel.send(embed5);

  };



  //Subsctract XP
  if(command === "removxp" || command === "substractxp" || command === "rmvxp") {
    const target = message.mentions.users.first();
    const user = await Levels.fetch(target.id, message.guild.id);
    const rmvxp = args.slice(1).join(" ");

    if (!message.member.hasPermission('ADMINISTRATOR')){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like you don't have permission to do that.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(!user) {
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. It looks like that user is not in the Data Base.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(!rmvxp){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. You need to specify the XP to remove.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    if(rmvxp>100000){
      const embed = new Discord.MessageEmbed()
      .setTitle(`:no_entry: Error!`)
      .setDescription(`Oops. The maximum XP to remove is 100000.`)
      .setColor(`#FF0000`)
      .setTimestamp()
      return message.channel.send(embed);
    };

    Levels.subtractXp(message.author.id, message.guild.id, rmvxp);

    const embed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: Success!`)
    .setDescription(`Successfully removed **${rmvxp} XP** from ${target}!`)
    .setColor(`GREEN`)
    .setTimestamp()
    return message.channel.send(embed);

  };



  //Leaderboard
  if(command === "leaderboard" || command === "lb") {
      const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
      const MessageEmbed = require('discord.js');

      if (rawLeaderboard.length < 1) {
        const embed6 = new Discord.MessageEmbed()
        .setTitle(`:no_entry: Error!`)
        .setDescription(`Oops. It looks like nobody's on the leaderboard yet.`)
        .setColor(`#FF0000`)
        .setTimestamp()
        return message.channel.send(embed6);
      };

      const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true); 

      const embed7 = new Discord.MessageEmbed()
      .setTitle(`Server Leaderboard:`)
      .setDescription(leaderboard.map(e => `**${e.position}.** ${e.username}  **|  Level ${e.level}**`))
      .setColor(`PURPLE`)
      .setTimestamp()
      message.channel.send(embed7);

  };




  if(command === "owner-activate") {
    const MessageEmbed = require('discord.js');

  if(!message.author.id === "324609918248157184"){
    const sembed = new Discord.MessageEmbed()
    .setTitle(`:no_entry: Error!`)
    .setDescription(`Oops. Only the bot owner can use this command!`)
    .setColor(`#FF0000`)
    .setTimestamp()
    return message.channel.send(sembed);
  }

  const sembed = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: Success!`)
    .setDescription(`Bot Owner Commands Activated!`)
    .setColor(`GREEN`)
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp()
    return message.channel.send(sembed);

};

  if(command === "owner-ban") {
    const MessageEmbed = require('discord.js');
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ");

  if(!message.author.id === "324609918248157184"){
    const sembed = new Discord.MessageEmbed()
    .setTitle(`:no_entry: Error!`)
    .setDescription(`Oops. Only the bot owner can use this command!`)
    .setColor(`#FF0000`)
    .setTimestamp()
    return message.channel.send(sembed);
  }

  const embed = new Discord.MessageEmbed()
  .setTitle(`You Have Been Banned!`)
  .setDescription(`You have been permanently banned from **${message.guild.name}**!\n⠀⠀⠀`)
  .addFields(
    { name: `Moderator`, value: `Bot Owner`, inline: true},
    { name: `Reason`, value: `${reason}`, inline: true},
    { name: `Duration`, value: `Permanent`, inline: true})
    .setThumbnail(message.guild.iconURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setColor(`#FF0000`)
    .setTimestamp()
    user.send(embed). then(() => message.guild.members.ban(user, {reason: reason }))


    const embed2 = new Discord.MessageEmbed()
    .setTitle(`Member Permanently Banned - ${user.tag}`)
    .setDescription(`⠀⠀⠀⠀⠀⠀⠀`)
    .addFields(
      { name: `Moderator`, value: `Bot Owner`, inline: true},
      { name: `Reason`, value: `${reason}`, inline: true},
      { name: `Duration`, value: `Permanent`, inline: true})
      .setColor(`#FF0000`)
      .setThumbnail(user.displayAvatarURL())
    message.channel.send(embed2);

};


if(command === "owner-tempban") {
  const MessageEmbed = require('discord.js');
  const user = message.mentions.users.first();
  const reason = args.slice(1).join(" ");

if(!message.author.id === "324609918248157184"){
  const sembed = new Discord.MessageEmbed()
  .setTitle(`:no_entry: Error!`)
  .setDescription(`Oops. Only the bot owner can use this command!`)
  .setColor(`#FF0000`)
  .setTimestamp()
  return message.channel.send(sembed);
}

const embedr = new Discord.MessageEmbed()
.setTitle(`You Have Been Banned!`)
.setDescription(`You have been temporary banned from **${message.guild.name}**!\n⠀⠀⠀`)
.addFields(
  { name: `Moderator`, value: `Bot Owner`, inline: true},
  { name: `Reason`, value: `${reason}`, inline: true},
  { name: `Duration`, value: `14 Days`, inline: true})
  .setThumbnail(message.guild.iconURL())
  .setFooter(message.guild.name, message.guild.iconURL())
  .setColor(`#FF0000`)
  .setTimestamp()
  user.send(embedr). then(() => message.guild.members.ban(user, {days: 14, reason: reason }))


  const embedq = new Discord.MessageEmbed()
  .setTitle(`Member Temporary Banned - ${user.tag}`)
  .setDescription(`⠀⠀⠀⠀⠀`)
  .addFields(
    { name: `Moderator`, value: `Bot Owner`, inline: true},
    { name: `Reason`, value: `${reason}`, inline: true},
    { name: `Duration`, value: `14 Days`, inline: true})
    .setColor(`#FF0000`)
    .setThumbnail(user.displayAvatarURL())
  message.channel.send(embedq);

};



bot.login(process.env.token);
});