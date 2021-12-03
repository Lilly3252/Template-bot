/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

const translate = require('@iamtraction/google-translate');

module.exports = new Command({
    name: "translate",
    description: "Translate a message!",
    permission: "SEND_MESSAGES",
    category: "Utilities",
    cmdArgument: "[Message]",



    async run(message, args, client) {
        if (!args.length) {
            message.channel.send(`You need to provide a message that you want to be translated!`)
        }
        else {
            const translated = await translate(args.join(' '), {to: 'en'});
            message.channel.send(translated.text);
        }
    }

});