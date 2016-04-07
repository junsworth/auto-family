describe('Auto Family User Registration', function() {

  var emailToRegister = 'mypersonal@gmail.com';

  // elements
  var email = element(by.id('email'));
  var password = element(by.id('pwd'));

  var username = element(by.id('profilename'));

  var linkJoin = element(by.id('linkJoin'));

  var submitButton = element(by.id('submitButton'));
  var signInDropdownButton = element(by.id('signin-dropdown'));
  
  var principal = element(by.binding('principal'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/');
  });

  it('should navigate to registration page', function() {
    // click drop button
    signInDropdownButton.click();
    // click join link
    linkJoin.click();

    expect(browser.getTitle()).toEqual('Registration');
  });

  it('should register new user', function() {
    
    signInDropdownButton.click();

    linkJoin.click();

    expect(browser.getTitle()).toEqual('Registration');

    email.sendKeys(emailToRegister);
    password.sendKeys('admin');

    submitButton.click();

    expect(browser.getTitle()).toEqual('Auto Family');

    expect(principal.email).toEqual(emailToRegister);

  });

});