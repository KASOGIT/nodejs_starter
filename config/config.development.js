var config = require('./config.global');

config.env = "development";
config.port = 3000;
config.baseUrl = "http://localhost:3000/";
config.mongo = {
  url: "mongodb://localhost:27017/name",
  host: 'localhost',
  port: 27017,
  name: 'name here'
};

module.exports = config;
