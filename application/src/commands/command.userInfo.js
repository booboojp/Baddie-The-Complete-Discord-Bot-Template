const DiscordBuildersAPI = require('@discordjs/builders');
const { generateEmbedFromFile } = require('../handlers/embedHandler.js');

module.exports = {
    data: new DiscordBuildersAPI.SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Fetches information about a user')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to get information about')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply('Loading user information...');
        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);

        const userData = {
            username: user.username,
            discriminator: user.discriminator,
            id: user.id,
            isBot: user.bot ? 'Yes' : 'No',
            createdAt: user.createdAt.toDateString(),
            joinedAt: member.joinedAt.toDateString(),
            roles: member.roles.cache.map(role => role.name).join(', '),
            avatarURL: user.displayAvatarURL(),
            botName: interaction.client.user.username,
            botIconURL: interaction.client.user.displayAvatarURL()
        };

        const embed = await generateEmbedFromFile('messages/commands/embed.userInfo.js', userData);
        await interaction.editReply({ embeds: [embed] });
    }
};