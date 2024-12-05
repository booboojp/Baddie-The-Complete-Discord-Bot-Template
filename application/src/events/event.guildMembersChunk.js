module.exports = {
    name: "guildMembersChunk",
    execute(members, guild, chunk) {
        console.log('guildMembersChunk event fired', members, guild, chunk);
    },
}