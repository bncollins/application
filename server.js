/*
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 80;

const server = http.createServer(app);

//app.get('/', (req, res) => res.send(console.log('Hello World!')))

server.listen(port);
*/

const express = require('express');
const path = require('path');
const app = require("./app");

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 80;

app.listen(port);

