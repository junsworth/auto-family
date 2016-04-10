'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, UserType) {
  	$scope.UserType = UserType;
  	$scope.style = false;
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
