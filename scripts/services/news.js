'use strict';

angular.module('familyCarsApp').
factory('NewsService', function(request){

	var service = {

		create: function(title, header, description, image, releaseDate){
			var promise = request.post('/news/add', {
		      title: title,
		      header: header,
		      description: description,
		      images: image,
		      releaseDate: releaseDate
		    }).then(function(article) {
		    	return article;
		    });
		    return promise;
		},
		article: function(id) {
			var promise = request.get('/news/article/:id', {
				id: id
			}).then(function(offer) {
	      		return offer;
	    	});
	    	return promise;
		},
		articles: function() {
			var promise = request.get('/news/articles').then(function(articles) {
	      		return articles;
	    	});
	    	return promise;
		},
		update: function(article) {
			var promise = request.put('/news/update/:id', article, {
	        	id: article.id
	      	});
			return promise;
		}

	};
	return service;

});