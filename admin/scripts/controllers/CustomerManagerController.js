'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:CustomerManagerCtrl
 * @description
 * # CustomerManagerCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CustomerManagerCtrl', function ($scope, $rootScope, $location, request, $routeParams, CustomerService) {
    
    if($routeParams.id) {

        CustomerService.customer($routeParams.id).then(function(customer){
            $scope.id = customer.id;
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

        CustomerService.create(
            $scope.name, 
            $scope.address,
            $scope.addresstwo,
            $scope.city,
            $scope.email,
            $scope.phone)
        .then(function(customer){

        }).then($location.path('/customers'));

  	};

    $scope.save = function() {

      var saveObj = {};
      saveObj.id = $scope.id;
      saveObj.name = $scope.name;
      saveObj.address = $scope.address;
      saveObj.addresstwo = $scope.addresstwo;
      saveObj.city = $scope.city;
      saveObj.email = $scope.email;
      saveObj.phone = $scope.phone;

      CustomerService.update(saveObj).then(function(customer) {
        addAlert('success', 'Success! customer saved.');
      });

    };

    $scope.edit = function(customer) {
        $location.path('/addcustomer').search({id: customer.id});
    };

    $scope.delete = function(customer) {
        CustomerService.delete(customer.id).then(function(){

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
	};

    // alerts
    function addAlert(type, message) {
      $scope.alerts = [];
      $scope.alerts.push({type: type, msg: message});
    }

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.submit = function() {
      
      $scope.alerts = [];

      if(!$scope.isEdit) {
        $scope.add();
      } else if ($scope.isEdit) {
        $scope.save();
      }

    };

  });
