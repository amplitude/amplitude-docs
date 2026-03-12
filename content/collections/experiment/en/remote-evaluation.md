---
id: b358db28-92d6-458b-9692-d181e0871612
blueprint: experiment
title: 'Remote evaluation'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717439192
source: 'https://www.docs.developers.amplitude.com/experiment/general/evaluation/remote-evaluation/'
---
Remote evaluation makes a request to Amplitude Experiment's evaluation servers to fetch variants for a [user](/docs/feature-experiment/data-model#users). Remote evaluation is the default way to evaluate users on client-side apps, but you can also use it from a server-side environment.

**Client-side**

![Diagram showing the client-side remote evaluation flow from client SDK through Amplitude Experiment servers](statamic://asset::help_center_conversions::experiment/client-side-overview.drawio.svg)

**Server-side**

![Diagram showing the server-side remote evaluation flow from server SDK through Amplitude Experiment servers](statamic://asset::help_center_conversions::experiment/server-side-remote-overview.drawio.svg)

## Targeting capabilities

Remote evaluation targeting and identity resolution both use Amplitude Analytics' historical user data. Remote evaluation enables advanced features such as [Amplitude ID resolution](#amplitude-id-resolution), [IP geolocation](#geolocation), [property canonicalization](#canonicalization), [targeting behavioral cohorts](#cohort-membership), and historical [user properties](#user-properties).

| Feature | Remote Evaluation | [Local Evaluation](/docs/feature-experiment/local-evaluation) |
| --- | --- | --- |
| [Consistent bucketing](/docs/feature-experiment/implementation#consistent-bucketing) | ✅ | ✅ |
| [Individual inclusions](/docs/feature-experiment/implementation#individual-inclusions) | ✅ | ✅ |
| [Targeting segments](/docs/feature-experiment/implementation#targeting-segments) | ✅ | ✅ |
| [Amplitude ID resolution](#amplitude-id-resolution) | ✅ | ❌ |
| [User enrichment](#user-enrichment) | ✅ | ❌ |
| [Sticky bucketing](/docs/feature-experiment/implementation#sticky-bucketing) | ✅ | ❌ |

## Implementation

Remote evaluation resolves the user within Amplitude and appends additional information to the user before passing the enriched user to the [evaluation implementation](/docs/feature-experiment/implementation).

![Diagram showing the remote evaluation implementation flow including ID resolution, user enrichment, and evaluation steps](statamic://asset::help_center_conversions::experiment/remote-evaluation.drawio.svg)

### Amplitude ID resolution

Amplitude ID resolution happens before additional [user enrichment](#user-enrichment), and is required when [bucketing](/docs/feature-experiment/implementation#consistent-bucketing) by Amplitude ID.

Go to [Amplitude's advanced identity resolution](/docs/data/sources/instrument-track-unique-users) to learn more.

### User enrichment

#### Geolocation

If you use location-based targeting in your flags, remote evaluation resolves location based on the client's IP and uses a canonical `Country` user property to make targeting consistent.

Remote evaluation resolves the following fields with IP geolocation:

* Country
* City
* Region
* DMA

#### Canonicalization

Remote evaluation canonicalizes inputs to make it easier to segment users by platform, OS, language, and country, even if devices report slightly different values. Canonicalization transforms various known device, language, and country inputs into canonical values that remain consistent even when the client reports different values.

Remote evaluation canonicalizes the following fields:

* Platform
* Device Family
* Device Type
* Language
* Country

#### User properties

{{partial:admonition type="warning" heading="Race conditions"}}
Targeting a recently set user property may cause a race between Amplitude Analytics ingesting and applying the user property, and Experiment accessing it. To avoid races between a user property being set and a remote evaluation accessing the user's properties, explicitly set the user property in the remote fetch request.

When you pass user properties to the remote fetch request, those user properties don't update on associated analytics events.
{{/partial:admonition}}

The [resolved Amplitude ID](#amplitude-id-resolution) accesses the user's current user properties based on historical analytics data. Experiment merges these user properties with any user properties you explicitly pass in the fetch request, then passes the merged set to [evaluation](/docs/feature-experiment/implementation).

{{partial:admonition type="info" heading="User property merge priority"}}
Amplitude prioritizes user properties sent explicitly in a remote fetch request over user properties accessed from analytics.
{{/partial:admonition}}

#### Cohort membership

Remote evaluation gets the user's cohort membership from analytics, which enables targeting by cohorts in [targeting segments](/docs/feature-experiment/implementation#targeting-segments).

{{partial:admonition type="warning" heading="Hourly cohort sync"}}
Dynamic cohorts sync hourly. Only use cohort targeting when bucketing isn't time-sensitive. For time-sensitive user targeting, explicitly pass user properties to the remote fetch request.
{{/partial:admonition}}
