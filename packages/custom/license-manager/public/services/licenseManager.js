'use strict';

angular.module('mean.license-manager').factory('LicenseManagerFactory',function($http,$location){
    return {
        /*
        This is also a typically Util kind of API to check whether user is already registered with application, so that he will be able to
        proceed with License creation.
         */
        isUserExist: function (userData) {
            var returnData = {
                msg: '',
                status: false
            };
            $http.post('/licenseManager/isUserExist', {
                username: userData.userName
            }).success(function (data) {
                console.log('User object in isUserExist', data);
                if (data.Success) {
                    console.log('Empty');
                } else {
                    returnData.msg = 'User is available in the application';
                    returnData.status = true;
                }
            }).error(function (error) {
                returnData.msg = 'Error Occurred while checking user';
                returnData.status = false;
            });
            return returnData;
        },
        /*
         This is for GUI to populate the all the license type in UI component, it is directly take from model.
         */
        getAllLicenseType : function(){
            $http.get('/licenseManager/getAllLicenseTypes').success( function(licenseTypes){
                console.log('License Types in getAllLicenseTypes',licenseTypes);
                return licenseTypes;
            }).error(function(error){
                console.log('Error in getAllLicenseTypes',error);
                return null;
            });
        },
        /*
            This is typically a util API to get the manager reference id to populate the user license
         */
        getManagerLicenseId : function(userData){
            var returnData = {
                msg: 'Success',
                status: false,
                data : ''
            };
            $http.post('/licenseManager/getManagerLicense',{
                manager : userData.manager
            }).success( function (data){
                console.log('VEL ',data);
                returnData.data = data.manager_id;
                returnData.msg = 'Success';
                returnData.status = true;
            }).error( function(error){
                returnData.msg = 'Fail : Unable to get Manager License';
                returnData.status = true;
            });
            return returnData;
        },
        /*
         Creating the User License, it requires all the user details like username, mobileno, email
         Role, License Type, License validity details like start date and end date, also kind of authentication type, no of licenses
         required for user.
         */
        generateUserLicense :  function(userData){
            var returnData = {
              msg :'Success',
              status : false,
              response : null
            };
            $http.post('/licenseManager/createLicense',{
                username : userData.userName,
                mobileNo : userData.mobileNo,
                noOfLicense : userData.noOfLicense,
                email : userData.email,
                userRole : userData.userRole,
                licenseType : userData.licenseType,
                authenticattionType : userData.authenticationType,
                parentLicense : userData.parentId,
                licenseStatus : userData.licenseStatus
            }).success( function (response){
                // User is having valid license
                returnData.status = true;
                returnData.msg = 'Success';
                returnData.response = response;
            }).error( function(error){
                returnData.status = false;
                returnData.msg = 'Fail : Error while creating the User License';
            });
            return returnData;
        },
        /*
        On Successful creation of User license by providing the manager license, the no of License allocated to the manager will be
        reduced from manager account, this is typically a License allocation logic for the team manager to user.
         */
        updateManagerLicense : function(manager){
            var returnData = {
                msg :'Success',
                status : true
            };
            $http.post('/licenseManager/updateManagerLicense',
                {
                    username:manager
                }
            ).success(function(response){
                    console.log('Reduced');
            }).error(function (error){
                    console.log('Error while reducing');
                    returnData.status = false;
                    returnData.msg = 'Error while updating the Manager License reference';
            });
            return returnData;
        },
        /*
            Creating the License for either user or manager, it requires all the user details like username, mobileno, email
            Role, License Type, License validity details like start date and end date, also kind of authentication type, no of licenses
            required for user.
         */
        createLicense : function(userData){
            var returnData = {
                msg :'Success',
                status : false,
                response : null
            };
            $http.post('/licenseManager/createLicense',{
                username : userData.userName,
                mobileNo : userData.mobileNo,
                email : userData.email,
                userRole : userData.userRole,
                licenseType : userData.licenseType,
                startDate : userData.startDate,
                endDate : userData.endDate,
                authenticattionType : userData.authenticationType,
                licenseStatus : userData.licenseStatus,
                noOfLicense : userData.noOfLicense
            }).success( function (response){
                returnData.status = true;
                returnData.msg = 'Success';
                returnData.response = response;
            }).error( function(error){
                returnData.status = false;
                returnData.msg = 'Fail : Error while creating the User License';
            });
            return returnData;
        },
        /*
            This is for validating the User whether user is having valid license or not
         */
        validateUserLicense : function(userData){
            var returnData = {
                msg :'Success',
                status : false,
                response : null
            };
            $http.post('/licenseManager/validateLicense',{
                username : userData.userName,
                mobileNo : userData.mobileNo,
                email : userData.email,
                licenseType : userData.licenseType,
                startDate : userData.startDate,
                endDate : userData.endDate
            }).success( function (response){
                returnData.status = true;
                returnData.msg = 'Success';
                returnData.response = response;
            }).error( function(error){
                returnData.status = false;
                returnData.msg = 'Fail : Error while validating the User License';
            });
        },
        validateModuleLicense : function(userName,moduleName){
            var returnData = {
                msg :'Success',
                status : true,
                response : null
            };
            $http.post('/licenseManager/validateModuleLicense',{
                username : userName,
                modulename : moduleName
            }).success( function (response){
                returnData.status = true;
                returnData.msg = 'Success';
                returnData.response = response;
            }).error( function(error){
                returnData.status = false;
                returnData.msg = 'Fail : Error while validating the User License';
            });
            return returnData;
        }
    };
});

