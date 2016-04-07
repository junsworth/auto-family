function Supplier(id, name, address, addressTwo, city, email, phone){
	
	this.id = id;
	this.name = name;
	this.address  = address;
	this.addressTwo = addressTwo;
	this.city = city;
	this.email = email;
	this.phone = phone;

	this.changeId = function (id) {
		this.id = id;
	};

	this.changeName = function (name) {
        this.name = name;
    };
    
}