---
id: 2f8e4c9a-7b3d-4e2f-9a1c-8d5f6e7a8b9c
blueprint: browser_sdk
title: 'Cookies and consent management'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1733428775
source: 'https://docs.developers.amplitude.com/guides/cookies-consent-mgmt-guide/'
---
This guide covers functional and technical information on how Amplitude Browser SDK 2 works with cookies, local storage, opt-in/opt-out options and consent management (including CNIL regulations for France).

{{partial:admonition type="info" heading="Browser SDK 2 compatibility"}}
This guide covers the behavior with Browser SDK 2 (TypeScript SDK). For information about the legacy JavaScript SDK, see the [legacy cookies and consent management guide](/docs/get-started/cookies-and-consent-management).
{{/partial:admonition}}

## Amplitude cookies

A **"cookie"** is a piece of data from a website stored on a user's web browser. Websites retrieve cookies later, to access data stored for functional or technical purposes. After initialization, the Amplitude Browser SDK 2 creates cookies that begin with specific prefixes and include the first 10 digits of your project API key.

For example, if you initialize the SDK with:

```ts
import * as amplitude from '@amplitude/analytics-browser';
amplitude.init("a2dbce0e18dfe5f8e...");
```

The Amplitude Browser SDK 2 creates cookies with the following format:

- **User session cookies**: `AMP_` with the first 10 characters of your project's API Key appended (e.g., `AMP_a2dbce0e18`)
- **Marketing campaign cookies**: `AMP_MKTG_` with the first 10 characters of your project's API Key appended (e.g., `AMP_MKTG_a2dbce0e18`)

![](statamic://asset::help_center_conversions::get-started/amplitude-cookies.png)

### Test cookies

During initialization, the SDK may create temporary test cookies to verify cookie functionality:

- `AMP_TEST_` followed by a timestamp: Used to test whether cookies are enabled
- `AMP_TLDTEST_` followed by a timestamp: Used to find the appropriate subdomain for cookie storage

These test cookies are automatically removed after testing completes. If they persist, you can safely delete them manually.

### Cookie data

The SDK stores different types of information in cookies:

#### User session cookies (`AMP_*`)

The user session cookie contains metadata necessary for the SDK to function correctly:

- `deviceId`: A randomly generated string that persists across sessions
- `userId`: Upon user log-in, if your app sends this value to Amplitude, it's stored in the cookie. You should set this to uniquely identify users. Amplitude encodes this value as Base64 before storing it.
- `optOut`: A flag to opt this device out of Amplitude tracking. If this flag is set, Amplitude stores no additional information about the user.
- `sessionId`: A randomly generated string for each session
- `lastEventTime`: Time of the last event, used to decide when to expire and create a new session ID
- `lastEventId`: An incrementing sequence of identifiers used to distinguish events

#### Marketing campaign cookies (`AMP_MKTG_*`)

The marketing campaign cookie stores attribution data including:

- UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
- Referrer information (`referrer`, `referring_domain`)
- Click IDs (`gclid`, `fbclid`, `dclid`, `gbraid`, `wbraid`, `ko_click_id`, `msclkid`, `ttclid`, `twclid`, `li_fat_id`, `rtd_cid`)

### Cookie size

The cookie size can vary from approximately 60 bytes to 120 bytes per cookie. With both user session and marketing campaign cookies, you can expect around 240 bytes total for Amplitude cookies **per project API key**.

### Expiration time

By default, Amplitude cookies expire after 365 days (1 year). You can customize this with the `cookieOptions.expiration` configuration parameter:

```ts
amplitude.init("API_KEY", {
  cookieOptions: {
    expiration: 30, // Set cookies to expire after 30 days
  },
});
```

### Remove Amplitude cookies

To programmatically remove Amplitude cookies, you can reset the SDK which clears all stored data:

```ts
amplitude.reset();
```

This method:
1. Sets `userId` to `undefined`
2. Sets `deviceId` to a new UUID value
3. Clears all cookies and local storage data

## Disable cookies using localStorage

You can configure the SDK to use localStorage instead of cookies by setting the `identityStorage` option:

```ts
amplitude.init("API_KEY", {
  identityStorage: "localStorage",
});
```

### Data stored in local storage

When using localStorage, the SDK stores the same user session information that would normally be in cookies, plus:

- **Unsent events**: Events that haven't been successfully uploaded to Amplitude
- **Failed events**: Events that failed to send and are queued for retry

The data is stored in localStorage with keys that include your project API key:
- `AMP_unsent_[API_KEY]`: Stores unsent events
- `AMP_unsent_identify_[API_KEY]`: Stores unsent identify calls

{{partial:admonition type="warning" heading="Local storage limitations"}}
Local Storage restricts access by subdomain. For example, if you track non-identified users across subdomains like `www.amplitude.com` and `analytics.amplitude.com`, their `device_id` value for each subdomain isn't available while browsing the other.

The Amplitude SDK supports cross-site tracking. For more information, see [Cross-domain tracking](/docs/sdks/analytics/browser/browser-sdk-2#cross-domain-tracking).
{{/partial:admonition}}

## Disable cookies and local storage (opt-out storage)

You can disable all persistent storage by setting `identityStorage` to `none`:

```ts
amplitude.init("API_KEY", {
  identityStorage: "none",
});
```

When you disable all storage, Amplitude creates a new `device_id` for that user every time they visit your site because it can't find an existing ID. If the user logs in or provides other identifying information, Amplitude's identity resolution system ties the various `device_id` values together with that user ID.

## Disabling tracking (opt out tracking)

Users may wish to opt out of tracking completely, which means that Amplitude does not store events or records of their browsing history. The Amplitude SDK provides several ways to handle opt-out:

### Set opt-out during initialization

```ts
amplitude.init("API_KEY", {
  optOut: true,
});
```

### Set opt-out after initialization

```ts
amplitude.setOptOut(true);
```

To re-enable tracking:

```ts
amplitude.setOptOut(false);
```

### "Do not track" setting on browsers (DNT flag)

Some browsers have a setting "Do not track" that's intended to block all tracking. Amplitude doesn't adhere to this setting by default. The DNT standard isn't widely supported and it isn't clear what it's meant to disable. If you want to consider that setting, write your own code to test for the DNT flag and then set the `optOut` option in the SDK.

## Managing cookie consent

Certain jurisdictions require that users consent to non-essential cookies before any data can be collected. You are ultimately responsible for ensuring that you get any necessary consents and make any necessary disclosures for the personal data you collect and send to Amplitude. You're also responsible for determining how you classify the Amplitude cookies in your cookie policy based on your specific use case and the jurisdictions in which you use them.

![](statamic://asset::help_center_conversions::get-started/consentscreen.png)

If you use the Amplitude SDK in one of these jurisdictions, don't initialize the SDK until the user has consented to your use of cookies. This is because the Amplitude functions (for example, cookie storage, local storage, and tracking events) are enabled or disabled upon SDK initialization.

### Deferred initialization approach

For consent management, you can initialize the SDK with tracking disabled and enable it later:

```ts
// Initialize with tracking disabled
amplitude.init("API_KEY", {
  optOut: true,
});

// Later, when user provides consent
amplitude.setOptOut(false);
```

### Alternative: Conditional initialization

Alternatively, you can delay SDK initialization entirely until consent is obtained:

```ts
// Only initialize after user consent
if (userHasConsented) {
  amplitude.init("API_KEY");
}
```

### Handling existing users with cookies

For users who already have Amplitude cookies from previous visits:

1. If you manually define `cookieOptions.expiration` to be a short lifespan, you may need to re-enable tracking when the Amplitude cookies expire, or when the user logs in.

2. If the user removes all cookies, they should see the consent banner again the next time they visit your app. Since there won't be any Amplitude cookies yet set, the flow will go as described earlier.

3. If the user consented to Amplitude cookies at some point in the past, and that consent has expired for any reason (website cookie deletion, consent tracking expired), you must explicitly remove the Amplitude cookies if the user declines consent. Otherwise, the SDK will continue to collect the user's information.

To remove existing cookies when consent is withdrawn:

```ts
amplitude.reset(); // This clears all Amplitude data including cookies
```

## Getting the SDK configuration

From any site that uses Amplitude Browser SDK 2, you can inspect the current configuration. Run the following command from the JavaScript console:

```js
// Get the default instance configuration
amplitude.getConfig();
```

### Configuration options related to storage

This table gives a brief overview of each option related to storage in Browser SDK 2:

| Option                           | Default Value | Definition                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cookieOptions.expiration`       | 365           | The number of days after which the Amplitude cookie expires. The default 12 months is for GDPR compliance.                                                                                                                                                                                                                                                                                                                |
| `cookieOptions.domain`           | `undefined`   | Set a custom domain for the Amplitude cookie. To include subdomains, add a preceding period, for example: `.amplitude.com`.                                                                                                                                                                                                                                                                                                |
| `cookieOptions.secure`           | `false`       | If `true`, the Amplitude cookie is set with the Secure flag. The secure flag lets the browser send this cookie only when on encrypted HTTPS transmissions.                                                                                                                                                                                                                                                                |
| `cookieOptions.sameSite`         | `Lax`         | Sets the SameSite flag on the amplitude cookie. Decides cookie privacy policy.                                                                                                                                                                                                                                                                                                                                              |
| `identityStorage`                | `cookie`      | Sets storage API for user identity. Options include `cookie` for `document.cookie`, `localStorage` for `localStorage`, `sessionStorage` for `sessionStorage`, or `none` to opt-out of persisting user identity.                                                                                                                                                                                                           |
| `optOut`                         | `false`       | Disable tracking for the current user.                                                                                                                                                                                                                                                                                                                                                                                      |
| `storageProvider`                | `LocalStorage`| Sets a custom implementation of `Storage<Event[]>` to persist unsent events.                                                                                                                                                                                                                                                                                                                                                |

## Abstraction layer for storage

The abstraction layer for storage and available options as well as the metadata that's stored can be found in Amplitude's GitHub repository for the TypeScript SDK:

- [Browser SDK 2 source code](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser)
- [Configuration types](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-types/src/config/browser.ts)
- [Cookie storage implementation](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser/src/storage)

## Frequently asked questions

{{partial:collapse name="Are Amplitude's cookies first-party or third-party cookies?"}}
**Amplitude uses first-party cookies**. From a technical standpoint, there's no difference between first-party and third-party cookies. The distinction is related to:

1. The context of a particular visit.
2. Who creates the cookie.

Every cookie has an owner, which is the domain defined in the cookie:

- **First-party cookies** are issued by a website that a user views directly. If a user lands on a website–for example, fit.amplitude.com–this site creates a cookie which is then saved on the user's computer. 
This is how Amplitude works. When a customer decides to add the Amplitude Browser SDK 2 to their website, the customer (through their website) is the one who directly creates the cookie stored in the visitor's computer. 

- **Third-party cookies** are not created by the website being visited, but by someone else. Imagine you're visiting fit.amplitude.com, and the site uses YouTube videos for virtual non-live classes. In this case, it's YouTube who's setting the cookie that is saved on the user's computer.

What's happening in this case is that the website owner embeds pieces of code, provided by YouTube, for the videos to play directly in fit.amplitude.com. When that YouTube code executes in the browser, or the video loads, YouTube can track the player and put data in its cookies. This is why the cookie qualifies as a third-party cookie-because it's created by a different domain than fit.amplitude.com / amplitude.com
{{/partial:collapse}}

{{partial:collapse name="Will Google Chrome's plan to remove third party cookies affect Amplitude?"}}
**No**-as stated above, **Amplitude is not a third-party cookie**. Amplitude customers add Amplitude to their website/bundle themselves and Amplitude sets it in their own bundled code through document.cookie, so Amplitude has the privileges of a first-party cookie.
{{/partial:collapse}}

{{partial:collapse name="Why aren't Amplitude cookies marked as `HttpOnly`?"}}
It doesn't make sense for Amplitude's cookies to be HttpOnly; the point of that option is so that document.cookie can't read those cookies (since they'd only be used in the client-server communication). But the point of Amplitude's cookies is the opposite: Amplitude **wants** to persist data specifically in their browser and to rest in document.cookies, Amplitude can't read from their server because Amplitude is client-side code.

If you're concerned that this renders the Amplitude cookie vulnerable to authentication information theft, you shouldn't be. Amplitude stores no authentication information in that cookie, so there's no danger of a XSS attack. The worst thing an attacker could do is steal Amplitude's cookie and take that user's device ID and user ID, which shouldn't be PII to be begin with.

Nonetheless, if this is a serious concern for you, then you should probably disable Amplitude's cookies.
{{/partial:collapse}}

{{partial:collapse name="Why aren't Amplitude's cookies marked as secure?"}}
The secure flag lets the browser **send the cookie only when on encrypted HTTPS transmissions**. This ensures that your cookie isn't visible to an attacker in, for instance, a man-in-the-middle attack. Amplitude has no authentication information in that cookie nor any type of sensitive information, so Amplitude isn't in danger of a XSS attack. Again, the worst thing an attacker could do is steal Amplitude's cookie and take that user's device ID and user ID.

For these reasons, Amplitude doesn't consider this as a security vulnerability. However, you can enable the secure flag if needed:

```ts
amplitude.init("API_KEY", {
  cookieOptions: {
    secure: true,
  },
});
```
{{/partial:collapse}}

{{partial:collapse name="Will cookies cause unsent events to send to a project with a different API key?"}}
No-the Browser SDK 2 scopes all stored events with the API key, so if a product changes the project (or its API key) it's sending events to, those old events won't reach the new project. The events are stored in localStorage with keys that include the API key, ensuring proper isolation between different projects.
{{/partial:collapse}}

{{partial:collapse name="How do you integrate with third-party Consent Management Platforms?"}}
Websites and applications can use a consent management platform (CMP) to manage legal consent from users around collecting and processing their personal data through any cookies and other trackers operating on the domain, as may be required by applicable privacy laws, such as GDPR, CCPA and ePrivacy. Some examples of these tools are OneTrust, Axeptio or Responsum.

At the time of this writing, Amplitude doesn't have a default integration with any of these tools. You must configure your CMP to pass the outcome of the consent to the Amplitude SDK, so that any end user who hasn't provided consent or who has revoked consent (depending on the end user's jurisdiction) is opted out of tracking by the Amplitude SDK. 

Here's an example integration pattern:

```ts
// Initialize with tracking disabled
amplitude.init("API_KEY", {
  optOut: true,
});

// When CMP provides consent status
function handleConsentChange(hasConsent) {
  amplitude.setOptOut(!hasConsent);
}

// Example with OneTrust
if (typeof OneTrust !== 'undefined') {
  OneTrust.OnConsentChanged(function() {
    const hasConsent = OneTrust.IsAlertBoxClosed() && 
                      OneTrust.getGeolocationData().country !== 'GB'; // Example logic
    handleConsentChange(hasConsent);
  });
}
```
{{/partial:collapse}}

{{partial:collapse name="Can I use OneTrust with Amplitude to stay GDPR compliant?"}}
Yes, you can use Amplitude with a CMP, like OneTrust, in a GDPR-compliant manner. Amplitude can't direct you on how to classify the Amplitude SDK/cookies. Instead, your privacy and legal teams should make this assessment based on the data you're collecting. However, most customers, including in the EU, classify Amplitude cookies as Performance/Analytics cookies.

Customers may also choose to implement via a server side integration, therefore bypassing Amplitude's cookies from the SDK. However, customers who integrate via a server side integration are still responsible for ensuring that they get any necessary consents and make any necessary disclosures for the personal data they collect and send to Amplitude. 
{{/partial:collapse}}

{{partial:collapse name="When a user opts out, how can I opt them in again?"}}
Once a user is opted out, you can opt them in programmatically by calling:

```ts
amplitude.setOptOut(false);
```

This sets the option `optOut` to `false`, updates the cookie with the new options and enables tracking.
{{/partial:collapse}}

## CNIL France - Frequently asked questions

{{partial:admonition type="warning" heading="CNIL France FAQs"}}
FAQs related to CNIL aren't intended as legal or regulatory advice and don't constitute any warranty or contractual commitment on the part of Amplitude. Amplitude encourages customers to seek independent legal advice on your legal and regulatory obligations with issues related to this subject matter.
{{/partial:admonition}}

{{partial:collapse name="CNIL France - What is the CNIL cookie exemption?"}}
**The CNIL (Commission Nationale Informatique & Libertés)** is the French Data Protection Agency. As a general rule, the CNIL requires the consent of users before cookies can be used on a website, a mobile application or other connected device. The CNIL allows for a very limited exemption from this requirement for cookies that collect only anonymous, aggregated statistical data that's used for measuring website traffic or performance. Data collected from these cookies can't be combined with other data or used to identify users. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - What does the CNIL cookie exemption really mean?"}}
The CNIL maintains a list of services which can be used under the exemption. However, any use of an analytics service under the CNIL exemption is subject to the following limitations:

1. **Analytics cookies can ONLY** be placed without asking for user consent if they **only collect anonymous statistical data for audience measurement** (overall traffic, page views). 
2. **This doesn't mean a customer can collect ALL data** about a user for analysis.
3. Under the exemption, **customers can't use or create "user" analyses**.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - What does the CNIL exemption mean for Amplitude and our cookies?"}}
As discussed, the CNIL allows for a limited exemption for the requirement that companies obtain user consent for any non-essential cookies. In general, this exemption applies to analytics cookies for the limited purpose of audience measurement of an app or a site, and it's limited to the use of anonymous tracers.

**Therefore, a customer's use of an analytics service under the exemption will be very limited**. Without the CNIL cookie exemption, customers might only collect and measure part of their traffic. The power of the limited data set (for example, the data set with just the users that opt-in/consent) in Amplitude is much more valuable than the very limited data that can be collected under the exemption. This is because:

Audience measurement (page views, overall sessions) don't help customers make better decisions; behavioral analytics guide actions and learning.

Amplitude doesn't need 100% of traffic to derive meaningful insights.

Most of the exempted tools don't have the powerful analytics capabilities of Amplitude.

Besides using the SDKs, customers can still send data to Amplitude server-side. This doesn't require customers to obtain consent for a separate Amplitude SDK cookie. However, as mentioned above, customers who integrate via a server side integration will still be responsible for ensuring that they obtain any necessary consents and make any necessary disclosures for the personal data they collect and send to Amplitude. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - 13-month cookie limit"}}
The Amplitude Browser SDK 2 has a `cookieOptions.expiration` option to allow customers to set the number of days a cookie will live. It defaults to 1 year (365 days) as of the current version. However, most browsers will by default limit the lifetime of cookies set using document.cookie from 1 to 7 days.

```ts
amplitude.init("API_KEY", {
  cookieOptions: {
    expiration: 395, // 13 months in days
  },
});
```
{{/partial:collapse}}

{{partial:collapse name="CNIL France - 25-month data retention max"}}
Use [Amplitude's Time to Live](/docs/data/time-to-live) functionality to set a retention schedule for their event data. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Purpose strictly limited to the sole measurement of the site's or application's audience"}}
On the requirement of having a purpose strictly limited to the sole measurement of the site's or application's audience (performance measurement, detection of browsing problems, optimization of technical performance or its ergonomics, estimation of the power of the servers required, analysis of contents consulted), for the exclusive account of the publisher, Amplitude customers are in full control of the data that they choose to send to the Amplitude platform, and can choose to only send Amplitude events related to audience measurement/page views.

You can configure the SDK to only track page views and basic session information:

```ts
amplitude.init("API_KEY", {
  autocapture: {
    attribution: false,
    pageViews: true,
    sessions: true,
    formInteractions: false,
    fileDownloads: false,
    elementInteractions: false,
  },
});
```
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Only serve to produce anonymous statistical data"}}
To use Amplitude to produce anonymous statistical data, Amplitude recommends taking the following steps:

- Reach out to Amplitude at <mailto:cnil-support@amplitude.com>, if you are a prospective customer, or via [this form](https://amplitude.zendesk.com/hc/en-us/requests/new), if you are an existing customer, to:

    - request that IP address be dropped for projects that contain end users that haven't provided consent;
    - discuss disabling Amplitude's User Look-Up and the ability to view user streams for projects that contain data for end users that haven't provided consent; and 
    - discuss the most effective configuration options for your use case.  

- Don't send deviceID to Amplitude for end users that haven't provided consent.
- For end users that haven't provided consent, set a userID that's randomly generated or hashed.
- Consider disabling the capacity to filter end users at the individual level by hiding user properties, such as userID, deviceID and Amplitude ID. See [this documentation](/docs/data/transformations). 
- Consider disabling user downloads. See [this documentation](/docs/admin/account-management/manage-orgs-projects). 

{{/partial:collapse}}

{{partial:collapse name="CNIL France - Compliant with GDPR"}}
Amplitude's privacy program is based on privacy-by-design principles. Amplitude's privacy program ensures that it complies with all relevant domestic and international privacy regulations and laws regarding the processing of personal data, including GDPR.

Amplitude also offers customers the choice of having their data hosted in the US-West based AWS environment or the EU based AWS environment. To ensure that Amplitude's customers can appropriately respond to and comply with end-user data deletion requests as required by global privacy laws such as GDPR, Amplitude has built an API endpoint that allows customers to programmatically submit requests to delete all data for a set of known Amplitude IDs and/or User IDs. For more details, see the developer documentation: [User Privacy API](/docs/apis/analytics/user-privacy).

Additionally, Data Subject Access Requests (DSARs) can be completed using the DSAR API, which makes it easy to retrieve all data about a single user. More details can be found [here](/docs/apis/analytics/ccpa-dsar). 

More information on Amplitude's stance on privacy and security can be found [here](https://amplitude.com/trust). 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Cookies must not lead to a cross-checking of the data with other processing or that data be passed on to third parties."}}
No data is exported from Amplitude unless the customer chooses to export data to third party products. Customers shouldn't use Amplitude to export data related to end users that haven't provided consent to third party products. 

Additionally, upon request, Amplitude can disable its cohort syncing and data streaming capabilities for orgs containing only data for end users that haven't provided consent. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Cookies must not allow the global follow-up"}}
The CNIL exemption mentions that cookies must not allow the global follow-up of the navigation of the person using different applications or browsing on different websites; any solution that uses the same identifier across multiple sites (for example, through cookies placed on a third-party domain loaded by multiple sites) to cross-reference, duplicate, or measure a unified reach for content is excluded. 

To comply with this requirement, **customers shouldn't use Amplitude's [cross domain tracking](/docs/sdks/analytics/browser/browser-sdk-2#cross-domain-tracking)**, and should use a [separate platform instrumentation](/docs/get-started/cross-platform-vs-separate-platform) for any projects with data from end users that haven't provided consent. By default, Amplitude doesn't employ cross domain tracking for customers.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - The data is collected, processed and stored independently for each publisher"}}
In Amplitude, customer data is logically separated and stored in encrypted form in Amplitude's AWS environment.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - The trackers are completely independent of each other and of any other tracker"}}
The cookie used by the Amplitude Browser SDK 2 is a [first party cookie](#frequently-asked-questions) and any data collected by the cookie is collected by the customer as the controller of the data. Amplitude only processes the customer's data as a processor / service provider, and doesn't use customer data for its own purposes. 
{{/partial:collapse}}