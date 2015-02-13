'use strict';

angular.module('mean.mean-admin').controller('BUController',['$scope', 'Global', 'Menus', '$rootScope', '$http', 'BU',
	function($scope,Global,Menus,$rootScope,$http,BU){

		$scope.global=Global;
		$scope.buSchema=[
			{
	        	title:'BU Name',
	        	schemaKey:'buname',
	        	type:'text',
	        	inTable:true
	        },
	        {
	        	title:'BU Description',
	        	schemaKey:'description',
	        	type:'text',
	        	inTable:true
	        }
        ];
	}]);