var express = require('express');
var router = express.Router();

var authController = require('../auth/auth.controller');

/* GET home page. */
router.get('/', authController.autoLogin);

module.exports = router;
