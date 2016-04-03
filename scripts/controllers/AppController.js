'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('AppCtrl', function ($scope, $rootScope, $location, request, UserType) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    setMenu();
    $scope.UserType = UserType;

    $scope.logout = function() {
    request.post('/auth/logout').then(function() {
      $rootScope.principal = null;
      $scope.user = null;
      $location.path('#/');
    });
  };
    
    function setMenu() {

      console.log('$rootScope.principal ' + JSON.stringify($rootScope.principal));

      console.log('$rootScope.principal.UserTypeId - ' + $rootScope.principal.UserTypeId);

      console.log('UserType.Admin - ' + UserType.Admin);

      if($rootScope.principal.UserTypeId == UserType.Admin) {

        $scope.menuItems = [ {
          url: '#users',
          name: 'Users'
        }, {
          url: '#customers',
          name: 'Customers'
        }, {
          url: '#suppliers',
          name: 'Suppliers'
        }, {
          url: '#events',
          name: 'Events'
        }, {
          url: '#services',
          name: 'Services'
        }, {
          url: '#reports',
          name: 'Reports'
        }, {
          url: '#settings',
          name: 'Settings'
        }];

      } else if($rootScope.principal.UserTypeId == UserType.Staff) {

        $scope.menuItems = [ {
          url: '#cars',
          name: 'Cars'
        }, {
          url: '#offers',
          name: 'Offers'
        }, {
          url: '#news',
          name: 'News'
        }, {
          url: '#testdrives',
          name: 'Test Drives'
        }, {
          url: '#settings',
          name: 'Settings'
        }];

      } else if($rootScope.principal.UserTypeId == UserType.User) {

        $scope.menuItems = [ {
          url: '#cars',
          name: 'Cars'
        }, {
          url: '#news',
          name: 'News'
        }, {
          url: '#events',
          name: 'Events'
        }, {
          url: '#services',
          name: 'Services'
        }, {
          url: '#offers',
          name: 'Offers'
        }, {
          url: '#contact',
          name: 'Contact'
        }, {
          url: '#settings',
          name: 'Settings'
        }];

      }
  }

  });
