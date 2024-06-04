## Tech Stack

**Libraries:** chai, mocha, supertest, get-nested-value, mochawesome, faker.js

**Requirements:** Node (min version 14)

## Installation

Install with npm

```bash
  npm install
```

## Running Tests

To run tests, run the following command

```bash
  npm run projects-mochawesome ##Reporter will be mochawesome
  npm run projects-discord ##Report will be delivered via Discord
```

#### Execution report can be find at /mochawesome-report/mochawesome.html

#### Structure of the project: 

## Authentication:

**Authentication was done as suggested using a personal API Token which i stored in the config.js file**

## Crud:

**Faker.js library was used for random name generation**

**Stored the supported colors in an array and with a random function selected one of them when creating project**

**Stored Negative Scenarios in before hook in order to mantain a clean file hierarchy and not have multiple tests among multiple files**

**Validation done for negative scenarios was based on the response's status code and assertion the object was undefined**

**getProject request is called after creation and update of a project to validate that the data changed is stored in global.env**

**In Positive Scenarios i have validated the values and types the response contained**

## Reporting:

**As requested i have used a simple reporting mechanism to log the results(mochawesome) and implemented a Discord Reporter with basic information on the test run**
