module.exports = {
    name: "messageReactionRemove",
    execute(messageReaction, user) {
        console.log('messageReactionRemove event fired', messageReaction, user);
    },
  };