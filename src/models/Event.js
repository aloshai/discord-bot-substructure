const {Client} = require("discord.js");

class Event {
    constructor({event}){
        this.Event = event;
    }
    /**
     * The function to run when the event happens.
     * @param  {...any} args Parameters when the event occurs
     */
    async execute(...args){}
    /**
     * Remember, this function happens before the event is loaded.
     * @param {Client} client 
     */
    async onLoad(client){}
}

module.exports = Event;