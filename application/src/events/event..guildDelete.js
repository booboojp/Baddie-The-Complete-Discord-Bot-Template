module.exports = {
    name: 'guildDelete',
    execute(client, guild) {
        console.log(`the client deleted/left a guild`);
        console.log({ guild });
    },
};