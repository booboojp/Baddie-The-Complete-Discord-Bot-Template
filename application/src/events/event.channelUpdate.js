module.exports = {
    name: "channelUpdate",
    execute(oldChannel, newChannel) {
      console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
    },
  };