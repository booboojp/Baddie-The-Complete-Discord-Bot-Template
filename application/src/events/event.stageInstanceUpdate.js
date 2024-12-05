module.exports = {
    name: "stageInstanceUpdate",
    execute(oldStageInstance, newStageInstance) {
        console.log('stageInstanceUpdate event fired', oldStageInstance, newStageInstance);
        
    },
  };