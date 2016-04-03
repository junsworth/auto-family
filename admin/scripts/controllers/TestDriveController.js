'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('TestDriveCtrl', function ($scope, $rootScope, request, $location, $routeParams, TestDriveService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    testdrives();

    if($routeParams.id) {

		TestDriveService.testdrive($routeParams.id).then(function(testdrive){
			$scope.id = testdrive.id;
			$scope.name = testdrive.name;
			$scope.phone = testdrive.phone;
			$scope.email = testdrive.email;
			$scope.requestDate = moment(testdrive.requestDate).format('DD/MM/YYYY, h:mm:ss a');
		});
        
    } 

    $scope.edit = function(testdrive) {
        $location.path('/testdrives/edit').search({id: testdrive.id});
    };

	function testdrives() {
	    TestDriveService.testdrives().then(function(testdrives) {

		$scope.testdrives = testdrives;

		$scope.viewby = 4;

		$scope.totalItems = $scope.testdrives.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
	}

	$scope.formatDate = function(date) {
		return moment(date).format('DD/MM/YYYY, h:mm:ss a');
	} 

  });
