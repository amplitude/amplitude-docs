---
id: 1dc8fb12-66f4-4ff0-bf73-e2e52fcd78b1
blueprint: experiment
title: 'Quickstart'
this_article_will_help_you:
  - 'Get a feature flag working in your application in 5 minutes'
  - 'Install the SDK, create a flag, and verify your first variant'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
---
Get a feature flag working in your application in 5 minutes. This guide covers Feature Experiment with client-side remote evaluation — the most common starting point for new integrations.

{{partial:admonition type='note' heading="Web Experiment"}}
Looking for the no-code visual editor? See [Set up a web experiment](/docs/web-experiment/set-up-a-web-experiment).
{{/partial:admonition}}

## Prerequisites

Before you start:

- An Amplitude account with Experiment enabled.
- A deployment key — find this at *Experiments > Deployments* in the Amplitude UI.
- Developer access to the application you're integrating.

## Step 1: Create a flag

1. In Amplitude, go to *Experiments > Feature Flags*.
2. Click **Create Feature Flag**.
3. Name the flag (for example, `my-first-flag`). Amplitude generates the flag key from the name you choose.
4. Set **Evaluation mode** to **Remote**.
5. Click **Create**.
6. In the **Variants** section, click the **+** icon and add a variant with value `treatment`.
7. Under **Deployment**, select your deployment.
8. In the **All users** segment, set allocation to 50% treatment, 50% off.
9. Click **Activate flag**.

{{partial:admonition type='tip' heading="Your deployment key"}}
Find your deployment key at *Experiments > Deployments > [your deployment] > Deployment Key*. Copy it — you'll use it to initialize the SDK.
{{/partial:admonition}}

## Step 2: Install the SDK

{{partial:tabs tabs="JavaScript, Node.js, Python, Go, iOS, Android, React Native, Flutter, JVM, Ruby, PHP"}}
{{partial:tab name="JavaScript"}}
```bash
# Experiment SDK only
npm install @amplitude/experiment-js-client

# Or install the Unified SDK for all Amplitude products
npm install @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="Node.js"}}
```bash
npm install @amplitude/experiment-node-js
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```bash
pip install amplitude-experiment
```
{{/partial:tab}}
{{partial:tab name="Go"}}
```bash
go get github.com/amplitude/experiment-go-server
```
{{/partial:tab}}
{{partial:tab name="iOS"}}
Add the package in Xcode: *File > Add Package Dependencies*.

```
https://github.com/amplitude/experiment-ios-client
```

Or with CocoaPods:

```ruby
pod 'AmplitudeExperiment', '~> x.x.x'
```
{{/partial:tab}}
{{partial:tab name="Android"}}
```kotlin
// build.gradle (app module)
implementation 'com.amplitude:experiment-android:+'
```
{{/partial:tab}}
{{partial:tab name="React Native"}}
```bash
npm install @amplitude/experiment-react-native-client
```
{{/partial:tab}}
{{partial:tab name="Flutter"}}
```yaml
# pubspec.yaml
dependencies:
  amplitude_experiment: ^x.x.x
```
{{/partial:tab}}
{{partial:tab name="JVM"}}
```kotlin
// build.gradle
implementation 'com.amplitude:experiment-jvm-server:+'
```
{{/partial:tab}}
{{partial:tab name="Ruby"}}
```bash
gem install amplitude-experiment
```
{{/partial:tab}}
{{partial:tab name="PHP"}}
```bash
composer require amplitude/experiment-php
```
{{/partial:tab}}
{{/partial:tabs}}

## Step 3: Initialize and fetch variants

Initialize the SDK once at app startup with your deployment key, then fetch variants for the current user.

{{partial:tabs tabs="JavaScript, Node.js, Python, Go"}}
{{partial:tab name="JavaScript"}}
```typescript
import { Experiment } from '@amplitude/experiment-js-client';

// Initialize once at app startup
const experiment = Experiment.initializeWithAmplitudeAnalytics('DEPLOYMENT_KEY');

// Fetch variants for the current user
await experiment.fetch();
```
{{/partial:tab}}
{{partial:tab name="Node.js"}}
```typescript
import { Experiment } from '@amplitude/experiment-node-js';

// Initialize once at server startup
const experiment = Experiment.initialize('DEPLOYMENT_KEY');

// Fetch variants per request — pass the user object
const user = { user_id: 'user-123' };
const variants = await experiment.fetch(user);
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```python
from amplitude_experiment import Experiment, User

# Initialize once at server startup
experiment = Experiment.initialize('DEPLOYMENT_KEY')

# Fetch variants per request
user = User(user_id='user-123')
variants = experiment.fetch(user)
```
{{/partial:tab}}
{{partial:tab name="Go"}}
```go
import "github.com/amplitude/experiment-go-server/pkg/experiment"

// Initialize once at server startup
client := experiment.Initialize("DEPLOYMENT_KEY", nil)

// Fetch variants per request
user := &experiment.User{UserId: "user-123"}
variants, err := client.Fetch(user)
```
{{/partial:tab}}
{{/partial:tabs}}

For full initialization options for your platform, see [SDK reference](/docs/sdks/experiment-sdks).

## Step 4: Check your flag

After fetching, read the variant value to branch your application logic.

{{partial:tabs tabs="JavaScript, Node.js, Python, Go"}}
{{partial:tab name="JavaScript"}}
```typescript
const variant = experiment.variant('my-first-flag');

if (variant.value === 'treatment') {
  // Show new experience
} else {
  // Show control experience (default)
}
```
{{/partial:tab}}
{{partial:tab name="Node.js"}}
```typescript
const variant = variants['my-first-flag'];

if (variant?.value === 'treatment') {
  // Show new experience
} else {
  // Show control experience (default)
}
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```python
variant = variants.get('my-first-flag')

if variant and variant.value == 'treatment':
    # Show new experience
else:
    # Show control experience (default)
```
{{/partial:tab}}
{{partial:tab name="Go"}}
```go
variant := variants["my-first-flag"]

if variant.Value == "treatment" {
    // Show new experience
} else {
    // Show control experience (default)
}
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type='warning' heading="Always handle the null case"}}
`variant.value` is `null` or `undefined` when a user isn't bucketed into the flag — for example, when they fall outside the 50% allocation, or the flag is inactive. Default to your control experience in this case.
{{/partial:admonition}}

## Step 5: Verify it's working

1. Add your own user ID or device ID to the flag's **Inclusions** list in the Amplitude UI. This forces you into the `treatment` variant during testing.
2. Run your application and trigger the code path where you check the flag.
3. Confirm you see the treatment experience.
4. In Amplitude, go to *Experiments > your flag > Monitor*. An exposure event appears within a few minutes.

{{partial:admonition type='tip' heading="Force a specific variant during development"}}
Use **Inclusions** (*Experiments > your flag > Inclusions*) to force specific user IDs or device IDs into any variant. This doesn't affect your production allocation percentages.
{{/partial:admonition}}

## What's next

Now that your flag works:

- **Convert to an experiment** — add metrics and statistical analysis to measure impact.
- **Add targeting rules** — serve the flag to specific user segments, cohorts, or property values.
- **Use JSON payloads** — send dynamic configuration alongside a variant string instead of hardcoding values.
- **Switch to local evaluation** — get sub-millisecond performance for high-throughput server-side SDKs.

**More reading:**

- [Flags vs. experiments](/docs/feature-experiment/flags-vs-experiments) — understand when to use each.
- [Local vs. remote evaluation](/docs/feature-experiment/local-evaluation) — choose the right evaluation model.
- [SDK reference](/docs/sdks/experiment-sdks) — full API docs for your platform.
- [Track exposures](/docs/feature-experiment/track-exposure) — ensure your experiment results are accurate.
