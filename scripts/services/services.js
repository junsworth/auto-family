'use strict';

angular.module('familyCarsApp').
factory('ServicesService', function(request){

	var service = {

		create: function(title, header, description, image){
			var promise = request.post('/services/add', {
		      title: title,
		      header: header,
		      description: description,
		      images: image
		    }).then(function(service) {
		    	return service;
		    });
		    return promise;
		},
		service: function(id) {
			var promise = request.get('/services/service/:id', {
				id: id
			}).then(function(service) {
	      		return service;
	    	});
	    	return promise;
		},
		services: function() {
			var promise = request.get('/services/services').then(function(services) {
	      		return services;
	    	});
	    	return promise;
		},
		update: function(service) {
			var promise = request.put('/services/update/:id', service, {
	        	id: service.id
	      	});
			return promise;
		}

	};
	return service;

});