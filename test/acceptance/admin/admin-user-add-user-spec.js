describe('Auto Family Admin Add User', function() {

  var emailToSignIn = 'jonathan@bubbleworks.co.za';
  var passwordToSignIn = 'admin';

  var emailToReg = 'janice@gmail.com';
  var passwordToReg = 'admin';

  

  var navBtn = element(by.id('Users'));
  var addBtn = element(by.id('addBtn'));
  
  var submitBtn = element(by.id('submitBtn'));

  // register user form models
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var principalEmail = element(by.binding('principal.email'));

  it('should add user', function() {
    // click users nav button
    navBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/users');
      });
    // click add user button
    addBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/adduser');
      });
    // send values to form model elements
    email.sendKeys(emailToReg);
    password.sendKeys(passwordToReg);
    element(by.cssContainingText('option', 'User')).click();
    // click submit form
    submitBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/users');
      });

  });

});