/** @format */

const { MessageEmbed } = require("discord.js");

const Command = require("../Structures/Command.js");

const db = require('quick.db');

module.exports = new Command({
    name: "setprefix",
    description: "Change the prefix of the bot!",
    permission: "MANAGE_GUILD",
    category: "Owner",
    cmdArgument: "[new Prefix]",



    async run(message, args, client) {
        // reply as Embed
        
        const currentPrefix = await db.get('prefix');
        const newPrefix = args[0];

        if (!args.length) {
            message.channel.send("You need to include a new prefix!")
        }
        else {
           if(newPrefix.length >= 5) return message.channel.send("You cannot enter a new prefix longer than 5 characters!")
           await db.set('prefix',`${newPrefix}`);

           const setprefixEmbed = new MessageEmbed()
            .setColor('#87be58')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setDescription("Prefix has been changed to" + ` [${db.get('prefix')}]`)
            .setTimestamp();
        message.channel.send({ embeds: [setprefixEmbed] });

           
           client.user.setPresence({
            activities: [{
                name: 'Victory Road ' +
                 `[${db.get('prefix')}]`,
                 type:"WATCHING"
                
            }]
        })
        }
    }
});