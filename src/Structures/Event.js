/** @format */

const Discord = require("discord.js");

const Client = require("./Client.js");

/**
 *
 * @param {client} client
 * @param  {Discord.ClientEvents[k]} eventArgs
 */
function runFunction(client, ...eventArgs) {}

/**
 * @template
 */
class Event {
  /**
   *
   * @param {k} event
   * @param {RunFunction<k>} runFunction
   */
  constructor(event, runFunction) {
    this.event = event;
    this.run = runFunction;
  }
}

module.exports = Event;
