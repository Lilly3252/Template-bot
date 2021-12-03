/** @format */

const dadjokes = require("../Structures/JSON/dadjokes.json");


const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

const builders = require('@discordjs/builders');

module.exports = new Command({
    name: "dadjoke",
    description: "Get a typical dadjoke!",
    permission: "SEND_MESSAGES",
    category: "Fun",
    cmdArgument: " ",



    async run(message, args, client) {
        
        return message.channel.send( `${dadjokes[Math.floor(Math.random() * dadjokes.length)]} `)
    }})