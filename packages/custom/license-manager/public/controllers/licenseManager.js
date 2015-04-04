'use strict';


angular.module('mean.license-manager').controller('LicenseManagerController', ['$scope','$http','$location','LicenseManagerFactory',
  function LicenseManagerController($scope,$http,$location,LicenseManagerFactory) {
      $scope.package = {
          name: 'license-manager'
      };
      // list of licenses
      $scope.licenses =  {};



      $scope.handleUserMessage = function () {
          $scope.usernameError = '';

      };
      $scope.isUserExist = function () {
          console.log('User Exist check for User ', $scope.user.userName);
          var data = LicenseManagerFactory.isUserExist($scope.user);
          console.log('Return data for isUserExist ', data);
          if (data && data.status) {
              $scope.usernameError = '';
          } else {
              $scope.usernameError = 'User is not availble in tha application, please signup before creating application';
          }
      };
      $scope.getAllLicenseTypes = function () {
          console.log('get All License Types ');
          LicenseManagerFactory.getAllLicenseType();
      };
      $scope.roleSelected = null;
      /*$scope.onLicenseTypeChange = function(item){
       if(item === 'Team Manager'){
       console.log('User Role is Team manager');
       }else{
       $scope.noOfLicense = 1;
       }
       };*/
      $scope.status = {
          isopen: false
      };


      $scope.toggled = function (open) {
          //$log.log('Dropdown is now: ', open);
          console.log('Dropdown is now: ', open);
      };

      $scope.toggleDropdown = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.userRole.isopen = !$scope.userRole.isopen;
      };
      $scope.onUserRoleChange = function () {

      };
      $scope.getUserRole = function () {

      };
      $scope.manager_id = '';

      $scope.getManagerLicenseId = function () {
          var response = LicenseManagerFactory.getManagerLicenseId($scope.user);
          if (response.status) {
              $scope.manager_id = response.data;
          } else {
              $scope.error = response.msg;
          }
      };
      $scope.generateUserLicense = function () {
          //this.getManagerLicenseId($scope);
          console.log('VEL Manager ID ', $scope.manager_id);
          var data = LicenseManagerFactory.generateUserLicense();
          if (data.status) {
              var response = data.response;
              var manager = $scope.user.manager;
              console.log('Manager Name ', manager);
              LicenseManagerFactory.updateManagerLicense(manager);
              $scope.loginError = 0;
              if (response.redirect) {
                  if (window.location.href === response.redirect) {
                      //This is so an admin user will get full admin page
                      window.location.reload();
                  } else {
                      window.location = response.redirect;
                  }
              } else {
                  $location.url('/');
              }
          } else {
              $scope.error = data.msg;
          }


      };
      $scope.createLicense = function () {
          $scope.user.startDate = '11/11/1111';
          $scope.user.endDate = '11/11/2222';
          $scope.user.modules = [
              {
                moduleName : 'mean-admin',
                listOfAPIs : [
                    {
                        apiName : 'getUsers',
                        apiURL : '/license-manager/getUsers'
                    },
                    {
                        apiNaame : 'updateUser',
                        apiURL  : '/license-manager/getUsers'
                    }
                ],
                moduleDesc : 'Mean Admin Module'
              },
              {
                  moduleName : 'mili-app',
                  listOfAPIs : [
                      {
                          apiName : 'getData',
                          apiURL : '/mili-app/getData'
                      },
                      {
                          apiNaame : 'updateData',
                          apiURL  : '/mili-app/updateData'
                      }
                  ],
                  moduleDesc : 'MEAN Mili App'
              }
          ];
          $scope.user.licenseType = 'API';
          $scope.user.noOfLicense = '10';
          console.log($scope.user);
          var data = LicenseManagerFactory.createLicense($scope.user);
          if (data.status) {
              var response = data.response;
              if (response.redirect) {
                  if (window.location.href === response.redirect) {
                      window.location.reload();
                  } else {
                      window.location = response.redirect;
                  }
              } else {
                  $location.url('/');
              }
          } else {
              $scope.error = data.msg;
          }
      };
      $scope.clear = function () {
          $scope.dt = null;
      };
      $scope.listOfLicense = LicenseManagerFactory.getAllLicenseType();
      //$scope.roleList = ['User','Team Manager','SalesMan','SalesManager'];
      // Disable weekend selection
      $scope.disabled = function (date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function () {
          $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
      };

      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];


      $scope.validateUserLicense = function () {
          console.log($scope.user);
          var data = LicenseManagerFactory.validateUserLicense($scope.user);
          if (data.status) {
              var response = data.response;
              if (response.redirect) {
                  if (window.location.href === response.redirect) {
                      window.location.reload();
                  } else {
                      window.location = response.redirect;
                  }
              } else {
                  $location.url('/');
              }
          } else {
              $scope.error = data.msg;
          }
      };
      $scope.validateModuleLicense = function () {
          var  userName = $scope.user.userName;
          var moduleName = 'vel-test';
          console.log('In validateModuleLicense User Name = ' + userName + ' Module Name ' + moduleName);
          var data = LicenseManagerFactory.validateModuleLicense(userName, moduleName);
          console.log('License validation Result ' + data);
      };

      $scope.getSuperAdminUser = function(){

      };

      $scope.getAllUserLicenses = function(){
          console.log('VEL User',$scope);
      };
  }
]);
