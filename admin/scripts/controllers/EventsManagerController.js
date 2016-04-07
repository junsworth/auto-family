'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('EventManagerCtrl', function ($scope, $rootScope, $location, request, $routeParams, $timeout, Upload, EventService, cfg) {
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    getEvents();

    if($routeParams.id) {

		EventService.event($routeParams.id).then(function(event){
			$scope.id = event.id;
			$scope.title = event.title;
			$scope.header = event.header;
			$scope.description = event.description;
			$scope.image = event.images;
			$scope.dt1 = new Date(event.startDate);
			$scope.dt2 = new Date(event.endDate);
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

    $scope.edit = function(event) {
        $location.path('/events/edit').search({id: event.id});
    };

    $scope.add = function() {

      EventService.create($scope.title, $scope.header, $scope.description, $scope.image, $scope.dt1, $scope.dt2).then(function(event){
        $location.path('/events');
      });

    };

    $scope.update = function() {

      var saveObj = {};
      saveObj.id = $scope.id;
      saveObj.title = $scope.title;
      saveObj.header = $scope.header;
      saveObj.description = $scope.description;
      saveObj.images = $scope.image;
      saveObj.startDate = $scope.dt1;
      saveObj.endDate = $scope.dt2;

      EventService.update(saveObj).then(function(article) {
              addAlert('success', 'Success! article saved.');
      });

    };

    function getEvents() {
      EventService.events().then(function(events) {

  		$scope.events = events;

  		$scope.viewby = 4;

  		$scope.totalItems = $scope.events.length;

  		$scope.currentPage = 1;

  		$scope.itemsPerPage = $scope.viewby;

  		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };

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
