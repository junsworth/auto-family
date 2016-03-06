'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('SupplierManagerCtrl', function ($scope, $rootScope, $location, request) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.name = "";
    $scope.address = "";
    $scope.addresstwo = "";
    $scope.city = "";
    $scope.email = "";
    $scope.phone = "";

    suppliers();

    $scope.add = function() {

	    request.post('/suppliers/add', {
	      name: $scope.name,
	      address: $scope.address,
	      addresstwo: $scope.addresstwo,
	      city: $scope.city,
	      email: $scope.email,
	      phone: $scope.phone
	    }).then(function(supplier) {
	      console.log('supplier ' + JSON.stringify(supplier));
	      $location.path('#/suppliers');
	    });

  	};

  	function suppliers() {
	    request.get('/suppliers/suppliers').then(function(suppliers) {
	      $scope.suppliers = suppliers;

	      $scope.viewby = 4;

	      $scope.totalItems = $scope.suppliers.length;

	      $scope.currentPage = 1;

	      $scope.itemsPerPage = $scope.viewby;

	      $scope.maxSize = 5; //Number of pager buttons to show

	    });
	}

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
