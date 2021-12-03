
/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "react",
    description: "Let the bot react to a message!",
    permission: "MANAGE_GUILD",
    category: "Moderator",
    cmdArgument: "[message] | [emojis]",



    async run(message, args, client) {

    }
        });

