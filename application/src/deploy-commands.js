const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const configuration = require('./config.js');
const fs = require('fs');
const path = require('path');

/**
 * An array of slash commands to be registered with the Discord API.
 * 
 * This array contains command definitions using the `SlashCommandBuilder` from the `@discordjs/builders` package.
 * Each command is converted to JSON format using the `toJSON` method.
 * 
 * @type {Array<Object>}
 * 
 * @example
 * // Example command structure:
 * const commands = [
 *   new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
 *   new SlashCommandBuilder().setName('hello').setDescription('Says hello!')
 * ].map(command => command.toJSON());
 */
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = commandFiles.map(file => {
    const command = require(path.join(commandsPath, file));
    return command.data.toJSON();
});

const rest = new REST({ version: '9' }).setToken(configuration.token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            Routes.applicationGuildCommands(configuration.clientId, configuration.guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();