module.exports = {
    name: "shardResume",
    execute(id, replayedEvents) {
        console.log('shardResume event fired', id, replayedEvents);
    },
  };