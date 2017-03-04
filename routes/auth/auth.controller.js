var AM = require('../../models/account.model');
var EM = require('../../models/email.model');
var authUtils = require('./auth.utils');

exports.login = function(req, res) {
  // process login here
  if (!authUtils.isValidLogin(req.body)) {
    res.status(400).send('bad-req-args')
  } else {
    AM.manualLogin(req.body['email'], req.body['password'], function(e, o){
      if (!o){
        res.status(400).send('wrong-cred');
      }	else{
        if (!o.isValid) {
          res.status(400).send('not-valid-account');
        } else {
          req.session.user = o;
          console.log(req.body);
          if (req.body['remember-me'] == 'on'){
            res.cookie('email', o.email, { maxAge: 900000 });
            res.cookie('password', o.password, { maxAge: 900000 });
          }
          res.status(200).send('ok');
        }
      }
    });
  }
}

exports.signup = function(req, res) {
  // process signup here
  if (!authUtils.isValidSignup(req.body)) {
    console.log('NOT VALID SIGNUP');
    res.redirect('/signup');
  } else {
    AM.addNewAccount({
      firstName: req.body['firstName'],
      lastName: req.body['lastName'],
      email: req.body['email'],
      password: req.body['password1'],
      isValid: false
    }, function(e) {
      if (e) {
        console.log('ERROR ADD NEW ACCOUNT');
        res.status(400).send(e);
      } else {
        AM.getAccountByEmail(req.body['email'], function(account) {
          EM.sendEmailAccountValidation(account, function(error, message) {
            if (error) {
              console.log('email not working');
              console.log(error);
            }
            res.status(200).send('ok');
          });
        });
      }
    });
  }
}

exports.autoLogin = function(req, res) {
  // check if the user's credentials are saved in a cookie //
  if (req.session.user != null) {
    res.render('index', { connected: true, user: req.session.user });
  }
  else if (req.cookies.email != undefined && req.cookies.password != undefined){
    AM.autoLogin(req.cookies.email, req.cookies.password, function(o){
      if (o != null){
        req.session.user = o;
        res.render('index', { connected: true, user: req.session.user });
      }	else{
        res.render('index', { connected: false });
      }
    });
  }	else{
    res.render('index', { connected: false });
    // attempt automatic login //
  }
}

exports.logout = function(req, res) {
  // process logout here
  console.log('here logout');
  res.clearCookie('email');
  res.clearCookie('password');
  req.session.destroy(function(e){
    res.status(200).send('ok');
  });
}

exports.validateAccount = function(req, res) {
  var email = req.query['email'];
  var passH = req.query['password'];
  if (email == undefined || passH == undefined) {
    res.redirect('/');
  } else {
    AM.validateAccount(email, passH, function(e) {
      if (!e) {
        console.log('Account is now valid');
      }
      res.redirect('/login');
    });
  }
}

exports.lostPassword = function(req, res) {
  // look up the user's account via their email //
  AM.getAccountByEmail(req.body['email'], function(o){
    if (o){
      EM.sendResetPasswordLink(o, function(e, m){
        // this callback takes a moment to return //
        // TODO add an ajax loader to give user feedback //
        if (!e){
          console.log('email send');
          res.status(200).send('ok');
        }	else{
          for (k in e) console.log('ERROR : ', k, e[k]);
          res.status(400).send('unable to dispatch password reset');
        }
      });
    }	else{
      res.status(400).send('email-not-found');
    }
  });
}

exports.getResetPassword = function(req, res) {
  var email = req.query["email"];
  var passH = req.query["password"];
  AM.validateResetLink(email, passH, function(e){
    if (e != 'ok'){
      res.redirect('/');
    } else{
      // save the user's email in a session instead of sending to the client //
      req.session.reset = { email:email, passHash:passH };
      res.render('auth/reset-password');
    }
  });
}

exports.resetPassword = function(req, res) {
  var nPass1 = req.body['password1'];
  var nPass2 = req.body['password2'];
  if (nPass1 != nPass2) {
    res.status(400).send('password does not match');
    return ;
  }
  // retrieve the user's email from the session to lookup their account and reset password //
  var email = req.session.reset.email;
  // destory the session immediately after retrieving the stored email //
  req.session.destroy();
  AM.updatePassword(email, nPass1, function(e, o){
    if (o){
      res.status(200).send('ok');
    }	else{
      res.status(400).send('unable to update password');
    }
  })
}
