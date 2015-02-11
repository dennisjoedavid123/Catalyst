//Products service used for products REST endpoint
angular.module('mean.mean-admin').factory("Products", ['$resource',
    function($resource) {
        return $resource('/admin/products/:productId', {
            productId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
