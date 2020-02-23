module.exports = {
  moduleFileExtensions: ["js"],
  testRegex: "/spec/.*\\.(spec).(js)$",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "\\.(css)$": "<rootDir>/spec/support/styleMock.js"
  }
};
