const DoodleClient = require("../src/Structures/DoodleClient.js");
const config = require("./config.json");
const client = new DoodleClient(config);


client.start();


