const DiscordBuildersAPI = require('@discordjs/builders');
const DiscordRestAPI = require('@discordjs/rest');
const DiscordTypeAPI = require('discord-api-types/v9');
const configuration = require('./config.js');


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
const commands = [
  new DiscordBuildersAPI.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  new DiscordBuildersAPI.SlashCommandBuilder().setName('hello').setDescription('Says hello!')
]
  .map(command => command.toJSON());

const rest = new DiscordRestAPI.REST({ version: '9' }).setToken(configuration.token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            DiscordTypeAPI.Routes.applicationGuildCommands(configuration.clientId, configuration.guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
