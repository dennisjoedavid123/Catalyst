
'use strict';

/* *
 * Module dependencies.*/


var mongoose  = require('mongoose'),
    licenseEnumSchema    = mongoose.Schema;


var licenseEnum = new licenseEnumSchema({
    licenseType: {
        type : Array
    },
    authenticationTypes :{
        type : Array
    },
    licenseStatus : {
        type : Array
    },
    userRoles : {
        type : Array
    }
});
mongoose.model('LicenseEnum', licenseEnum);
