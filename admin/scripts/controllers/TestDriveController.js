'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('TestDriveCtrl', function ($scope, $rootScope, request, $location, $routeParams, TestDriveService, $uibModal, $log) {

    testdrives();

    if($routeParams.id) {

		TestDriveService.testdrive($routeParams.id).then(function(testdrive){
			$scope.id = testdrive.id;
			$scope.name = testdrive.name;
			$scope.phone = testdrive.phone;
			$scope.email = testdrive.email;
			$scope.UserId = testdrive.UserId;
			$scope.requestDate = moment(testdrive.requestDate).format('DD/MM/YYYY, h:mm:ss a');
		});
        
    } 

    $scope.edit = function(testdrive) {
        $location.path('/testdrives/edit').search({id: testdrive.id});
    };

    $scope.complete = function (size) {

      var saveObj = {};
      saveObj.id = $scope.id;
      saveObj.name = $scope.name;
      
      saveObj.phone = $scope.phone;
      saveObj.email = $scope.email;

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/dialogs/dialog-confirm.html',
        controller: 'ConfirmDialogCtrl',
        size: size,
        resolve: {
          testDrive: function () {
            return saveObj;
          }
        }
      });

      modalInstance.result.then(function (isComplete) {
        if(isComplete){

          saveObj.completeDate = new Date();
          saveObj.UserId = $rootScope.principal.id;

          TestDriveService.update(saveObj).then(function() {
            addAlert('success', 'Success! TEST DRIVE COMPLETE!' + $scope.customerSelect + ' -- ' + $scope.dt2);
          });
          $log.info('Modal dismissed complete at: ' + new Date());
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
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

	$scope.formatDateTime = function(date) {
		return moment(date).format('DD/MM/YYYY, h:mm:ss a');
	} 

	$scope.formatDate = function(date) {
		return moment(date).format('DD/MM/YYYY');
	} 

	// alerts
    function addAlert(type, message) {
      $scope.alerts = [];
      $scope.alerts.push({type: type, msg: message});
    }

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  });
