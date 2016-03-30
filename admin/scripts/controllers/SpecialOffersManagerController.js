'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:SpecialOffersCtrl
 * @description
 * # SpecialOffersCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('SpecialOffersCtrl', function ($scope, $rootScope, $location, request, $routeParams, $timeout, Upload, OffersService, cfg) {

  	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    getOffers();

    if($routeParams.id) {

		OffersService.offer($routeParams.id).then(function(offer){
			console.log(JSON.stringify(offer));
			$scope.id = offer.id;
			$scope.title = offer.title;
			$scope.header = offer.header;
			$scope.description = offer.description;
			$scope.image = offer.images;
			$scope.dt1 = new Date(offer.startDate);
			$scope.dt2 = new Date(offer.endDate);
			$scope.isEdit = true;
		});
        
    } else {

        $scope.title = '';
		$scope.header = '';
		$scope.description = '';
		$scope.image = '';
		$scope.dt1 = new Date();
    	$scope.dt2 = new Date();
        $scope.isEdit = false;
    }


    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.edit = function(offer) {
        $location.path('/offers/edit').search({id: offer.id});
    };

    $scope.add = function() {

      OffersService.create($scope.title, $scope.header, $scope.description, $scope.image, $scope.dt1, $scope.dt2).then(function(service){
        $location.path('/offers');
      });

    };

    function getOffers() {
      OffersService.offers().then(function(offers) {

		$scope.offers = offers;

		$scope.viewby = 4;

		$scope.totalItems = $scope.offers.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };

    $scope.submit = function(isEdit) {
    	if(isEdit) {
    		$scope.update();
    	} else if (!isEdit){
    		$scope.add();
    	}
    }

    // upload file
    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {

            var strFileName = file.name;

            file.upload = Upload.upload({
                url: cfg.baseUrl + cfg.imageUploadUrl,
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                        
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));

            }).success(function (data, status, headers, config) {

              var imageUrl = cfg.baseUrl + cfg.imageUrl + strFileName;

              $scope.image = imageUrl;

              console.log($scope.image);
                    
            });
        }   
    };

  });
