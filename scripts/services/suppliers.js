'use strict';
angular.module('familyCarsApp').
factory('SupplierService', function(request){
	var service = {
		create: function(name, address, addresstwo, city, email, phone){
			var promise = request.post('/suppliers/add', {
				name: name,
				address: address,
				addresstwo: addresstwo,
				city: city,
				email: email,
				phone: phone
		    }).then(function(supplier) {
		    	return supplier;
		    });
		    return promise;
		},
		supplier: function(id) {
			var promise = request.get('/suppliers/get/:id', {
				id: id
			}).then(function(supplier) {
	      		return supplier;
	    	});
	    	return promise;
		},
		suppliers: function() {
			var promise = request.get('/suppliers/suppliers').then(function(suppliers) {
	      		return suppliers;
	    	});
	    	return promise;
		},
		update: function(supplier) {
			var promise = request.put('/suppliers/update/:id', supplier, {
	        	id: supplier.id
	      	});
			return promise;
		},
		delete: function(id) {
			var promise = request.delete('/suppliers/delete/:id', {
		        id: id
		    });
		    return promise;
		}
	};
	return service;
});