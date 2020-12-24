const {Message, Client} = require("discord.js");
const Command = require("../../models/Command");

class CommandHello extends Command{
    constructor(){
        super({
            commands: ["hello"],
            description: "Hello world!",
            usage: "hello",
            cooldown: 5000
        });
    }

    /**
     * @param {Message} message 
     * @param {Client} args 
     */
    async execute(message, args){
        message.reply(`hello world!`);
    }
}

module.exports = CommandHello;