'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ReportsCtrl', function ($scope, $rootScope, $location, request, filterFilter, $routeParams, ReportService, UserService, TestDriveService, CarService) {
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

    $scope.formatDateTime = function(date) {
		return moment(date).format('DD/MM/YYYY, h:mm:ss a');
	}

    $scope.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
    } 

    $scope.reportSelectChanged = function() {
    	console.log(JSON.stringify($scope.reportType));

    	if($scope.reportType.id == 1) {
    		getTestDrives();
    	} else if($scope.reportType.id == 2) {
    		getSales();
    	} else if($scope.reportType.id == 3) {
            getPurchases();
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

    function getSalesTotal() {
        ReportService.getSalesTotal()
        .then(function(total){
            $scope.salesTotal = total;
        })
    }

    function getPurchaseTotal() {
        ReportService.getPurchaseTotal()
        .then(function(total){
            $scope.purchaseTotal = total;
        })
    }

    function getSales() {
    	CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.cars = filterFilter($scope.cars, {'CustomerId':undefined});

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
            
            getSalesTotal();

        });
    }

    function getPurchases() {

        $scope.total = 0;

    	CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
            getPurchaseTotal();
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
