module.exports = {
    name: "roleUpdate",
    execute(oldRole, newRole) {
        console.log('roleUpdate event fired', oldRole, newRole);
    },
  };