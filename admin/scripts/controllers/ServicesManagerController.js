'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:ServicesManagerCtrl
 * @description
 * # ServicesManagerCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ServicesManagerCtrl', function ($scope, $rootScope, $location, request, $routeParams, $timeout, Upload, ServicesService, cfg) {
    
    
    getServices();

    if($routeParams.id) {

		ServicesService.service($routeParams.id).then(function(service){
			console.log(JSON.stringify(service));
			$scope.id = service.id;
			$scope.title = service.title;
			$scope.header = service.header;
			$scope.description = service.description;
			$scope.image = service.images;
			$scope.isEdit = true;
		});
        
    } else {

        $scope.title = '';
		$scope.header = '';
		$scope.description = '';
		$scope.image = '';
        $scope.isEdit = false;
    }

    $scope.edit = function(service) {
        $location.path('/addservice').search({id: service.id});
    };

    $scope.add = function() {

      ServicesService.create($scope.title, $scope.header, $scope.description, $scope.image).then(function(service){
        $location.path('/services');
      });

    };

    $scope.update = function() {

    	var saveObj = {};
    	saveObj.id = $scope.id;
    	saveObj.title = $scope.title;
    	saveObj.images = $scope.image;
    	saveObj.header = $scope.header;
    	saveObj.description = $scope.description;

		ServicesService.update(saveObj).then(function() {

		});

    };

    function getServices() {
      ServicesService.services().then(function(services) {

		$scope.services = services;

		$scope.viewby = 4;

		$scope.totalItems = $scope.services.length;

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
