'use strict';

myApp.controller('signUpCtrl', ['$rootScope','$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth){
    $scope.goToLogin = function(){
        $location.path('/login');
    };
    $scope.register = function() {
        Auth.register({
                firstName: $scope.first_name,
                lastName: $scope.last_name,
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                role: { bitMask: 2, title: 'user'}
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to register";
            });
    };
}]);

