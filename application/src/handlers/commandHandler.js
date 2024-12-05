const fileSystem = require('fs');
const path = require('path');

async function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fileSystem.readdirSync(commandsPath).filter(file => file.match(/^command\.[a-zA-Z]+\.js$/));

    client.commands = new Map();

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (command.data) {
            client.commands.set(command.data.name, command);
        }
    }
}
module.exports = { loadCommands };