'use strict';

myApp.controller('navCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.isActive = function(route) {
        return route === $location.path();
    };
    $scope.goToLogin = function(){
        $location.path('/login');
    };
    $scope.LogOut = function(){
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    }
}]);
