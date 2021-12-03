/** @format */

const { MessageEmbed, Channel, DiscordAPIError } = require("discord.js");
const Client = require("../Structures/Client.js");

const Command = require("../Structures/Command.js");

const  {Formatters} = require('discord.js');

const toLowerCase = require('@discordjs/builders');
const db = require("quick.db");


module.exports = new Command({
    name: "help",
    description: "Show the current commands!",
    permission: "MANAGE_GUILD",
    category: "Utilities",
    cmdArgument: "(Command)",


    async run(message, args, client) {
        const cmd = await message.client.commands

        const General = [];
        const Utilities = [];
        const Information = [];
        const Moderator = [];
        const Owner = [];
        const Fun = [];

        cmd.forEach(cmd => {
            if (cmd.category == "Utilities") Utilities.push(Formatters.inlineCode(cmd.name))
            if (cmd.category == "General") General.push(Formatters.inlineCode(cmd.name))
            if (cmd.category == "Information") Information.push(Formatters.inlineCode(cmd.name))
            if (cmd.category == "Moderator") Moderator.push(Formatters.inlineCode(cmd.name))
            if(cmd.category == "Owner") Owner.push(Formatters.inlineCode(cmd.name))
            if(cmd.category == "Fun") Fun.push(Formatters.inlineCode(cmd.name))

        })

        if(args.length === 0)
        {

        const HelpEmbed = new MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 56}))
        .setColor("WHITE")
            .addFields(
                {
                    name: ":crown: Owner",
                    value: `${Owner.join(", ")}`
                }
                ,{
                name: ":hammer: Moderator",
                value: `${Moderator.join(", ")}`
            },
            {
                name: ":information_source: Information",
                value: `${Information.join(", ")}`
            },
            {
                name: ":scroll: Utilities",
                value: ` ${Utilities.join (", " )}  `
            },
            {
                name: ":8ball: Fun",
                value: `${Fun.join (', ')}`,
            },
            {
                
                name: ":desktop: General",
                value: General.length !== 0 ? General.join(", ") : "*Empty*"

            })
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`);

        message.channel.send({ embeds: [HelpEmbed] })
        }


       if(args.length > 0)
       {
        const commandinput = cmd.get(args[0]?.toLowerCase())

        if (!commandinput) return message.reply("That command doesn't exist!")
        const HelpEmbed1 = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`${db.get('prefix')}${commandinput.name} ${commandinput.cmdArgument} || ${commandinput.description}`)
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp();
           message.channel.send({ embeds: [HelpEmbed1]})

       }}});