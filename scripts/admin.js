'use strict';

/**
 * @ngdoc overview
 * @name familyCarsApp
 * @description
 * # familyCarsApp
 *
 * Main module of the application.
 */
angular
  .module('familyCarsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      })
      .when('/adduser', {
        templateUrl: '/views/user_form.html',
        controller: 'UserCtrl',
        controllerAs: 'adduser'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
