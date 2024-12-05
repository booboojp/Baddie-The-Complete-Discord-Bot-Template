const DiscordAPI = require('discord.js');
const configuration = require('./config.js');
const { loadEvents } = require('./handlers/eventHandler.js');
const { loadCommands } = require('./handlers/commandHandler.js');

async function main() {
    const client = new DiscordAPI.Client({
        intents: [DiscordAPI.GatewayIntentBits.Guilds], 
    })
    await loadEvents(client);
    await loadCommands(client);
    client.login(configuration.token);
}
main();