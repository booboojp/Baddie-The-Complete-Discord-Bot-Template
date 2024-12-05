module.exports = {
    name: "threadCreate",
    execute(thread, newlyCreated) {
        console.log('threadCreate event fired', thread, newlyCreated);
    },
  };