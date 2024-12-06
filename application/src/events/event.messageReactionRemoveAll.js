const fileSystem = require('fs');
const path = require('path');

module.exports = {
    name: 'messageReactionRemoveAll',
    async execute(message) {
        const messageId = message.id;
        const dataPath = path.join(__dirname, '../data/reactionRoles', `${messageId}.json`);

        if (!fileSystem.existsSync(dataPath)) return;

        const data = JSON.parse(fileSystem.readFileSync(dataPath, 'utf8'));

        const guild = message.guild;

        const roleIds = data.reactions.map(r => r.roleId);
        const roles = roleIds.map(id => guild.roles.cache.get(id)).filter(role => role);

        if (roles.length === 0) return;

        const members = await guild.members.fetch();

        for (const member of members.values()) {
            for (const role of roles) {
                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role);
                }
            }
        }
    }
};