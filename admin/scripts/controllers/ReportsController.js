'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ReportsCtrl', function ($scope, $rootScope, $location, request, $routeParams, UserService, TestDriveService, CarService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.items = [ {
        id: 1,
        title: 'Test Drive Report'
      }, {
        id: 2,
        title: 'Sales Report'
      }, {
        id: 3,
        title: 'Purchases Report'
      }
    ];

    $scope.reportType = $scope.items[0];

    getTestDrives();

    $scope.formatDate = function(date) {
		return moment(date).format('DD/MM/YYYY, h:mm:ss a');
	} 

    $scope.reportSelectChanged = function() {
    	console.log(JSON.stringify($scope.reportType));

    	if($scope.reportType.id == 1) {
    		getTestDrives();
    	} else if($scope.reportType.id == 2) {
    		getCars();
    	}
    }

    function getCars() {
    	CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
        });
    }

    function getSale() {
    	CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
        });
    }

    function getPurchases() {
    	CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
        });
    }

    function getTestDrives() {
    	TestDriveService.testdrives().then(function(testdrives) {

		$scope.testdrives = testdrives;

		$scope.viewby = 4;

		$scope.totalItems = $scope.testdrives.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    }

  });
