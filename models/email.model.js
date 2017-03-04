var config = require('../config');

var server = require("emailjs/email").server.connect({
  host 	    : 'smtp.gmail.com',
  user 	    : 'email@gmail.com',
  password  : 'password',
  port      : 587,
  tls       : true
});

exports.sendEmailAccountValidation = function(account, callback) {
  server.send({
    from         : 'email <do-not-reply@gmail.com>',
    to           : account.email,
    subject      : 'subject here',
    text         : 'Problème survenu',
    attachment   : composeCreateAccountEmail(account)
  }, callback);
}

var composeCreateAccountEmail = function(account) {
  var link = config.baseUrl+'validate-account?email='+account.email+'&password='+account.password;
  var html = "<html><body>";
  html += "Bonjour "+account.firstName+",<br><br>";
  html += "<a href='"+link+"'>Cliquez ici pour confirmer la création de votre compte sur site.fr</a><br><br>";
  html += "</body></html>";
  return  [{data:html, alternative:true}];
}

exports.sendResetPasswordLink = function(account, callback) {
  server.send({
    from         : 'email <do-not-reply@gmail.com>',
    to           : account.email,
    subject      : 'changement de mot de passe sur site',
    text         : 'Problème survenu',
    attachment   : composeResetPasswordEmail(account)
  }, callback);
}

var composeResetPasswordEmail = function(account) {
  var link = config.baseUrl+'reset-password?email='+account.email+'&password='+account.password;
  var html = "<html><body>";
  html += "Bonjour "+account.firstName+",<br><br>";
  html += "<a href='"+link+"'>Cliquez ici pour changer votre mot de passe sur site.fr</a><br><br>";
  html += "</body></html>";
  return  [{data:html, alternative:true}];
}
