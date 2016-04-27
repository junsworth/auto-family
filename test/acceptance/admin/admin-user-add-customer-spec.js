describe('Auto Family Admin User Sign In', function() {

  // local variables
  var nameToReg = 'Mary Mattison';
  var addressToReg = '235 Marine Drive';
  var addressTwoToReg = 'Summerstrand, 6001';
  var cityToReg = 'Port Elizabeth';
  var phoneToReg = '041 345 6788';
  var emailToReg = 'mary@cust.com';

  // view elements
  var navButton = element(by.id('Customers'));
  var addBtn = element(by.id('addBtn'));
  var submitBtn = element(by.id('submitBtn'));
  
  // register supplier form models
  var name = element(by.model('name'));
  var address = element(by.model('address'));
  var addresstwo = element(by.model('addresstwo'));
  var city = element(by.model('city'));
  var emailInput = element(by.model('email'));
  var phone = element(by.model('phone'));

  it('should add customer', function() {
    
    // click cutomers nav button    
    navButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });

    // click add customer button
    addBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/addcustomer');
      });

    // send values to form model elements
    name.sendKeys(nameToReg);
    address.sendKeys(addressToReg);
    addresstwo.sendKeys(addressTwoToReg);
    city.sendKeys(cityToReg);
    emailInput.sendKeys(emailToReg);
    phone.sendKeys(phoneToReg);
    
    // click submit form
    submitBtn.click();
    
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });

  });

});