var path = require('path');

describe('Auto Family Admin User Sign In', function() {

  var emailToSignIn = 'joe@gmail.com';
  var passwordToSignIn = 'admin';

  var titleToReg = 'New Citreon C3';
  var headerToReg = 'Citreon C3 2017';
  var descriptionToReg = 'Latest C3 2017 coming in early this and drives well.';

  // elements
  var navBrand = element(by.id('nav-brand-cms'));

  var navBtn = element(by.id('News'));
  var addBtn = element(by.id('addBtn'));
  
  var loginBtn = element(by.id('loginButton'));
  var signInNavBtn = element(by.id('signin-dropdown'));

  var submitBtn = element(by.id('submitBtn'));

  var principalEmail = element(by.binding('principal.email'));

  // sign in form models
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  // register supplier form models
  var title = element(by.model('title'));
  var header = element(by.model('header'));
  var description = element(by.model('description'));
  
  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should create news article', function() {

    var fileToUpload = '../../../stock/poster_970x250.jpg',
    absolutePath = path.resolve(__dirname, fileToUpload);

    // click drop button
    signInNavBtn.click();

    email.sendKeys(emailToSignIn);
    
    password.sendKeys(passwordToSignIn);

    loginBtn.click();

    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family CMS');

    expect(principalEmail.getText()).toEqual(emailToSignIn);
    
    navBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/news');
      });

    addBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/news/edit');
      });

    title.sendKeys(titleToReg);
    header.sendKeys(headerToReg);
    description.sendKeys(descriptionToReg);

    $('input[type="file"]').sendKeys(absolutePath);

    browser.sleep(1000);

    submitBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/news');
      });

  });

});