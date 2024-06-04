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
Remote evaluation involves making a request to Amplitude Experiment's evaluation servers to fetch variants for a [user](/experiment/data-model#users). Remote evaluation is the default way to evaluate users on client-side apps, but may also be used from a server-side environment.

**Client-side**

![](statamic://asset::help_center_conversions::experiment/client-side-overview.drawio.png)

**Server-side**

![](statamic://asset::help_center_conversions::experiment/server-side-remote-overview.drawio.png)

## Targeting Capabilities

Remote evaluation targeting and identity resolution is powered by Amplitude Analytics' historical user data. Remote evaluation enables advanced features such as [Amplitude ID resolution](#amplitude-id-resolution), [IP geolocation](#geolocation), [property canonicalization](#canonicalization), [targeting behavioral cohorts](#cohort-membership), and historical [user properties](#user-properties).

| <div class='big-column'>Feature</div> | Remote Evaluation | [Local Evaluation](/experiment/local-evaluation) |
| --- | --- | --- |
| [Consistent bucketing](/experiment/implementation#consistent-bucketing) | ✅ | ✅ |
| [Individual inclusions](/experiment/implementation#individual-inclusions) | ✅ | ✅ |
| [Targeting segments](/experiment/implementation#targeting-segments) | ✅ | ✅ |
| [Amplitude ID resolution](##amplitude-id-resolution) | ✅ | ❌ |
| [User enrichment](##user-enrichment) | ✅ | ❌ |
| [Sticky bucketing](/experiment/implementation#sticky-bucketing) | ✅ | ❌ |

## Implementation

Remote evaluation resolves the user within Amplitude and appends additional information to the user before passing the enriched user to the [evaluation implementation](/experiment/implementation).

### Amplitude ID resolution

Amplitude ID resolution happens before additional [user enrichment](#user-enrichment), and is required if [bucketing](/experiment/implementation#consistent-bucketing) by Amplitude ID.

[Learn more about Amplitude's advanced identity resolution.](/cdp/sources/instrument-track-unique-users)

### User enrichment

#### Geolocation

If you use location based targeting in your flags, remote evaluation will automatically resolve location based on the client's IP and use a canonical `Country` user property to make targeting consistent and easy.

The following fields are resolved via IP geolocation:

* Country
* City
* Region
* DMA

#### Canonicalization

Remote evaluation canonicalizes inputs to make it easier to segment users by platform, OS, language, country, etc, even if the devices report slightly different values. Canonicalization transforms various known device, language, and country inputs into canonical values which remain consistent even if the client reports different values.

The following fields are canonicalized on remote evaluation:

* Platform
* Device Family
* Device Type
* Language
* Country

#### User properties


{{partial:admonition type="warning" heading="Race conditions"}}
Targeting a recently set user property may cause a race between Amplitude Analytics ingesting and applying the user property, and Experiment accessing the user property. To avoid any races between a user property being set, and a remote evaluation accessing the user's properties, the user property should be sent explicitly in the remote fetch request.
{{/partial:admonition}}

The [resolved Amplitude ID](#amplitude-id-resolution) is used to access the user's current user properties based on historical analytics data. These user properties are merged with any user properties sent explicitly in the fetch request and which are then passed in for [evaluation](/experiment/implementation).

!!!info "User Property Merge Priority"
{{partial:admonition type="info" heading="User property merge priority"}}
User properties sent explicitly in a remote fetch request are prioritized over user properties accessed from analytics.
{{/partial:admonition}}

#### Cohort membership

Remote evaluation gets the user's cohort membership from analytics which enables targeting by cohorts in [targeting segments](/experiment/implementation#targeting-segments).

{{partial:admonition type="warning" heading="Hourly cohort sync"}}
Dynamic cohorts are synced hourly. Therefore, only use cohort targeting if the bucketing isn't time sensitive. Time sensitive user targeting should use user properties passed explicitly to the remote fetch request.
{{/partial:admonition}}

