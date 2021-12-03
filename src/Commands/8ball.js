/** @format */

const answers = require("../Structures/JSON/8ball.json");


const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

const builders = require('@discordjs/builders');

module.exports = new Command({
    name: "8ball",
    description: "Let the bot answer a question for you!",
    permission: "SEND_MESSAGES",
    category: "Fun",
    cmdArgument: "[Question]",


    async run(message, args, client) {
        if (!args.length) {
            message.channel.send(`You need to provide a question to ask!`)
        }
        else {
            const question = (args.join(' '));
            
            return message.channel.send(`_\`${question}\`_ 🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱`)
        }}})