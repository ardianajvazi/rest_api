const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');
var port = 3000;

const sharksRouter = require(__dirname + '/routes/sharks_routes');
const peopleRouter = require(__dirname + '/routes/people_routes');
const authRouter = require(__dirname + '/routes/auth_routes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', sharksRouter);
app.use('/api', peopleRouter);
app.use('/api', authRouter);

module.exports.server = app.listen(port, () => console.log('Server running ' + port));//eslint-disable-line
