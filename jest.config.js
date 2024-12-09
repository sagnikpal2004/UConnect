module.exports = {
  preset: 'ts-jest',  // Use ts-jest for transforming TypeScript files
  testEnvironment: 'node',  // Use Node environment
  globals: {
    'ts-jest': {
      tsconfig: 'testing/tsconfig.json',  // Path to the tsconfig.json for the tests
    },
  },
  roots: ['<rootDir>/testing'],  // The folder where test files are located
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest to transform .ts and .tsx files
  },
  testMatch: ['**/testing/**/*.test.ts'],  // The pattern to match test files
};