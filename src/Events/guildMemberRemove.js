const { MessageEmbed } = require("discord.js");
const Event = require("../Structures/Event.js");

module.exports = new Event("guildMemberRemove", (client, member) => {
    const channel = member.guild.channels.cache.find(c => c.name == "welcome-and-goodbye");
    if (!channel) return;

    const leaveEmbed = new MessageEmbed()
        .setDescription
        (member.user.tag + '\n'
            + 'ID: ' + member.user.id + '\n'
            + 'Joined: ' + `<t:${(Math.round(member.joinedAt / 1000))}:f>` + '\n'
            + 'Remaining members: ' + member.guild.memberCount)

        .setColor("RED")
        .setAuthor("Member left")
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
    channel.send({ embeds: [leaveEmbed] });
});