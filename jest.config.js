const {
    defaults
  } = require('jest-config');
  
  module.exports = {
    testEnvironment: "node",
    testMatch: ['**/test/**/*.+(ts)'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  };
  