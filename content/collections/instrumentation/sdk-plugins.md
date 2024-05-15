---
id: 53c7b244-36fd-47b4-8cd7-689dc44fc563
blueprint: instrumentation
title: 'SDK Plugins'
source: 'https://www.docs.developers.amplitude.com/data/sdk-plugins/'
nav_title: developers
---
Plugins allow you to extend the Amplitude behavior. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more. 

## Plugin methods

A plugin is an object with methods `setup()` and `execute()`:

### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue instrumented using the client interface.

Add plugin to Ampli via `amplitude.add()`. You can add as many plugin as you like. Each plugin runs in the order based on the plugin type.

```js
amplitude.add(yourPlugin())
```

{{partial:admonition type="note" heading=""}}
If `execute()` doesn't returns an event, the event will **NOT** propagate through the remaining plugins
{{/partial:admonition}}

## Enrichment plugins

Enrichment plugins modify properties in Event objects or drop an Event. Here are the [available keys for Event Object](/apis/http-v2/#keys-for-the-event-argument) which you can enrich in the Enrichment Plugin.

### Drop an event

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import * as amplitude from '@amplitude/analytics-browser';

import {PluginType} from '@amplitude/analytics-types';

class FilterEventsPlugin {
  name = 'filter-events-plugin';
  type = PluginType.ENRICHMENT;

  async setup(config) {
    return undefined;
  }

  async execute(event) {
    // ignore events with a certain property
    if (event.event_properties['ignore'] === true){
      // returning null will prevent this event from being processed by subsequent plugins
      return null;
    }

    // Allow other events to be processed and sent to destination plugins
    return event;
  }
}

amplitude.add(new FilterEventsPlugin());
amplitude.init('API_KEY');
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import * as amplitude from '@amplitude/analytics-browser';

import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

class FilterEventsPlugin implements EnrichmentPlugin {
  name = 'filter-events-plugin';
  type = PluginType.ENRICHMENT as any;

  async setup(config: BrowserConfig): Promise<void> {
    return undefined;
  }

  async execute(event: Event): Promise<Event | null> {
    // ignore events with a certain property
    if (event.event_properties['ignore'] === true){
      // returning null will prevent this event from being processed by subsequent plugins
      return null;
    }

    // Allow other events to be processed and sent to destination plugins
    return event;
  }
}

amplitude.add(new FilterEventsPlugin());
amplitude.init('API_KEY');
```
{{/partial:tab}}
{{/partial:tabs}}

### Set universal user properties

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import * as amplitude from '@amplitude/analytics-browser';

import {PluginType} from '@amplitude/analytics-types';

class PropertiesEnrichmentPlugin {
  name = 'properties-plugin';
  type = PluginType.ENRICHMENT;

  async setup(_, amplitude) {
    if (shouldSetUserProperties) {
      const identifyEvent = new amplitude.Identify();
      identifyEvent.set("testKey", "testValue");
      amplitude.identify(identifyEvent);
    }
    return undefined;
  }

  async execute(event) {
      return event
  }
}

amplitude.add(new PropertiesEnrichmentPlugin());
amplitude.init('API_KEY');
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import * as amplitude from '@amplitude/analytics-browser';

import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

class PropertiesEnrichmentPlugin implements EnrichmentPlugin {
  name = 'filter-events-plugin';
  type = PluginType.ENRICHMENT as any;

  async setup(config: BrowserConfig, amplitude: Amplitude): Promise<void> {
    if (shouldSetUserProperties) {
      const identifyEvent = new amplitude.Identify();
      identifyEvent.set("testKey", "testValue");
      amplitude.identify(identifyEvent);
    }
    return undefined;
  }

  async execute(event: Event): Promise<Event> {
      return event
  }
}

amplitude.add(new PropertiesEnrichmentPlugin());
amplitude.init('API_KEY');
```
{{/partial:tab}}
{{/partial:tabs}}

### Remove personally identifiable information (PII)

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import * as amplitude from '@amplitude/analytics-browser';
import {PluginType} from '@amplitude/analytics-types';

class FilterEventsPlugin {
  name = 'remove-PII-plugin';
  type = PluginType.ENRICHMENT;

  async setup(config) {
    return undefined;
  }

  async execute(event) {
      // remove PII on the event
      if(event.user_properties['phone']) {
        delete event.user_properties['phone'];

        // set a new prop to mark this event as modified
        event.event_properties['pii-removed'] = true;
      }

      // return modified event with PII removed
      return event
  }
}

amplitude.init('API_KEY');
amplitude.add(new FilterEventsPlugin());
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import * as amplitude from '@amplitude/analytics-browser';

import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

class FilterEventsPlugin implements EnrichmentPlugin {
  name = 'remove-PII-plugin';
  type = PluginType.ENRICHMENT as any;

  async setup(config: BrowserConfig): Promise<void> {
    return undefined;
  }

  async execute(event: Event): Promise<Event> {
      // remove PII on the event
      if(event.user_properties['phone']) {
        delete event.user_properties['phone'];

        // set a new prop to mark this event as modified
        event.event_properties['pii-removed'] = true;
      }

      // return modified event with PII removed
      return event
  }
}

amplitude.add(new FilterEventsPlugin());
amplitude.init('API_KEY');
```
{{/partial:tab}}
{{/partial:tabs}}

### Send event level groups with Ampli v2

This is an example of how to send event level groups in Ampli V2. How to send event level groups in SDKs(not in Ampli) is different. Please check the specific SDKs for the usage.

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import * as amplitude from '@amplitude/analytics-browser';

import {PluginType} from '@amplitude/analytics-types';

class EventLevelGroupPlugin {
  name = 'group-plugin';
  type = PluginType.ENRICHMENT;

  async setup(config) {
    return undefined;
  }

  async execute(event) {
      event.groups = event.extra['groups'];
      return event;
  }

  // Allow other events to be processed and sent to destination plugins
  return event;
}

ampli.client.add(new EventLevelGroupPlugin());

const extra = {extra: { groups: ["test_group_name": "test_group_value"]}};
ampli.eventWithGroups({requiredNumber: 1.23, requiredBoolean: false}, extra);
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

class EventLevelGroupPlugin implements EnrichmentPlugin {
  name = 'group-plugin';
  type = PluginType.ENRICHMENT as any;

  async setup(config: BrowserConfig): Promise<void> {
    return undefined;
  }

  async execute(event: Event): Promise<Event> {
      event.groups = event.extra['groups'];
      return event;
  }
}

ampli.client.add(new EventLevelGroupPlugin());

// Pass the event level groups info though middleware extra when calling the tracking plan.
const extra = {extra: { groups: ["test_group_name": "test_group_value"]}};
ampli.eventWithGroups({requiredNumber: 1.23, requiredBoolean: false}, extra);
```
{{/partial:tab}}
{{/partial:tabs}}

## Destination plugins

Use a Destination Plugin to send events to a third-party APIs

### Send to Segment

Follow Segment's guide to install [Segment Analytics.js 2.0 Web SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) first.

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import { AnalyticsBrowser } from '@segment/analytics-next';
import { Types } from '@amplitude/analytics-browser';

export default class SegmentPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION;

  constructor(private readonly writeKey) {
    // Create Segment tracker
    this.segment = new AnalyticsBrowser();
  }

  async setup(config) {
    this.segment.load({
      writeKey: this.writeKey,
    });
    return;
  }

  execute(context) {
    return new Promise(resolve => {
      const {
        event_type,
        event_properties,
        user_id,
        user_properties,
        groups,
        group_properties,
      } = context;
      const callback = (ctx) => {
        resolve({ event: context, code: 200, message: '' });
      };

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
        case Types.SpecialEventType.GROUP_IDENTIFY:
          const groupValues = groups ? Object.values(groups) : [];
          if (groupValues.length === 0) {
            this.segment.identify(
              user_id,
              user_properties?.[Types.IdentifyOperation.SET],
              {},
              callback,
            );
          } else {
            this.segment.group(
              groupValues[0],
              group_properties?.[Types.IdentifyOperation.SET],
              {},
              callback,
            );
          }
          break;

        case 'page':
          // @ts-ignore
          const { name, category, ...properties } = event_properties;
          this.segment.page(category, name, properties, {}, callback);
          break;

        default:
          this.segment.track(event_type, event_properties, {}, callback);
          break;
      }
    });
  }
}
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import { AnalyticsBrowser } from '@segment/analytics-next';
import { Types } from '@amplitude/analytics-browser';

export default class SegmentPlugin implements Types.DestinationPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION as any;
  segment: AnalyticsBrowser;

  constructor(private readonly writeKey: string) {
    // Create Segment tracker
    this.segment = new AnalyticsBrowser();
  }

  async setup(config: Types.Config): Promise<undefined> {
    this.segment.load({
      writeKey: this.writeKey,
    });
    return;
  }

  execute(context: Types.Event): Promise<Types.Result> {
    return new Promise<Types.Result>(resolve => {
      const {
        event_type,
        event_properties,
        user_id,
        user_properties,
        groups,
        group_properties,
      } = context;
      const callback = (ctx: any) => {
        resolve({ event: context, code: 200, message: '' });
      };

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
        case Types.SpecialEventType.GROUP_IDENTIFY:
          const groupValues = groups ? Object.values(groups) : [];
          if (groupValues.length === 0) {
            this.segment.identify(
              user_id,
              user_properties?.[Types.IdentifyOperation.SET],
              {},
              callback,
            );
          } else {
            this.segment.group(
              groupValues[0],
              group_properties?.[Types.IdentifyOperation.SET],
              {},
              callback,
            );
          }
          break;

        case 'page':
          // @ts-ignore
          const { name, category, ...properties } = event_properties;
          this.segment.page(category, name, properties, {}, callback);
          break;

        default:
          this.segment.track(event_type, event_properties, {}, callback);
          break;
      }
    });
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Send to Hotjar

Before you begin, see [Hotjar's tracking code](https://help.hotjar.com/hc/en-us/articles/115011639927-What-is-the-Hotjar-Tracking-Code-).

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import { PluginType } from "@amplitude/analytics-types"
import { default as hj } from "@hotjar/browser"
export class HotjarPlugin {
  name = "hotjar"
  type = PluginType.DESTINATION
  constructor(siteId, hotjarVersion, debug = false) {
    this.siteId = siteId
    this.hotjarVersion = hotjarVersion
  }
  async setup() {
    hj.init(this.siteId, this.hotjarVersion)
  }
  async execute(event) {
    if (event.event_type === "$identify") {
      const { user_id, device_id, user_properties } = event
      const hotjarId = user_id || device_id || ""
      hj.identify(hotjarId, user_properties || {})
    } else {
      hj.event(event.event_type)
    }
    return {
      code: 0,
      event: event,
      message: "Event forwarded to Hotjar SDK"
    }
  }
}
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import { BrowserConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';
import { default as hj } from '@hotjar/browser';
export class HotjarPlugin implements DestinationPlugin {
  name = 'hotjar';
  type = PluginType.DESTINATION as const;
  siteId: number;
  hotjarVersion: number;

  constructor(siteId: number, hotjarVersion: number, debug: boolean = false) {
    this.siteId = siteId;
    this.hotjarVersion = hotjarVersion;
  }

  async setup(): Promise<void> {
    hj.init(this.siteId, this.hotjarVersion);
  }

  async execute(event: Event): Promise<Result> {
    if (event.event_type === '$identify') {
      const { user_id, device_id, user_properties } = event;
      const hotjarId = user_id || device_id || '';
      hj.identify(hotjarId, user_properties || {});
    } else {
      hj.event(event.event_type);
    }
    return {
      code: 0,
      event: event,
      message: 'Event forwarded to Hotjar API',
    };
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Send to Google Analytics

Before you begin, see more information about [Google's Data Layer](https://developers.google.com/tag-platform/tag-manager/web/datalayer)

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import { PluginType } from "@amplitude/analytics-types"

export class GTMPlugin {
  name = "google-tag-manager"
  type = PluginType.DESTINATION

  constructor(containerId) {
    this.containerId = containerId
  }

  async setup() {
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      })
      const head = document.getElementsByTagName("head")[0],
        script = document.createElement("script");
      script.async = true
      script.src =
        `https://www.googletagmanager.com/gtm.js?id=${this.containerId}&l=datalayer`
      head.insertBefore(script, head.firstChild)
    }
  }

  async execute(event) {
    window.dataLayer.push(event)

    return {
      code: 200,
      event: event,
      message: "Event pushed onto GTM Data Layer"
    }
  }
}
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import { DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';

export class GTMPlugin implements DestinationPlugin {
  name = 'google-tag-manager';
  type = PluginType.DESTINATION as const;
  containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  async setup(): Promise<void> {
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const head = document.getElementsByTagName('head')[0],
        script = document.createElement('script'),
        dataLayer = 'datalayer' != 'dataLayer' ? '&l=' + 'datalayer' : '';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=' + this.containerId + dataLayer;
      head.insertBefore(script, head.firstChild);
    }
  }

  async execute(event: Event): Promise<Result> {
    window.dataLayer.push(event);

    return {
      code: 200,
      event: event,
      message: 'Event pushed onto GTM Data Layer',
    };
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Send to FullStory

Before you begin, see information about [FullStory's browser SDK](https://help.fullstory.com/hc/en-us/articles/360020828273-Getting-Started-with-FullStory#h_01FXB8T39JB6TPBWMR3727QMVV).

{{partial:tabs tabs="JavaScript, TypeScript"}}
{{partial:tab name="JavaScript"}}
```js
import { PluginType } from '@amplitude/analytics-types';

export class FullstoryPlugin {
  constructor(fsOrg) {
    this.name = 'fullstory';
    this.type = PluginType.DESTINATION;
    this.fsOrg = fsOrg;
    this.FS = window.FS;
  }

  async setup() {
    window._fs_host || (window._fs_host = "fullstory.com", window._fs_script = "edge.fullstory.com/s/fs.js", window._fs_org = this.fsOrg, window._fs_namespace = "FS", function (n, t, e, o, s, c, i, f) { e in n ? n.console && n.console.log && n.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].') : ((i = n[e] = function (n, t, e) { i.q ? i.q.push([n, t, e]) : i._api(n, t, e); }).q = [], (c = t.createElement(o)).async = 1, c.crossOrigin = "anonymous", c.src = "https://" + _fs_script, (f = t.getElementsByTagName(o)[0]).parentNode.insertBefore(c, f), i.identify = function (n, t, e) { i(s, { uid: n }, e), t && i(s, t, e); }, i.setUserVars = function (n, t) { i(s, n, t); }, i.event = function (n, t, e) { i("event", { n: n, p: t }, e); }, i.anonymize = function () { i.identify(!1); }, i.shutdown = function () { i("rec", !1); }, i.restart = function () { i("rec", !0); }, i.log = function (n, t) { i("log", [n, t]); }, i.consent = function (n) { i("consent", !arguments.length || n); }, i.identifyAccount = function (n, t) { c = "account", (t = t || {}).acctId = n, i(c, t); }, i.clearUserCookie = function () { }, i.setVars = function (n, t) { i("setVars", [n, t]); }, i._w = {}, f = "XMLHttpRequest", i._w[f] = n[f], f = "fetch", i._w[f] = n[f], n[f] && (n[f] = function () { return i._w[f].apply(this, arguments); }), i._v = "1.3.0"); }(window, document, window._fs_namespace, "script", "user"));
    this.FS = window.FS;
  }

  async execute(event) {
    if (event.event_type === '$identify') {
      this.FS.identify(event.user_id);
    }
    else {
      this.FS.event(event.event_type, event.event_properties);
    }
    return {
      code: 200,
      event: event,
        message: 'Event forwarded to Fullstory',
    };
 }
}
```
{{/partial:tab}}
{{partial:tab name="TypeScript"}}
```ts
import { DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';

export class FullstoryPlugin implements DestinationPlugin {
  name = 'fullstory';
  type = PluginType.DESTINATION as const;
  fsOrg: string;
  FS: Object

  constructor(fsOrg: string) {
    this.fsOrg = fsOrg;
    this.FS = window.FS;
  }

  async setup(): Promise<void> {
    window._fs_host||(window._fs_host="fullstory.com",window._fs_script="edge.fullstory.com/s/fs.js",window._fs_org=this.fsOrg,window._fs_namespace="FS",function(n,t,e,o,s,c,i,f){e in n?n.console&&n.console.log&&n.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'):((i=n[e]=function(n,t,e){i.q?i.q.push([n,t,e]):i._api(n,t,e)}).q=[],(c=t.createElement(o)).async=1,c.crossOrigin="anonymous",c.src="https://"+_fs_script,(f=t.getElementsByTagName(o)[0]).parentNode.insertBefore(c,f),i.identify=function(n,t,e){i(s,{uid:n},e),t&&i(s,t,e)},i.setUserVars=function(n,t){i(s,n,t)},i.event=function(n,t,e){i("event",{n:n,p:t},e)},i.anonymize=function(){i.identify(!1)},i.shutdown=function(){i("rec",!1)},i.restart=function(){i("rec",!0)},i.log=function(n,t){i("log",[n,t])},i.consent=function(n){i("consent",!arguments.length||n)},i.identifyAccount=function(n,t){c="account",(t=t||{}).acctId=n,i(c,t)},i.clearUserCookie=function(){},i.setVars=function(n,t){i("setVars",[n,t])},i._w={},f="XMLHttpRequest",i._w[f]=n[f],f="fetch",i._w[f]=n[f],n[f]&&(n[f]=function(){return i._w[f].apply(this,arguments)}),i._v="1.3.0")}(window,document,window._fs_namespace,"script","user"));
    this.FS = window.FS;
  }

  async execute(event: Event): Promise<Result> {
    if (event.event_type === '$identify') {
      this.FS.identify(event.user_id)

    } else {
      this.FS.event(event.event_type, event.event_properties)
    }

    return {
      code: 200,
      event: event,
      message: 'Event forwarded to Fullstory',
    };
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Supported SDKs

| Platform                                                 | SDK                                                                                                                           | Github                                                                                                                                |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Browser](/sdks/analytics/browser/browser-sdk-2/#plugin)            | [`@amplitude/analytics-browser`](https://www.npmjs.com/package/@amplitude/analytics-browser)            | [Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                                           |
| [Android](http://amplitude-docs.test/sdks/analytics/android/android-kotlin-sdk)  | [`com.amplitude:analytics-android`](https://mvnrepository.com/artifact/com.amplitude/analytics-android) | [Amplitude-Kotlin](https://github.com/amplitude/Amplitude-Kotlin)                                                   |
| [Node.js](http://amplitude-docs.test/sdks/analytics/node/node-js-sdk/#plugins)              | [`@amplitude/analytics-node`](https://www.npmjs.com/package/@amplitude/analytics-node)                  | [Amplitude-Typescript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-node)         |
| [React Native](/sdks/analytics/react-native/#plugins) | [`@amplitude/analytics-react-native`](https://www.npmjs.com/package/@amplitude/analytics-react-native)  | [Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native) |
| [iOS](/sdks/analytics/ios-swift#amplitude-sdk-plugin)           | `AmplitudeSwift`                                                                                        | [Amplitude-Swift](https://github.com/amplitude/Amplitude-Swift)                                                     |
| [Python](/sdks/analytics/python/#amplitude-sdk-plugin)           | [`amplitude-analytics`](https://pypi.org/project/amplitude-analytics/)                                  | [Amplitude-Python](https://github.com/amplitude/Amplitude-Python)                                                   |
| [Go](/sdks/analytics/go#amplitude-sdk-plugin)                   | [`github.com/amplitude/analytics-go`](https://pkg.go.dev/github.com/amplitude/analytics-go)             | [analytics-go](https://github.com/amplitude/analytics-go)                                                           |
