'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
  favicon = require('serve-favicon'),
  express = require('express');

var SystemPackage = new Module('system');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
SystemPackage.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  SystemPackage.routes(app, auth, database);

  SystemPackage.aggregateAsset('css', 'common.css');
  SystemPackage.aggregateAsset('css','../lib/css/style.css');
  SystemPackage.aggregateAsset('css','../lib/css/style-responsive.css');
  SystemPackage.aggregateAsset('css','../lib/css/bootstrap-reset.css');
  SystemPackage.aggregateAsset('css', '../lib/font-awesome/css/font-awesome.css');
  SystemPackage.aggregateAsset('js', '../lib/js/jquery-ui/jquery-ui-1.10.1.custom.min.js');
  SystemPackage.aggregateAsset('js', '../lib/js/scripts.js');
  SystemPackage.aggregateAsset('js', '../lib/js/jquery.nicescroll.js');
  SystemPackage.aggregateAsset('js', '../lib/js/jquery.shuffle.min.js');
  SystemPackage.aggregateAsset('js', '../lib/js/people.js');


  // The middleware in config/express will run before this code

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));

  return SystemPackage;
});
