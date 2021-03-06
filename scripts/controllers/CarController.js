'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CarCtrl', function ($scope, $route, $rootScope, $routeParams, filterFilter, request, $location, CarService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.predicate = 'salePrice'
    if($routeParams.id) {
        filterCars($routeParams.id);
    } else {
        cars(); 
    }

    $scope.viewCar = function(car) {
        $location.path('/cars/detail').search({id: car.id});
    };

    $scope.getCarPhotos = function(str) {
    	//console.log('----- ' + str + '------');
    	return JSON.parse(str);
    };

    $scope.switchStyle = function() {
        $rootScope.isGridStyle =! $rootScope.isGridStyle;
        $route.reload();
    }

    $scope.order = function(predicate) {
        //$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    $scope.getCarThumbnails = function(str) {
    	var array = JSON.parse(str);

    	var tmp = [];
    	var tmp2 = [];

    	for(var i = 0; i < array.length; i++) {
    		
    		tmp.push(array[i]);

    		//console.log('Push id - ' + array[i].id);
    		if( i!= 0 && ((i+1)%4 == 0)) {
    			tmp2.push(tmp);
    			//console.log('Push array length -' + tmp.length);
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

    function cars() {

        CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
        });

    };

    function filterCars(id) {
        
        CarService.cars().then(function(cars){
            $scope.cars = cars;

            $scope.cars = filterFilter($scope.cars, {'ModelId':id}, true);

            console.log(JSON.stringify($scope.cars));

            $scope.viewby = 4;

            $scope.totalItems = $scope.cars.length;

            $scope.currentPage = 1;

            $scope.itemsPerPage = $scope.viewby;

            $scope.maxSize = 5; //Number of pager buttons to show
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

    $scope.displayText = function(str) {
        var mystring = String(str);

        var length_half = mystring.length / 2;

        return mystring.slice(0, length_half) + '...';
    }

  });
