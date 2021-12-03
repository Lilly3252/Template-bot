const { MessageEmbed } = require("discord.js");
const Event = require("../Structures/Event.js");

module.exports = new Event("guildMemberAdd", (client, member) => {
    const channel = member.guild.channels.cache.find(c => c.name == "welcome-and-goodbye");
    if (!channel) return;

    const joinEmbed = new MessageEmbed()
        .setDescription(member.user.tag + '\n'
            + 'ID: ' + member.user.id + '\n'
            + 'Created: ' + `<t:${(Math.round(member.user.createdAt / 1000))}:R>` + '\n'
            + 'Current members: ' + member.guild.memberCount)
        .setColor("GREEN")
        .setAuthor("New Member")
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .setTimestamp(member.joinedTimestamp)

    channel.send({ embeds: [joinEmbed] });
});