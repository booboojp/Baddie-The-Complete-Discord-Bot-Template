module.exports = {
    name: "guildScheduledEventUserRemove",
    execute(guildScheduledEvent, user) {
        console.log('guildScheduledEventUserAdd event fired', guildScheduledEvent, user);
    },
}