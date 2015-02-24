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
	        }];

	        $scope.bu={};

	        $scope.init = function(){
	        	console.log('Inside BU init method..');
	        	BU.query({},function(bu){
	        		$scope.bu=bu;
	        	});
	        }

	        $scope.add = function(){
	        	console.log('Inside BU add function...');
	        	if(!$scope.bu)$scope.bu=[];

	        	var bu= new BU({
	        		buname : $scope.bu.buname,
	        		description :$scope.bu.description,
	        		delFlag : 1
	        	});
		        bu.$save(function(response){
	                $scope.bu.push(response);
	            });
	        	console.log('bu added='+bu);
	        	this.bname=this.description='';
	        }

	        $scope.remove = function(bu) {
	           console.log('Inside the Remove function of speciality'+bu);

	            for (var i in $scope.bu) {
	                if ($scope.bu[i] === bu) {
	                    $scope.bu.splice(i, 1);
	                }
	            }
	            console.log("the speciality is "+bu);
	            $scope.dirtyObject = bu;
	            bu.$remove();
        	};

       
	        $scope.update = function(bu, buField) {
	               bu.$update();
	        };
	}]);