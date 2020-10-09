const {io} = require('../index');

io.on('connection', client => {
  console.log('Client is connected');
  client.on('disconnect', () => {
    console.log('Client disconnected');
  })
  client.on('message', payload => {
    console.log('message!!!', payload);

    io.emit('message', {amdin: 'Hello everyone'});
  })
})