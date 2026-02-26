---
id: e7d9f2a3-4b6c-4e8f-a0b2-c3d4e5f6a7b8
blueprint: experiment
title: 'Deployments and environments'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
---
A deployment is the bridge between your application and Amplitude Experiment. It's a named API key that authorizes your SDK to fetch flag configurations and tells Experiment which flags to serve.

**One deployment per platform or service. One project per environment (dev, staging, prod). Never share deployment keys across environments.**

## How deployments work

When you call `Experiment.initialize('DEPLOYMENT_KEY')`, the SDK uses that key to:

1. Identify which Amplitude project this SDK instance belongs to.
2. Authorize requests to fetch flag configurations.
3. Determine which flags associate with this deployment.

Each flag associates with one or more deployments. A flag not associated with your deployment isn't served to your SDK, even if it exists in the same project.

## Client-side vs. server-side deployments

Deployments have a type that affects their security and behavior:

| Type | Used in | Example SDKs | Security |
| --- | --- | --- | --- |
| **Client-side** | Browser, mobile apps | JavaScript, iOS, Android, React Native, Flutter | Keys are visible in client code — acceptable for client-side flags |
| **Server-side** | Backend services | Node.js, Python, Go, JVM, Ruby, PHP | Keys must stay secret — never expose in client code |

{{partial:admonition type='warning' heading="Never expose server-side keys"}}
Server-side deployment keys have broader access. Never include them in browser JavaScript, mobile apps, or any code that runs on the client. Always use client-side deployment keys for client-side SDKs.
{{/partial:admonition}}

## Set up environments

Amplitude projects map directly to environments. Create a separate project for each environment your application uses.

Recommended project and deployment structure:

```
Project: MyApp - Development
  Deployments:
    - web-dev         (client-side)
    - api-dev         (server-side)

Project: MyApp - Staging
  Deployments:
    - web-staging     (client-side)
    - api-staging     (server-side)

Project: MyApp - Production
  Deployments:
    - web             (client-side)
    - ios             (client-side)
    - android         (client-side)
    - api             (server-side)
    - recommendation-engine  (server-side)
```

{{partial:admonition type='tip' heading="Store keys in environment variables"}}
Never hardcode deployment keys. Store them in environment variables and reference them at runtime:

```bash
# .env
AMPLITUDE_DEPLOYMENT_KEY=your-key-here
```

```typescript
const experiment = Experiment.initialize(process.env.AMPLITUDE_DEPLOYMENT_KEY);
```
{{/partial:admonition}}

## Create a deployment

1. Go to *Experiments > Deployments*.
2. Click **Create Deployment**.
3. Select the project.
4. Name the deployment after the platform or service — for example: `ios`, `api-service`, `web-prod`.
5. Select **Client** or **Server**.
6. Click **Create a Deployment**.
7. Copy the generated deployment key — you'll use this to initialize your SDK.

## Associate a flag with a deployment

When you create or edit a flag, assign it to one or more deployments. The flag only evaluates for SDKs initialized with those deployment keys.

1. Open your flag at *Experiments > Feature Flags*.
2. In the **Deployment** dropdown, select the deployments this flag should serve.
3. Save and activate the flag.

## Promote flags across environments

When you're ready to move a flag from dev to production:

1. Open the flag in the dev project.
2. Click the **...** menu and select **Copy to project**.
3. Select your staging or production project.
4. Review and update the targeting rules for the new environment.
5. Associate the flag with the appropriate production deployment.
6. Activate the flag when ready.

{{partial:admonition type='warning' heading="Flags don't sync automatically"}}
Flags, experiments, and deployments only exist within a single project. They don't sync across projects automatically. If you update a flag in dev, manually promote the changes to staging and production.
{{/partial:admonition}}
