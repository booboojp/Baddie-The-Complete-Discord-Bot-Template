module.exports = {
    name: "userUpdate",
    execute(oldUser, newUser) {
        console.log("userUpdate event fired", oldUser, newUser);
    },
  };