---
id: ac601593-6a33-41fb-9a8d-7b3c66d201e2
blueprint: destination-catalog
title: Fullstory
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
integration_category:
  - other
partner_maintained: false
integration_icon: partner-icons/fullstory.svg
use_cases:
  - "The use case with FullStory and Amplitude involves leveraging Amplitude's SDK plugin architecture to send Amplitude events to FullStory. FullStory helps businesses optimize customer experiences by providing real-time visibility into user behavior on their websites and apps. By integrating FullStory with Amplitude, organizations can gain comprehensive insights into user interactions and behaviors, enabling them to make data-driven decisions that enhance the customer experience, improve conversion rates, and drive bottom-line results."
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713561436
source: 'https://www.docs.developers.amplitude.com/data/destinations/fullstory-event-streaming/'
---


[FullStory](https://www.fullstory.com/) is a digital experience intelligence platform. Apps can leverage conversion funnels, advanced search capabilities, user session replays, and robust debugging and developer tools.

## Setup

### Amplitude plugin setup

A variant of an [Amplitude Destination Plugin](/docs/sdks/sdk-plugins#destination-plugins) is required to forward events to FullStory. Below is a template of a Destination Plugin tailored for FullStory. It creates an instance of the 
FullStory [browser SDK](https://help.fullstory.com/hc/en-us/articles/360020828273-Getting-Started-with-FullStory#h_01FXB8T39JB6TPBWMR3727QMVV) and forwards tracked events from Amplitude's SDK. This template is customizable for any needs.

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
    window._fs_host||(window._fs_host="fullstory.com",window._fs_script="edge.fullstory.com/s/fs.js",window._fs_org=this.fsOrg,window._fs_namespace="FS",function(n,t,e,o,s,c,i,f){e in n?n.console&&n.console.log&&n.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'):((i=n[e]=function(n,t,e){i.q?i.q.push([n,t,e]):i._api(n,t,e)}).q=[],(c=t.createElement(o)).async=1,c.crossOrigin="anonymous",c.src="https://"+_fs_script,(f=t.getElementsByTagName(o)[0]).parentNode.insertBefore(c,f),i.identify=function(n,t,e){i(s,{uid:n},e),t&&i(s,t,e)},i.setUserVars=function(n,t){i(s,n,t)},i.event=function(n,t,e){i("event",{n:n,p:t},e)},i.anonymize=function(){i.identify(!1)},i.shutdown=function(){i("rec",!1)},i.restart=function(){i("rec",!0)},i.log=function(n,t){i("log",[n,t])},i.consent=function(n){i("consent",!arguments.length||n)},i.identifyAccount=function(n,t){c="account",(t=t||{}).acctId=n,i(c,t)},i.clearUserCookie=function(){},i.setVars=function(n,t){i("setVars",[n,t])},i._w={},f="XMLHTTPRequest",i._w[f]=n[f],f="fetch",i._w[f]=n[f],n[f]&&(n[f]=function(){return i._w[f].apply(this,arguments)}),i._v="1.3.0")}(window,document,window._fs_namespace,"script","user"));
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
      message: 'Event forwarded to FullStory',
    };
  }
}
```

### Amplitude plugin use

Inside the app's code, the plugin may then be imported and added to the Amplitude SDK instance.

```ts
import * as amplitude from '@amplitude/analytics-browser';
import { FullstoryPlugin } from './FullstoryPlugin';

amplitude.init(AMPLITUDE_API_KEY);
amplitude.add(new FullstoryPlugin(FULLSTORY_KEY));

amplitude.logEvent('open app');
```
