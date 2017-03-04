var express = require('express');
var router = express.Router();

var authController = require('./auth.controller');
var authUtils = require('./auth.utils');

// get pages auth
router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'login' });
});
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { title: 'signup' });
});
router.get('/validate-account', authController.validateAccount);
router.get('/reset-password', authController.getResetPassword);

// post auth : public
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/lost-password', authController.lostPassword);
router.post('/reset-password', authController.resetPassword);

// post auth : private
router.post('/logout', authUtils.middlewareAuth, authController.logout);

module.exports = router;
