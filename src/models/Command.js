const {Message, Client} = require("discord.js");

class Command {
    /**
     * @type {Array<String>} Command names
     */
    Commands = [];
    /**
     * @type {String} Command description
     */
    Description = "";
    /**
     * @type {String} Command usage
     */
    Usage = "";
    /**
     * @type {Boolean} Command activity
     */
    Activity = false;
    /**
     * @type {Boolean} Should the command be used only on the server?
     */
    GuildOnly = false;
    /**
     * @type {Number} Reuse interval
     */
    Cooldown = undefined;

    /**
     * 
     * @param {{commands: Array<String>, description: String, usage: String, activity: Boolean, guildOnly: Boolean, cooldown: Number, id: Number}} param0 
     */
    constructor({commands, description, usage, activity = true, guildOnly = true, cooldown, id}){
        this.Commands = commands;
        this.Description = description;
        this.Usage = usage;
        this.Activity = activity;
        this.GuildOnly = guildOnly;
        this.Cooldown = cooldown;
        this.Id = id;
    }
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async execute(message, args){}
    /**
     * @param {Client} client 
     */
    async onLoad(client){}
}

module.exports = Command;