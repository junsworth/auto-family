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
        title: 'Auto Family',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        title: 'About',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        title: 'Contact',
        templateUrl: '/common/views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/settings', {
        title: 'Settings',
        templateUrl: '/common/views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/user', {
        title: 'Registration',
        templateUrl: '/common/views/forms/user_form.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/cars', {
        title: 'Cars',
        templateUrl: '/common/views/cars.html',
        controller: 'CarCtrl',
        controllerAs: 'cars'
      })
      .when('/cars/search', {
        title: 'Car Search',
        templateUrl: '/common/views/cars.html',
        controller: 'CarCtrl',
        controllerAs: 'cars'
      })
      .when('/cars/detail', {
        title: 'Car Detail',
        templateUrl: '/common/views/car-detail.html',
        controller: 'CarDetailCtrl',
        controllerAs: 'cars'
      })
      .when('/services', {
        title: 'Services',
        templateUrl: 'views/services.html',
        controller: 'ServicesCtrl',
        controllerAs: 'services'
      })
      .when('/offers', {
        title: 'Offer',
        templateUrl: 'views/offers.html',
        controller: 'OffersCtrl',
        controllerAs: 'offers'
      })
      .when('/news', {
        title: 'News',
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl',
        controllerAs: 'news'
      })
      .when('/events', {
        title: 'Events',
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events'
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

  }).run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
