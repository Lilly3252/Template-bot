const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("exemple1").setDescription("descriptionExemple1."),

  async run(interaction) {}}