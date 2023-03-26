/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,js}"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1"
  }
};
