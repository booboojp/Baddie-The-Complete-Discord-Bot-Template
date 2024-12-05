module.exports = {
    name: "threadMembersUpdate",
    execute(oldMembers, newMembers) {
        console.log('threadMembersUpdate event fired', oldMembers, newMembers);
    },
  };