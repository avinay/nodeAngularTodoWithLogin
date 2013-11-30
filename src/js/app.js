'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
        'ngRoute',
        'ngSanitize',
        'ngCookies'
    ]).
    config(['$routeProvider', '$locationProvider', '$httpProvider' , function($routeProvider, $locationProvider, $httpProvider) {

        var access = routingConfig.accessLevels;
        $routeProvider.when( '/', {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl',
            access: access.public
        });
        $routeProvider.when( '/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
            access: access.anon
        });
        $routeProvider.when( '/signup', {
            templateUrl: 'templates/signUp.html',
            controller: 'signUpCtrl',
            access: access.anon
        });
        $routeProvider.when( '/todos', {
            templateUrl: 'templates/todos.html',
            controller: 'todosCtrl',
            access: access.user
        });
        $routeProvider.when( '/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl',
            access: access.user
        });
        $routeProvider.otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);

        $httpProvider.responseInterceptors.push(['$location', '$q', function($location, $q) {

            function success(response) {
                return response;
            }

            function error(response) {
                if(response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }

            return function(promise) {
                return promise.then(success, error);
            }
        }]);

}]).run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn())
                    $location.path('/');
                else
                    $location.path('/login');
            }
        });

    }]);