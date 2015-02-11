'use strict';

angular.module('mean.mean-admin').controller('SpecialityController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Speciality',
    function($scope, Global, Menus, $rootScope, $http, Speciality) {
        $scope.global = Global;
        $scope.specialitySchema = [{
        	name:'Rashmi Ranjan',
        	speciality:'Java'
        }];
	}]);