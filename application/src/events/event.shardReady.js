module.exports = {
    name: "shardReady",
    execute(id, unavailableGuilds) {
        console.log('shardReady event fired', id, unavailableGuilds);
    },
  };