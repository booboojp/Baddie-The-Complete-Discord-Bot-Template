const fileSystem = require('fs');
const path = require('path');
/**
 * Loads and registers event handlers for the Discord client.
 * 
 * This function reads all event files from the events directory, filters them based on the naming convention `event.[eventName].js`,
 * and registers each event with the Discord client. Each event file must export an object with `name` and `execute` properties.
 * 
 * @param {import('discord.js').Client} client - The Discord client instance.
 * 
 * @throws Will throw an error if there is an issue registering an event.
 * 
 * @example
 * // Example event file structure (event.messageCreate.js):
 * module.exports = {
 *     name: "messageCreate",
 *     execute(message) {
 *         console.log('messageCreate event fired', message);
 *     },
 * };
 */
async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fileSystem.readdirSync(eventsPath).filter(file => file.match(/^event\.[a-zA-Z]+\.js$/));

    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        if (event.name && event.execute) {
            try {
                console.log(`
                =========================
                Registering event: ${event.name}
                =========================
                `);
                client.on(event.name, (...args) => event.execute(...args));
            } catch (error) {
                console.error(`Error registering event ${event.name}:`, error);
            } finally {
                console.log(`Finished processing event: ${file}`);
            }
        }
    }
}
module.exports = { loadEvents };