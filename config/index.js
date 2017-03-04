

var env = process.env.NODE_ENV = 'production';
console.log("loading configuration for environment : " + env);

var config = require('./config.' + env);

module.exports = config;
