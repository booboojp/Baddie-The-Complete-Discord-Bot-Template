module.exports = {
    name: "messageReactionRemoveEmoji",
    execute(reaction) {
        console.log("messageReactionRemoveEmoji event fired", reaction);
    },
  };