const fs = require('fs');
const path = require('path');
const DiscordAPI = require('discord.js');

/**
 * Generates a Discord embed from a configuration file.
 * 
 * This function reads an embed configuration file, extracts the embed parameters,
 * and constructs a Discord embed using the `EmbedBuilder` from the Discord.js library.
 * 
 * @param {string} filename - The relative path to the embed configuration file.
 * @returns {Promise<DiscordAPI.EmbedBuilder>} - A promise that resolves to a Discord embed.
 * 
 * @throws {Error} - Throws an error if the embed configuration file is not found.
 * 
 * @example
 * // Example embed configuration file structure (embed.ping.js):
 * module.exports = {
 *     type: 'info',
 *     title: 'Ping Command',
 *     description: 'Server Information',
 *     fields: [
 *         { name: 'Server Name', value: 'Example Server', inline: true },
 *         { name: 'Total Memory', value: '16 GB', inline: true },
 *         { name: 'Free Memory', value: '8 GB', inline: true },
 *         { name: 'CPU Cores', value: '8', inline: true },
 *         { name: 'CPU Model', value: 'Intel Core i7', inline: true },
 *         { name: 'Uptime', value: '24 hours', inline: true }
 *     ],
 *     footer: { text: 'Ping Command Footer' },
 *     color: '#3498db',
 *     url: '',
 *     timestamp: new Date(),
 *     thumbnail: 'https://example.com/thumbnail.png',
 *     image: '',
 *     author: { name: 'Bot Name', iconURL: 'https://example.com/author.png' }
 * };
 * 
 * @see {@link ../commands/command.ping.js|Ping Command}
 * @see {@link ../events/event.messageCreate.js|Message Create Event}
 */
async function generateEmbedFromFile(filename, data = {}) {
    const filePath = path.resolve(__dirname, '../', filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Embed configuration file not found: ${filePath}`);
    }

    let embedConfig = require(filePath);

    // Convert embedConfig to string and replace placeholders
    const embedString = JSON.stringify(embedConfig);
    const filledEmbedString = embedString.replace(/\$\{(\w+)\}/g, (_, key) => data[key] || '');

    // Parse back to object
    embedConfig = JSON.parse(filledEmbedString);

    // Proceed with building the embed as before
    const embed = new DiscordAPI.EmbedBuilder()
        .setTitle(embedConfig.title)
        .setDescription(embedConfig.description)
        .setColor(embedConfig.color)

    if (embedConfig.timestamp) {
        const timestamp = new Date(embedConfig.timestamp);
        if (!isNaN(timestamp.getTime())) {
            embed.setTimestamp(timestamp);
        } else {
            console.error('Invalid timestamp provided:', embedConfig.timestamp);
        }
    }
    // Set other embed properties...
    // Add fields
    embedConfig.fields.forEach(field => {
        embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
    });

    return embed;
}

module.exports = { generateEmbedFromFile };