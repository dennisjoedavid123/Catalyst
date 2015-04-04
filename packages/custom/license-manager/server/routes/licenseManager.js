'use strict';

// User routes use users controller
var licenseManager = require('../controllers/licenseManager'),
    config = require('meanio').loadConfig();

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(LicenseManager, app, auth, database) {

  app.get('/licenseManager/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });
  app.route('/licenseManager/createLicense').post(licenseManager.create);
  app.route('/licenseManager/validateLicense').post(licenseManager.validateLicense);

  app.route('/licenseManager/getAllLicenseTypes').get(licenseManager.getAllLicenseTypes);
  app.route('/licenseManager/isUserExist').post(licenseManager.isUserExist);
  app.route('/licenseManager/updateManagerLicense').post(licenseManager.updateManagerLicense);
  app.route('/licenseManager/getManagerLicense').post(licenseManager.getManagerLicenseId);
    app.route('/licenseManager/validateModuleLicense').post(licenseManager.validateModuleLicense);
    app.route('/licenseManager/validateAPILicense').post(licenseManager.validateAPILicense);
    app.route('/licenseManager/validateAPILicenseByUserName').post(licenseManager.validateAPILicenseByUserName);
    app.route('/licenseManager/getSuperAdminUser').post(licenseManager.getSuperAdminUser);
  app.get('/licenseManager/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/licenseManager/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            res.send(200);
        }else {
            next();
        }
     });
    app.options('*', function(req, res){
        res.send(200);
    });

  app.get('/licenseManager/example/render', function(req, res, next) {
    LicenseManager.render('index', {
      package: 'license-manager'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
