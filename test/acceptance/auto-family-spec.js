describe('Auto Family App', function() {

  var email = element(by.id('email'));
  var password = element(by.id('pwd'));

  var linkJoin = element(by.id('linkJoin'));

  var submitButton = element(by.id('submitButton'));
  var signInDropdownButton = element(by.id('signin-dropdown'));
  
  var latestResult = element(by.binding('latest'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family');
  });

  it('should go to registration page', function() {
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

    email.sendKeys('joan@gmail.com.');
    password.sendKeys('admin');

    submitButton.click();

    expect(browser.getTitle()).toEqual('Auto Family');

  });

});