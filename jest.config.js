module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)test.(ts|tsx|js)'],
  transform: {
    '\\.ts|tsx|js$': ['ts-jest'],
  },
  modulePaths: ['src/'],
  modulePathIgnorePatterns: ['src/examples'],
  testEnvironment: 'jsdom',
}
