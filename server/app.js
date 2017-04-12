// server/app.js
const express = require('express'),
	morgan = require('morgan'),
	path = require('path'),
	bodyParser = require('body-parser'),
	routes = require('./routes/index'),
	redis = require("redis");

const app = express();
const redisClient = redis.createClient('port', 'url'),
	secret = "Secret Message";

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Serve Routes File
app.use('/', routes);

// Access request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

redisClient.on('connect', function() {
  console.log('Connected to Redis');
});

// Setup JWTRedis Session
app.use(JWTRedisSession({
  client: redisClient,
  secret: secret,
  keyspace: "sess:",
  maxAge: 86400,
  algorithm: "HS256",
  requestKey: "jwtSession",
  requestArg: "jwtToken"
}));

module.exports = app;