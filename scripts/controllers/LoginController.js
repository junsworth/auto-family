/**
 * Created by jonathanunsworth on 15/01/14.
 */
'user strict';

var app = angular.module('familyCarsApp');

app.controller('LoginCtrl', function($scope, $rootScope, request, UserType) {
  $scope.email = ''
  $scope.password = '';

  $rootScope.siteType = -1;
  $scope.UserType = UserType;

  $scope.login = function() {
    request.post('/auth/login', {
      email: $scope.email,
      password: $scope.password
    }).then(function(principal) {
      console.log('principal ' + JSON.stringify(principal));
      $rootScope.principal = principal;
    });
  };

  $scope.setSiteType = function(type) {
    $rootScope.siteType = type;
  }

});