---
id: 676af2fe-cf1a-40db-8720-331002aa5bea
blueprint: migration
title: 'Migrate from Google Analytics'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719511444
---

If you're considering migrating from Google Analytics (GA4) to Amplitude for your analytics user tracking, read this guide to learn more about the options available to you.

Migrating from the Google Analytics (GA4) SDK to the Amplitude SDK requires you to adjust your tracking implementation to align with Amplitude's event structure and capabilities.

Amplitude offers two methods to help you migrate from Google Analytics to Amplitude:

1. A [low-code Google Analytics event forwarding plugin](#forward-events-from-google-analytics)
2. A [migration guide](#replace-google-analytics) that highlights the differences between Google Analytics and Amplitude tracking.

{{partial:admonition type="note" heading="BigQuery Import for GA4 (Google Analytics 4) Beta"}}
Amplitude is working on a beta version of BigQuery Import specifically for GA4. To join this beta, [contact Amplitude Support](https://amplitude.zendesk.com/hc/en-us/requests/new). For more information about importing BiqQuery data in to Amplitude, see the [BigQuery Source documentation](/docs/data/source-catalog/bigquery).
{{/partial:admonition}}

## Forward events from Google Analytics

For less complex implementations, and to help you migrate more easily, Amplitude offers a low-code migration tool, the Google Analytics Event Forwarder.

### Use the Google Analytics events forwarder

This solution works as a plugin to the Amplitude Browser SDK. When you install the plugin on your application, it listens for the events that Google Analytics (GA4) tracks. For each event sent to Google Analytics (GA4), the plugin sends a corresponding event to Amplitude.

### Initialize Amplitude with Google Analytics events forwarder

Add the Amplitude SDK with Google Analytics events forwarder snippet **before** your Google Tag snippet. Adding it before ensures that it can forward all Google Analytics (GA4) events to Amplitude. Placement before the Google Analytics snippet ensures that Amplitude can listen to and receive all events you collect with Google Analytics. See 

```
<script type="text/javascript">
  !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var r=0;r<y.length;r++)o(e,y[r],!0)};r.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.crossOrigin="anonymous",a.src="https://cdn.amplitude.com/libs/plugin-ga-events-forwarder-browser-0.2.0-min.js.gz",
  a.onload=function(){e.gaEventsForwarder&&e.gaEventsForwarder.plugin&&e.amplitude.add(e.gaEventsForwarder.plugin())};var c=t.createElement("script");c.type="text/javascript",c.integrity="sha384-HpnlFSsUOQTaqmMKb6/PqZKVOBEpRji3JNLr81x6XElQ4bkquzRyG/F8rY8IDMuw",c.crossOrigin="anonymous",c.async=!0,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.2.1-min.js.gz",c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(a,u),u.parentNode.insertBefore(c,u);for(var p=function(){return this._q=[],this},d=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<d.length;l++)n(p,d[l]);r.Identify=p;for(var g=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(g,v[f]);r.Revenue=g;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],y=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(e){return r._iq[e]={_q:[]},i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

  amplitude.init('YOUR_API_KEY');
</script>
```

Replace `'YOUR_API_KEY'` with your actual Amplitude API key, which you can find in your Amplitude account.

You can find Google Tag can be in every page of your website, immediately after the <head> element. The Google Tag for your account should look like the snippet below.

```html
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    </script>
```

After you add both the Google Analytics and Amplitude snippets, you should start to see Google Analytics events in Amplitude without extra instrumentation.

Event names and properties you forward from Google Analytics retain the naming convention set in Google Analytics. For example, if you store the `city` in a custom dimension in Google Analytics, that event property may appear as `ua_dimension_14` in Amplitude.

Amplitude also tracks the Measurement ID from Google Analytics to help you pinpoint from where an event originates.

For events that both Google Analytics and Amplitude track by default, like `page_view`, the plugin accepts the Amplitude default to avoid duplication.

## Replace Google Analytics

For more customized implementations, you can replace Google Analytics with Amplitude, and adjust your tracking to ensure events track properly with Amplitude.

### Initialize Amplitude

Replace the Google Analytics (GA4) initialization script with Amplitude initialization script in your application's code.

Google Analytics script:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Copy the Amplitude initialization script below, or see [GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/plugin-ga-events-forwarder-browser#1-import-amplitude-packages) for more installation options.

```
<script type="text/javascript">
  !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e._q.push({name:t,args:Array.prototype.slice.call(r,0)})},i=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))};o(e,t,Array.prototype.slice.call(arguments))}},a=function(e){for(var t=0;t<m.length;t++)i(e,m[t],!1);for(var r=0;r<g.length;r++)i(e,g[r],!0)};r.invoked=!0;var c=t.createElement("script");c.type="text/javascript",c.integrity="sha384-Chi7fRnlI3Vmej27YiXRbwAkES7Aor2707Qn/cpfhyw4lYue9vH/SOdlrPSFGPL/",c.crossOrigin="anonymous",c.async=!0,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.3.2-min.js.gz",c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};
  var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(c,u);for(var l=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],d=0;d<p.length;d++)n(l,p[d]);r.Identify=l;for(var f=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],y=0;y<v.length;y++)n(f,v[y]);r.Revenue=f;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];a(r),r.createInstance=function(e){return r._iq[e]={_q:[]},a(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

  amplitude.init("<YOUR_API_KEY>");
</script>
```

### Track events

Amplitude's tracking function requires different parameters than Google Analytics (GA4). See to the code snippets to compare tracking functions.

#### Google Analytics (GA4)

```js
gtag('event', 'event_name', {
  param1: 'value1',
  param2: 'value2',
});
```

#### Amplitude

See more details on [Tracking an event](/docs/sdks/analytics/browser/browser-sdk-2#track-an-event).

```js
amplitude.track('event_name, {
  param1: 'value1',
  param2: 'value2',
})
```

### Set a user ID

#### Google Analytics (GA4)

```js
gtag('config', 'GA_MEASUREMENT_ID', {
    user_id: 'USER_ID',
});
```

#### Amplitude

See more details on [Custom user ID](/docs/sdks/analytics/browser/browser-sdk-2#custom-user-identifier).

```js
amplitude.setUserId('USER_ID');
```

### Set user properties

#### Google Analytics (GA4)

```js
gtag('set', 'user_properties', {
    property1: 'value1',
    property2: 'value2',
});
```

#### Amplitude

See more details on [User properties](/docs/sdks/analytics/browser/browser-sdk-2#user-properties).

```js
amplitude.identify(
  new amplitude.Identify()
    .set('property1', 'value1')
    .set('property2', 'value2'),
);
```

For more information, see the [Amplitude Browser SDK documentation](/docs/sdks/analytics/browser/browser-sdk-2).