'use strict';

myApp.controller('profileCtrl', function($scope, my_services){
    $scope.title = my_services.pages.friends.title;
    $scope.content = my_services.pages.friends.content;
});

