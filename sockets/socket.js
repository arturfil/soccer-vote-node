const {io} = require('../index');
const Teams = require('../models/teams');
const Team = require('../models/team');

const teams = new Teams();

teams.addTeam(new Team('Napoli'))
teams.addTeam(new Team('Borussia Dortmund'))
teams.addTeam(new Team('Lile'))
teams.addTeam(new Team('RB Leipzig'))

console.log(teams);

io.on('connection', client => {
  console.log('Client is connected');

  client.emit('active-teams', teams.getTeams()); 

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });
  
  client.on('message', payload => {
    console.log('message!!!', payload);

    io.emit('message', {amdin: 'Hello everyone'});
  });

  client.on('emit-message', (payload) => {
    io.emit('receive-message', payload);
  });

  client.on('listen-message', (payload) => {
    // console.log('receieved', payload);
    client.broadcast.emit('new-message', payload);
  })   

  client.on('vote-team', (payload) => {
    teams.voteTeam(payload.id);
    io.emit('active-teams', teams.getTeams());
  })

  client.on('add-team', (payload) => {
    const newTeam = new Team(payload.name);
    teams.addTeam(newTeam);
    io.emit('active-teams', teams.getTeams())
  })

  client.on('delete-team', (payload) => {
    teams.deleteTeam(payload.id);
    io.emit('active-teams', teams.getTeams());
  })
})
