exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['admin-user-add-supplier-spec.js'],
  capabilities: {
    browserName: 'firefox'
  }
}