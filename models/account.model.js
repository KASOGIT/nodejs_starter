
var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');
var config    = require('../config');

/*
ESTABLISH DATABASE CONNECTION
*/

var db = new MongoDB(config.mongo.name, new Server(config.mongo.host, config.mongo.port, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
  if (e) {
    console.log(e);
  } else {
    if (config.env == 'production') {
      db.authenticate(config.mongo.user, config.mongo.password, function(e, res) {
        if (e) {
          console.log('mongo :: error: not authenticated', e);
        }
        else {
          console.log('mongo :: authenticated and connected to database :: "'+config.mongo.name+'"');
        }
      });
    }	else{
      console.log('mongo :: connected to database :: "'+config.mongo.name+'"');
    }
  }
});

var accounts = db.collection('accounts');

exports.addNewAccount = function(newAccount, callback) {
  accounts.findOne({email:newAccount.email}, function(e, o) {
    if (o){
      callback('email-taken');
    }	else{
      saltAndHash(newAccount.password, function(hash){
        newAccount.password = hash;
        // append date stamp when record was created //
        newAccount.date = moment().format('MMMM Do YYYY, h:mm:ss a');
        accounts.insert(newAccount, {safe: true}, callback);
      });
    }
  });
}

exports.manualLogin = function(email, password, callback) {
	accounts.findOne({email:email}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			validatePassword(password, o.password, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

exports.autoLogin = function(email, pass, callback)
{
	accounts.findOne({email:email}, function(e, o) {
		if (o){
      console.log('find account autoLogin');
			o.password == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.getAccountByEmail = function(email, callback) {
	accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateAccount = function(email, passH, callback) {
  accounts.findOne({email:email}, function(error, account) {
    if (account == null) {
      callback('User not found');
    }
    else if (account.password == passH) {
      account.isValid = true;
      accounts.save(account, {safe: true}, callback);
    } else {
      callback('Wrong password');
    }
  });
}

exports.validateResetLink = function(email, passHash, callback) {
	accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.updatePassword = function(email, newPass, callback)
{
	accounts.findOne({email:email}, function(e, o){
		if (e){
			callback(e, null);
		}	else{
			saltAndHash(newPass, function(hash){
		        o.password = hash;
		        accounts.save(o, {safe: true}, callback);
			});
		}
	});
}

/* PRIVATE METHODS */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
	accounts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
