'use strict';

angular.module('mean.mean-admin').controller('SpecialityController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Speciality',
    function($scope, Global, Menus, $rootScope, $http, Speciality) {
        $scope.global = Global;
        $scope.specialitySchema = [{
        	title:'Speciality',
        	schemaKey:'speciality',
        	type:'text',
        	inTable:true
        },
        {
        	title:'Image',
        	schemaKey:'image',
        	type:'text',
        	inTable:true
        }];
        $scope.spec={};


        $scope.init=function(){
            console.log('Inside init method..');
        	Speciality.query({},function(speciality){
        		$scope.spec=speciality;
        	});
        }

        $scope.add=function(){
        	console.log('Inside add function'+$scope.spec.speciality);
        	if(!$scope.spec)$scope.spec=[];
        	var speciality=new Speciality({
                speciality:$scope.spec.speciality,
                image:$scope.spec.image,
                delFlag:1
            });
            speciality.$save(function(response){
                $scope.spec.push(response);
            });
            this.speciality=this.image='';
        }

        $scope.remove = function(speciality) {
           console.log('Inside the Remove function of speciality'+speciality);

            for (var i in $scope.spec) {
                if ($scope.spec[i] === speciality) {
                    $scope.spec.splice(i, 1);
                }
            }
            console.log("the speciality is "+speciality);
            $scope.dirtyObject = speciality;
            speciality.$remove();
        };

       
        $scope.update = function(speciality, specialityField) {
               speciality.$update();
        };

        
        $scope.beforeSelect = function(specialityField, speciality) {
            // if (productField === 'roles') {
            //     //user.tmpRoles = product.roles;
            // }
        };

	}]);