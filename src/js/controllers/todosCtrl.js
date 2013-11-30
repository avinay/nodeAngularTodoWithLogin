'use strict';

myApp.controller('todosCtrl', function($scope, my_services){
    $scope.title = my_services.pages.message.title;
    $scope.content = my_services.pages.message.content;
});