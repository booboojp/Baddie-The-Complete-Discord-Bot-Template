module.exports = {
    name: "threadMemberUpdate",
    execute(oldMember, newMember) {
        console.log('threadMemberUpdate event fired', oldMember, newMember);  
    },
  };