# Getting Started with Snowblind
This project was created with [Create Snowblind App](https://continuum-ai.de/docs/snowblind/cli/create-snowblind-app)

## Dependencies
`@snowblind/core` will act as the renderer and component provider.
`@snowblind/hooks` provides additional functionality to interact with the DOM.
`@snowblind/testing` enables the integration of live-testing on build.

## Scripts
There are several different ways to start off with Snowblind, you can run these scripts to get started easily:

### npm start
Starts a development server on [https://localhost:8000](https://localhost:8000) that will reload on every code change.

### npm test
Tests can be provided in the `test` directory of your project, they are specified as `[name].test.js` files to be picked up on running the command.
There is also the [Snowblind Testing VSCode extension](https://marketplace.visualstudio.com/items?itemName=Letsmoe.snowblind-testing) that will run every test on a code change providing immediate feedback.

### npm run build
Builds the app in `production` mode with the webpack bundler if not otherwise specified.
The build is generated in a minified format, the filename will by default be set to `main.js` for the development build or `main.min.js` for the production build.

## Recommendations
We would recommend to use TypeScript since it can check for errors before the building phase is run. If you're uncertain or have never heard of it you may [check out their official site](https://www.typescriptlang.org/).

If you're new to Snowblind you may also want to consult our [Documentation](https://continuum-ai.de/docs/snowblind) or our full rundown of every single feature Snowblind offers in a more beginner-friendly article based way [here](https://continuum-ai.de/publishing/continuum/snowblind/getting-started).

## Components
Snowblind works with `Components`, if you never worked in a component oriented environment it might be worthwhile to read our article about [component based design](https://continuum-ai.de/publishing/continuum/snowblind/component-based-design).

\
\
Made by [Continuum-AI](https://continuum-ai.de) with ❤️