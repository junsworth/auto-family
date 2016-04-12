function Car(id, header, subHeader, description, mileage, year, purchasePrice, salePrice,
	insertDate, saleDate, CustomerId, ModelId, SupplierId){
	
	this.id = id;
	this.header = header;
	this.subHeader  = subHeader;
	this.description = description;
	this.mileage = mileage;
	this.year = year;
	this.purchasePrice = purchasePrice;
	this.salePrice = salePrice;
	this.insertDate = insertDate;
	this.saleDate = saleDate;
	this.CustomerId = CustomerId;
	this.ModelId = ModelId;
	this.SupplierId = SupplierId;


	this.changeId = function (id) {
		this.id = id;
	};
    
}