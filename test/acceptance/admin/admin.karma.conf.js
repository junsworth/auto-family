exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['admin-user-sign-in-spec.js', 'admin-user-navigate-spec.js', 'admin-user-add-user-spec.js', 'admin-user-add-supplier-spec.js',
  'admin-user-add-customer-spec.js', 'admin-user-add-event-spec.js', 'admin-user-add-service-spec.js'],
  capabilities: {
    browserName: 'chrome'
  }
}
