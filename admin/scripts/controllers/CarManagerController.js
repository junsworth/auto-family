'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CarManagerCtrl', function ($scope, $rootScope, request, $location, filterFilter, $timeout, Upload, cfg) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.makeSelect = -1;
    $scope.modelSelect = -1;
    $scope.supplierSelect = -1;
    $scope.isEditGallery = false;

    $scope.header = "";
    $scope.description = "";
    $scope.mileage = "";
    $scope.year = "";
    $scope.purchasePrice = "";
    $scope.salePrice = "";
    $scope.insertDate = "";
    $scope.saleDate = "";

    $scope.models = [];

    makes();
    models();
    suppliers();
    cars();

    $scope.dt1 = new Date();
    $scope.dt2 = new Date();

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    // carasoul settings
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    function makes() {
	    request.get('/cars/makes').then(function(makes) {
	      $scope.makes = makes;
	    });
  	};

  	function models() {
	    request.get('/cars/models').then(function(models) {
	      $scope.models = models;
	    });
  	};

    function cars() {
      request.get('/cars/cars').then(function(cars) {
        $scope.cars = cars;
      });
    };

  	$scope.filterModels = function(id) {
  		$scope.filteredModels = filterFilter($scope.models, {'MakeId':id});
  	};

    function suppliers() {
      request.get('/suppliers/suppliers').then(function(suppliers) {
        $scope.suppliers = suppliers;
      });
    };

    $scope.editGallery = function() {
      $scope.isEditGallery = !$scope.isEditGallery;
    }

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.addSlide = function(url) {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: url,
        id: currIndex++
      });
    };

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {

            var strFileName = file.name;

            file.upload = Upload.upload({
                url: cfg.baseUrl + cfg.imageUploadUrl,
                data: {file: file}
            });

            // file.upload.then(function (response) {
            //     $timeout(function () {
            //         file.result = response.data;
            //     });
            // }, function (response) {
            //     if (response.status > 0)
            //         $scope.errorMsg = response.status + ': ' + response.data;
            // }, function (evt) {
            //     file.progress = Math.min(100, parseInt(100.0 * 
            //                              evt.loaded / evt.total));
            // });

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

              $scope.addSlide(imageUrl);
              console.log('Images - ' + JSON.stringify($scope.slides));
                    
            });
        }   
    };

    $scope.add = function() {

      request.post('/cars/add', {
        header: $scope.header,
        description: $scope.description,
        mileage: $scope.mileage,
        year: $scope.year,
        purchasePrice: $scope.purchasePrice,
        salePrice: $scope.salePrice,
        insertDate: $scope.dt1,
        saleDate: $scope.dt2,
        images: JSON.stringify($scope.slides),
        ModelId: $scope.modelSelect.id,
        SupplierId: $scope.supplierSelect.id
      }).then(function(car) {
        console.log('car ' + JSON.stringify(car));
        $location.path('#/cars');
      });

    };

});
