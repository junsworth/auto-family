var path = require('path');

describe('Auto Family Add Event', function() {

  // local variables
  var titleToReg = 'Opel at the Geneva Motor Show (March 3rd to 13th)';
  var headerToReg = 'Geneva Motor Show (March 3rd to 13th)';
  var descriptionToReg = 'Opel at Geneva Motor Show 2016 Opel at Geneva Motor Show 2016 Jan 29, 2016 Motor Shows See Opel at the 86th Geneva Motor Show. The breathtaking GT Concept and the exciting Mokka X will have their world premiere at the Geneva Motor Show (March 3rd to 13th).';

  var fileToUpload = '../../../stock/Opel_geneva_2016_Masthead_1024x440.jpg',
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
    browser.sleep(500);
    // click add event button
    addBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events/edit');
      });
    browser.sleep(500);
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
    browser.sleep(500);
  });

});