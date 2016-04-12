/**
 * Created by jonathanunsworth on 15/01/14.
 */
'user strict';

var app = angular.module('familyCarsApp');

app.controller('LoginCtrl', function($scope, $rootScope, request, UserType, UserService) {
  
  $scope.email = ''
  $scope.password = '';

  $rootScope.siteType = -1;
  $scope.UserType = UserType;

  $rootScope.isStyle = false;
  $rootScope.isGridStyle = false;

  $scope.login = function() {
    UserService.login($scope.email, $scope.password).then(function(user){
      console.log('principal user - ' + JSON.stringify(user));
      $rootScope.principal = user;
      $rootScope.principal.data = angular.fromJson($rootScope.principal.data);
      $rootScope.isStyle = $rootScope.principal.data.style;
    });
  }

  $scope.setSiteType = function(type) {
    $rootScope.siteType = type;
  }

});