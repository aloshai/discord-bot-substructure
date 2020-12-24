# discord-bot-substructure
It is an easy-to-use and well-organized infrastructure.

# How Can I Start the Bot?
First, make sure that `Node.js` is installed. If it is not installed, download it. [Node JS](https://nodejs.org/en/)

If you ready, now let's go step by steps:
* Download this project and install it in any location on your computer.
* Go inside the project and open the file `config/config.json` and adjust your settings. If you don't know how to set, check the [Bot Configuration](#-Bot-Configuration) section.
* Go to the project location and open a terminal.
  * If you cannot open it in the folder, open a normal terminal from your computer and type the command `cd path/to` in it.
* Type the command `npm start`, `node .` or `node index.js` into the terminal.
* Tada! Your bot is ready 🎉

# Bot Configuration
You can see the properties you can set in the bot here.

## Configuration (config.json)
You can make general settings for your bot here.

* `Prefix` specifies which prefix your commands can be used with.
* `Token` The token Discord has issued for your bot.
* `Options` Settings that can be given when creating the client. (https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)

```json
{
    "Prefix": "!",
    "Token": "BOT_TOKEN",
    "Options": {}
}
```


# Commands Information
It tells you how to do operations such as creating/changing/deleting commands.

## Params
* `commands` this field contains to command names for example; ["hello", "helloworld"] Usage: `!hello` or `!helloworld`
* `description` description for your command.
* `usage` usage for your command.
* `cooldown` how often the command will be used. (Milliseconds)
* `activity` command active or not
* `guildOnly` can the command be used only on the server

## Add New Command
First, create your file to a location such as `path/to/src/commands/yourDirName/yourCommandName.js` and copy the contents of any command or copy the code below and paste.
```js
const {Message, Client} = require("discord.js");
const Command = require("../../models/Command");

class CommandName extends Command{
    constructor(){
        super({
            commands: ["yourCommandNames"],
            description: "Example description",
            usage: "example usage",
            cooldown: 5000,
            guildOnly: true,
            activity: true
        });
    }

    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async execute(message, args){
        // your code here
    }
    /**
      * @param {Client} client 
      */
    onLoad(client){
      // The code to run when the command is first loaded is here
    }
}

module.exports = CommandName;
```
> `Important note:` Make sure that you always create a folder inside the `commnads` folder.

# Events Information
It tells you how to do operations such as creating/changing/deleting events.

## Params
* `event` this field is event name.

## Add New Event
First, create your file to a location such as `path/to/src/events/yourDirName/yourEventName.js` and copy the contents of any event or copy the code below and paste.
```js
const {Client} = require("discord.js");
const Event = require("../../models/Event");

class YourEventName extends Event {
    constructor(){
        super({
            event: "ready" // EVENT NAME
        });
    }

    // you specify the parameters yourself.
    // https://discord.js.org/#/docs/main/stable/class/Client > Events
    
    async execute(){
        console.log("Bot is ready!"); // code is here
    }
}

module.exports = YourEventName;
```
> `Important note:` Make sure that you always create a folder inside the `events` folder.
