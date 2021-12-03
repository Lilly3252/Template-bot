
/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "userinfo",
    description: "Let the bot say something!",
    permission: "MANAGE_GUILD",
    category: "Moderator",
    cmdArgument: "[Mention/ID] (Reason)",



    async run(message, args, client) {
        const member = message.mentions.members.first();
        const userinfo = new MessageEmbed()
        .setThumbnail(member.displayAvatarURL({ dynamic: true }) )
        .setDescription("test")
        message.channel.send( {embeds: [userinfo]})}

});
