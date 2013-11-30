'use strict';

myApp.controller('signUpCtrl', function($scope, $location){
    $scope.goToLogin = function(){
        $location.path('/login');
    }
});

