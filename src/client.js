const {Client} = require("discord.js");
const Config = require("../config/config.json");
/**
  * @type {Client} client
  */
const client = global.Client;

client.login(Config.Client.Token).catch(console.error);
