/** @format */

const { MessageEmbed } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "ping",
    description: "Shows the ping of the bot!",
    permission: "MANAGE_GUILD",
    category: "Utilities",
    cmdArgument: " ",

    async run(message, args, client) {
        // reply as Embed
        const pingEmbed = new MessageEmbed()
            .setColor('#87be58')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setDescription(`Pong! ${client.ws.ping} ms.`)
            .setTimestamp();
        message.channel.send({ embeds: [pingEmbed] });
    }
});