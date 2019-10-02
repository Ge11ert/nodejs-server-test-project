const http = require('http');
const app = require('./app');
const config = require('./config');

// http server setup

const port = process.env.PORT || config.server.DEFAULT_PORT;
const host = process.env.HOST || config.server.DEFAULT_HOST;
const server = http.createServer(app);

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.warn(`Port ${port} already in use. Please, provide another.`);
    server.close();
  } else {
    console.warn(e);
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
