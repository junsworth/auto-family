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
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
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
      .when('/user', {
        templateUrl: '/common/views/forms/user_form.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/cars', {
        templateUrl: '/common/views/cars.html',
        controller: 'CarCtrl',
        controllerAs: 'cars'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.interceptors.push(function($q, $injector) {
      return {
        responseError: function(rejection) {
          $injector.invoke(function($uibModal) {
            $uibModal.open({
              templateUrl: '/common/views/dialogs/error-dialog.html',
              controller: 'ErrorDialogController',
              resolve: {
                error: function() {
                  return rejection.data;
                }
              }
            });
          });
          return $q.reject(rejection);
        }
      };
    });

  });
