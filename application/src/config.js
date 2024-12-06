/**
 * @fileoverview Configuration file for the Discord bot application.
 * Loads environment variables from a .env file located in the parent directory.
 * 
 * @requires dotenv
 * @requires path
 * 
 * @module config
 */

/**
 * @typedef {Object} Config
 * @property {string} token - The bot token used to authenticate with the Discord API.
 * @property {string} clientId - The client ID of the Discord application.
 * @property {string} guildId - The ID of the Discord guild (server) where the bot will operate.
 */

/**
 * Loads environment variables from a .env file and exports them as a configuration object.
 * 
 * @type {Config}
 * @exports config
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
module.exports = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
};
