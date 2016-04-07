'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('UserCtrl', function ($scope, $rootScope, request, $location, UserType, $routeParams) {
    
    $scope.items = [ {
        id: 1,
        title: 'Admin'
      }, {
        id: 2,
        title: 'Staff'
      }, {
        id: 3,
        title: 'User'
      }
    ];

  if($routeParams.id) {
        request.get('/users/get/:id', {
            id: $routeParams.id
        }).then(function(user) {

            $scope.email = user.email;
            $scope.password = user.password;
            $scope.UsersType = $scope.items[user.UserTypeId-1];;
            $scope.UserType = UserType;
            $scope.isEdit = true;
        });
    } else {
        $scope.email = ''
        $scope.password = '';
        $scope.UsersType = $scope.items[1];;
        $scope.UserType = UserType;
        users();
        $scope.isEdit = false;
    }

  

  $scope.add = function(type) {
    request.post('/auth/add', {
      email: $scope.email,
      password: $scope.password,
      UserTypeId: type.id
    }).then(function(principal) {

      console.log('principal ' + JSON.stringify(principal));

      if($rootScope.principal && $rootScope.principal.UserTypeId == $scope.UserType.Admin) {
        $location.path('/users');
      } else {
        $rootScope.principal = principal;
        $location.path('/');
      }
      
    });
  };

  function users() {
    request.get('/auth/users').then(function(users) {
      $scope.users = users;

      $scope.viewby = 4;

      $scope.totalItems = $scope.users.length;

      $scope.currentPage = 1;

      $scope.itemsPerPage = $scope.viewby;

      $scope.maxSize = 5; //Number of pager buttons to show

    });
  };

  $scope.edit = function(user) {
      $location.path('/adduser').search({id: user.id});
  };

  $scope.delete = function(user) {
    request.delete('/user/delete/:id', {
      id: user.id
    }).then(users).then($location.path('/users'));
  };

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first page
  }

});
