---
id: 671d5f19-2b8a-463a-95be-f81de05e0860
blueprint: web_experiment
title: 'Web Experiment targeting'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729195990
---
Web Experiments target both pages and audiences. Amplitude first evaluates page targeting and then audience targeting. Both targeting methods evaluate locally in the browser when the page first loads.

Web Experiments use [Pages](/docs/web-experiment/pages) to precisely control where experiment variants apply on your website. Pages define the conditions under which a web experiment should apply, including targeting conditions to match specific URLs and visual editor URLs for previewing experiments.

## Audience targeting

By default, a new Web Experiment targets all users. Audience targeting enables you to target specific users for your experiment. Users who aren't targeted in the experiment receive the default experience and don't count towards analysis.

If any segments match, Amplitude buckets that user into a variant based on the configured rollout and variant distribution. For a segment to match, it must meet all conditions you set.

### Browser properties (local)

Browser properties are available client-side and don't require network requests. This enables Amplitude to evaluate them with low latency.

| Parameter                            | Description                                                                                                                                                                                                                                                                                                                                          |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New Users                            | A new user is first seen after a specified date. When the Web Experiment SDK first sees a user, it stores the date in local storage when the SDK loads then is never updated. May not function as intended shortly after the initial script installation, when all users are new. This isn't the same as new user queries in charts and cohorts. |
| Returning Users                      | A returning user is a user first seen before a certain date. Same local considerations apply as with New Users.                                                                                                                                                                                                                                      |
| Referring URL                        | Matches users who land on your site from a specific referrer. For more information, review [document.referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) on MDN.                                                                                                                                                              |
| Landing Page URL                     | The landing page URL is set in session storage when the SDK loads.                                                                                                                                                                                                                                                                              |
| URL Query Parameters (Not persisted) | The current query parameters on the page at the time of evaluation. Commonly used for UTM parameter targeting.                                                                                                                                                                                                                                       |
| URL Query Parameters (Persisted)     | The query parameters automatically stored locally to maintain variant assignments across navigations or reloads. Commonly used when you need consistent UTM-based targeting beyond the initial page visit.                                                                                                                                           |
| Device Category                      | Target users by their device type. `Desktop`, `Mobile`, or `Tablet`.                                                                                                                                                                                                                                                                                 |
| User Agent                           | Target based on the user agent. Useful for targeting bots. For example, exclude all users where user agent contains `Googlebot`.                                                                                                                                                                                                                     |
| Cookies                              | The cookies in the window at the time of evaluation.                                                                                                                                                                                                                                                                                                 |
| Language                             | The language set in the user's browser.                                                                                                                                                                                                                                                                                                              |
| Browser                              | The user's browser: `Safari`, `Chrome`, `Firefox`, `Edge`, `Opera`.                                                                                                                                                                                                                                                                                  |
| Freeform properties                  | Custom properties for the user set using the [`IntegrationPlugin`](/docs/web-experiment/implementation#integrate-with-a-third-party-cdp).                                                                                                                                                                                                            |

### User properties (remote)

You can perform advanced targeting based on [Amplitude ID resolution](/docs/feature-experiment/remote-evaluation#amplitude-id-resolution), [IP geolocation](/docs/feature-experiment/remote-evaluation#geolocation), [property canonicalization](/docs/feature-experiment/remote-evaluation#canonicalization), [behavioral cohorts](/docs/feature-experiment/remote-evaluation#cohort-membership), and historical [user properties](/docs/feature-experiment/remote-evaluation#user-properties). Targeting user properties may increase page display latency because of required network requests.

| Parameter                  | Description                                                                                            |
|----------------------------|--------------------------------------------------------------------------------------------------------|
| Enriched User Properties   | Properties resolved through [user enrichment](/docs/feature-experiment/remote-evaluation#user-enrichment). |
| Amplitude User Properties  | Amplitude Analytics' historical user data.                                                             |
| Experiment User Properties | The variant assigned to the user in other experiments.                                                 |
| User Cohorts               | A set of [users](/docs/feature-experiment/cohort-targeting) defined in Amplitude.             |

#### Page display delay

For a given page [targeted](/docs/web-experiment/targeting#page-targeting) by active web experiments, Amplitude injects an anti-flicker overlay if at least one experiment targets the page and has "Anti-flicker" enabled. The overlay is a blank element that covers your page while it loads. Amplitude removes the overlay after it evaluates the remote properties, or after a 1-second timeout.

## Bucketing

Bucketing refers to the variant a users sees, based on the rollout and distribution. Rollout is the percentage of users that should be in the experiment. Distribution defines which variant a user experiences if they're in the rollout. Web Experiment distributes variants evenly by default. Amplitude recommends this distribution.

Bucketing is consistent given the user has the same ID. Since most experiments bucket by Device ID, Web Experiment may put them in a different bucket if they visit on a new device, browser, or have private browsing enabled.

Increasing rollout doesn't re-bucket users who're already in the rollout. For example, if your experiment has rolled out to 10% of users, and you increase the rollout to 50%, the original 10% of users aren't affected. If you change the distribution from evenly distributed to `20% -> control, 80% -> treatment`, users who were in the control jump to the treatment.
