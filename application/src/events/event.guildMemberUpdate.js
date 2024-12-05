module.exports = {
    name: "guildMemberUpdate",
    execute(oldMember, newMember) {
        console.log('guildMemberUpdate event fired', oldMember, newMember);

    },
}