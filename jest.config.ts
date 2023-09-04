import type { Config } from 'jest'

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  verbose: true,
}

// eslint-disable-next-line import/no-default-export
export default config
