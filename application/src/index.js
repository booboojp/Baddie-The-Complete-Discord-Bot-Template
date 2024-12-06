const DiscordAPI = require('discord.js');
const configuration = require('./config.js');
const { loadEvents } = require('./handlers/eventHandler.js');
const { loadCommands } = require('./handlers/commandHandler.js');
const fileSystem = require('fs');
const path = require('path');

async function main() {
    const client = new DiscordAPI.Client({
        intents: [
            DiscordAPI.GatewayIntentBits.Guilds,
            DiscordAPI.GatewayIntentBits.GuildMembers,
            DiscordAPI.GatewayIntentBits.GuildMessages,
            DiscordAPI.GatewayIntentBits.MessageContent,
            DiscordAPI.GatewayIntentBits.GuildMessageReactions,
        ],
    });

    client.once('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);

        await loadEvents(client);
        await loadCommands(client);

        const reactionRolesPath = path.join(__dirname, '../src/data/reactionRoles');
        console.log(`Restoring reaction role data from ${reactionRolesPath}`);
        if (fileSystem.existsSync(reactionRolesPath)) {
            console.log('Restoring reaction role data');
            const reactionRoleFiles = fileSystem.readdirSync(reactionRolesPath).filter(file => file.endsWith('.json'));

            for (const file of reactionRoleFiles) {
                const data = JSON.parse(fileSystem.readFileSync(path.join(reactionRolesPath, file), 'utf8'));
                console.log(`Restoring reaction role data for message ${data.messageid}`);
                const channel = await client.channels.fetch(data.channelId);
                const message = await channel.messages.fetch(data.messageid);

                message.reactions.cache.each(reaction => {
                    reaction.users.fetch().then(users => {
                        users.each(user => {
                            if (!user.bot) {
                                const mapping = data.reactions.find(r => r.emoji === reaction.emoji.name || r.emoji === reaction.emoji.id);
                                if (mapping) {
                                    const role = channel.guild.roles.cache.get(mapping.roleId);
                                    if (role) {
                                        const member = channel.guild.members.cache.get(user.id);
                                        if (member && !member.roles.cache.has(role.id)) {
                                            member.roles.add(role).catch(console.error);
                                        }
                                    }
                                }
                            }
                        });
                    });
                });
            }
        }
    });

    await client.login(configuration.token);
}

main().catch(console.error);