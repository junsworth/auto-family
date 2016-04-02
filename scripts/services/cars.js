'use strict';

angular.module('familyCarsApp').
factory('CarService', function(request){

	var service = {

		create: function(header, subHeader, description, mileage, year, purchasePrice, salePrice, insertDate, images, ModelId, SupplierId){

			var promise = request.post('/cars/add', {
					header: header,
					subHeader: subHeader,
					description: description,
					mileage: mileage,
					year: year,
					purchasePrice: purchasePrice,
					salePrice: salePrice,
					insertDate: insertDate,
					images: images,
					ModelId: ModelId,
					SupplierId: SupplierId
				}).then(function(car) {
					return car;
				});
				return promise;
		},
		car: function(id) {
			var promise = request.get('/cars/get/:id', {
				id: id
			}).then(function(car) {
	      		return car;
	    	});
	    	return promise;
		},
		cars: function() {
			var promise = request.get('/cars/cars').then(function(cars) {
	      		return cars;
	    	});
	    	return promise;
		},
		update: function(car) {
			var promise = request.put('/cars/update/:id', car, {
	        	id: car.id
	      	});
			return promise;
		}

	};
	return service;

});