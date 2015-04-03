angular.module('mean.mean-admin').factory("BU", ['$resource',
    function($resource) {
        return $resource('/admin/bu/:buId', {
            buId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);