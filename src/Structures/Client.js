const Discord = require("discord.js");

const intents = new Discord.Intents(32767); // <-- dont use all intents 

const fs = require("fs"); // <-- fs is already installed with node.js , dont need to install it , keep it like that

const config = require("../Data/config.json");

const Command = require("./Command.js");

const Event = require("./Event.js");

const Util = require("./Util.js");

class Client extends Discord.Client {
  constructor() {
    super({ intents });

    /**
     * @type {Discord.Collection<string, Command>}
     */
    this.commands = new Discord.Collection();

    this.utils = new Util(this);

    this.prefix = config.prefix;
  }

  start(token) {
    fs.readdirSync("./src/Commands") // <-- maybe the path will be wrong for you
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        /**
         * @type {Command}
         */
        const command = require(`../Commands/${file}`);
        console.log(`Command ${command.name} loaded`);
        this.commands.set(command.name, command);
      });

    fs.readdirSync("./src/Events")// <-- maybe the path will be wrong for you
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        /**
         * @type {Event}
         */
        const event = require(`../Events/${file}`);
        console.log(`Event ${event.event} loaded`);
        this.on(event.event, event.run.bind(null, this));
      });
    this.login(token);
  }
}

module.exports = Client;
