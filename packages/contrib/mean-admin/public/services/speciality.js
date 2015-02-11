angular.module('mean.mean-admin').factory("Speciality", ['$resource',
    function($resource) {
        return $resource('/admin/speciality/:specialityId', {
            specialityId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);