/** @format */

console.clear();

const Client = require("./Structures/Client.js");

const config = require("./Data/config.json");
require("dotenv").config();

const client = new Client();

client.start(config.token);
