module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)test.(ts|tsx|js)'],
  transform: {
    '\\.ts|tsx|js$': ['ts-jest'],
  },
  modulePaths: ['src/'],
  testEnvironment: 'jsdom',

  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: './test-results/jest-coverage',
  coverageReporters: ['json', 'text', 'lcov', 'cobertura'],

  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteNameTemplate: '{filename}',
        outputDirectory: './test-results/jest-junit',
        outputName: 'jest-junit-results.xml',
      },
    ],
  ],
}
