const Event = require("../Structures/Event.js");// <-- maybe the path will be wrong for you

const db = require("quick.db");

module.exports = new Event("ready", client => {
    console.log("Bot is online!")

    client.user.setPresence({
        status: "online",
        activities: [{
            name: 'Victory Road ' +
             `[${db.get('prefix')}]`,
            type: "WATCHING"
        }]
    })
})