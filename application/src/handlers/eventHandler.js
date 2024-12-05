const fileSystem = require('fs');
const path = require('path');
//https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fileSystem.readdirSync(eventsPath).filter(file => file.match(/^event\.[a-zA-Z]+\.js$/));

    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        if (event.name && event.execute) {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
module.exports = { loadEvents };