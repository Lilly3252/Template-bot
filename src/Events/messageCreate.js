const Event = require("../Structures/Event.js");
const db = require('quick.db')

module.exports = new Event("messageCreate", (client, message) => {
    if (message.author.bot) return;
 
    const prefix = "&" // <-- needed that because no db
    if (!message.content.startsWith(prefix)) return; // <-- needed that because no db
    //if (!message.content.startsWith(db.get('prefix'))) return; // <-- you can uncomment that when your db will work
    //const commandName = message.content.substring(db.get('prefix').length).split(/ +/); // <-- you can uncomment that when your db will work
    const commandName = message.content.substring(prefix.length).split(/ +/);
    const args = message.content.substring(client.prefix.length).split(/ +/).slice(1);
    const command = client.commands.find(cmd => cmd.name == commandName[0]);
    if (!command) return message.channel.send(`${commandName[0]} is not a valid command!`);



    const permission = message.member.permissions.has(command.permission, true);
    if (!permission) return message.channel.send(`You do not have the permission \`${command.permission}\` to run this command!`)

    command.run(message, args, client);
});

