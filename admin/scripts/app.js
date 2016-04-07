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
        title: 'Auto Family Admin',
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
      .when('/users', {
        title: 'Users',
        templateUrl: 'views/users.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      })
      .when('/adduser', {
        title: 'Add User',
        templateUrl: '/common/views/forms/user_form.html',
        controller: 'UserCtrl',
        controllerAs: 'adduser'
      })
      .when('/cars', {
        title: 'Cars',
        templateUrl: 'views/cars.html',
        controller: 'CarManagerCtrl',
        controllerAs: 'cars'
      })
      .when('/addcar', {
        title: 'Add Car',
        templateUrl: 'views/forms/car_form.html',
        controller: 'CarManagerCtrl',
        controllerAs: 'addcar'
      })
      .when('/customers', {
        title: 'Customers',
        templateUrl: 'views/customers.html',
        controller: 'CustomerManagerCtrl',
        controllerAs: 'customers'
      })
      .when('/addcustomer', {
        title: 'Add Customer',
        templateUrl: 'views/forms/customer_form.html',
        controller: 'CustomerManagerCtrl',
        controllerAs: 'addcustomer'
      })
      .when('/suppliers', {
        title: 'Suppliers',
        templateUrl: 'views/suppliers.html',
        controller: 'SupplierManagerCtrl',
        controllerAs: 'suppliers'
      })
      .when('/addsupplier', {
        title: 'Add Supplier',
        templateUrl: 'views/forms/supplier_form.html',
        controller: 'SupplierManagerCtrl',
        controllerAs: 'addsupplier'
      })
      .when('/services', {
        title: 'Services',
        templateUrl: 'views/services.html',
        controller: 'ServicesManagerCtrl',
        controllerAs: 'services'
      })
      .when('/addservice', {
        title: 'Add Service',
        templateUrl: 'views/forms/form-service.html',
        controller: 'ServicesManagerCtrl',
        controllerAs: 'addservice'
      })
      .when('/offers', {
        title: 'Offers',
        templateUrl: 'views/offers.html',
        controller: 'SpecialOffersCtrl',
        controllerAs: 'offers'
      })
      .when('/offers/edit', {
        title: 'Edit Offer',
        templateUrl: 'views/forms/form-offer.html',
        controller: 'SpecialOffersCtrl',
        controllerAs: 'offersedit'
      })
      .when('/news', {
        title: 'News',
        templateUrl: 'views/articles.html',
        controller: 'NewsManagerCtrl',
        controllerAs: 'offers'
      })
      .when('/news/edit', {
        title: 'Edit Article',
        templateUrl: 'views/forms/form-article.html',
        controller: 'NewsManagerCtrl',
        controllerAs: 'offersedit'
      })
      .when('/events', {
        title: 'Events',
        templateUrl: 'views/events.html',
        controller: 'EventManagerCtrl',
        controllerAs: 'event'
      })
      .when('/events/edit', {
        title: 'Edit Event',
        templateUrl: 'views/forms/form-event.html',
        controller: 'EventManagerCtrl',
        controllerAs: 'event'
      })
      .when('/testdrives', {
        title: 'Test Drives',
        templateUrl: 'views/test-drives.html',
        controller: 'TestDriveCtrl',
        controllerAs: 'testdrive'
      })
      .when('/testdrives/edit', {
        title: 'Edit Test Drive',
        templateUrl: 'views/forms/form-test-drive.html',
        controller: 'TestDriveCtrl',
        controllerAs: 'testdrive'
      })
      .when('/reports', {
        title: 'Reports',
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl',
        controllerAs: 'reports'
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
