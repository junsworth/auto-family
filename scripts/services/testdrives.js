'use strict';

angular.module('familyCarsApp').
factory('TestDriveService', function(request){

	var service = {

		create: function(name, email, phone, carId){
			var promise = request.post('/testdrives/add', {
		      name: name,
		      email: email,
		      phone: phone,
		      requestDate: new Date(),
		      carId: carId
		    }).then(function(testdrive) {
		    	return testdrive;
		    });
		    return promise;
		},
		testdrive: function(id) {
			var promise = request.get('/testdrives/testdrive/:id', {
				id: id
			}).then(function(testdrives) {
	      		return testdrives;
	    	});
	    	return promise;
		},
		testdrives: function() {
			var promise = request.get('/testdrives/testdrives').then(function(testdrives) {
	      		return testdrives;
	    	});
	    	return promise;
		},
		update: function(testdrive) {
			var promise = request.put('/testdrives/update/:id', testdrive, {
	        	id: testdrive.id
	      	});
			return promise;
		}

	};
	return service;

});