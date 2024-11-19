// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',

  workers: 3, //How many test files run at a time.

  retries: 1, //Retries for failed test cases.

  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  // reporter: 'html',
  reporter: [["line"], ["allure-playwright"]],
  
  projects: [
    {
      name: "safari",
      use: {
        browserName : 'webkit',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',//off,on
        ...devices['iPhone 8'] //Screen size: In which size the web page opened.
      }
    },
    {
      name: "chrome",
      use: {
        browserName : 'chromium',
        headless : false,
        screenshot : 'on',
        video: 'retain-on-failure',
        ignoreHttpsError: true, //for avoiding the ssl certification error
        permission: ['geolocation'],
        trace : 'on',//off, on, retain-on-failure
        //viewport: {width: 720, height: 720} //Screen size: In which size the web page opened.
        // ...devices['Pixel 5']
      }
    }
  ],
};

module.exports = config;