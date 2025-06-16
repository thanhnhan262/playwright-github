import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './utils/custom-fixtures';
import dotnet from 'dotenv'
import path from 'path';
import { de } from '@faker-js/faker';

const env = process.env.ENV ? process.env.ENV : 'qa'
dotnet.config({path: path.join(__dirname, `./test-envs/${env}.env`)})

export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  timeout: 60 * 1000,
  use: {
    baseURL: process.env.BASE_URL,
    anotherBaseUrl: 'https://another.base.url',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10 * 1000,
    
    // Configure browser to start maximized
    // viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: /global\.setup\.ts/
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json'
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: '.auth/user.json'
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop WebKit'],
    //     storageState: '.auth/user.json'
    //   },
    //   dependencies: ['setup'],
    // },

  ],

});
