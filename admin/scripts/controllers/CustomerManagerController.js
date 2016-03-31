'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:CustomerManagerCtrl
 * @description
 * # CustomerManagerCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CustomerManagerCtrl', function ($scope, $rootScope, $location, request, $routeParams, SupplierService) {
    
    if($routeParams.id) {
        request.get('/customers/get/:id', {
            id: $routeParams.id
        }).then(function(customer) {
            $scope.name = customer.name;
            $scope.address = customer.address;
            $scope.addresstwo = customer.addresstwo;
            $scope.city = customer.city;
            $scope.email = customer.email;
            $scope.phone = customer.phone;
            $scope.isEdit = true;
        });
    } else {
        $scope.name = "";
        $scope.address = "";
        $scope.addresstwo = "";
        $scope.city = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.isEdit = false;

        customers();
    }

    $scope.add = function() {

        request.post('/customers/add', {
	      name: $scope.name,
	      address: $scope.address,
	      addresstwo: $scope.addresstwo,
	      city: $scope.city,
	      email: $scope.email,
	      phone: $scope.phone
	    }).then(function(customer) {
	      console.log('customer ' + JSON.stringify(customer));
	      $location.path('/customers');
	    });
  	};

    $scope.edit = function(customer) {
        $location.path('/addcustomer').search({id: customer.id});
    };

    $scope.delete = function(customer) {
      request.delete('/customer/delete/:id', {
        id: customer.id
      }).then(customers).then($location.path('/customers'));
    };

  	function customers() {
	    request.get('/customers/customers').then(function(customers) {
	      $scope.customers = customers;

	      $scope.viewby = 4;

	      $scope.totalItems = $scope.customers.length;

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
	  $scope.currentPage = 1; //reset to first page
	}

	$scope.getCarPhotos = function(str) {
    	return JSON.parse(str);
    };

  });
