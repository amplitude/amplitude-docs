---
id: a5dc1793-29f7-4c23-a656-459def9c6b3f
blueprint: web_experiment
title: 'Implement Web Experiment'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729196004
---
Amplitude's Web Experimentation requires a standalone script that you must add to your website. Paste the script into the `<head>` element of your site, as high as possible to avoid flickering.

The script tracks [impression events](/docs/web-experiment/tracking#impressions) with the [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) already installed on your site, or a [third-party analytics SDK](#integrate-with-a-third-party-cdp).

{{partial:admonition type='note'}}
See [Amplitude's pricing page](https://amplitude.com/pricing) to find out if this feature is available on your Amplitude plan.
{{/partial:admonition}}

## Add the experiment script

Replace `API_KEY` with your project's API key in one of the synchronous scripts below, depending on your region:

{{partial:tabs tabs="US Data Center, EU Data Center"}}
{{partial:tab name="US Data Center"}}
```html
<script src="https://cdn.amplitude.com/script/API_KEY.experiment.js"></script>
```
{{/partial:tab}}
{{partial:tab name="EU Data Center"}}
```html
<script src="https://cdn.eu.amplitude.com/script/API_KEY.experiment.js"></script>
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Content security policies"}}
If your site defines the `script-src` content policy directive, add `*.amplitude.com` and `unsafe-inline` to the policy values. These additions enable loading the Web Experiment script and visual editor on your site.

```text
Content-Security-Policy: script-src *.amplitude.com unsafe-inline;
```
{{/partial:admonition}}

### Async script with anti-flicker snippet

The synchronous script above provides the best experience for your users. If you need to load the script asynchronously, include the following anti-flicker snippet which masks elements on the page until all changes are applied. Replace `API_KEY` with your project's API key and optionally set the timeout to remove the anti-flicker mask.

{{partial:tabs tabs="US Data Center, EU Data Center"}}
{{partial:tab name="US Data Center"}}

```html
<script>
  (function(d, h){
    // TODO: Replace API_KEY with your API key.
    var apiKey = "API_KEY"; //[tl! ~~]
    // TODO: Set a timeout in milliseconds for the anti-flicker.
    var timeout = 1000; //[tl! ~~]
    // Hides the page and loads the script. Shows page if script fails to load,
    // otherwise the script shows the page.
    var id = "amp-exp-css";
    try {
      if (!d.getElementById(id)) {
        var st = d.createElement("style");
        st.id = id;
        st.innerText = "* { visibility: hidden !important; background-image: none !important; }";
        h.appendChild(st);
        window.setTimeout(function () {st.remove()}, timeout);
        var sc = d.createElement("script");
        sc.src = "https://cdn.amplitude.com/script/"+apiKey+".experiment.js";
        sc.async = true;
        sc.onerror = function () {st.remove()};
        h.insertBefore(sc, d.currentScript || h.lastChild);
      }
    } catch {console.error(e)}
  })(document, document.head);
</script>
```

{{/partial:tab}}
{{partial:tab name="EU Data Center"}}

```html
<script>
  (function(d, h){
    // TODO: Replace API_KEY with your API key.
    var apiKey = "API_KEY"; //[tl! ~~]
    // TODO: Set a timeout in milliseconds for the anti-flicker.
    var timeout = 1000; //[tl! ~~]
    // Hides the page and loads the script. Shows page if script fails to load,
    // otherwise the script shows the page.
    var id = "amp-exp-css";
    try {
      if (!d.getElementById(id)) {
        var st = d.createElement("style");
        st.id = id;
        st.innerText = "* { visibility: hidden !important; background-image: none !important; }";
        h.appendChild(st);
        window.setTimeout(function () {st.remove()}, timeout);
        var sc = d.createElement("script");
        sc.src = "https://cdn.eu.amplitude.com/script/"+apiKey+".experiment.js";
        sc.async = true;
        sc.onerror = function () {st.remove()};
        h.insertBefore(sc, d.currentScript || h.lastChild);
      }
    } catch {console.error(e)}
  })(document, document.head);
</script>
```

{{/partial:tab}}
{{/partial:tabs}}

### Integrate with a third-party CDP

If you use a CDP other than Amplitude to send events, set up an integration to provide user identity information and track events. If you don't set up an integration, the script assumes you have Amplitude Browser SDK installed on the same site.

The Web Experiment script supports common CDP integrations through an `integration` query parameter in the  script URL.

#### Segment integration

Web experimentation supports Segment by default. Add `integration=segment` as a query parameter to the script URL. For example, if you use Amplitude's US region:

```html
<!-- Replace API_KEY with your project's API key -->
<script src="https://cdn.amplitude.com/script/API_KEY.experiment.js?integration=segment"></script>
```

#### Tealium integration

If you send events through [Tealium](/docs/data/source-catalog/tealium) using Tealium iQ or Tealium AudienceStream & Universal Data Hub, then you don't need to set up an integration. Tealium loads the Amplitude Analytics SDK onto the site which integrates directly with the Web Experiment script.

#### Custom integrations

Implement the `IntegrationPlugin` interface and set the `experimentIntegration` window variable to add a custom integration. Place the plugin script *before* the Web Experiment script tag.

* `getUser(): object`: Return the [experiment user](/docs/feature-experiment/data-model#users) object.
* `track(): boolean`: Track the event through a 3rd party. Return `true` if the event was tracked. Returning `false` causes the event to be persisted and retried at an interval.
* `setup(): Promise<void>`: (Optional) Set up the integration asynchronously. Returns a promise which resolves when the integration is ready to return user information from `getUser()`.

```html
<script>
window.experimentIntegration = {
  getUser: () => {
    // TODO: Return user
    return {
      user_id: "user",
      device_id: "device"
    };
  },
  track: (e) => {
    // TODO: Track event
    analytics.track(
      e.eventType,
      e.eventProperties
    );
    return true;
  }
};
</script>
// TODO: Add the Web Experiment script tag
```

[Contact support](https://amplitude.zendesk.com/hc/en-us/requests/new) for help with a custom integration for your CDP.

## Content management systems

Amplitude Web Experiment supports any CMS that supports custom scripts. Amplitude provides plugins that support both Wordpress and Shopify to help you get running on those platforms.

### Wordpress

Amplitude's [Wordpress plugin](/docs/data/amplitude-wordpress-plugin) enables Amplitude Analytics, Experiment, and Session Replay.

### Shopify

[Amplitude's Shopify App](https://apps.shopify.com/amplitude) enables Amplitude Analytics, Experiment, and Session Replay on your Shopify site.

{{partial:admonition type="warning" heading="Shopify and flickering"}}
The method Shopify uses to loads Amplitude's Shopify app causes flickering. To avoid this, add the [asynchronous web script with the anti-flicker snippet](#async-script-with-anti-flicker-snippet) to your `theme.liquid` file.
{{/partial:admonition}}

## Tag managers

Tag managers, like Google Tag Manager load scripts asynchronously, which causes flickering. Tag managers can be a good way to start using the visual editor to create variants in parallel if adding the Web Experiment script directly to the page takes time. Amplitude recommends against using tag managers in production.

### Google Tag Manager (GTM)

{{partial:admonition type="warning" heading="Causes Flicker"}}
Implementing Web Experiment with a tag manager will cause flicker. Only use a tag manager when getting started, if adding the script to the site is out of the question in the short-term.
{{/partial:admonition}}

Use a [custom HTML tag](https://support.google.com/tagmanager/answer/6107167) to add the script using GTM.
