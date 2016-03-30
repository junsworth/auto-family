'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:SupplierManagerCtrl
 * @description
 * # SupplierManagerCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('SupplierManagerCtrl', function ($scope, $rootScope, $location, request, $routeParams) {
    
    if($routeParams.id) {
		request.get('/suppliers/get/:id', {
			id: $routeParams.id
		}).then(function(supplier) {
			$scope.name = supplier.name;
		    $scope.address = supplier.address;
		    $scope.addresstwo = supplier.addresstwo;
		    $scope.city = supplier.city;
		    $scope.email = supplier.email;
		    $scope.phone = supplier.phone;
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
	    suppliers();
    }

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
	      $location.path('/suppliers');
	    });
  	};

  	$scope.edit = function(supplier) {
  		$location.path('/addsupplier').search({id: supplier.id});
  	};

  	$scope.delete = function(supplier) {
      request.delete('/suppliers/delete/:id', {
        id: supplier.id
      }).then(suppliers).then($location.path('/suppliers'));
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
	};

  });
