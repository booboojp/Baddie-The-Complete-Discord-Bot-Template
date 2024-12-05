module.exports = {
    name: 'guildCreate',
    execute(guild, client) {
        console.log('The client joins a guild');
        console.log({ guild });
    },
};