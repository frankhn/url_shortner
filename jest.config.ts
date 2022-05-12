import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testRegex: '\\.spec.ts$',
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    'handlers/migrations',],
  modulePathIgnorePatterns: ['.aws-sam'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/tests/dotenv-config.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

export default config;
