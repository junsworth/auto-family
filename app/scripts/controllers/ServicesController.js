'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ServicesCtrl', function ($scope, $rootScope, $location, request, $routeParams, ServicesService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    getServices();
    function getServices() {
      ServicesService.services().then(function(services) {

		$scope.services = services;

		$scope.viewby = 4;

		$scope.totalItems = $scope.services.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };

  });
