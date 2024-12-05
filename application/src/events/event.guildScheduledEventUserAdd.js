module.exports = {
    name: "guildScheduledEventUserAdd",
    execute(guildScheduledEvent, user) {
        console.log('guildScheduledEventUserAdd event fired', guildScheduledEvent, user);
    },
}