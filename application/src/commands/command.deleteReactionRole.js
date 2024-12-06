const DiscordAPI = require('discord.js');
const fileSystem = require('fs');
const path = require('path');

module.exports = {
    data: new DiscordAPI.SlashCommandBuilder()
        .setName('deletereactionrole')
            .setDescription('Deletes a reaction role message and its data.')
            .addStringOption(option =>
                option.setName('messageid')
                    .setDescription('The ID of the message to delete')
                    .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const messageID = interaction.options.getString('messageid');
        const dataPath = path.join(__dirname, '../data/reactionRoles', `${messageID}.json`);

        if (!fileSystem.existsSync(dataPath)) {
            return interaction.editReply({ content: 'No reaction role data found for that message.', ephemeral: true });
        }

        const data = JSON.parse(fileSystem.readFileSync(dataPath, 'utf8'));
        fileSystem.unlinkSync(dataPath);
        try {
            const channel = await interaction.client.channels.fetch(data.channelId);
            const message = await channel.messages.fetch(messageID);
            await message.delete();
        } catch {
            return await interaction.editReply({ content: 'Failed to delete message.', ephemeral: true });
        }
        await interaction.editReply({ content: 'Reaction role message deleted.' });
    }
}