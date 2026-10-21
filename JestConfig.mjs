import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

export default createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/Setup.ts'],
  testMatch: ['<rootDir>/tests/**/*Test.ts', '<rootDir>/tests/**/*Test.tsx'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  clearMocks: true,
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/core/**/*.{ts,tsx}', '!src/core/@types/**', '!src/core/mocks/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json-summary'],
});
