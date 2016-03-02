'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('UserCtrl', function ($scope, $rootScope, request, $location, UserType) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.email = ''
  $scope.password = '';

  $scope.UserType = UserType;

  $scope.add = function(type) {
    request.post('/auth/add', {
      email: $scope.email,
      password: $scope.password,
      UserTypeId: type
    }).then(function(principal) {
      console.log('principal ' + JSON.stringify(principal));
      $rootScope.principal = principal;
      $location.path('#/');
    });
  };

  });
