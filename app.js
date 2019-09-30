const http = require('http');
const express = require('express');

const app = express();

// http server setup

const port = process.env.PORT || 3090;
const host = process.env.HOST || '0.0.0.0';
const server = http.createServer(app);

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.warn(`Port ${port} already in use. Please, provide another.`);
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
