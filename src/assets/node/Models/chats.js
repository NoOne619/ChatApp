const mongoose = require("../db/connection");
const schema = new mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    date: { type: Date },
    filebool: { type: Boolean, default: false } // Default value set to false
});

const Model = mongoose.model('chats', schema);

module.exports = Model;
