const DiscordAPI = require('discord.js');
const fileSystem = require('fs');
const path = require('path');

module.exports = {
    data: new DiscordAPI.SlashCommandBuilder()
        .setName('create-reaction-role')
        .setDescription('Creates a message with reactions for role assignment.')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to send the message in')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message content')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reactions')
                .setDescription('JSON array of reactions and role IDs')
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.deferReply({ ephemeral: true });
        const channel = interaction.options.getChannel('channel');
        const messageContent = interaction.options.getString('message');
        const reactionsInput = interaction.options.getString('reactions');

        let reactions;
        try {
            reactions = JSON.parse(reactionsInput);
        } catch {
            return interaction.reply({ content: 'Invalid JSON provided for reactions.', ephemeral: true });
        }

        if (!Array.isArray(reactions)) {
            return interaction.reply({ content: 'Reactions must be provided as an array.', ephemeral: true });
        }

        const sentMessage = await channel.send(messageContent);

        for (const reaction of reactions) {
            try {
                await sentMessage.react(reaction.emoji);
            } catch (error) {
                console.log(`Filed to react to message. Error ${error}`)
            }
        }

        const reactionDataDirectory = path.join(__dirname, '../data/reactionRoles');
        if (!fileSystem.existsSync(reactionDataDirectory)) {
            fileSystem.mkdirSync(reactionDataDirectory);
        }

        const dataPath = path.join(reactionDataDirectory, `${sentMessage.id}.json`);
        const data = {
            messageid: sentMessage.id,
            channelId: sentMessage.channel.id,
            reactions: reactions
        };

        fileSystem.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        await interaction.editReply({ content: `Reaction role message successfully created in ${sentMessage.channel.id}` });


    }

}