'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('CarManagerCtrl', function ($scope, $rootScope, request, $location, filterFilter, $timeout, Upload, cfg, $routeParams) {
    
    if($routeParams.id) {
        request.get('/cars/get/:id', {
            id: $routeParams.id
        }).then(function(car) {

          if(car.length == 4) {

            $scope.makeSelect = car[1].Make;
            $scope.modelSelect = car[2].Model;
            $scope.supplierSelect = car[3].Supplier;
            $scope.isEditGallery = false;

            $scope.header = car[0].Car.header;
            $scope.subHeader = car[0].Car.subHeader;
            $scope.description = car[0].Car.description;
            $scope.mileage = car[0].Car.mileage;
            $scope.year = car[0].Car.year;
            $scope.purchasePrice = car[0].Car.purchasePrice;
            $scope.salePrice = car[0].Car.salePrice;
            $scope.insertDate = car[0].Car.insertDate;
            $scope.saleDate = car[0].Car.saleDate;
            
            $scope.slides = JSON.parse(car[0].Car.images);

            makes();
            models();
            suppliers();
            cars();
            
            $scope.isEdit = true;

            $scope.dt1 = new Date($scope.insertDate);

            if($scope.saleDate) {
              $scope.dt2 = new Date($scope.saleDate);
            } else {
              $scope.dt2 = new Date();
            }
            

          }

        });
    } else {
        $scope.isEdit = false;
        $scope.makeSelect = -1;
        $scope.modelSelect = -1;
        $scope.supplierSelect = -1;
        $scope.isEditGallery = false;

        $scope.header = "";
        $scope.subHeader = "";
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

        $scope.isEdit = false;

        $scope.dt1 = new Date();
        $scope.dt2 = new Date();

    }    

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
        if($scope.makeSelect) {
          $scope.filterModels($scope.makeSelect.id);
        }
	    });
  	};

    function cars() {
      request.get('/cars/cars').then(function(cars) {
        $scope.cars = cars;
        $scope.viewby = 4;

        $scope.totalItems = $scope.cars.length;

        $scope.currentPage = 1;

        $scope.itemsPerPage = $scope.viewby;

        $scope.maxSize = 5; //Number of pager buttons to show
      });
    };

    $scope.edit = function(car) {
      $location.path('/addcar').search({id: car.id});
    };

    $scope.delete = function(car) {
      request.delete('/cars/delete/:id', {
        id: car.id
      }).then(cars).then($location.path('/cars'));
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    }

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
        subHeader: $scope.subHeader,
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
