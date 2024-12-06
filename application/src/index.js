const DiscordAPI = require('discord.js');
const configuration = require('./config.js');
const { loadEvents } = require('./handlers/eventHandler.js');
const { loadCommands } = require('./handlers/commandHandler.js');

async function main() {
    await console.clear();
    /**
     * Creates a new Discord client instance with specified intents.
     * 
     * @param {Object} options - The options for the client.
     * @param {Array} options.intents - The intents to enable for the client.
     * 
     * @param {GatewayIntentBits} options.intents.Guilds - Enables guild-related events.
     * @param {GatewayIntentBits} options.intents.GuildMembers - Enables guild member-related events.
     * @param {GatewayIntentBits} options.intents.GuildBans - Enables guild ban-related events.
     * @param {GatewayIntentBits} options.intents.GuildEmojisAndStickers - Enables guild emoji and sticker-related events.
     * @param {GatewayIntentBits} options.intents.GuildIntegrations - Enables guild integration-related events.
     * @param {GatewayIntentBits} options.intents.GuildWebhooks - Enables guild webhook-related events.
     * @param {GatewayIntentBits} options.intents.GuildInvites - Enables guild invite-related events.
     * @param {GatewayIntentBits} options.intents.GuildVoiceStates - Enables guild voice state-related events.
     * @param {GatewayIntentBits} options.intents.GuildPresences - Enables guild presence-related events.
     * @param {GatewayIntentBits} options.intents.GuildMessages - Enables guild message-related events.
     * @param {GatewayIntentBits} options.intents.GuildMessageReactions - Enables guild message reaction-related events.
     * @param {GatewayIntentBits} options.intents.GuildMessageTyping - Enables guild message typing-related events.
     * @param {GatewayIntentBits} options.intents.DirectMessages - Enables direct message-related events.
     * @param {GatewayIntentBits} options.intents.DirectMessageReactions - Enables direct message reaction-related events.
     * @param {GatewayIntentBits} options.intents.DirectMessageTyping - Enables direct message typing-related events.
     * @param {GatewayIntentBits} options.intents.MessageContent - Enables access to message content.
     * @param {GatewayIntentBits} options.intents.GuildScheduledEvents - Enables guild scheduled event-related events.
     * @param {GatewayIntentBits} options.intents.AutoModerationConfiguration - Enables auto-moderation configuration-related events.
     * @param {GatewayIntentBits} options.intents.AutoModerationExecution - Enables auto-moderation execution-related events.
     */
    const client = new DiscordAPI.Client({
        intents: [
            DiscordAPI.GatewayIntentBits.Guilds,
            DiscordAPI.GatewayIntentBits.GuildMembers,
            DiscordAPI.GatewayIntentBits.GuildEmojisAndStickers,
            DiscordAPI.GatewayIntentBits.GuildIntegrations,
            DiscordAPI.GatewayIntentBits.GuildWebhooks,
            DiscordAPI.GatewayIntentBits.GuildInvites,
            DiscordAPI.GatewayIntentBits.GuildVoiceStates,
            DiscordAPI.GatewayIntentBits.GuildPresences,
            DiscordAPI.GatewayIntentBits.GuildMessages,
            DiscordAPI.GatewayIntentBits.GuildMessageReactions,
            DiscordAPI.GatewayIntentBits.GuildMessageTyping,
            DiscordAPI.GatewayIntentBits.DirectMessages,
            DiscordAPI.GatewayIntentBits.DirectMessageReactions,
            DiscordAPI.GatewayIntentBits.DirectMessageTyping,
            DiscordAPI.GatewayIntentBits.MessageContent,
            DiscordAPI.GatewayIntentBits.GuildScheduledEvents,
            DiscordAPI.GatewayIntentBits.AutoModerationConfiguration,
            DiscordAPI.GatewayIntentBits.AutoModerationExecution
        ],
    });
    await loadEvents(client);
    await loadCommands(client);
    client.login(configuration.token);
}
main();