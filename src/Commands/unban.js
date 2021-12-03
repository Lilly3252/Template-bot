/** @format */

const { MessageEmbed, Message, Channel, MessageFlags } = require("discord.js");
const { GuildMember } = require("discord.js");

const Command = require("../Structures/Command.js");

const unbanEmbed = new MessageEmbed();

module.exports = new Command({
    name: "unban",
    description: "Unbans a specific user from the server!",
    permission: "BAN_MEMBERS",
    category: "Moderator",
    cmdArgument: "[ID] (Reason)",


    async run(message, args, client) {
        
        const id = args[0];
        if(args[0] == null) return message.channel.send("Please provide a valid user ID!")
        
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "unspecified";
               

        const bannedUsers = await message.guild.bans.fetch().then((async(bannedUsers) => {
            if(bannedUsers.size == 0) return message.channel.send("No one can be unbanned because there is no user ban in this server!");
            let banned = bannedUsers.find((user) => user.user.id === id);

            unbanEmbed
            .setTitle('Unbanned')
            .setColor("GREEN")
            .setThumbnail(banned.user.displayAvatarURL({ dynamic: true}) )
            .setDescription(`__User:__ ${banned.user.tag} \n__ID:__ (${banned.user.id}) \n__Reason:__ ${reason} \n \u200b `)
            .setTimestamp()
            .setFooter(
                `Executed by ${message.author.tag}`,
                `${message.author.displayAvatarURL({dynamic: true})}`);

            return banned ? void (await
                message.guild.members.unban(banned.user, reason).catch((a) => 
                console.log(a)), 
                
                message.channel.send({ embeds: [unbanEmbed] })) 
                : message.channel.send("This user is not banned!");

        }))
       

        
    }
}

);