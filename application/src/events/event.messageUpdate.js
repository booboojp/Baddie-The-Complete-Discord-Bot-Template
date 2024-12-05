module.exports = {
    name: "messageUpdate",
    execute(oldMessage, newMessage) {
        console.log('messageUpdate event fired', oldMessage, newMessage);
    },
  };