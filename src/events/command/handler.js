const {Message} = require("discord.js");
const Event = require("../../models/Event");

const Config = require("../../../config/config.json");

const regex = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/gmi;

const Cooldown = new Map();
setInterval(() => {
    Cooldown.forEach((cd, key) => {
        if ((Date.now() - cd.lastUsage) > cd.cooldown) Cooldown.delete(key);
    });
}, 5000);

class CommandHandler extends Event {
    constructor(){
        super({
            event: "message"
        });
    }

    /**
     * @param {Message} message 
     */
    async execute(message){
        if(message.author.bot || !message.content.startsWith(Config.Client.Prefix)) return;

        let args = message.content.match(regex);
        let commandName = args[0] ? args[0].substr(Config.Client.Prefix.length) : undefined;
        if(!commandName) return;

        args = args.splice(1);
    
        let command = global.Commands.find(c => c.Commands.includes(commandName.toLocaleLowerCase()));
        if(!command) return;
    
        if(command.GuildOnly && !message.guild) return;
        if(command.Cooldown){
            let cooldown = command.Cooldown || 100;
            let cd = Cooldown.get(message.author.id) || [];
            if (cd.length > 0) {
                let element = cd.find(e => e.id == command.Id);
                if (element) {
                    let diff = (Date.now() - element.lastUsage);
                    if (diff < cooldown) return;
                    element.lastUsage = Date.now();
                }
            }
            cd.push({ id: command.Id, cooldown: cooldown, lastUsage: Date.now() });
            Cooldown.set(message.author.id, cd);    
        }
        command.execute(message, args);    
    }
}

module.exports = CommandHandler;