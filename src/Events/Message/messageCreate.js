const Event = require("../../Structures/Event");


module.exports = class extends Event {
  async run(message) {
    if (!message.guild || message.author.bot) return;
  }
};
