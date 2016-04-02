describe('Auto Family Admin Sign In', function() {

  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var navBrand = element(by.id('nav-brand'));

  var loginButton = element(by.id('loginButton'));
  var signInDropdownButton = element(by.id('signin-dropdown'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in admin user', function() {
    // click drop button
    signInDropdownButton.click();

    email.sendKeys('jonathan@bubbleworks.co.za');
    
    password.sendKeys('admin');

    loginButton.click();

    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family IMS');

    browser.get('http://10.0.0.9:3000/admin/#/users');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/users');
      });

  });

});