const {Schema, model} = require("mongoose");

const schema = new Schema({
    Id: String,
    Settings: Object
})

const model = model(schema);
module.exports = model;