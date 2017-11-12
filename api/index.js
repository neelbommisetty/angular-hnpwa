const api = require('express').Router();
const bodyParser = require('body-parser');
const http = require('http');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Checking 1 2!' });
});

module.exports = api;

