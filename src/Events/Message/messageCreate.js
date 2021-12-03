const Event = require("../../Structures/Event");
const config = require("../../config.json");;
const { MessageEmbed } = require("discord.js");

// Line 83 to 125 credit to ShinoTheShino

module.exports = class extends Event {
  async run(message) {
    if (!message.guild || message.author.bot) return;
  }
};
