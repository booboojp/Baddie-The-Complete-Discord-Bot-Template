const fs = require('fs');
const path = require('path');
const DiscordAPI = require('discord.js');
async function generateEmbedFromFile(filename, data = {}) {
    const filePath = path.resolve(__dirname, '../', filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Embed configuration file not found: ${filePath}`);
    }

    let embedConfig = require(filePath);
    const embedString = JSON.stringify(embedConfig);
    const filledEmbedString = embedString.replace(/\$\{(\w+)\}/g, (_, key) => data[key] || '');


    embedConfig = JSON.parse(filledEmbedString);


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
    embedConfig.fields.forEach(field => {
        embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
    });

    return embed;
}

module.exports = { generateEmbedFromFile };