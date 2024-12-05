module.exports = {
    name: 'guildBanRemove',
    execute(guild, user) {
        console.log(`A member is unbanned from a guild: ${user.tag}`);
    },
};