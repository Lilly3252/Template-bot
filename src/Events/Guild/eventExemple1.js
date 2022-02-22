const Event = require("../../Structures/Event.js");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false,
    });
  }
  run(param1, param2) {
    
  }
};
