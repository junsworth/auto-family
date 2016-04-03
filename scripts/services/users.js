'use strict';

angular.module('familyCarsApp').
factory('UserService', function(request){

	var service = {

		user: function(id) {
			var promise = request.get('/users/get/:id', {
				id: id
			}).then(function(user) {
	      		return user;
	    	});
	    	return promise;
		},
		users: function() {
			var promise = request.get('/auth/users').then(function(users) {
	      		return users;
	    	});
	    	return promise;
		},
		update: function(user) {
			var promise = request.put('/users/update/:id', user, {
	        	id: user.id
	      	});
			return promise;
		}

	};
	return service;

});