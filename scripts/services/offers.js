'use strict';

angular.module('familyCarsApp').
factory('OffersService', function(request){

	var service = {

		create: function(title, header, description, image, startDate, endDate){
			var promise = request.post('/offers/add', {
		      title: title,
		      header: header,
		      description: description,
		      images: image,
		      startDate: startDate,
		      endDate: endDate
		    }).then(function(offer) {
		    	return service;
		    });
		    return promise;
		},
		offer: function(id) {
			var promise = request.get('/offers/offer/:id', {
				id: id
			}).then(function(offer) {
	      		return offer;
	    	});
	    	return promise;
		},
		offers: function() {
			var promise = request.get('/offers/offers').then(function(offers) {
	      		return offers;
	    	});
	    	return promise;
		},
		update: function(offer) {
			var promise = request.put('/offers/update/:id', offer, {
	        	id: offer.id
	      	});
			return promise;
		}

	};
	return service;

});