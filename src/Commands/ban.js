/** @format */

const { MessageEmbed, Message } = require("discord.js");
const { GuildMember } = require("discord.js");

const Command = require("../Structures/Command.js");

const banEmbed = new MessageEmbed();

module.exports = new Command({
  name: "ban",
  description: "Bans a specific user from the server!",
  permission: "BAN_MEMBERS",
  category: "Moderator",
  cmdArgument: "[Mention/ID] (Reason)",

  async run(message, args, client) {
    try {
      // get the member
      const member = message.mentions.members.first() || await client.users.fetch(args[0]) || await client.users.fetch(args[0])
      //if no ID specified
      if (!args[0])
        return message.channel.send(
          "You need to mention a user or give an ID to ban!"
        );
      //get the reason
      let reason = args.slice(1).join(" ");
      //if theres no reason , specify one by default
      if (!reason) reason = "unspecified";
      // check if the member is a guild member and if not bannable
      if (member instanceof GuildMember && !member.bannable)
        return message.channel.send("This user cannot be banned!");

      //fetch the guildBan collection
      message.guild.bans.fetch(member).
        then(() => { message.channel.send(`${member} ` + "is already banned") })
        .catch(() => {
          message.guild.members.ban(member),
          banEmbed
            .setTitle('Banned')
            .setColor("RED")
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setDescription(`__User:__ ${member.tag} \n__ID:__ (${member.id}) \n__Reason:__ ${reason} \n \u200b
            `)
            .setTimestamp()
            .setFooter(
              `Executed by ${message.author.tag}`,
              `${message.author.displayAvatarURL({ dynamic: true })}`);
          message.channel.send({ embeds: [banEmbed] });
        })
    } catch { message.channel.send(`Cannot find the user`) }
  }
})
