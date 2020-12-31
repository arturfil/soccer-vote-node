class Teams {
  constructor() {
    this.teams = [];
  }

  addTeam(team = new Team()) {
    this.teams.push(team);
  }

  getTeams() {
    return this.teams;
  }

  deleteTeam(id = '') {
    this.teams = this.teams.filter(team => team.id !== id);
    return this.teams;
  }

  voteTeam(id = '') {
    this.teams = this.teams.map(team => {
      if (team.id == id) {
        team.votes++;
        return team;
      } else {
        return team;
      }
    });
  }
}

module.exports = Teams;