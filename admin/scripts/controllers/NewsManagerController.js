'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:NewsManagerCtrl
 * @description
 * # NewsManagerCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('NewsManagerCtrl', function ($scope, $rootScope, $location, request, $routeParams, $timeout, Upload, NewsService, cfg) {
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    getNews();

    if($routeParams.id) {

		NewsService.article($routeParams.id).then(function(article){
			console.log(JSON.stringify(article));
			$scope.id = article.id;
			$scope.title = article.title;
			$scope.header = article.header;
			$scope.description = article.description;
			$scope.image = article.images;
			$scope.dt1 = new Date(article.releaseDate);
			$scope.isEdit = true;
		});
        
    } else {

        $scope.title = '';
		$scope.header = '';
		$scope.description = '';
		$scope.image = '';
		$scope.dt1 = new Date();
        $scope.isEdit = false;
    }


    $scope.popup1 = {
      opened: false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.edit = function(article) {
        $location.path('/news/edit').search({id: article.id});
    };

    $scope.add = function() {

      NewsService.create($scope.title, $scope.header, $scope.description, $scope.image, $scope.dt1).then(function(article){
        $location.path('/news');
      });

    };

    $scope.update = function() {

      var saveObj = {};
      saveObj.id = $scope.id;
      saveObj.title = $scope.title;
      saveObj.images = $scope.image;
      saveObj.header = $scope.header;
      saveObj.description = $scope.description;
      saveObj.releaseDate = $scope.dt1;

      NewsService.update(saveObj).then(function(article) {
              addAlert('success', 'Success! article saved.');
      });

    };

    function getNews() {
      NewsService.articles().then(function(articles) {

		$scope.articles = articles;

		$scope.viewby = 4;

		$scope.totalItems = $scope.articles.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };

    // alerts
    function addAlert(type, message) {
      $scope.alerts = [];
      $scope.alerts.push({type: type, msg: message});
    }

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.submit = function() {
        
        $scope.alerts = [];

    	if($scope.isEdit) {
    		$scope.update();
    	} else if (!$scope.isEdit){
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
