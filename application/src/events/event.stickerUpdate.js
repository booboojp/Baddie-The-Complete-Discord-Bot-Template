module.exports = {
    name: "stickerUpdate",
    execute(oldSticker, newSticker) {
        console.log('stickerUpdate event fired', oldSticker, newSticker);
    },
  };