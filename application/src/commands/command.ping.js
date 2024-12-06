const DiscordBuildersAPI = require('@discordjs/builders');
const { generateEmbedFromFile } = require('../handlers/embedHandler.js');

module.exports = {
    data: new DiscordBuildersAPI.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
      await interaction.reply({ embeds: [await generateEmbedFromFile('messages/commands/embed.ping.js')] });
    }
};