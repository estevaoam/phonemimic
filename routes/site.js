/*
 * Routes
 */

module.exports = function(app) {
  var site = app.controllers.site;
  app.get('/', site.index);
  app.get('/client/:sid', site.client);
}
