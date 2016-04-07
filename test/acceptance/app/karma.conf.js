exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['user-navigation-spec.js', 'user-sign-in-spec.js'],
  capabilities: {
    browserName: 'firefox'
  }
}