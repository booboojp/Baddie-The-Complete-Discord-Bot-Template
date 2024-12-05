const DiscordBuildersAPI = require('@discordjs/builders');

module.exports = {
    data: new DiscordBuildersAPI.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
      await interaction.reply('Pong!');
    }
  };