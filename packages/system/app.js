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

  // CSS Includes
  SystemPackage.aggregateAsset('css', 'common.css');
  SystemPackage.aggregateAsset('css','../lib/css/style.css');
  SystemPackage.aggregateAsset('css','../lib/css/style-responsive.css');
  SystemPackage.aggregateAsset('css','../lib/css/bootstrap-reset.css');
  SystemPackage.aggregateAsset('css', '../lib/font-awesome/css/font-awesome.css');
  SystemPackage.aggregateAsset('css','../lib/js/jvector-map/jquery-jvectormap-1.2.2.css');
  SystemPackage.aggregateAsset('css','../lib/calendar/clndr.js');
  SystemPackage.aggregateAsset('css','../lib/js/css3clock/css/style.css');
  SystemPackage.aggregateAsset('css','../lib/js/morris-chart/morris.css');

   // JS Includes
  SystemPackage.aggregateAsset('js', '../lib/js/jquery-ui/jquery-ui-1.10.1.custom.min.js');
  SystemPackage.aggregateAsset('js','../lib/js/bs3/js/bootstrap.min.js');
  SystemPackage.aggregateAsset('js','../lib/js/jquery.dcjqaccordion.2.7.js');
  SystemPackage.aggregateAsset('js', '../lib/js/jquery.nicescroll.js');
  SystemPackage.aggregateAsset('js', '../lib/js/skycons/skycons.js');
  SystemPackage.aggregateAsset('js','../lib/js/jquery.scrollTo/jquery.scrollTo.js');
  SystemPackage.aggregateAsset('js','../lib/js/jquery.easing.min.js');
  SystemPackage.aggregateAsset('js','../lib/js/underscore-min.js');
  SystemPackage.aggregateAsset('js','../lib/js/calendar/clndr.js');

  SystemPackage.aggregateAsset('js','../lib/js/calendar/moment-2.2.1.js');

  SystemPackage.aggregateAsset('js','../lib/js/evnt.calendar.init.js');
  SystemPackage.aggregateAsset('js','../lib/js/jvector-map/jquery-jvectormap-1.2.2.min.js');
  SystemPackage.aggregateAsset('js','../lib/js/jvector-map/jquery-jvectormap-us-lcc-en.js');
  SystemPackage.aggregateAsset('js','../lib/js/gauge/gauge.js');

  SystemPackage.aggregateAsset('js','../lib/js/css3clock/js/css3clock.js');

  SystemPackage.aggregateAsset('js','../lib/js/easypiechart/jquery.easypiechart.js');
  SystemPackage.aggregateAsset('js','../lib/js/sparkline/jquery.sparkline.js');
  SystemPackage.aggregateAsset('js','../lib/js/morris-chart/morris.js');
  SystemPackage.aggregateAsset('js','../lib/js/morris-chart/raphael-min.js');

  // Till here -------------

  //SystemPackage.aggregateAsset('js', '../lib/js/jquery.shuffle.min.js');
  //
  //SystemPackage.aggregateAsset('js', '../lib/js/people.js');
  //
  //SystemPackage.aggregateAsset('js','../lib/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js');
  //
  //SystemPackage.aggregateAsset('js','../lib/js/jquery.scrollTo/jquery.scrollTo.js');




//  SystemPackage.aggregateAsset('js','../lib/js/morris-chart/raphael-min.js');


//  SystemPackage.aggregateAsset('js','../lib/js/dashboard.js');
//  SystemPackage.aggregateAsset('js','../lib/js/jquery.customSelect.min.js');


    // The middleware in config/express will run before this code

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));

  return SystemPackage;
});
