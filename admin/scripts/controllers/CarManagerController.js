'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CarManagerCtrl', function ($scope, $rootScope, request, $location, filterFilter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.makeSelect = -1;
    $scope.modelSelect = -1;

    $scope.models = [];

    makes();
    models();
    suppliers();

    function makes() {
	    
	    request.get('/cars/makes').then(function(makes) {
	      $scope.makes = makes;
	    });

  	}

  	function models() {
	    
	    request.get('/cars/models').then(function(models) {
	      $scope.models = models;
	    });

  	}

  	$scope.filterModels = function(id) {
  		$scope.filteredModels = filterFilter($scope.models, {'MakeId':id});
  	}

    function suppliers() {
      request.get('/suppliers/suppliers').then(function(suppliers) {
        $scope.suppliers = suppliers;
      });
    }

  });
