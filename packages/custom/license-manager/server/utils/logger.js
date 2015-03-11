
'use strict';
var log4js = require('log4js');
log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('myLog.log'), 'test');
log4js.addAppender(log4js.appenders.file('license-manager_UT.log'), 'UT');
var logger = log4js.getLogger('test');
var utLogger = log4js.getLogger('UT');
logger.setLevel('DEBUG');
utLogger.setLevel('DEBUG');

var getLogger = function() {
    return logger;
};
var getUTLogger = function(){
  return utLogger;
};
exports.utLogger = getUTLogger();
exports.logger = getLogger();