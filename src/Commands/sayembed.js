/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "sayembed",
    description: "Let the bot say something in embed format!",
    permission: "MANAGE_GUILD",
    category: "Moderator",
    cmdArgument: "[Title] | [Message]",


    async run(message, args, client) {
        // reply as Embed
        const sayEmbedArray = args.join(" ")
        const getStuff = sayEmbedArray.split('|')

        let title = getStuff[0]
        let description = getStuff[1]

        if (!title) return message.channel.send("You need to enter a title and description!");
        if (!description) return message.channel.send("You need to enter a description!")

        const sayEmbed = new MessageEmbed()

            .setTitle(title)
            .setColor('#87be58')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setDescription(description)
            .setTimestamp();
        message.channel.send({ embeds: [sayEmbed] });
    }
});