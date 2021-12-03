/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

const filterLevels = {
    DISABLED: "Off",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone"
}

const verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(\u256F\xB0\u25A1\xB0\uFF09\u256F\uFE35 \u253B\u2501\u253B",
    VERY_HIGH: "\u253B\u2501\u253B \uFF90\u30FD(\u0CA0\u76CA\u0CA0)\u30CE\u5F61\u253B\u2501\u253B"
}

module.exports = new Command({
    name: "serverinfo",
    description: "Get information about the server!",
    permission: "MANAGE_GUILD",
    category: "Information",


    async run(message, args) {

        const roles = message.guild.roles.cache
          .sort((a, b) => b.position - a.position)
          .map((role) => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        let owner = await message.guild.fetchOwner();
        const embed = new MessageEmbed()
       
        
          .setDescription(`**Guild information for __${message.guild.name}__**`)
          .setColor("BLUE")
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .addField("General", [
            `**❯ Name:** ${message.guild.name}`,
            `**❯ ID:** ${message.guild.id}`,
            `**❯ Owner:** ${ owner.user.tag} (${owner.id})`, // <-- this need to be adapted ( fetchOwner ) 
            `**❯ Boost Tier:** ${
              message.guild.premiumTier
                ? `Tier ${message.guild.premiumTier}`
                : "None"
            }`,
            `**❯ Explicit Filter:** ${
              filterLevels[message.guild.filterLevels]
            }`,
            `**❯ Verification Level:** ${
              verificationLevels[message.guild.verificationLevel]
            }`,
            `**❯ Time Created:** [<t:${(Math.round(message.guild.createdTimestamp / 1000))}:R>]`
            ,
        
            "\u200b"
        ].join("\n")
    
          )
          .addField("Statistics", [
            `**❯ Role Count:** ${roles.length}`,
            `**❯ Emoji Count:** ${emojis.size}`,
            `**❯ Regular Emoji Count:** ${
              emojis.filter((emoji) => !emoji.animated).size
            }`,
            `**❯ Animated Emoji Count:** ${
              emojis.filter((emoji) => emoji.animated).size
            }`,
            `**❯ Member Count:** ${message.guild.memberCount}`,
            `**❯ Bots:** ${members.filter((member) => member.user.bot).size}`,
            `**❯ Text Channels:** ${
              channels.filter((channel) => channel.type === "GUILD_TEXT" ).size // <-- this need to be adapted
            }`,
            `**❯ Voice Channels:** ${
              channels.filter((channel) => channel.type === "GUILD_VOICE" ).size // <-- this need to be adapted
            }`,
            `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
            "\u200b",
        ].join("\n")
        )
         
        .addField(`Roles [${roles.length - 1}]`,
        [roles.length < 10
          ? roles.join(", ")
          : roles.length > 10
          ? message.client.utils.trimArray(roles)
          : "None"].join("\n"))

          .setTimestamp();
          message.channel.send({ embeds: [embed] });

          
        }});