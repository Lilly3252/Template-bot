/** @format */

const { MessageEmbed, Message } = require("discord.js");

const Command = require("../Structures/Command.js");

const kickEmbed = new MessageEmbed();

module.exports = new Command({
    name: "kick",
    description: "Kicks a specific user from the server!",
    permission: "KICK_MEMBERS",
    category: "Moderator",
    cmdArgument: "[Mention/ID] (Reason)",



    async run(message, args, client) {
        try {
            if (args[0] == null) return message.channel.send("You need to mention a user or give an ID to kick!")
            const member = message.mentions.members.first() || await message.guild.members.fetch(args[0])
            let reason = args.slice(1).join(" ");
            if(!reason) reason = "unspecified";
            if (!member) return message.channel.send("Couldn't find that user!")
            if (!member.kickable) return message.channel.send("This user cannot be kicked!")
            try {
                member.kick(reason).then(() => {
                    kickEmbed
                        .setTitle('Kicked')
                        .setColor("YELLOW")
                        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                        .setDescription(`__User:__ ${member.user.tag} \n__ID:__ (${member.user.id}) \n__Reason:__ ${reason} \n \u200b`)
                        .setTimestamp()
                        .setFooter(
                        `Executed by ${message.author.tag}`,
                        `${message.author.displayAvatarURL({dynamic: true})}`);
                    message.channel.send({ embeds: [kickEmbed] });
                })
            }
            catch { return; }
        } catch { return message.channel.send('That user is non-existent') }
    }
});