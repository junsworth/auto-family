'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('MainCtrl', function ($scope, request, filterFilter, $filter, $location, $rootScope, NewsService, UtilityService) {

    $scope.makeSelect = -1;
    $scope.modelSelect = -1;
  	$scope.minPrice = '0';
  	$scope.maxPrice = '0';
    $scope.prices = [{'id':1, 'price':'R10000'}, {'id':2, 'price':'R15000'}, {'id':3, 'price':'R20000'}, {'id':4, 'price':'R25000'}
    , {'id':5, 'price':'R30000'}, {'id':6, 'price':'R35000'}, {'id':7, 'price':'R40000'}, {'id':8, 'price':'R45000'}, {'id':9, 'price':'R50000'}
    , {'id':9, 'price':'R55000'}, {'id':10, 'price':'R60000'}, {'id':11, 'price':'R65000'}, {'id':12, 'price':'R70000'}
    , {'id':13, 'price':'R80000'}, {'id':14, 'price':'R85000'}, {'id':15, 'price':'R90000'}, {'id':16, 'price':'R95000'}
    , {'id':17, 'price':'R100000'}, {'id':18, 'price':'R110000'}, {'id':19, 'price':'R120000'}, {'id':20, 'price':'R130000'}
    , {'id':21, 'price':'R140000'}, {'id':22, 'price':'R150000'}, {'id':23, 'price':'R160000'}, {'id':24, 'price':'R170000'}];

  	makes();
  	models();
    getNews();

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

    $scope.filterModels = function(id) {
      $scope.filteredModels = filterFilter($scope.models, {'MakeId':id});
    };

    $scope.searchCars = function() {
      //$location.path('/cars/search').search({modelId: $scope.modelSelect.id, maxPrice:$scope.maxPrice, minPrice: $scope.minPrice});
      $location.path('/cars/search').search({id: $scope.modelSelect.id});
    }

    function getNews() {
      NewsService.articles().then(function(news) {
        $scope.news = news;
        $scope.news = $filter('orderBy')($scope.news, 'releaseDate', true);

        if($scope.news.length > 0) {
          $scope.mainArticle = $scope.news[0];  

          var mystring = String($scope.mainArticle.description);
          var length_half = mystring.length / 2;

          $scope.mainArticle.descriptionToDisplay = mystring.slice(0, length_half) + '...';
          $scope.mainArticle.releaseDate = UtilityService.formatDate($scope.mainArticle.releaseDate);
          console.log($scope.mainArticle);
        }        
      });
    };

    $scope.setMainArticle = function (article) {
      $scope.mainArticle = article;

      var mystring = String($scope.mainArticle.description);
      var length_half = mystring.length / 2;

      $scope.mainArticle.descriptionToDisplay = mystring.slice(0, length_half) + '...';
      $scope.mainArticle.releaseDate = UtilityService.formatDate($scope.mainArticle.releaseDate);
    }

    $scope.formatDateTime = function(date) {
        return UtilityService.formatDateTime(date);
    }

    $scope.formatDate = function(date) {
      console.log('Date - ' + date);
        return UtilityService.formatDate(date);
    }

    $scope.displayText = function(str) {
      
      console.log(str);

        var mystring = String(str);

        console.log(mystring);

        var length_half = mystring.length / 2;

        return mystring.slice(0, length_half) + '...';
    }

    $scope.displayText = function(str) {

        var mystring = String(str);

        var length_half = mystring.length / 4;

        return mystring.slice(0, 250) + '...';

    }

  });
