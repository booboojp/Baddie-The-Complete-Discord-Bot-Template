module.exports = {
    name: "presenceUpdate",
    execute(oldMember, newMember) {
        console.log('presenceUpdate event fired', oldMember, newMember);
    },
  };