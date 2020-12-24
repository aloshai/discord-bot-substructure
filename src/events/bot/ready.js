const {Client} = require("discord.js");
const Event = require("../../models/Event");

class OnReady extends Event {
    constructor(){
        super({
            event: "ready"
        });
    }

    async execute(){
        console.log("Bot is ready!");
    }
}

module.exports = OnReady;