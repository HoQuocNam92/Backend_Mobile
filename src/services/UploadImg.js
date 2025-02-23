const ModelsImg = require('../models/Image');
const saveImageToDB = async (title, url) => {
    try {
        const image = new ModelsImg({ title, url });
        await image.save();
    } catch (error) {
        console.error('Error saving image to DB:', error);
    }
};
module.exports = saveImageToDB;
