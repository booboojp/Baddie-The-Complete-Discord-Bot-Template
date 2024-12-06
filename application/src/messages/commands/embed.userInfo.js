module.exports = {
    type: 'info',
    title: 'User Information',
    description: 'Detailed information about ${username}',
    fields: [
        { name: 'Username', value: '${username}', inline: true },
        { name: 'Discriminator', value: '${discriminator}', inline: true },
        { name: 'ID', value: '${id}', inline: true },
        { name: 'Bot', value: '${isBot}', inline: true },
        { name: 'Created At', value: '${createdAt}', inline: true },
        { name: 'Joined Server At', value: '${joinedAt}', inline: true },
        { name: 'Roles', value: '${roles}', inline: false }
    ],
    footer: { text: 'User Info Command' },
    color: '#3498db',
    timestamp: new Date(),
    thumbnail: '${avatarURL}',
    author: { name: '${botName}', iconURL: '${botIconURL}' }
};