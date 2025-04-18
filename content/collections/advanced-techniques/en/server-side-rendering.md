---
id: be8fad75-98bf-44c4-945a-a0f8a8bb1d94
blueprint: advanced-technique
title: 'Server-side rendering'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716927210
source: 'https://www.docs.developers.amplitude.com/experiment/guides/server-side-rendering/'
---
Use the JavaScript Server SDK and JavaScript Client SDK together to create a seamless server-side rendered experience.

{{partial:admonition type="example" heading=""}}
For a complete example, see the [experiment-node-server demo app](https://github.com/amplitude/experiment-node-server/tree/main/packages/ssr-demo) on GitHub.
{{/partial:admonition}}

## Installation

Install both the JavaScript Server SDK and JavaScript Client SDK.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install --save @amplitude/experiment-js-client @amplitude/experiment-node-server
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/skylab-js-client @amplitude/skylab-js-server
```
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the Server SDK

On server startup, you should run initialize the Server SDK. To distinguish from the Client SDK `Experiment` object, Experiment has aliased the `Experiment` object from the Server SDK as `ExperimentServer` here.

```js
let ExperimentServer;
if (typeof window === 'undefined') {
  console.debug('Initializing Server Experiment');
  ExperimentServer = require('@amplitude/experiment-node-server').Experiment.initialize(
    'server-IAxMYws9vVQESrrK88aTcToyqMxiiJoR',
    { debug: true },
  );
}

export { ExperimentServer };
```

## Fetch variants on request

On each request, fetch variants using the server side SDK. The result is a plain JavaScript object mapping feature keys to variant values. You should store the result where your rendering code can access it in both server side and client side contexts.

```js
const allFlags = await experimentServer.fetchV2({
  id: 'userId',
});

// store the result where the rendering code can access it
global.appProps = { flags: allFlags };
```

## Initialize the Client SDK on Render

At the start of your server side render, initialize the Client SDK with the fetched variants. Here you need to instantiate a `ExperimentClient` that's accessible in the render scope (for example, a React ContextProvider). If you are in the server side context, create a new `ExperimentClient` every time. If you are in the client side, you should create a new `ExperimentClient` if one doesn't already exist.

```js
import { ExperimentClient } from '@amplitude/experiment-js-client';

let experimentClient;

const render = (appProps) => {
const isServerSide = typeof window === 'undefined';
  if (isServerSide) {
    console.debug('Initializing Client Experiment');
    // on the server, we want to create a new ExperimentClient every time
    experimentClient = new ExperimentClient(
      'client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR',
      {
        initialVariants: appProps['features'],
      },
    );
  } else if (!experiment) {
    // in the client, we only want to create the ExperimentClient once
    experimentClient = Experiment.initialize(
      'client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR',
      {
        initialVariants: appProps['features'],
      },
    );
  }
}

// be sure to use a provider or store the ExperimentClient so that it is accessible in the render scope
```

## Get variants on render

After the Client SDK is initialized, you can fetch the flag status in any component.

```js
// experimentClient should be the same ExperimentClient instance that was instantiated in the previous step
experimentClient.variant('flag-key');
```
