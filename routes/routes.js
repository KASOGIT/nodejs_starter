
module.exports = function(app) {

  app.use('/', require('./index'));
  app.use('/', require('./auth'));

}
