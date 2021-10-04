/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: [
    "**/*.test.ts"
  ],
};
