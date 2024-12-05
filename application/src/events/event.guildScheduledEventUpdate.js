module.exports = {
    name: "guildScheduledEventUpdate",
    execute(oldGuildScheduledEvent, newGuildScheduledEvent) {
        console.log('guildScheduledEventUpdate event fired', oldGuildScheduledEvent, newGuildScheduledEvent);
    },
}