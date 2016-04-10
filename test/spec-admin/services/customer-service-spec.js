'use strict';

describe('Service: CustomerService', function(){

	var aCustomer;
	var aCustomerList = [];
	var CustomerService, $httpBackend;

	// include app module
	beforeEach(module('familyCarsApp'));
	// inject modules
	beforeEach(inject(function(_CustomerService_, _$httpBackend_) {
		
		CustomerService = _CustomerService_;
    	$httpBackend = _$httpBackend_;

		// place here mocked dependencies
		aCustomer = new Customer(1, 'Hertz Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789');

		aCustomerList.push(new Customer(1, 'Hertz Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
		aCustomerList.push(new Customer(2, 'Cheap Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
		aCustomerList.push(new Customer(3, 'Expensive Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
		aCustomerList.push(new Customer(4, 'Classic Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));

	}));

	it('should create new customer', function(){
		var newCustomer;

		$httpBackend.expectPOST('/customers/add', {
			name: aCustomer.name,
			address: aCustomer.address,
			addresstwo: aCustomer.addresstwo,
			city: aCustomer.city,
			email: aCustomer.email,
			phone: aCustomer.phone
		}).respond(aCustomer);

		CustomerService.create(aCustomer.name, aCustomer.address, aCustomer.addresstwo,
		aCustomer.city, aCustomer.email, aCustomer.phone).then(function(customer){
				newCustomer = customer;
			});

		$httpBackend.flush();

		expect(newCustomer).toEqual(aCustomer);

	});

	it('it should get a customer by id', function() {
		
		var result;
		$httpBackend.expectGET('/customers/get/' + aCustomer.id).respond(aCustomer);

		CustomerService.customer(aCustomer.id).then(function(customer){
			result = customer;
			//console.log(JSON.stringify(result));
		});

		$httpBackend.flush();
		
		expect(result).toEqual(aCustomer);

	});

	it('it should get a list of customers', function() {

		var result;

		$httpBackend.expectGET('/customers/customers').respond(aCustomerList);

		CustomerService.customers().then(function(customers){
			result = customers;
		});

		$httpBackend.flush();

		expect(result).toEqual(aCustomerList);

	});

	it('it should update a customer', function(){
		var result;
		var customerToUpdate = new Customer(1, 'Hertz Rentals', '235 Marine Drive', 'Walmer, 6756', 'Port Elizabeth', 'info@hertz.co.za', '041 234 6789');

		$httpBackend.expectPUT('/customers/update/' + customerToUpdate.id, customerToUpdate).respond(200);

		CustomerService.update(customerToUpdate).then(function(status){
			result = status;
		});

		$httpBackend.flush();

		expect(result).toEqual(200);
	});

	it('it should delete a customer', function(){

		var result;
		
		$httpBackend.expectDELETE('/customers/delete/' + 1).respond(200, '');

		CustomerService.delete(aCustomer.id).then(function(status){
			result = status;
		});

		$httpBackend.flush();
		
		expect(result).toEqual(200);
	})

});
