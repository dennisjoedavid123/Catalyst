'use strict';

angular.module('mean.mean-admin').controller('ProductController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Products',
    function($scope, Global, Menus, $rootScope, $http, Products) {
        $scope.global = Global;
          $scope.productSchema = [{
            title: 'Brand/SKU Name',
            schemaKey: 'sku',
            type: 'text',
            inTable: true
        }, {
            title: 'Description',
            schemaKey: 'description',
            type: 'text',
            inTable: true
        // }, {
        //     title: 'Brand Image',
        //     schemaKey: 'brand_image',
        //     type: 'text',
        //     inTable: true
        
         }];
        $scope.product = {};

        $scope.init = function() {
            Products.query({}, function(products) {
                $scope.products = products;
            });
        };

        $scope.add = function() {
            console.log("Inside the add function");
            if (!$scope.products) $scope.products = [];
                   
            var product = new Products({
                sku: $scope.product.sku,
                description: $scope.product.description,
            });

            product.$save(function(response) {
                 $scope.products.push(response);
            });

            this.sku = this.description ='';
        };

        $scope.remove = function(product) {
           console.log('Inside the Remove function of Product.js');

            for (var i in $scope.products) {
                if ($scope.products[i] === product) {
                    $scope.products.splice(i, 1);
                }
            }
            console.log("the product is "+product);

            product.$remove();
        };

        $scope.update = function(product, productField) {
               product.$update();
        };

        $scope.beforeSelect = function(productField, product) {
            // if (productField === 'roles') {
            //     //user.tmpRoles = product.roles;
            // }
        };
    }
]);