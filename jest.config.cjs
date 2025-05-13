module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/components', '<rootDir>/contexts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: '\\.(spec|test)\\.(ts|tsx)$',
  transformIgnorePatterns: ['/node_modules/'],
};
