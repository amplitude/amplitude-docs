---
id: 671d5f19-2b8a-463a-95be-f81de05e0860
blueprint: web_experiment
title: 'Web Experiment targeting'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729195990
---
Web Experiments target both pages and audiences. Amplitude evaluates page targeting first, then audience targeting. Both targeting methods evaluate locally in the browser when the page first loads.

{{partial:admonition type='note'}}
See [Amplitude's pricing page](https://amplitude.com/pricing) to find out if this feature is available on your Amplitude plan.
{{/partial:admonition}}

## Page targeting

By default, a new Web Experiment targets the URL set on creation. This is the same URL that both the visual editor and Test & Preview tool use. To target multiple pages on your site, configure additional targeting rules.

Include or exclude pages from targeting with a matching **operator** and a **value**. Amplitude recommends excluding pages only if your inclusion rules target multiple pages. For example, you could include all blog posts in an experiment, then exclude the most important posts to avoid any negative impact your variant may have.

### Page matching operators

| Operator | Description | Examples |
| --- | --- | --- |
| URL Matches | Match the page URL, ignore query parameters or hash fragments. | `https://example.com/pricing` <br /> ✅ https://example.com/pricing#details <br /> ❌https://example.com/pricing/enterprise |
| URL Matches Exactly | Match the full page URL exactly. | `https://example.com/pricing?utm_source=facebook` <br /> ❌https://example.com/pricing <br /> ❌ https://example.com/pricing?utm_source=tiktok |
| URL Matches Pattern | Match the full page URL, including wildcards (`*`). | `https://example.com/blog/*` <br /> ✅ https://example.com/blog/my-first-post <br /> ✅ https://example.com/blog/my-second-post#get-started |
| URL Contains | Match the full page URL, where the URL contains a specific substring. | `/blog/my-first` <br /> ✅ https://example.com/blog/my-first-post <br /> ❌ https://example.com/blog/my-second-post |
| URL Starts With | Match the full page URL, where the URL starts with an exact substring. | `https://example.com/blog` <br /> ✅ https://example.com/blog/my-first-post <br />❌ https://example.com/pricing |
| URL Ends WIth | Match the full page URL, where the URL ends with an exact substring. | `/blog/my-first-post` <br /> ✅ https://example.com/blog/my-first-post <br /> ❌ https://example.com/blog/my-first-post#get-started |
| URL Matches Regex | Match the full page URL with a regular expression you define. | [Learn Regex](https://www.regular-expressions.info/quickstart.html) <br /> [Test Regex](https://regex101.com/) |

## Audience targeting

{{partial:admonition type="note"}}
Audience targeting is not available on **Starter** plans. Upgrade to **Plus** to better target your users.
{{/partial:admonition}}

By default, a new Web Experiment targets all users. Audience targeting enables you to target specific users for your experiment. Users who aren't targeted see the default experience, and don't count towards analysis.

If any segments match, Amplitude buckets that user into a variant based on the configured rollout and variant distribution. For a segment to match, it must meet all conditions you set.

### Local properties

Local properties are available client-side and don't require network requests. This enables Amplitude to evaluate them with low latency.

| Parameter            | Description                                                                                                                                                                                                                                                                                                                          |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New Users            | A new user is first seen after a specified date. When the Web Experiment SDK first sees a user, it stores the date in local storage when the SDK loads then is never updated. May not function as intended shortly after the initial script installation, when all users are new. This **isn't** the same as new user queries in charts and cohorts. |
| Returning Users      | A returning user is a user first seen before a certain date. Same local considerations apply as with New Users.                                                                                                                                                                                                                      |
| Referring URL        | Matches users who land on your site from a specific referrer. For more information, see [document.referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) on MDN.                                                                                                                                              |
| Landing Page URL     | The landing page URL is set once in session storage when the SDK loads.                                                                                                                                                                                                                                                              |
| URL Query Parameters | The current query parameters on the page at the time of evaluation. Commonly used for UTM parameter targeting.                                                                                                                                                                                                                       |
| Device Category      | Target users by their device type. `Desktop`, `Mobile`, or `Tablet`.                                                                                                                                                                                                                                                                 |
| User Agent           | Target based on the user agent. Useful for targeting bots. For example, exclude all users where user agent contains `Googlebot`.                                                                                                                                                                                                     |
| Cookies              | The cookies in the window at the time of evaluation.                                                                                                                                                                                                                                                                                 |
| Language             | The language set in the user's browser.                                                                                                                                                                                                                                                                                              |
| Browser              | The user's browser: `Safari`, `Chrome`, `Firefox`, `Edge`, `Opera`.                                                                                                                                                                                                                                                                  |
| Freeform properties  | Custom properties for the user set using the [`IntegrationPlugin`](/docs/web-experiment/implementation#integrate-with-a-third-party-cdp).                                                                                                                                                                                    |

### Remote properties

Remote properties enable advanced targeting based on [Amplitude ID resolution](/docs/feature-experiment/remote-evaluation#amplitude-id-resolution), [IP geolocation](/docs/feature-experiment/remote-evaluation#geolocation), [property canonicalization](/docs/feature-experiment/remote-evaluation#canonicalization), [behavioral cohorts](/docs/feature-experiment/remote-evaluation#cohort-membership), and historical [user properties](/docs/feature-experiment/remote-evaluation#user-properties). Targeting remote properties may increase page display latency since network requests are required.

| Parameter                  | Description                                                                                            |
|----------------------------|--------------------------------------------------------------------------------------------------------|
| Enriched User Properties   | Properties resolved through [user enrichment](/docs/feature-experiment/remote-evaluation#user-enrichment). |
| Amplitude User Properties  | Amplitude Analytics' historical user data.                                                             |
| Experiment User Properties | The variant assigned to the user in other experiments.                                                 |
| User Cohorts               | A set of [users](/docs/feature-experiment/cohort-targeting) defined in Amplitude.             |

#### Page display delay

For a given page [targeted](/docs/web-experiment/targeting#page-targeting) by active web experiments, Amplitude injects an anti-flicker overlay will be injected if at least one experiment targets the page and has "Anti-flicker" enabled. The overlay is a blank element that covers your page while it loads. Amplitude removes the overlay after it evaluates the remote properties, or after a 1-second timeout.

## Bucketing

Bucketing refers to the variant a users sees, based on the rollout and distribution. Rollout is the percentage of users that should be in the experiment. Distribution defines which variant a user should see if they're in the rollout. Web Experiment distributes variants evenly by default. Amplitude recommends this distribution.

Bucketing is consistent given the user has the same ID. Since most experiments bucket by Device ID, Web Experiment may put them in a different bucket if they visit on a new device, browser, or have private browsing enabled.

Increasing rollout doesn't re-bucket users who're already in the rollout. For example, if your experiment has rolled out to 10% of users, and you increase the rollout to 50%, the original 10% of users aren't affected. If you change the *distribution* from evenly distributed to `20% -> control, 80% -> treatment`, users who were in the control jump to the treatment.
