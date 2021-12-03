/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "gooffline",
    description: "Turn off the bot!",
    permission: "MANAGE_GUILD",
    category: "Owner",
    cmdArgument: " ",



    async run(message, args, client) {
        
        restartEmbed = new MessageEmbed()
        .setTitle('Now offline!')
        .setColor("RED")
        .setDescription(`${client.user.tag} is now offline`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`);

        await message.channel.send ({ embeds: [restartEmbed] })
        process.exit();
    }})