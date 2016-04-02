'use strict';

angular.module('familyCarsApp').
factory('CustomerService', function(request){

	var service = {

		create: function(name, address, addresstwo, city, email, phone){
			var promise = request.post('/customers/add', {
				name: name,
				address: address,
				addresstwo: addresstwo,
				city: city,
				email: email,
				phone: phone
		    }).then(function(customer) {
		    	return customer;
		    });
		    return promise;
		},
		customer: function(id) {
			var promise = request.get('/customers/get/:id', {
				id: id
			}).then(function(customer) {
	      		return customer;
	    	});
	    	return promise;
		},
		customers: function() {
			var promise = request.get('/customers/customers').then(function(customers) {
	      		return customers;
	    	});
	    	return promise;
		},
		update: function(customer) {
			var promise = request.put('/customers/update/:id', customer, {
	        	id: customer.id
	      	});
			return promise;
		},
		delete: function(id) {
			var promise = request.delete('/customers/delete/:id', {
		        id: id
		    });
		    return promise;
		}

	};

	return service;

});