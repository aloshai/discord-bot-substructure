const Config = require("./config/config.json");
const {Client} = require("discord.js");
const fs = require("fs");

console.clear();
console.log("Bot is starting...");

const client = global.Client = new Client(Config.Client.Options);

const Commands = global.Commands = new Array();
console.log("Loading commands...");

let commandId = 0;

let dirNames = fs.readdirSync("./src/commands", "utf-8");
dirNames.forEach(dirName => {
    let dirPath = `./src/commands/${dirName}`;
    if(!fs.lstatSync(dirPath).isDirectory()) return;

    let fileNames = fs.readdirSync(dirPath).filter(fileName => fileName.endsWith(".js"));

    fileNames.forEach(fileName => {
        let path = `./src/commands/${dirName}/${fileName}`;
        let ref = require(path);
        let commandModel = new ref();
        if(commandModel.execute && typeof(commandModel.execute) == "function" || !commandModel.Activity) {
            commandModel.Id = commandId;
            commandId += 1;
            if(commandModel.onLoad) commandModel.onLoad(client);
            Commands.push(commandModel);
            console.log(`[ COMMAND LOADED ] from ${path} file is loaded.`);
        }
        else console.error(`[ COMMAND NOT LOADED ] from ${path} file was not an example of the command structure.`);
    });
});

console.log("Loading events...");

dirNames = fs.readdirSync("./src/events", "utf-8");
dirNames.forEach(dirName => {
    let dirPath = `./src/events/${dirName}`;
    if(!fs.lstatSync(dirPath).isDirectory()) return;

    let fileNames = fs.readdirSync(dirPath).filter(fileName => fileName.endsWith(".js"));
    fileNames.forEach(fileName => {
        let path = `./src/events/${dirName}/${fileName}`;
        let ref = require(path);
        let eventModel = new ref();
        if(eventModel.execute && typeof(eventModel.execute) == "function") {
            if(eventModel.onLoad) eventModel.onLoad(client);
            client.on(eventModel.Event, eventModel.execute);
            console.log(`[ EVENT LOADED ] from ${path} file is loaded.`);
        }
        else console.error(`[ EVENT NOT LOADED ] from ${path} file was not an example of the command structure.`);
    });
});

console.log("Connecting to database...");
const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
    console.error("MongoDB Error", err);
});
mongoose.connection.on("connected", () => {
    require("./src/client");
});

mongoose.connect(Config.Database.Connection, {useNewUrlParser: true, useUnifiedTopology: true});