'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CustomerManagerCtrl', function ($scope, $rootScope, $location, request) {
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

    customers();

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
	      $location.path('#/customers');
	    });

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

	  $scope.currentPage = 1; //reset to first paghe

	}

	$scope.getCarPhotos = function(str) {
    	console.log('----- ' + str + '------');
    	return JSON.parse(str);
    };

    $scope.getCarThumbnails = function(str) {
    	var array = JSON.parse(str);

    	var tmp = [];
    	var tmp2 = [];

    	for(var i = 0; i < array.length; i++) {
    		
    		tmp.push(array[i]);

    		console.log('Push id - ' + array[i].id);
    		if( i!= 0 && ((i+1)%4 == 0)) {
    			tmp2.push(tmp);
    			console.log('Push array length -' + tmp.length);
    			tmp = [];
    		}

    	}

    	return tmp2;
    }

    $scope.isCorrectIndex = function(index) {
    	if(index == 0)
    		return false;
    	else
    		return true;
    }

    $scope.isInCorrectIndex = function(index) {
    	if(index != 0)
    		return true;
    	else
    		return false;
    }

  });
