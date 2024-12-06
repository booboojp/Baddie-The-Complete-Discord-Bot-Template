const fileSystem = require('fs');
const path = require('path');

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        if (user.bot) return;

        const messageId = reaction.message.id;
        const dataPath = path.join(__dirname, '../data/reactionRoles', `${messageId}.json`);

        if (!fileSystem.existsSync(dataPath)) return;

        const data = JSON.parse(fileSystem.readFileSync(dataPath, 'utf8'));

        const mapping = data.reactions.find(r => r.emoji === reaction.emoji.name || r.emoji === reaction.emoji.id);

        if (!mapping) return;

        const guild = reaction.message.guild;
        const role = guild.roles.cache.get(mapping.roleId);

        if (!role) return;

        const member = await guild.members.fetch(user.id);
        await member.roles.remove(role);
    }
};