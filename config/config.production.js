var config = require('./config.global');

config.env = "production";
config.port = 3000;
config.baseUrl = "https://something.com/";
config.mongo = {
  url: 'mongodb url here',
  host: 'host here',
  port: 1000000,
  name: 'name here',
  user: 'user here',
  password: 'mdr here'
};

module.exports = config;
