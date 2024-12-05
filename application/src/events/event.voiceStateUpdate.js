module.exports = {
    name: "voiceStateUpdate",
    execute(oldMember, newMember) {
        console.log('voiceStateUpdate event fired', oldMember, newMember);
    },
  };