const fileSystem = require('fs');
const path = require('path');

/**
 * Loads and registers command handlers for the Discord client.
 * 
 * This function reads all command files from the commands directory, filters them based on the naming convention `command.[commandName].js`,
 * and registers each command with the Discord client. Each command file must export an object with `data` and `execute` properties.
 * 
 * @param {import('discord.js').Client} client - The Discord client instance.
 * 
 * @throws Will throw an error if there is an issue registering a command.
 * 
 * @example
 * // Example command file structure (command.ping.js):
 * const { SlashCommandBuilder } = require('@discordjs/builders');
 * module.exports = {
 *     data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
 *     async execute(interaction) {
 *         await interaction.reply('Pong!');
 *     },
 * };
 * 
 * @see {@link ../commands/command.ping.js|Ping Command}
 * @see {@link ../handlers/eventHandler.js|Event Handler}
 */
async function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fileSystem.readdirSync(commandsPath).filter(file => file.match(/^command\.[a-zA-Z]+\.js$/));

    client.commands = new Map();

    for (const file of commandFiles) {
        try {
            const command = require(path.join(commandsPath, file));
            if (command.data) {
                console.log(`
                =========================
                Registering command: ${command.data.name}
                =========================
                `);
                client.commands.set(command.data.name, command);
            }
        } catch (error) {
            console.error(`Error registering command ${file}:`, error);
        } finally {
            console.log(`Finished processing command: ${file}`);
        }
    }
}

module.exports = { loadCommands };