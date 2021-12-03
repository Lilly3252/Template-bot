/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "uptime",
    description: "Get information on how long the bot has been up!",
    permission: "MANAGE_GUILD",
    category: "Utilities",
    cmdArgument: " ",



    async run(message, args, client) {
        
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const uptimeEmbed = new MessageEmbed()
           .setTitle(`Uptime`)
           .setColor("WHITE")
           .setDescription(`${days}days ${hours}hours ${minutes}minutes ${seconds}seconds`)
         
       message.channel.send({embeds: [uptimeEmbed]});


    }});

