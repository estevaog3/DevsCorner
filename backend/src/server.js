const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-19xdg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
{ useNewUrlParser: true,
  useUnifiedTopology: true,
 });

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);