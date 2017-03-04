var validator = require('validator');

exports.middlewareAuth = function(req, res, next) {
  // check is auth
  console.log('middlewareAuth');
  if (req.session.user == null) {
    res.redirect('/');
  } else {
    next();
  }
}

exports.isValidLogin = function(body) {
  console.log(body);
  if (body == undefined) {
    return (false);
  }
  if (body['email'] == undefined || !validator.isEmail(body['email'])) {
    return (false);
  } else if (body['password'] == undefined) {
    return (false);
  }
  return (true);
}

exports.isValidSignup = function(body) {
  console.log(body);
  if (body == undefined) {
    return (false);
  } else if (body['email'] == undefined || !validator.isEmail(body['email'])) {
    return (false);
  } else if (body['password1'] == undefined || body['password2'] == undefined || body['password1'] != body['password2']) {
    return (false);
  } else if (body['firstName'] == undefined || body['lastName'] == undefined || body['firstName'].length < 1 || body['lastName'].length < 1) {
    return (false);
  }
  return (true);
}
