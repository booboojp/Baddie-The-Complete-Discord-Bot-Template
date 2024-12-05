require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
module.exports = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
};
