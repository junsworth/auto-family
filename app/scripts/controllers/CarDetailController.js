'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:CarDetailCtrl
 * @description
 * # CarDetailCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CarDetailCtrl', function ($scope, $rootScope, request, $location, filterFilter, cfg, $routeParams, CarService, $uibModal) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

    if($routeParams.id) {

		// carasoul settings
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		var slides = $scope.slides = [];
		var currIndex = 0;

		CarService.car($routeParams.id).then(function(car){
			if(car.length == 4 || car.length == 5) {

				$scope.isEdit = true;

				$scope.makeSelect = car[1].Make;
				$scope.modelSelect = car[2].Model;
				$scope.supplierSelect = car[3].Supplier;

				$scope.isEditGallery = false;

				$scope.id = car[0].Car.id;
				$scope.header = car[0].Car.header;
				$scope.subHeader = car[0].Car.subHeader;
				$scope.description = car[0].Car.description;
				$scope.mileage = car[0].Car.mileage;
				$scope.year = car[0].Car.year;
				$scope.purchasePrice = car[0].Car.purchasePrice;
				$scope.salePrice = car[0].Car.salePrice;
				$scope.insertDate = car[0].Car.insertDate;
				$scope.saleDate = car[0].Car.saleDate;

				if(car[0].Car.images.length > 0) {
					$scope.slides = JSON.parse(car[0].Car.images);  
				}  

				$scope.dt1 = new Date($scope.insertDate);

			}
		});

    } 

    $scope.edit = function(id, size) {

      var modalInstance = $uibModal.open({
        templateUrl: '/common/views/dialogs/test-drive-dialog.html',
        controller: 'TestDriveCtrl',
        size: size,
        resolve: {
          carId: function() {
            return id;
          }
        }
      }).result.then();
    };

  });
