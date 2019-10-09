const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth-controller');

const app = express();
const jsonParser = bodyParser.json({ type: 'application/json' });

// logging setup
app.use(morgan('short'));

// handle json requests
app.use(jsonParser);

// handle route requests
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok', result: 'Hello, stranger.' });
});

app.post('/sign-up', authController.signUp);
app.post('/sign-in', authController.signIn);
app.delete('/logout', authController.logout);

module.exports = app;
