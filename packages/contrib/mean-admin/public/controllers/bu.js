'use strict';

angular.module('mean.mean-admin').controller('BUController',['$scope', 'Global', 'Menus', '$rootScope', '$http', 'BU',
	function($scope,Global,Menus,$rootScope,$http,BU){

		$scope.global=Global;
		
	}]);