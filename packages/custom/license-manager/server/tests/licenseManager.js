'use strict';
/*jshint -W079 */
var crypto = require('crypto');
var request = require('supertest'),
    express = require('express');
var app = express();
/**
 * Create a random hex string of specific length and
 * @todo consider taking out to a common unit testing javascript helper
 * @return string
 */
function getRandomString(len) {
    if (!len)
        len = 16;

    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}
var expect = require('expect.js'),
    mongoose = require('mongoose'),
    logger = require('../utils/logger.js'),
    licenseManager = require('../controllers/licenseManager'),
    License = mongoose.model('License');
/**
 * Globals
 */
var licensedUser, authenticatedUser,authorizedUser;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
    describe('Model User:', function() {

        before(function(done) {
            licensedUser = {
                email: 'test' + getRandomString() + '@test.com',
                username: getRandomString(),
                mobileno : 'local',
                licenseType : 'User',
                userrole : '',
                startDate : '',
                endData : '',
                authenticationType : '',
                modules : ['',''],
                licenseStatus : '',
                noOfLicense : '10',
                licenseAccess : '',
                parentLicense : 'fadsfqefrfddvffv'
            };

            authenticatedUser = {
                email: 'akvels@gmail.com',
                username: 'velanvel',
                mobileno : '1234567890',
                licenseType : 'User',
                userrole : 'authenticated',
                startDate : '1/1/1111',
                endData : '2/2/2222',
                authenticationType : 'EMAIL',
                modules : ['users','mean-admin'],
                licenseStatus : 'ACTIVE',
                noOfLicense : '1',
                licenseAccess : 'Test',
                parentLicense : '0'
            };

            authorizedUser = {
                email: 'akvels_test@gmail.com',
                username: 'velmurugan_test',
                mobileNo : '1234567890',
                licenseType : 'User',
                userrole : 'authorized',
                startDate : '1/1/1111',
                endData : '2/2/2222',
                authenticationType : 'EMAIL',
                modules : ['users','mean-admin','license-manager'],
                licenseStatus : 'ACTIVE',
                noOfLicense : '10',
                licenseAccess : 'Test',
                licenseKey : 'ABCD-EFGH-IJKL-MNOP-QRST-UVWXYZ'
            };

            done();
        });
        describe.skip('Method create Authorized User License',function(){
           it('should be creating the Authorized User License Entry in License Model',function(done){
              logger.utLogger.debug('Test Authorized User ',authorizedUser);
              var userLicense  = new License(authorizedUser);
               userLicense.save(function (err){
                  if(err){
                    logger.utLogger.debug('Error while saving the authorized user ',err);
                  }
               });
               logger.utLogger.debug('Finding the User ',authorizedUser.username);
               License.find({
                   username : authorizedUser.username
               },function (err,license){
                   if(err){
                       logger.utLogger.debug('Error while Finding the authenticated user ',err);
                   }else{
                       logger.utLogger.debug('authorizedUser',license);
                       expect(license.length).to.equal(1);
                   }
               });
               done();
           });
        });
        describe.skip('Method create Authenticated User License ',function(){
           it('should be creating the Authenticated User Entry in License Model ',function(){
                var userLicense = new License(authenticatedUser);
               userLicense.save(function(err){
                   if(err){
                    logger.utLogger.debug('Error while creating the authenticated user ',err);
                   }
                });
               License.find({
                   username : authenticatedUser.username
               },function (err,license){
                  if(err){
                      logger.utLogger.debug('Error while Finding the authenticated user ',err);
                  }else{
                      logger.utLogger.debug('authenticatedUser',license);
                      expect(license.length).to.equal(1);
                  }
               });
           });
        });
        describe.skip('Method populate parentLicense for User License from Manager License ',function(){
           it('should find the Authorized user for the given authenticated User ', function(done){
              logger.utLogger.debug('Executing the Method populate parentLicense for User License from Manager License');
              License.find({
                      username : authorizedUser.username
                  }, function(err,license){
                    if(err){
                        logger.utLogger.debug(err);
                    }else{
                        logger.utLogger.debug(license);
                        logger.utLogger.debug('authorizedUser',license);
                        if(license){
                            logger.utLogger.debug('Parent Id ',license[0]._id);
                            authenticatedUser.parentLicense = license[0]._id;
                            logger.utLogger.debug('Authenticated User ',authenticatedUser);
                            expect(license.length).to.equal(1);
                        }
                    }
                  });
           });
        });

        describe.skip('Method to validate Module license for the user',function(){
           it('should validate the module license for the user ', function (done) {
               var isLicensed = licenseManager.validateModuleLicense_1(authorizedUser.username,authorizedUser.modules[0]);
               expect(isLicensed).to.equal(true);
           });
        });

        describe('Method to validate API license for the user',function(){
            it('should validate the module license for the user ', function (done) {
                request(app)
                    .post('/licenseManager/validateAPILicense')
                    .set('Accept', 'application/json')
                    .send({url : 'http://localhost:3000'})
                    .expect('Content-Type', 'json')
                    .expect(200)
                    .end(function(err, res){
                        if (err) {
                            return done(err);
                        }else{
                            console.log(res);
                        }
                        done();
                    });
            });
        });
        describe.skip('Method Get one fine Licensed User ', function() {
            it('should begin without the test user', function(done) {
                License.find({
                 email: licensedUser.email
                 }, function(err, license) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(license);
                    }
                 expect(license.length).to.equal(0);
                    done();
                });
            });
        });

        after(function(done) {

            /** Clean up user objects
             * un-necessary as they are cleaned up in each test but kept here
             * for educational purposes
             *
             *  var _user1 = new User(user1);
             *  var _user2 = new User(user2);
             *
             *  _user1.remove();
             *  _user2.remove();
             */

            done();
        });
    });
});