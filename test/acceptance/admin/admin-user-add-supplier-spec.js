describe('Auto Family Admin User Sign In', function() {

  var emailToSignIn = 'jonathan@bubbleworks.co.za';
  var passwordToSignIn = 'admin';

  var nameToReg = 'Grahamstown Cheap Rentals';
  var addressToReg = '235 Marine Drive';
  var addressTwoToReg = 'Summerstrand, 6001';
  var cityToReg = 'Port Elizabeth';
  var phoneToReg = '041 345 6788';
  var emailToReg = 'jonn@supplier.com';

  // elements
  var navBrand = element(by.id('nav-brand'));

  var navBtn = element(by.id('Suppliers'));
  var addBtn = element(by.id('addBtn'));
  
  var loginBtn = element(by.id('loginButton'));
  var signInNavBtn = element(by.id('signin-dropdown'));

  var submitBtn = element(by.id('submitBtn'));

  var principalEmail = element(by.binding('principal.email'));

  // sign in form models
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  // register supplier form models
  var name = element(by.model('name'));
  var address = element(by.model('address'));
  var addresstwo = element(by.model('addresstwo'));
  var city = element(by.model('city'));
  var email_for_form = element(by.model('email'));
  var phone = element(by.model('phone'));

  beforeEach(function() {
    browser.get('http://10.0.0.11:3000/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in admin user', function() {
    // click drop button
    signInNavBtn.click();

    email.sendKeys(emailToSignIn);
    
    password.sendKeys(passwordToSignIn);

    loginBtn.click();

    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family IMS');

    expect(principalEmail.getText()).toEqual(emailToSignIn);
    
    navBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });

    addBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/addsupplier');
      });

    name.sendKeys(nameToReg);
    address.sendKeys(addressToReg);
    addresstwo.sendKeys(addressTwoToReg);
    city.sendKeys(cityToReg);
    email_for_form.sendKeys(emailToReg);
    phone.sendKeys(phoneToReg);

    submitBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });

  });

});