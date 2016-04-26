'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ReportsCtrl', function ($scope, $rootScope, $location, request, 
    filterFilter, $routeParams, ReportService, UserService, TestDriveService, 
    CarService, UtilityService) {

    // report select menu items
    $scope.items = [ {
        id: 1,
        title: 'Test Drive Report'
      }, {
        id: 2,
        title: 'Sales Report'
      }, {
        id: 3,
        title: 'Purchases Report'
      }, {
        id: 4,
        title: 'Sales By Agents'
      }
    ];

    // assigning report type to first element
    $scope.reportType = $scope.items[0];

    $scope.vatP = 0.14;
    $scope.commP = 0.10;

    $scope.getCars = function() {
        CarService.cars().then(function(cars){
            $scope.cars = cars;
            $scope.soldCars = $scope.filterSoldCars($scope.cars);
        });
    };

    $scope.filterSoldCars = function(cars) {
        return filterFilter(cars, {'CustomerId':''});
    }

    $scope.getUsers = function() {
        UserService.users()
        .then(function(users){
            $scope.users = users;
            $scope.agents = $scope.filterUsersByType($scope.users, 2);
            angular.forEach($scope.agents, function(agent) {
                $scope.getSalesForAgent(agent);
            });
        });
    }

    $scope.filterUsersByType = function(users, type) {
        return filterFilter(users, {'UserTypeId':type});
    }

    $scope.doSalesReport = function() {
        ReportService.getSalesTotal()
        .then(function(total) {            
            $scope.subTotal = total;
            $scope.vat = Math.round(($scope.subTotal * $scope.vatP) * 100) / 100;
            $scope.commission = Math.round(($scope.subTotal * $scope.commP) * 100) / 100;
            $scope.total = $scope.subTotal + $scope.vat;
        })
    };

    $scope.doPurchasesReport = function() {
        ReportService.getPurchaseTotal()
        .then(function(total){
            $scope.subTotal = total;
            $scope.vat = Math.round(($scope.subTotal * $scope.vatP) * 100) / 100;
            $scope.total = $scope.subTotal + $scope.vat;
        });
    };

    $scope.getSalesForAgent = function(agent) {
        ReportService.getSalesByAgent(agent.id)
        .then(function(total){
            agent.salesTotal = total;
            agent.commission = agent.salesTotal * $scope.commP;
        });
    }

    $scope.filterUserById = function(id) {

        var result = filterFilter($scope.users, {'id':id});

        return result;
    }

    $scope.reportSelectChanged = function() {

        console.log(JSON.stringify($scope.reportType));
        if($scope.reportType.id == 1) {

            //getTestDrives();

        } else if($scope.reportType.id == 2) {
            
            $scope.doSalesReport();

            $scope.viewby = 4;

            $scope.totalItems = $scope.soldCars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show

        } else if($scope.reportType.id == 3) {

            $scope.doPurchasesReport();
            
            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show

        } else if($scope.reportType.id == 4) {
            
            $scope.viewby = 4;

            $scope.totalItems = $scope.agents.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show

        }
    }

    // get test drives
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

    $scope.formatDateTime = function(date) {
        return UtilityService.formatDateTime(date);
    }

    $scope.formatDate = function(date) {
        return UtilityService.formatDate(date);
    }

    //getTestDrives();
    //$scope.getCars();
    //$scope.getUsers();
  });
