
# ComedorUniversitarioUI

This is a base template for Angular projects used by the Rapid team in Argentina.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Development server

Run `npm run start` to launch the development server and navigate to `http://localhost:4200/`

 The app will automatically reload if you change any of the source files.

### Environment configuration

There are 6 different environment configuration files:

 - **isolated-local:** locally served front-end with a mock back-end.
 - **integrated-local:** locally served front-end and back-end.
 - **development:** development environment for deploy.
 - **testing:** testing environment for deploy.
 - **staging:** staging environment for deploy.
 - **production:** production environment for deploy.

The `npm run start` script uses the **isolated-local** environment by default.

To serve the app using a specific environment configuration, run `npm run start:<environment name>`, replacing `<environment name>` with the name of the environment you want to use.

#### Example:

> `npm run start:integrated-local`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Environment configuration

The same environment configurations that apply to the `npm run start` script also apply to the `npm run build` script.

The exception is that the `npm run build` script uses the **development** environment by default.

To build the app using a specific environment configuration, run `npm run build:<environment name>`, replacing `<environment name>` with the name of the environment you want to use.

#### Example:

> `npm run build:production`

## Running linter

Run `npm run lint` to execute the linting rules via [TSLint](https://palantir.github.io/tslint/).

TSLint will also auto-fix all the rule violations with fixes available.

## Running unit tests

Run `npm run unit` to execute the unit tests via [Jest](https://jestjs.io/en/).

To execute the unit tests every time you change any of the source files, run `npm run unit:watch` instead.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests headlessly via [Cypress](https://www.cypress.io/).

To execute the end-to-end tests in an interactive visual environment, run `npm run e2e:interactive` instead.

## Running all together

Run `npm run test` to execute the linting rules, unit tests and end-to-end tests in a single run.