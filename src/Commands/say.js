/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "say",
    description: "Let the bot say something!",
    permission: "MANAGE_GUILD",
    category: "Moderator",
    cmdArgument: "[Mention/ID] (Reason)",



    async run(message, args, client) {
        message.delete()
        if (!args.length) {
            message.channel.send(`You need to provide one ore more arguments!`)
        }
        else {
            message.channel.send(args.join(' '));
        }
    }

});