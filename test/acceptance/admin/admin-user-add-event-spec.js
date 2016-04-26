var path = require('path');

describe('Auto Family Add Event', function() {

  // local variables
  var titleToReg = 'New BM3 Z3';
  var headerToReg = 'Citreon C3 2017';
  var descriptionToReg = 'Latest C3 2017 coming in early this and drives well.';

  var fileToUpload = '../../../stock/poster_970x250.jpg',
  absolutePath = path.resolve(__dirname, fileToUpload);

  // view elements
  var navBtn = element(by.id('Events'));
  var addBtn = element(by.id('addBtn'));
  
  var submitBtn = element(by.id('submitBtn'));

  // register supplier form models
  var title = element(by.model('title'));
  var header = element(by.model('header'));
  var description = element(by.model('description'));
  
  it('should create new event', function() {

    // click events nav button
    navBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });

    // click add event button
    addBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events/edit');
      });

    // send values to form model elements
    title.sendKeys(titleToReg);
    header.sendKeys(headerToReg);
    description.sendKeys(descriptionToReg);

    // pass the form element the file's absolute path
    $('input[type="file"]').sendKeys(absolutePath);
    
    // let browser sleep
    browser.sleep(1000);
    // click submit form
    submitBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });

  });

});