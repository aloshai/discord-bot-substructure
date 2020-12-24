const Config = require("../config/config.json");
const client = global.Client;

client.login(Config.Token).catch(console.error);