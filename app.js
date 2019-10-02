const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json({ type: 'application/json' });

// logging setup
app.use(morgan('short'));

// handle json requests
app.use(jsonParser);

module.exports = app;
