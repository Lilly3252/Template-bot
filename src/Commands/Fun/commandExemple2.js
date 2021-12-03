const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("exemple2").setDescription("description2."),

  async run(interaction) {}}