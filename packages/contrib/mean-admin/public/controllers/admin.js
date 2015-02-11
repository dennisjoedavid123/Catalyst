'use strict';

angular.module('mean.mean-admin').controller('AdminController', ['$scope', 'Global', 'Menus', '$rootScope',
    function($scope, Global, Menus, $rootScope) {
        $scope.global = Global;
        $scope.menus = {};
        $scope.overIcon = false;

        var icons = 'mean-admin/assets/img/icons/';
        
        // Default hard coded menu items for main menu


        var defaultAdminMenu = [{
            'roles': ['admin'],
            'title': 'DASHBOARD',
            'link': 'dashboard',
            'icon': 'fa fa-dashboard'
        },
            {
                'roles': ['admin'],
                'title': 'SETTINGS',
                'link': 'settings',
                'icon': 'fa fa-gears'
            }
        ];

        var manageAdminMenu = [ {
            'roles': ['admin'],
            'title': 'THEMES',
            'link': 'themes',
            'icon': 'fa fa-flag'
        }, {
            'roles': ['admin'],
            'title': 'USERS',
            'link': 'users',
            'icon': 'fa fa-users'
        },{
            'roles': ['admin'],
            'title': 'PRODUCTS',
            'link': 'products',
            'icon': 'fa fa-flask'
        },{
            'roles': ['admin'],
            'title': 'SPECIALITY',
            'link': 'speciality',
            'icon': 'fa fa-flask'
        },{
            'roles': ['admin'],
            'title': 'BU',
            'link': 'bu',
            'icon': 'fa fa-flask'
        }
        ];


        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('defaultadmin', defaultAdminMenu);
        queryMenu('manageadmin', manageAdminMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('admin', defaultAdminMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });
    }
]);
