'user strict';
const Hapi = require('hapi');
const mongoose = require('mongoose');

const server = new Hapi.Server({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true
  }
});

server.app.db = mongoose.connect('mongodb://localhost/hapitest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const init = async () => {
  await server
    .register(
      {
        plugin: require('./routes/tasks')
      },
      {
        routes: {
          prefix: '/api'
        }
      }
    )
    .catch(err => {
      console.log(err);
    });
  await server.start();
  console.log(`Server running at : ${server.info.uri}`);
};
init();
