describe('Auto Family App', function() {

  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var submitButton = element(by.id('submitButton'));
  var signInDropdownButton = element(by.id('signin-dropdown'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family');
  });

  it('should sign in user', function() {
    // click drop button
    signInDropdownButton.click();

    email.sendKeys('joan@gmail.com');
    
    password.sendKeys('admin');

    submitButton.click();

    expect(browser.getTitle()).toEqual('Auto Family');

  });

});