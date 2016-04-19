describe('Auto Family Admin Sign In And Add User', function() {

  var emailToSignIn = 'jonathan@bubbleworks.co.za';
  var passwordToSignIn = 'admin';

  var emailToReg = 'james@gmail.com';
  var passwordToReg = 'admin';

  // elements
  var navBrand = element(by.id('nav-brand'));

  var navBtn = element(by.id('Users'));
  var addBtn = element(by.id('addBtn'));
  
  var loginBtn = element(by.id('loginButton'));
  var signInNavBtn = element(by.id('signin-dropdown'));

  var submitBtn = element(by.id('submitBtn'));

  // register user form models
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var principalEmail = element(by.binding('principal.email'));

  beforeEach(function() {
    browser.get('http://197.85.186.242:3005/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in admin user and add a user', function() {
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
        expect(url).toEqual('/users');
      });

    addBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/adduser');
      });

    email.sendKeys(emailToReg);
    password.sendKeys(passwordToReg);
    element(by.cssContainingText('option', 'Staff')).click();

    submitBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/users');
      });

  });

});