'use strict';

angular.module('familyCarsApp').
factory('EventService', function(request){

	var service = {

		create: function(title, header, description, image, startDate, endDate){
			var promise = request.post('/events/add', {
		      title: title,
		      header: header,
		      description: description,
		      images: image,
		      startDate: startDate,
		      endDate: endDate
		    }).then(function(event) {
		    	return event;
		    });
		    return promise;
		},
		event: function(id) {
			var promise = request.get('/events/event/:id', {
				id: id
			}).then(function(event) {
	      		return event;
	    	});
	    	return promise;
		},
		events: function() {
			var promise = request.get('/events/events').then(function(events) {
	      		return events;
	    	});
	    	return promise;
		},
		update: function(event) {
			var promise = request.put('/events/update/:id', event, {
	        	id: event.id
	      	});
			return promise;
		}

	};
	return service;

});