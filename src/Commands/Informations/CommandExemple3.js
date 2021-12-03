const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("exemple3").setDescription("description3."),

  async run(interaction) {}}