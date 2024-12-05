module.exports = {
    name: "shardError",
    execute(error, shardId) {
        console.log('shardError event fired', error, shardId);
    },
  };