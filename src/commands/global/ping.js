const {Message, Client} = require("discord.js");
const Command = require("../../models/Command");

class CommandPing extends Command{
    constructor(){
        super({
            commands: ["ping"],
            description: "Ping! Pong!",
            usage: "ping",
            cooldown: 5000
        });
    }

    /**
     * @param {Message} message 
     * @param {Client} args 
     */
    async execute(message, args){
        message.reply(`pong!`);
    }
}

module.exports = CommandPing;