const {Schema, model} = require("mongoose");

const schema = new Schema({
    Id: String,
    Settings: Object
})

const _model = model("Guilds", schema);
module.exports = _model;