'use strict';

myApp.controller(
    'homeCtrl', ['$scope', 'my_services', '$rootScope' ,function($scope, my_services, $rootScope){
    console.log($rootScope)
    $scope.service = function(){
        return  my_services.myFirstService();
    };
    $scope.title = my_services.pages.home.title;
    $scope.content = my_services.pages.home.content;
}]);
