---
id: 1b0ba36a-6b55-40cb-98f8-13931435966d
blueprint: get-started
title: 'Cookies and Consent Management'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719952775
source: 'https://docs.developers.amplitude.com/guides/cookies-consent-mgmt-guide/'
---
This guide covers functional and technical information on how Amplitude works with cookies, local storage, opt-in/opt-out options and consent management (including CNIL regulations for France).  

{{partial:admonition type="warning" heading="Compatibility with Browser SDK"}}
The guide covers the behavior with the legacy JavaScript SDK that's the most used client browser SDK with Amplitude Analytics for current Amplitude users. New customers must use the new TypeScript SDK. 
{{/partial:admonition}}

## Using Amplitude cookies

A **“Cookie”** is a piece of data from a website that's stored on a users a web browser that. Websites can retrieve cookies at a later time to access data stored for functional and/or technical purposes. After initialization, the Amplitude SDK creates a cookie that begins with the prefix `AMP_` and ends with this first 10 digits of your project API key. You can customize this prefix with the constant `COOKIE_PREFIX` in the SDK's [constants.js](https://github.com/amplitude/Amplitude-JavaScript/blob/35e2dd3f342614cfb27fcb6455e361595ae222d7/src/constants.js#L36) file. The SDK defines the cookie's value in [amplitude-client.js](https://github.com/amplitude/Amplitude-JavaScript/blob/03c0a890d578db1ada383cf1e6195d71275bac44/src/amplitude-client.js#L121).

For example, if the default value for the prefix is used and you enter the following: 

```js
amplitude.getInstance().init("a2dbce0e18dfe5f8e...") 
```

The Amplitude Browser 2.0 SDK creates a cookie with the format `AMP_` with the first 10 characters of your project's API Key appended.

![](statamic://asset::help_center_conversions::get-started/amplitude-cookies.png)

In previous versions of the SDK, you could customize the key for this cookie upon initialization with the initialization option `cookieName`. This is deprecated in the latest versions for the SDK, but if you use older SDK versions, the cookie name may differ from the indicated standard name

If another cookie appears with the key `amplitude_cookie_test` followed by a suffix of a random base64 string, the cookie is used to test whether the user has cookies enabled, and the SDK should be remove it when the test completes. For more information, see the detail in the SDK's [base-cookie.js](https://github.com/amplitude/Amplitude-JavaScript/blob/main/src/base-cookie.js#L97) file.

Sometimes, the SDK may not remove the `amplitude_test_cookie` cookie. In this case, the cookie remains in the cookie list, but isn't used. You can customize the key of this cookie with the `COOKIE_TEST_PREFEX` constant in the SDK's [constants.js](https://github.com/amplitude/Amplitude-JavaScript/blob/35e2dd3f342614cfb27fcb6455e361595ae222d7/src/constants.js#L35) file.


The cookie is used to keep track of a few bits of metadata for the SDK:

- `deviceId`: A randomly generated string
- `userId`: Upon user log-in, if the your instrumentation sends this value to Amplitude, it's stored in the cookie. Amplitude recommends you set this to uniquely identify users. Amplitude encodes this value as Base64 before storing it.
- `optOut`: A flag to opt this device out of Amplitude tracking. If this flag is set, Amplitude stores no extra information about the user. 
- `sessionId`: A randomly generated string for each session
- `lastEventTime`: Time of the last event, used to decide when to expire and create a new session Id
- `eventId`: An incrementing sequence of identifiers used to distinguish events
- `identifyId`: An incrementing sequence of identifiers used to distinguish identify calls
- `sequenceNumber`: A sequence number used to order events and identifies and properly sequence them

When the Amplitude JavaScript SDK loads, it checks the cookie to see if it has an Amplitude `device_id` in it (if user is a returning user and the `device_id` was generated in a previous visit). If it finds one, it uses that value. If it doesn't find one (either because it's a new user or the user recently cleared cookies), the SDK randomly generates a `device_id`, and also saves it to the cookie.

### Cookie size

The cookie size can vary, going from a minimum of 60 bytes to some 120 bytes. Knowing that Amplitude can store 2 of them (`amp_*` and `amp_*.organization.domain`), you can assume a 120 bytes as a safe average size for Amplitude cookies **per project API key**.

### Expiration time

The Amplitude SDK has a `cookieExpiration` option to allows you to set the number of days a cookie lives. Before SDK version 7.0, the default value was 10 years. After SDK version 7.0, `cookieExperiation` defaults to 1 year. Most browsers limit the lifetime of cookies set using `document.cookie` from 1 to 7 days.

### Remove Amplitude cookies

To programmatically remove the Amplitude cookie, use the method JavaScript SDK's `clearStorage()` method. This method clears all cookies, and deletes any metadata stored on them.

### Deprecated cookies

The following cookie keys are deprecated in the latest SDK versions:

- `amplitude_id_<API_KEY>.your_org_domain`: In previous versions of the Amplitude JavaScript SDK, the cookie key was set by default to `amplitude_id` so it may appear in some projects that use an SDK version prior to 6.0.0. In that case the cookie is set under the key `amplitude_id_<PROJECT_API_KEY>.organization.domain`. 

	![](statamic://asset::help_center_conversions::get-started/deprecatedcookies.png)

- `amplitude_test.your_org_domain`: The Amplitude SDK uses this cookie to test more thoroughly if cookies are available. By default, the key is used as `amplitude_cookie_test` but as mentioned above, the SDK should remove this cookie after the test.

## Disable cookies using LocalStorage (opt-out cookies)

The data inside the cookie is necessary for Amplitude to function correctly. It saves `deviceId`, `sessionId`, and the last event's timestamp. You can set `disableCookies` to `true` in the SDK's [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/4cbe557a81ca981d03e140bebed6134c49595a5e/src/options.js#L70) file to store this information in a user's Local Storage.

### Data stored in local storage

Besides the information that managed in the cookie, Amplitude uses this storage to store:

- **Online events**: Controlled by the option `saveEvents` in the SDK's [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/4cbe557a81ca981d03e140bebed6134c49595a5e/src/options.js#L103) (defaults to `true`), every event sent to Amplitude is stored and then removed upon successful upload. If set to `false`, events may be lost if the user navigates quickly to another page before the events are uploaded.
- **Offline events**: The number of offline events is managed by the option `savedMaxCount` in the SDK's [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/4cbe557a81ca981d03e140bebed6134c49595a5e/src/options.js#L102) (defaults to 1000). If Amplitude logs more than 1000 events when offline, the oldest events are removed from the storage.
Failed events: Any failed event will be stored here to retry.

This data is stored in the next keys:

- `amplitude_unsent_<PROJECT_API_KEY>`: Stores unsent events. You can customize its name with the `unsentIdentifyKey` option in the SDK's [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/4cbe557a81ca981d03e140bebed6134c49595a5e/src/options.js#L126).
- `amplitude_unsent_identify_<PROJECT_API_KEY>`: Stores unsent identify calls. You can customize its name with the`unsentKey` option in the SDK's [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/4cbe557a81ca981d03e140bebed6134c49595a5e/src/options.js#L125).

![](statamic://asset::help_center_conversions::get-started/unsentevents.png)

{{partial:admonition type="warning" heading="Local storage limitations"}}
Local Storage restricts access by subdomain. For example, if you track non-identified users across subdomains like `www.amplitude.com` and `analytics.amplitude.com`, their `device_id` value for each subdomain isn't available while browsing the other.

The Amplitude SDK supports cross-site tracking with the `deviceIdFromURLParam` option in the SDK's [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/4cbe557a81ca981d03e140bebed6134c49595a5e/src/options.js#L71) which, when set to `true`, enables the SDK to capture the `amp_device_id` parameter from the URL. For more information, see [JavaScript SDK | Cross-domain tracking](/docs/sdks/analytics/browser/browser-sdk-2#cross-domain-tracking).
{{/partial:admonition}}

The rest of auto captured properties are unaffected by the fact of using LocalStorage instead of cookie you can [refer to this article](/docs/get-started/user-property-definitions) for full detail.

This action disables cookie storage, but Amplitude stores this same data in the user’s browser Local Storage. It's not a valid option for a user that wants to fully opt-out.

## Disable cookies and Local Storage / Session Storage (opt-out storage)

When you disable cookies, and the user disables Local Storage and Session Storage, Amplitude creates a new `device_id` for that user every time the visit your site because it can't find an existing ID. If the user logs in or provides other identifying information during their visit, Amplitude's identity resolution system ties the various `device_id` values together with that user ID. The user must log in on each visit to enable Amplitude to consolidate identifiers.

## Disabling tracking (opt-out tracking)

Users may wish not only to opt-out of cookies which will prevent Amplitude from storing any data in the cookie, but also opt-out of tracking completely, which means no events and no records of their browsing history will be stored in Amplitude. The Amplitude SDK provides an `optOut` as a way to fulfill this request. To programmatically opt-out of tracking the SDK provides the method `amplitude.setOptOut(true)`.

### “Do not track” setting on browsers (DNT flag)

Some browsers have a setting “Do not track” that's intended to block all tracking. Amplitude doesn't adhere to this setting. The DNT standard isn’t widely supported and it isn’t clear what it’s meant to disable. If you want to consider that setting, you'll need to write your own code to test for the DNT flag and then set the `optOut` option in the SDK.

## Managing cookie consent

Certain jurisdictions require that end users consent to non-essential cookies before any data is collected. You are ultimately responsible for ensuring that you obtain any necessary consents and make any necessary disclosures for the personal data you collect and send to Amplitude. You're also responsible for determining how you classify the Amplitude cookies in your cookie policy based on your specific use case and the jurisdictions in which you use them.

![](statamic://asset::help_center_conversions::get-started/consentscreen.png)

If you use the Amplitude SDK in a jurisdiction that requires consent before any non-essential cookies are set, don't initialize SDK until the end user has consented to the use of cookies. This is because the Amplitude functionality (for example, cookie storage, local storage, and tracking events) is enabled or disabled upon SDK initialization.

To allow for this, the JavaScript SDK offers an option called `deferInitialization` (defaults to `null`). If set to `true`, it disables the core functionality of the SDK, including saving a cookie (or anything to the local storage) and all tracking, until explicitly enabled. This allows the SDK instance to load without storage and tracking until you call `amplitude.getInstance().enableTracking()`.

When you call `amplitude.getInstance().enableTracking()`, the option `deferInitialization` is set to `false` and the cookie is created with the options values you configured, as you can see in the code below in [client.js](https://github.com/amplitude/Amplitude-JavaScript/blob/03c0a890d578db1ada383cf1e6195d71275bac44/src/amplitude-client.js#L2060).

```js
/**
* Enable tracking via logging events and dropping a cookie
* Intended to be used with the deferInitialization configuration flag
* This will drop a cookie and reset initialization deferred
* @public
*/
AmplitudeClient.prototype.enableTracking = function enableTracking() {
   // This will call init (which drops the cookie) and will run any pending tasks
   this._initializationDeferred = false;
   f(this);
   this.runQueuedFunctions();
 };

/**
* Saves deviceId, userId, event meta data to amplitude cookie
* @private
*/
var _saveCookieData = function _saveCookieData(scope) {
   const cookieData = {
     deviceId: scope.options.deviceId,
     userId: scope.options.userId,
     optOut: scope.options.optOut,
     sessionId: scope._sessionId,
     lastEventTime: scope._lastEventTime,
     eventId: scope._eventId,
     identifyId: scope._identifyId,
     sequenceNumber: scope._sequenceNumber,
   };
    if (scope._useOldCookie) {
     scope.cookieStorage.set(scope.options.cookieName + scope._storageSuffix, cookieData);
   } else {
     scope._metadataStorage.save(cookieData);
   }
 };
```

This doesn't affect users who have an Amplitude cookie. As you can see in the code below from [amplitude-client.js](https://github.com/amplitude/Amplitude-JavaScript/blob/03c0a890d578db1ada383cf1e6195d71275bac44/src/amplitude-client.js#L140), because that means that, at some point, the user provided consent, allowing the cookie to be created. To opt that user out of tracking, you must remove any amplitude cookies that were previously set for that user.

The decision to track events is determined by if a user has an Amplitude Analytics cookie. For users that have an Amplitude Analytics cookie, consider the following:

1. If the you manually define `cookieExpiration` to be a short lifespan, you may need to run `amplitude.getInstance().enableTracking()` upon the Amplitude Analytics cookie expiration or user log in.

2. If the user removes all the cookies, they will likely be shown the consent banner again the next time they visit the site/app. Since there won’t be any Amplitude Analytics cookie yet set, the flow will go as indicated: the initialization of storage and tracking options will wait if using `deferInitialization = true`.

3. If the user consented to the Amplitude Analytics cookie at some point in the past, and the given consent has expired because of any reason (website cookie deletion, consent tracking expired), the user will be prompted for consent again. If the user declines the consent, the Amplitude Analytics cookie must explicitly be removed, otherwise it will continue to collect the user’s information regardless of the consent declination.

## Getting the SDK initialization options per project

From any site that uses Amplitude JavaScript SDK, you can know which initialization options are set. Run the next command from the JavaScript console on the browser you use to access the site:

```js
amplitude.getInstance().options
```

You'll see the options displayed alongside their values. For example, on amplitude.com you'll see the following:

![](statamic://asset::help_center_conversions::get-started/initializationsdkoptions.png)

### API options in “Amplitude Event Explorer” Chrome extension

If you use the Amplitude Event Explorer Chrome extension, you can access the initialization options values in the “API Options” tab by first selecting which project (API key) you want to see the options for:

![](statamic://asset::help_center_conversions::get-started/pluginapioptions.png)

If the Amplitude object instance isn't stored in the `window` object, it won’t be available to extract this information, neither from the console nor from the Chrome extension; this usually happens when using Node.js instead of the JavaScript SDK.

![](statamic://asset::help_center_conversions::get-started/nooptionspermission.png)

The error in the console will be as displayed in the following image:

![](statamic://asset::help_center_conversions::get-started/nooptionspermissionerror.png)

### Storage options explained

This table gives a brief overview of each option related to storage.

| Option                 | Default Value                            | Definition                                                                                                                                                                                                                                                                                            |
| ---------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cookieExpiration`     | 365                                      | The number of days after which the Amplitude cookie will expire. The default 12 months is for GDPR compliance.                                                                                                                                                                                        |
| `cookieForceUpgrade`   | False                                    | Forces SDK pre-v6.0.0 instances to adopt SDK post-v6.0.0 compatible cookie formats.                                                                                                                                                                                                                   |
| `deferInitialization`  | Null                                     | If *`true`*, disables the core functionality of the SDK, including saving a cookie and all logging, until explicitly enabled by calling *`amplitude.getInstance().enableTracking()`*                                                                                                                  |
| `deviceIdFromUrlParam` | False                                    | If *`true`*, then the SDK will parse Device ID values from the URL parameter amp_device_id if available. This is useful for cross-domain tracking. Device IDs defined in the configuration options during init will take priority over Device IDs from URL parameters.                                |
| `disableCookie`        | False                                    | Disable Amplitude cookies altogether.                                                                                                                                                                                                                                                                 |
| `domain`               | The top domain of the current page's URL | Set a custom domain for the Amplitude cookie. To include subdomains, add a preceding period, for example: *`.amplitude.com`*.                                                                                                                                                                                  |
| `optOut`               | False                                    | Disable tracking for the current user.                                                                                                                                                                                                                                                                |
| `sameSiteCookie`       | None                                     | Sets the SameSite flag on the amplitude cookie. Decides cookie privacy policy.                                                                                                                                                                                                                        |
| `saveEvents`           | True                                     | If `true`, it saves events to Local Storage and removes them upon successful upload. **Note.-** Without saving events, those may be lost if the user navigates to another page before the events are uploaded.                                                                                        |
| `savedMaxCount`        | 1000                                     | Maximum number of events to save in Local Storage. If more events are logged while offline, then old events are removed.                                                                                                                                                                              |
| `secureCookie`         | False                                    | If `true`, the amplitude cookie will be set with the Secure flag. The secure flag is an additional flag for letting the browser send this cookie only when on encrypted HTTPS transmissions. This ensures that your cookie isn't visible to an attacker in, for instance, a man-in-the-middle attack. |
| `unsentIdentifyKey`    | amplitude_unsent_identify                | *`localStorage`* key that stores unsent identifies.                                                                                                                                                                                                                                                   |
| `unsetKey`             | amplitude_unsent                         | *`localStorage`* key that stores unsent events.                                                                                                                                                                                                                                                       |

## Abstraction layer for storage

The abstraction layer for storage and available options as well as the metadata that's stored can be found in Amplitude's GitHub:

- [constants.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/constants.js) 
- [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/options.js) 
- [cookiestorage.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/cookiestorage.js)
- [cookie.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/cookie.js)
- [base-cookie.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/base-cookie.js)
- [localstorage.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/localstorage.js)
- [metadata-storage.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/metadata-storage.js)

As indicated, the options are set on initialization; regarding the cookie and metadata storage this action happens in the method Init for the Amplitude client:

- [amplitude-client.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/amplitude-client.js)

```js
this.options.apiKey = apiKey;
this._storageSuffix =
   '_' + apiKey + (this._instanceName === Constants.DEFAULT_INSTANCE ? '' : '_' + this._instanceName);
this._storageSuffixV5 = apiKey.slice(0, 6);

this._oldCookieName = this.options.cookieName + this._storageSuffix;
this._unsentKey = this.options.unsentKey + this._storageSuffix;
this._unsentIdentifyKey = this.options.unsentIdentifyKey + this._storageSuffix;

this._cookieName = Constants.COOKIE_PREFIX + '_' + this._storageSuffixV5;

this.cookieStorage.options({
   expirationDays: this.options.cookieExpiration,
   domain: this.options.domain,
   secure: this.options.secureCookie,
   sameSite: this.options.sameSiteCookie,
});

this._metadataStorage = new MetadataStorage({
   storageKey: this._cookieName,
   disableCookies: this.options.disableCookies,
   expirationDays: this.options.cookieExpiration,
   domain: this.options.domain,
   secure: this.options.secureCookie,
   sameSite: this.options.sameSiteCookie,
   storage: this.options.storage,
});

const hasOldCookie = !!this.cookieStorage.get(this._oldCookieName);
const hasNewCookie = !!this._metadataStorage.load();
this._useOldCookie = !hasNewCookie && hasOldCookie && !this.options.cookieForceUpgrade;
const hasCookie = hasNewCookie || hasOldCookie;
```

## Frequently asked questions


{{partial:collapse name="Are Amplitude's cookies first-party or third-party cookies?"}}
**Amplitude uses first-party cookies**. From a technical standpoint there’s no intrinsic difference between first-party and third-party cookies. The distinction is related to:

1. The context of a particular visit.
2. Who creates the cookie.

Every cookie has an owner, this is, a domain defined in the cookie:

- **First-party cookies** are issued by a website that a user views directly. So, if a user lands on a website – for example, fit.amplitude.com – then this site creates a cookie which is then saved on the user’s computer. 
This is the case for Amplitude. When a customer decides to use on their website our JS SDK for the tracking, it is this customer and this website the one who is directly creating the cookie that is stored in the visitor’s computer. 

- **Third-party cookies** are not created by the website being visited, but rather by someone else. Let’s say you’re visiting fit.amplitude.com, and this site uses YouTube videos for the virtual non-live classes. In this case, it will be YouTube who is setting a cookie which is then saved on the user’s computer.

What is happening in this case is that the website owner is embedding pieces of code, provided by YouTube, for the videos to play directly in fit.amplitude.com. When that YouTube code is executed in the browser, or the video is loaded, YouTube can track the player and put data in its cookies. As a result, the cookie is classified as a third-party cookie, because it’s created by a different domain than fit.amplitude.com / amplitude.com
{{/partial:collapse}}

{{partial:collapse name="Will Google Chrome’s plan to remove third party cookies affect Amplitude?"}}
**No**, as previously indicated, **Amplitude is not a third-party cookie**. Amplitude customers add Amplitude to their website/bundle themselves and Amplitude sets it in their own bundled code through document.cookie, so Amplitude has the privilege of a first-party cookie.
{{/partial:collapse}}


{{partial:collapse name="Why aren't Amplitude cookies marked as `HTTPOnly`?"}}
It doesn’t really make sense for Amplitude's cookies to be HTTPOnly; the point of that option is so that document.cookie can’t read those cookies (since they’d only be used in the client-server communication). But the point of Amplitude's cookies is the opposite: Amplitude wants to persist data specifically in their browser and be put in document.cookies, Amplitude can’t read from their server because Amplitude is client-side code.

The concerns of having Amplitude's cookie be not HTTPOnly aren't aligned with the fact of stealing authentication information: Amplitude has no authentication information in that cookie so Amplitude isn't in danger of a XSS attack. The worst thing an attacker could do is steal Amplitude's cookie and take that user’s device ID and user ID, which shouldn’t be PII to be begin with.

Nonetheless, if this is a serious concern for the customer, they should probably disable Amplitude's cookies.
{{/partial:collapse}}

{{partial:collapse name="Why aren't Amplitude's cookies marked as secure?"}}
The secure flag is an additional flag for letting the browser **send the cookie only when on encrypted HTTPS transmissions**. This ensures that your cookie is not visible to an attacker in, for instance, a man-in-the-middle attack. Amplitude has no authentication information in that cookie nor any type of sensitive information, so Amplitude isn't in danger of a XSS attack not needing to set the cookie as secure by default. Again, the worst thing an attacker could do is steal Amplitude's cookie and take that user’s device ID and user ID.

Based on those premises, Amplitude doesn't consider this as a security vulnerability.
{{/partial:collapse}}

{{partial:collapse name="Will cookies cause unsent events to send to a project with a different API key"}}
No, the SDK versions later than 4.0.0 scope with the API key all events stored in the unsent keys (local storage) so if a product changes the project (or its API key) it's sending the events to, those old events won’t reach the new project.

In SDK versions prior to 4.0.0, this wasn’t the case, and the events didn’t consider the API Key when queued to be retried. If the product is still using an old SDK version, the old unsent events remaining in local storage reach the new project the moment the connection with Amplitude runs again. A way that might mitigate this problem in the case the customer can’t upgrade to a newer SDK version is to use an instance name for the project instead of using the default project. Like this to instantiate the Amplitude client:  `amplitude.getInstance(‘ProjectName’).init("API_KEY")`, and like this to log any event: 
`amplitude.getInstance(ProjectName).logEvent()`.{{/partial:collapse}}

{{partial:collapse name="How do you integrate with third-party Consent Management Platfoms?"}}
A consent management platform (CMP) is a technology that websites/applications can use to manage legal consent from users to collect and process their personal data through cookies and other trackers in operation on the domain as may be required by applicable privacy laws, such as GDPR, CCPA and ePrivacy. Some examples of these tools are OneTrust, Axeptio or Responsum.

At the time of writing this document, Amplitude doesn't have a default integration with any of these tools. Therefore, the customer must configure their CMP to pass  the outcome of the consent to the Amplitude SDK, so that any end user that has not provided consent or has revoked consent (depending on the end user’s jurisdiction) will be opted out of tracking by the Amplitude SDK. That signal must be received by the SDK as implemented on the customer’s site/application to execute (if consent is accepted) the method *`amplitude.getInstance().enableTracking()`* while using the SDK deferred initialization as indicated in the section [**“Managing Cookie Consent”**](#managing-cookie-consent).
{{/partial:collapse}}

{{partial:collapse name="Can I use OneTrust with Amplitude to stay GDPR compliant?"}}
Yes, you can use Amplitude with a CMP, like OneTrust, in a GDPR compliant manner. However, to ensure compliance, implement Amplitude in a way that meets their compliance needs. Amplitude can't direct customers on how to classify the Amplitude SDK/cookies. Your privacy and legal teams should assess based on the data being collected. However, most customers, including in the EU, classify Amplitude cookies as Performance/Analytics cookies. 

Additionally, customers may choose to implement via a server side integration, therefore bypassing Amplitude’s cookies from the SDK. However, customers who integrate via a server side integration will still be responsible for ensuring that they obtain any necessary consents and make any necessary disclosures for the personal data they collect and send to Amplitude. 
{{/partial:collapse}}

{{partial:collapse name="When a user is opted-out, how can I opt them in again?"}}
Besides the method `amplitude.getInstance().enableTracking()` discussed before, once a user is opted-out,  you can opt them in programmatically by calling the method `amplitude.setOptOut(false)`. This sets the option `optOut` to `false`, re-setting the cookie with the new options and enabling the tracking. You can find the following code in the amplitude client:

```js
/**
* Sets whether to opt current user out of tracking.
* @public
* @param {boolean} enable - if true then no events will be logged or sent.
* @example: amplitude.setOptOut(true);
*/
AmplitudeClient.prototype.setOptOut = function setOptOut(enable) {
if (this._shouldDeferCall()) {
    return this._q.push(['setOptOut'].concat(Array.prototype.slice.call(arguments, 0)));
}
    if (!utils.validateInput(enable, 'enable', 'boolean')) {
    return;
}
    try {
    this.options.optOut = enable;
    _saveCookieData(this);
} catch (e) {
    utils.log.error(e);
}
};
```
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
2. **It doesn't mean a customer can collect ALL data** about a user for analysis.
3. Under the exemption, **customers can't use or create “user” analyses**.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - What does the CNIL exemption mean for Amplitude and our cookies?"}}
As discussed, the CNIL allows for a limited exemption for the requirement that companies obtain user consent for any non-essential cookies. In general, this exemption applies to analytics cookies for the limited purpose of audience measurement of an app or a site, and it's limited to the use of anonymous tracers.

**Therefore, a customer’s use of an analytics service under the exemption will be very limited**. Without the CNIL cookie exemption, customers might only collect and measure part of their traffic. The power of the limited data set (for example, the data set with just the users that opt-in/consent) in Amplitude is much more valuable than the very limited data that can be collected under the exemption. This is because:

Audience measurement (page views, overall sessions) don't help customers make better decisions; behavioral analytics guide actions and learning.

Amplitude doesn't need 100% of traffic to derive meaningful insights.

Most of the exempted tools don't have the powerful analytics capabilities of Amplitude.

Besides using the SDKs, customers can still send data to Amplitude server-side. This doesn't require customers to obtain consent for a separate Amplitude SDK cookie. However, as mentioned above, customers who integrate via a server side integration will still be responsible for ensuring that they obtain any necessary consents and make any necessary disclosures for the personal data they collect and send to Amplitude. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - 13-month cookie limit"}}
The Amplitude SDK has a [`cookieExpiration` option](#expiration-time) to allow customers to set the number of days a cookie will live. It defaults to 1 year as of the current version. However, most browsers will by default limit the lifetime of cookies set using document.cookie from 1 to 7 days.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - 25-month data retention max"}}
Use [Amplitude’s Time to Live](/docs/data/time-to-live) functionality to set a retention schedule for their event data. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Purpose strictly limited to the sole measurement of the site’s or application’s audience"}}
On the requirement of having a purpose strictly limited to the sole measurement of the site’s or application’s audience (performance measurement, detection of browsing problems, optimization of technical performance or its ergonomics, estimation of the power of the servers required, analysis of contents consulted), for the exclusive account of the publisher, Amplitude customers are in full control of the data that they choose to send to the Amplitude platform, and can choose to only send Amplitude events related to audience measurement/page views.

{{/partial:collapse}}

{{partial:collapse name="CNIL France - Only serve to produce anonymous statistical data"}}
To use Amplitude to produce anonymous statistical data, Amplitude recommends taking the following steps:

- Reach out to Amplitude at <mailto:cnil-support@amplitude.com>, if you are a prospective customer, or via [this form](https://amplitude.zendesk.com/hc/en-us/requests/new), if you are an existing customer, to:

    - request that IP address be dropped for projects that contain end users that haven't provided consent;
    - discuss disabling Amplitude’s User Look-Up and the ability to view user streams for projects that contain data for end users that haven't provided consent; and 
    - discuss the most effective configuration options for your use case.  

- Don't send deviceID to Amplitude for end users that haven't provided consent.
- For end users that haven't provided consent, set a userID that's randomly generated or hashed.
- Consider disabling the capacity to filter end users at the individual level by hiding user properties, such as userID, deviceID and Amplitude ID. See [this documentation](/docs/data/transformations). 
- Consider disabling user downloads. See [this documentation](/docs/admin/account-management/manage-orgs-projects). 

{{/partial:collapse}}

{{partial:collapse name="CNIL France - Compliant with GDPR"}}
Amplitude’s privacy program is based on privacy-by-design principles. Amplitude's privacy program ensures that it complies with all relevant domestic and international privacy regulations and laws regarding the processing of personal data, including GDPR.

Amplitude also offers customers the choice of having their data hosted in the US-West based AWS environment or the EU based AWS environment. To ensure that Amplitude's customers can appropriately respond to and comply with end-user data deletion requests as required by global privacy laws such as GDPR, Amplitude has built an API endpoint that allows customers to programmatically submit requests to delete all data for a set of known Amplitude IDs and/or User IDs. For more details, see the developer documentation: [User Privacy API](/docs/apis/analytics/user-privacy).

Additionally, Data Subject Access Requests (DSARs) can be completed using the DSAR API, which makes it easy to retrieve all data about a single user. More details can be found [here](/docs/apis/analytics/ccpa-dsar). 

More information on Amplitude’s stance on privacy and security can be found [here](https://amplitude.com/trust). 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Cookies must not lead to a cross-checking of the data with other processing or that data be passed on to third parties."}}
No data is exported from Amplitude unless the customer chooses to export data to third party products. Customers shouldn't use Amplitude to export data related to end users that haven't provided consent to third party products. 

Additionally, upon request, Amplitude can disable its cohort syncing and data streaming capabilities for orgs containing only data for end users that haven't provided consent. 
{{/partial:collapse}}

{{partial:collapse name="CNIL France - Cookies must not allow the global follow-up"}}
The CNIL exemption mentions that cookies must not allow the global follow-up of the navigation of the person using different applications or browsing on different websites; any solution that uses the same identifier across multiple sites (for example, through cookies placed on a third-party domain loaded by multiple sites) to cross-reference, duplicate, or measure a unified reach for content is excluded. 

To comply with this requirement, **customers shouldn't use Amplitude’s [cross domain tracking](/docs/sdks/analytics/browser/browser-sdk-2#cross-domain-tracking)**, and should use a [separate platform instrumentation](/docs/get-started/cross-platform-vs-separate-platform) for any projects with data from end users that haven't provided consent. By default, Amplitude doesn't employ cross domain tracking for customers.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - The data is collected, processed and stored independently for each publisher"}}
In Amplitude, customer data is logically separated and stored in encrypted form in Amplitude’s AWS environment.
{{/partial:collapse}}

{{partial:collapse name="CNIL France - The trackers are completely independent of each other and of any other tracker"}}
The cookie used by the Amplitude SDK is a [first party cookie](#frequently-asked-questions) and any data collected by the cookie is collected by the customer as the controller of the data. Amplitude only processes the customer’s data as a processor / service provider, and doesn't use customer data for its own purposes. 
{{/partial:collapse}}