module.exports = {
    name: "messageReactionAdd",
    execute(messageReaction, user) {
        console.log('messageReactionAdd event fired', messageReaction, user);
    },
};