const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config');

const DiscordBuildersAPI = require('@discordjs/builders');
const DiscordRestAPI = require('@discordjs/rest');
const DiscordTypeAPI = require('discord-api-types/v9');


const commands = [
  new DiscordBuildersAPI.SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  new DiscordBuildersAPI.SlashCommandBuilder().setName('hello').setDescription('Says hello!')
]
  .map(command => command.toJSON());

const rest = new DiscordRestAPI.REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            DiscordTypeAPI.Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
