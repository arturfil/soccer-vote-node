const {v4 :uuidV4} = require('uuid');

class Team {
  constructor(name = 'no-name') {
    this.id = uuidV4(); // unique indentifier
    this.name = name;
    this.votes = 0;
  }
}

module.exports = Team;