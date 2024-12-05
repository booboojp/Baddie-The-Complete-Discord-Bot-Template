module.exports = {
    name: "shardDisconnect",
    execute(event, id) {
        console.log('shardDisconnect event fired', event, id);
    },
  };