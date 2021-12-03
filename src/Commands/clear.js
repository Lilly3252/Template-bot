/** @format */

const { MessageEmbed } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "purge",
    description: "Purges a specific amount of messages from 1 to 99!",
    permission: "MANAGE_MESSAGES",
    category: "Moderator",
    cmdArgument: "[Amount => 1-99]",



    async run(message, args, client) {
        // reply as Embed
        const amount = args[0];
        if (!amount || isNaN(amount)) return message.channel.send(`${amount} is not a valid number!`);
        const amountParsed = parseInt(amount);
        if (amountParsed == 100) return message.channel.send("You cannot clear more than 100 messages!");
        message.channel.bulkDelete(amountParsed + 1);

        const purgeEmbed = new MessageEmbed()
            .setColor('#87be58')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setDescription(`Purged ${amountParsed} message/s`)
            .setTimestamp();
        const msg = await message.channel.send({ embeds: [purgeEmbed] });

        setTimeout(() => msg.delete(), 5000);
    }
});