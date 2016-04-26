describe('Auto Family Admin User Sign In', function() {

  // local variables
  var emailToSignIn = 'jonathan@bubbleworks.co.za';
  var passwordToSignIn = 'admin';

  // sign in form models
  var email = element(by.model('email'));
  var password = element(by.model('password'));
  // sign in variable bindings
  var principalEmail = element(by.binding('principal.email'));
  
  // view elements
  var navBrand = element(by.id('nav-brand'));

  // buttons  
  var loginButton = element(by.id('loginButton'));
  var dropDownBtn = element(by.id('signin-dropdown'));

  it('should have a title', function() {
    browser.get('http://10.0.0.9:3000/admin');
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in ', function() {
    // click drop down menu
    dropDownBtn.click();
    // send keys to models
    email.sendKeys(emailToSignIn);    
    password.sendKeys(passwordToSignIn);
    // click sign in button
    loginButton.click();
    // confirm site location
    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family IMS');
    // compare emails
    expect(principalEmail.getText()).toEqual(emailToSignIn);
  });

});