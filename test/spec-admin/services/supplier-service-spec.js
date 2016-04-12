'use strict';

describe('Service: SupplierService', function(){

	var aSupplier;
	var aSupplierList = [];
	var SupplierService, $httpBackend;

	// include app module
	beforeEach(module('familyCarsApp'));
	// inject modules
	beforeEach(inject(function(_SupplierService_, _$httpBackend_) {
		
		SupplierService = _SupplierService_;
    	$httpBackend = _$httpBackend_;

		// place here mocked dependencies
		aSupplier = new Supplier(1, 'Hertz Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789');

		aSupplierList.push(new Supplier(1, 'Hertz Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
		aSupplierList.push(new Supplier(2, 'Cheap Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
		aSupplierList.push(new Supplier(3, 'Expensive Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
		aSupplierList.push(new Supplier(4, 'Classic Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));

	}));

	it('should create new supplier', function(){
		var newSupplier;

		$httpBackend.expectPOST('/suppliers/add', {
			name: aSupplier.name,
			address: aSupplier.address,
			addresstwo: aSupplier.addresstwo,
			city: aSupplier.city,
			email: aSupplier.email,
			phone: aSupplier.phone
		}).respond(aSupplier);

		SupplierService.create(aSupplier.name, aSupplier.address, aSupplier.addresstwo,
		aSupplier.city, aSupplier.email, aSupplier.phone).then(function(supplier){
				newSupplier = supplier;
			});

		$httpBackend.flush();

		expect(newSupplier).toEqual(aSupplier);

	});

	it('it should get a supplier by id', function() {
		
		var result;
		$httpBackend.expectGET('/suppliers/get/' + aSupplier.id).respond(aSupplier);

		SupplierService.supplier(aSupplier.id).then(function(supplier){
			result = supplier;
			//console.log(JSON.stringify(result));
		});

		$httpBackend.flush();
		
		expect(result).toEqual(aSupplier);

	});

	it('it should get a list of suppliers', function() {

		var result;

		$httpBackend.expectGET('/suppliers/suppliers').respond(aSupplierList);

		SupplierService.suppliers().then(function(suppliers){
			result = suppliers;
		});

		$httpBackend.flush();

		expect(result).toEqual(aSupplierList);

	});

	it('it should update a supplier', function(){
		var result;
		
		var supplierToUpdate = new Supplier(1, 'Hertz Rentals', '235 Marine Drive', 'Walmer, 6756', 'Port Elizabeth', 'info@hertz.co.za', '041 234 6789');

		$httpBackend.expectPUT('/suppliers/update/' + supplierToUpdate.id, supplierToUpdate)
		.respond(200);

		SupplierService.update(supplierToUpdate).then(function(status){
			result = status;
		});

		$httpBackend.flush();

		expect(result).toEqual(200);
	});

	it('it should delete a supplier', function(){
		var result;
		$httpBackend.expectDELETE('/suppliers/delete/' + 1).respond(200);

		SupplierService.delete(aSupplier.id).then(function(status){
			result = status;
		});

		$httpBackend.flush();
		
		expect(result).toEqual(200);
	})

});
