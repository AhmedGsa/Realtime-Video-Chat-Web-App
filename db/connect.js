const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async (url) => {
    await mongoose.connect(url);
}

module.exports = connectDB;