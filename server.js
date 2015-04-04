'use strict';

// Requires meanio
var mean = require('meanio');

// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    var port = config.https && config.https.port ? config.https.port : config.http.port;
    console.log('Mean app started on port ' + port + ' (' + process.env.NODE_ENV + ')');
});

