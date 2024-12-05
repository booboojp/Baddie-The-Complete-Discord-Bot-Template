module.exports = {
    name: "guildMemberAvailable",
    execute(member) {
        console.log('guildMemberAvailable event fired', member);
    },
}