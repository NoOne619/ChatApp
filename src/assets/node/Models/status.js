const mongoose = require("../db/connection");
const schema = new mongoose.Schema({
    file: { type: String },
    sender: { type: String, required: true },
    
});

const Model = mongoose.model('statuses', schema);

module.exports = Model;
