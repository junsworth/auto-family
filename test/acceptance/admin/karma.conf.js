exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['staff-user-add-car-bmw-spec.js', ],
  capabilities: {
    browserName: 'chrome'
  }
}