'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('AppCtrl', function ($scope, $rootScope, UserType) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    setMenu();
    
    function setMenu() {

      console.log('$rootScope.principal ' + JSON.stringify($rootScope.principal));

      console.log('$rootScope.principal.UserTypeId - ' + $rootScope.principal.UserTypeId);

      console.log('UserType.Admin - ' + UserType.Admin);

      if($rootScope.principal.UserTypeId == UserType.Admin) {

        $scope.menuItems = [ {
          url: '#users',
          name: 'Users'
        }, {
          url: '#playlists',
          name: 'Playlists'
        }, {
          url: '#schedular',
          name: 'Schedular'
        }, {
          url: '#library',
          name: 'Library'
        }, {
          url: '#devices',
          name: 'Devices'
        }, {
          url: '#settings',
          name: 'Settings'
        }];

      } else if($rootScope.principal.UserTypeId == UserType.Staff) {

        $scope.menuItems = [ {
          url: '#users',
          name: 'Users'
        }, {
          url: '#playlists',
          name: 'Playlists'
        }, {
          url: '#schedular',
          name: 'Schedular'
        }, {
          url: '#library',
          name: 'Library'
        }, {
          url: '#devices',
          name: 'Devices'
        }, {
          url: '#settings',
          name: 'Settings'
        }];

      } else if($rootScope.principal.UserTypeId == UserType.User) {

        $scope.menuItems = [ {
          url: '#users',
          name: 'Users'
        }, {
          url: '#playlists',
          name: 'Playlists'
        }, {
          url: '#schedular',
          name: 'Schedular'
        }, {
          url: '#library',
          name: 'Library'
        }, {
          url: '#devices',
          name: 'Devices'
        }, {
          url: '#settings',
          name: 'Settings'
        }];

      }
  }

  });
