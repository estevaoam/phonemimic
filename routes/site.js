/*
 * Routes
 */

module.exports = function(app) {
  var site = app.controllers.site;
  app.get('/', site.server);
  app.get('/client/:sid', site.client);
}
