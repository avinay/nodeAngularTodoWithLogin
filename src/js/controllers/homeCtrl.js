'use strict';

myApp.controller(
    'homeCtrl', ['$scope', 'my_services' ,function($scope, my_services){
    $scope.service = function(){
        return  my_services.myFirstService();
    };
    $scope.title = my_services.pages.home.title;
    $scope.content = my_services.pages.home.content;
}]);
