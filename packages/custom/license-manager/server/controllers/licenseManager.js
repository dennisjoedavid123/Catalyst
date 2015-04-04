'use strict';

var mongoose = require('mongoose'),
    License = mongoose.model('License'),
    User = mongoose.model('User'),
    logger = require('../utils/logger.js'),
    LicenseEnum =  mongoose.model('LicenseEnum'),
    CryptoJS = require('crypto-js');



/**
 * Create License
 */
exports.create = function(req, res, next) {
    console.log(req.body);
    //var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

    console.log('VEL Encryption');
    var json_string = JSON.stringify(req.body);
    console.log('JSON String',json_string);
    //*** encrypt *//*
    //var json = CryptoJS.AES.encrypt(json_string, 'MILI', options);
    var encrypted = CryptoJS.AES.encrypt(json_string, 'MILI');
    //var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
    //var ciphertext = json.ciphertext.toString(CryptoJS.enc.Base64);
    //console.log(ciphertext.toString());
    //req.assert('req.body.email', 'You must enter a valid email address').isEmail();
    console.log(encrypted.toString());
    var licesenDetails = {
        username : req.body.username,
        mobileNo : req.body.mobileNo,
        email : req.body.email,
        licenseType : req.body.licenseType,
        authenticationType : 'EMAIL',
        licenseStatus : 'ACTIVE',
        userrole : req.body.userRole,
        noOfLicense : req.body.noOfLicense,
        parentLicense : req.body.parentLicense,
        modules : req.body.modules,
        licenseKey:encrypted.toString()
    };
    /** decrypt */
    var license = new License(licesenDetails);

    license.save(function(err){
        if(err){
            console.log(err);
            console.log('Error while updating the license');
        }else{
            console.log('Successfully created the License');
        }
    });
};
exports.createLicenseEnums = function(){

};
exports.getAllLicenseTypes = function (reg,res){
    LicenseEnum.find().exec(function(err,licenseEnum){
        logger.logger.debug('License Types = ',licenseEnum[0].licenseType);

        if(!licenseEnum){
            var licenseEnums = {
                licenseType : ['User','Module','Volume','Free','Evaluation','API','OpenSource'],
                authenticationTypes : ['EMAIL','MOBILE','MODULE'],
                licenseStatus : ['ACTIVE','AVAILABLE','EXPIRED'],
                userRoles : ['User','Team Manager','SalesMan','SalesManager']
            };
            var saveEnum = new LicenseEnum(licenseEnums);
            saveEnum.save(function(err,enums){
                if(err){
                    logger.logger.debug('Error while saving the licenseEnum',err);
                }else{
                    logger.logger.debug('Successfully saved license Enums',enums);
                }
            });
        }
        res.status(200).json({
           data: licenseEnum[0].licenseType,
           status : true
        });
        if(err){
            logger.logger.trace('Error while querying the LicenseType ',err);
            res.status(400).json({
                msg: 'Error while querying the License Types',
                status : false
            });
        }
    });
};

exports.getManagerLicenseId = function(req,res){

    var manager = req.body.manager;
    console.log('manager in getManagerLicenseId ',manager);
    License
        .findOne({
            username: manager
        })
        .exec(function(err,license) {
            console.log(license);
            if (err) {
                console.log('Error while getting the User', err);
                res.status(400).json({
                    msg : 'Failed'
                });
            }else if(!license) {
                console.log('User name is not available');
                res.status(400).json({
                    msg : 'Failed'
                });
            }else{
                if(license.username === manager) {
                    console.log('User name matches');
                    console.log('Manager ID = ',license._id);
                    res.status(200).json({
                        manager_id : license._id
                    });
                }else{
                    console.log('Error while getting the manager');
                    res.status(400).json({
                        msg : 'Failed'
                    });
                }
            }
        });
};

exports.updateManagerLicense = function (req,res){
    console.log('UpdateManager License',req.body.username);
    var username = req.body.username;
    License
        .findOne({
            username: username
        })
        .exec(function(err,license) {
            console.log('Manager License ',license);
            if (err) {
                console.log('Error while getting the User', err);
                res.status(400).json({
                    msg : 'Failed'
                });
            }else if(!license) {
                console.log('User name is not available');
                res.status(400).json({
                    msg : 'Failed'
                });
            }else{
                if(license.username === username) {
                    console.log('User name matches in Updating Manager License');
                    var licenseCount = license.noOfLicense;
                    console.log('Existing License count',licenseCount);
                    licenseCount = licenseCount-1;
                    license.noOfLicense = licenseCount;
                    console.log('New License count',licenseCount);
                    license.save();
                    res.status(200);
                }else{
                    res.status(400).json({
                        msg : 'Failed'
                    });
                }
            }
        });
};
exports.isUserExist = function (req,res){
  //console.log('Server : isUserExits',req);
    var log = logger.logger;
    log.debug(req.body.username);
    var username = req.body.username;
    User
        .findOne({
            username: username
        })
        .exec(function(err,user) {
            log.debug(user);
            if (err) {
                //log.debug('Error while getting the User', err);
                res.status(400);
            }else if(!user) {
                log.debug('User name is not available');
                res.status(200).json({
                    Error: 'User name is not available'
                });
            }else{
                if(user.username === username) {
                    log.debug('User name matches');
                    res.status(200).json({
                        Success: 'User name is available'
                    });
                }else{
                        res.status(200).json({
                            Error: 'User name is not available'
                        });
                    }
                }
        });
};

/**
 * validate license by licenseKey
 */
exports.validateLicense = function(req, res) {
    console.log(req.body);
    var username = req.body.username;
    // var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

    /*var userDetails = {
     username : req.body.username,
     mobileNo : req.body.mobileNo,
     email : req.body.email,
     licenseType : req.body.licenseType,
     startDate : req.body.startDate,
     endDate : req.body.endDate
     };*/
    License
        .findOne({
            username: username
        })
        .exec(function(err, license) {
            console.log(err);
            console.log('VEL License',license);
            var licenseKey = license.licenseKey;
            var decrypted = CryptoJS.AES.decrypt(licenseKey, 'MILI');
            var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
            console.log('VEL DECRYPTED',plaintext);
            var org_json = JSON.parse(plaintext);
            console.log(org_json);
        });

};

/**
 * validate license by licenseKey
 */
exports.validateLicense = function(req, res) {
    console.log(req.body);
    var username = req.body.username;
   // var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

    /*var userDetails = {
     username : req.body.username,
     mobileNo : req.body.mobileNo,
     email : req.body.email,
     licenseType : req.body.licenseType,
     startDate : req.body.startDate,
     endDate : req.body.endDate
     };*/
    License
        .findOne({
            username: username
        })
        .exec(function(err, license) {
            console.log(err);
            console.log('VEL License',license);
            var licenseKey = license.licenseKey;
             var decrypted = CryptoJS.AES.decrypt(licenseKey, 'MILI');
             var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
             console.log('VEL DECRYPTED',plaintext);
             var org_json = JSON.parse(plaintext);
             console.log(org_json);
        });

};

exports.validateModuleLicense_1 =  function(username,modulename){
    //logger.logger.debug('UserName in validateModuleLicense'+req.body.username);
    //logger.logger.debug('Module Name in validateModuleLicense'+req.body.modulename);
    logger.logger.debug('UserName in validateModuleLicense'+username);
    logger.logger.debug('Module Name in validateModuleLicense'+username);
    License.findOne({
        username:username
    }).exec(function(err,license){
        if(!license){
            return 'false';
        }

       if(err){
            logger.logger.error('Error Occured while getting the License '+err);
            return {isLicensed : 'false'};
        }else{
            logger.logger.debug('License Object in validateModuleLicense'+license);
            if(license){
                var licensedModules = license.modules;
                logger.logger.debug('Array of Licensed modules '+licensedModules);
                var isLicesned = false;
                for(var i=0 ; i<licensedModules.length;i=i+1){
                    logger.logger.debug('Module Name '+licensedModules[i]);
                    if(modulename === licensedModules[i]){
                        isLicesned = true;
                    }
                }
                if(isLicesned){
                    return {isLicensed : 'true'};
                }else{
                    return {isLicensed : 'false'};
                }
            }
        }
    });

};

exports.validateModuleLicense =  function(req,res){
    logger.logger.debug('UserName in validateModuleLicense'+req.body.username);
    logger.logger.debug('Module Name in validateModuleLicense'+req.body.modulename);
    var username = req.body.username;
    var modulename = req.body.modulename;
    License.findOne({
        username:username
    }).exec(function(err,license){
        if(!license){
            res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
            });
        }
       if(err){
           logger.logger.error('Error Occured while getting the License '+err);
           res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
           });
       }else{
           logger.logger.debug('License Object in validateModuleLicense'+license);
           if(license){
               var licensedModules = license.modules;
               logger.logger.debug('Array of Licensed modules '+licensedModules);
               var isLicesned = false;
               for(var i=0 ; i<licensedModules.length;i=i+1){
                   logger.logger.debug('Module Name '+licensedModules[i]);
                   if(modulename === licensedModules[i]){
                       isLicesned = true;
                   }
               }
               if(isLicesned){
                   res.status(200).json({
                       msg : 'This module is Licensed for this User',
                       status : true
                   });
               }else{
                   res.status(400).json({
                       msg : 'This module is not Licensed for this User',
                       status : false
                   });
               }
           }
       }
    });
};


exports.validateAPILicenseByUserName =  function(req,res){
    var username = req.body.username;
    var modulename = req.body.modulename;
    var apiName = req.body.apiName;
    logger.logger.debug('UserName in validateModuleLicense'+username);
    logger.logger.debug('Module Name in validateModuleLicense'+modulename);
    logger.logger.debug('Module Name in validateModuleLicense'+apiName);
    License.findOne({
        username:username
    }).exec(function(err,license){
        if(!license){
            res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
            });
        }
        if(err){
            logger.logger.error('Error Occured while getting the License '+err);
            res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
            });
        }else{
            logger.logger.debug('License Object in validateModuleLicense'+license);
            if(license){
                var licensedModules = license.modules;
                logger.logger.debug('Array of Licensed modules '+licensedModules);
                var isLicesned = false;
                for(var i=0 ; i<licensedModules.length;i=i+1){
                    logger.logger.debug('Module Name '+licensedModules[i]);

                    if(modulename === licensedModules[i]){
                        var listOfAPIs =  licensedModules[i].listOfAPIs;
                        if(listOfAPIs){
                            for(var j=0;j<listOfAPIs.length;j=j+1){
                                if(apiName === listOfAPIs[j].apiName){
                                    isLicesned = true;
                                }
                            }
                        }
                    }
                }
                if(isLicesned){
                    res.status(200).json({
                        msg : 'This API is Licensed for this User',
                        status : true
                    });
                }else{
                    res.status(400).json({
                        msg : 'This API is not Licensed for this User',
                        status : false
                    });
                }
            }
        }
    });

};
exports.validateAPILicense =  function(req,res){
    logger.logger.debug('License key in validateAPILicense'+req.body.licenseKey);
    logger.logger.debug('API Name in validateAPILicense'+req.body.apiName);
    logger.logger.debug('Module Name in validateAPILicense'+req.body.moduleName);
    var licenseKey = req.body.licenseKey;
    var apiName = req.body.apiName;
    var moduleName = req.body.moduleName;

    License.findOne({
        licenseKey:licenseKey
    }).exec(function(err,license){
        if(!license){
            res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
            });
        }
        if(err){
            logger.logger.error('Error Occured while getting the License '+err);
            res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
            });
        }else{
            logger.logger.debug('License Object in validateModuleLicense'+license);
            if(license){
                var licensedModules = license.modules;
                logger.logger.debug('Array of Licensed modules '+licensedModules);
                var isLicesned = false;
                for(var i=0 ; i<licensedModules.length;i=i+1){
                    logger.logger.debug('Module Name '+licensedModules[i]);
                    if(moduleName === licensedModules[i]){
                        var listOfAPIs =  licensedModules[i].listOfAPIs;
                        if(listOfAPIs){
                            for(var j=0;j<listOfAPIs.length;j=j+1){
                                if(apiName === listOfAPIs[j].apiName){
                                    isLicesned = true;
                                }
                            }
                        }
                    }
                }
                if(isLicesned){
                    res.status(200).json({
                        msg : 'This module is Licensed for this User',
                        status : true
                    });
                }else{
                    res.status(400).json({
                        msg : 'This module is not Licensed for this User',
                        status : false
                    });
                }
            }
        }
    });

};
exports.getSuperAdminUser =  function(req,res){
   License.findOne({
        companyId :'0',
        userrole : 'Super-Admin'
    }).exec(function(err,license){
        if(!license){
            res.status(400).json({
                msg : 'Not able to find the License for this Super Admin',
                status : false
            });
        }

        if(err){
            logger.logger.error('Error Occured while getting Super Admin User '+err);
            res.status(400).json({
                msg : 'Not able to check the License for this Module',
                status : false
            });
        }else{
            logger.logger.debug('License Object of Super Admin'+license);
            if(license){
                res.status(200).json({
                    msg : 'This module is Licensed for this User',
                    status : true,
                    data : license
                });

            }
        }
    });
};