'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CarCtrl', function ($scope, $rootScope, request) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    cars();

    $scope.getCarPhotos = function(str) {
    	return JSON.parse(str);
    };

    function cars() {
      request.get('/cars/cars').then(function(cars) {
        $scope.cars = cars;

        $scope.viewby = 4;

		$scope.totalItems = $scope.cars.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

		console.log(JSON.stringify($scope.cars));

      });
    };

    $scope.setPage = function (pageNo) {

		$scope.currentPage = pageNo;

	};


	$scope.pageChanged = function() {

		console.log('Page changed to: ' + $scope.currentPage);

	};


	$scope.setItemsPerPage = function(num) {

		$scope.itemsPerPage = num;

		$scope.currentPage = 1; //reset to first paghe

	}

  });
