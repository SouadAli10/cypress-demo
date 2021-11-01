# cypress-demo

This file represents a demo for the usage of cypress on the [test website](https://www.saucedemo.com/)

## Installation

Please make sure that you have npm installed to be able to run the project 

```
npm install
```

## Usage

In order to run the CLI tool for cypress please run this command:

```
npx cypress open
```
In order to run cypres headlessly please run this command:

```
npx cypress run
```
This will run the test on chromium for more options please refer to [this link](https://docs.cypress.io/guides/guides/command-line)

## Guide

To run Cypress locally please make sure that you have the browser installed on your machine as of now Cypress support the following [browsers](https://docs.cypress.io/guides/guides/launching-browsers#Browser-versions-supported)

## Issues

Due to the issues with CORS on Firefox that can not be disabled for testing using Cypress running the test cases on Cypress would result the test cases to fail [Please Refer to this issue on bugzilla for reference](https://bugzilla.mozilla.org/show_bug.cgi?id=1039678).