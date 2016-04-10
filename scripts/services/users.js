'use strict';

angular.module('familyCarsApp').
factory('UserService', function(request){

	var service = {

		create: function(email, password, type) {
			var promise = request.post('/auth/add', {
				email: email,
				password: password,
				UserTypeId: type
			}).then(function(user){
				return user;
			});
			return promise;
		},
		login: function(email, password) {
			var promise = request.post('/auth/login', {
		      email: email,
		      password: password
		    }).then(function(user) {
		    	return user;
		    });
		    return promise;
		},
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
	      	}).then(function(status){
	      		return status;
	      	});
			return promise;
		},
		delete: function(id) {
			var promise = request.delete('/users/delete/:id', {
		        id: id
		    }).then(function(status){
		    	return status;
		    });
		    return promise;
		}

	};
	return service;

});