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
    'ui.bootstrap',
    'ngFileUpload'
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
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      })
      .when('/adduser', {
        templateUrl: '/common/views/forms/user_form.html',
        controller: 'UserCtrl',
        controllerAs: 'adduser'
      })
      .when('/cars', {
        templateUrl: 'views/cars.html',
        controller: 'CarManagerCtrl',
        controllerAs: 'cars'
      })
      .when('/addcar', {
        templateUrl: 'views/forms/car_form.html',
        controller: 'CarManagerCtrl',
        controllerAs: 'addcar'
      })
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomerManagerCtrl',
        controllerAs: 'customers'
      })
      .when('/addcustomer', {
        templateUrl: 'views/forms/customer_form.html',
        controller: 'CustomerManagerCtrl',
        controllerAs: 'addcustomer'
      })
      .when('/suppliers', {
        templateUrl: 'views/suppliers.html',
        controller: 'SupplierManagerCtrl',
        controllerAs: 'suppliers'
      })
      .when('/addsupplier', {
        templateUrl: 'views/forms/supplier_form.html',
        controller: 'SupplierManagerCtrl',
        controllerAs: 'addsupplier'
      })
      .when('/services', {
        templateUrl: 'views/services.html',
        controller: 'ServicesManagerCtrl',
        controllerAs: 'services'
      })
      .when('/addservice', {
        templateUrl: 'views/forms/form-service.html',
        controller: 'ServicesManagerCtrl',
        controllerAs: 'addservice'
      })
      .when('/offers', {
        templateUrl: 'views/offers.html',
        controller: 'SpecialOffersCtrl',
        controllerAs: 'offers'
      })
      .when('/offers/edit', {
        templateUrl: 'views/forms/form-offer.html',
        controller: 'SpecialOffersCtrl',
        controllerAs: 'offersedit'
      })
      .when('/news', {
        templateUrl: 'views/articles.html',
        controller: 'NewsManagerCtrl',
        controllerAs: 'offers'
      })
      .when('/news/edit', {
        templateUrl: 'views/forms/form-article.html',
        controller: 'NewsManagerCtrl',
        controllerAs: 'offersedit'
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
