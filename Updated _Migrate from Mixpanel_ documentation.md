# Migrate From Mixpanel

The Amplitude Professional Services team has compiled this Mixpanel to Amplitude Implementation Guide to help you implement Amplitude and start getting insights right out of the gate.

## Jump to relevant documentation for your implementation needs:

[Looking to send **historical** data from Mixpanel to Amplitude?](#bookmark=id.4wco9pv1rcu2) 

[Looking to plan **new tracking** in Amplitude after moving over from Mixpanel?](#bookmark=id.ubfcqq745toa) 

## **Customer case study**

Learn about how Whisk migrated from Mixpanel to Amplitude on the [Amplitude Blog](https://amplitude.com/blog/whisk-product-growth).

## Importing Mixpanel historical data

Amplitude offers a few options to migrate your historical data from Mixpanel to Amplitude: 

* Our [Mixpanel import tool](#bookmark=kix.l7rhrws6qba8)  
  * Best for sending historical event data quickly   
* Our [Batch Event Upload API](#bookmark=kix.vit3nq8qces)  
  * Best for sending historical data \- events and user profile properties alike \- at scale

### Mixpanel Import Tool

With just your Mixpanel project's API key or service account credentials, this tool uses [Mixpanel's Export API](https://developer.mixpanel.com/reference/raw-event-export) to export event data from Mixpanel, and import it to your Amplitude project.

#### Limitations:

* This tool can only process about 160,000 events per batch.  
* User profile properties are not supported. If you need to import user profile information, use one of the following options:  
* Export your data from Mixpanel with the Mixpanel [Export](https://developer.mixpanel.com/reference/raw-event-export) and [Engage](https://developer.mixpanel.com/reference/engage-query) APIs, and import it to Amplitude with the [Batch Event Upload API](https://amplitude.com/docs/apis/analytics/batch-event-upload).  
* Contact Amplitude Support or your Amplitude account manager for custom services led by Amplitude's Professional Services team.

#### Troubleshooting:

The import tool responds with an authentication error

* Make sure you provide the correct authentication to the Mixpanel import tool.  
* If you use your Mixpanel project's API key, be sure to reference the correct project. Each project in Mixpanel has its own API key.  
* If you use a [Mixpanel service account](https://developer.mixpanel.com/reference/service-accounts), ensure you enter the credentials as follows:

| Service account value | Amplitude field |
| :---- | :---- |
| Username | The username field in the import tool |
| Password | The API Key field |
| Project ID | The Project ID field |

* If you don't have the username and password for your Mixpanel project's service account, create a new service account associated with your project, and copy the values.  
* Ensure your Mixpanel service account has the necessary permissions to access the information you need. Test your credentials with [Mixpanel's Download Data page](https://developer.mixpanel.com/reference/raw-event-export). If the page responds with a 200 status, your service account has the necessary permissions.

The import tool doesn't complete or responds with a generic error

The data set may be too large to process. Try again with a more narrow time range, aiming for no more than \~160,000 events per batch. 

The tool imports fewer transactions than it should

* Amplitude detects and excludes duplicate events. If your data contains a large number of duplicates, the events that Amplitude imports may be fewer than expected.  
* Some Mixpanel events may not be compatible with Amplitude events due to missing information. If your Mixpanel instrumentation doesn't capture fields like name, date, or device ID, Amplitude may not import them.

### [Amplitude Batch Event Upload API](https://amplitude.com/docs/apis/analytics/batch-event-upload)

Export your data directly out of Mixpanel via [API](https://developer.mixpanel.com/reference/raw-data-export-api) and upload into Amplitude with the Batch API. If you host your data in another external source, you can also use the batch endpoint to upload data into Amplitude.

### Professional Services

For custom services led by the Amplitude Professional Services team, contact your Amplitude account manager.

## Planning new Amplitude tracking from Mixpanel

### Set product goals

Before you dive into implementation, ensure all stakeholders and team members agree on what you want to get out of the data. What use cases would the team like to focus on?

#### Suggested use cases and business questions

##### Common use cases by industry

B2BFintechE-commerceStreaming media  
Goal: Understand product engagement.

Key points:

* See how your users convert through critical funnels: acquisition (free trial, sales, partner, POC), onboarding, activation, workflow, cross-sell/upsell funnels.  
* Target the right customers at the right time to move them through a critical funnel.  
* Find patterns in the way your customers move through key milestones (acquisition, onboarding, activation, renewal).  
* Understand different customer segments’ use and adoption to define key personas based on use cases and needs.  
* Optimize your product experience to target different customers personas needs and make them more successful.

### Design a data taxonomy

* Check out our [Mixpanel to Amplitude Taxonomy workbook](https://docs.google.com/spreadsheets/d/1lsZa6uZmcUmJdq-_sr5JawckMPiiQDCCzl_ytSYccNg/edit#gid434510064), built off of the most common use cases from Amplitude customers who've migrated from Mixpanel.   
* For more broad taxonomy guidance, see the [Data Taxonomy Playbook](https://amplitude.com/docs/data/data-planning-playbook) and the sample taxonomy below for best practices.

### Instrument your taxonomy

#### Choose an instrumentation method

You can send data to Amplitude client-side, server-side, or through a third party. Amplitude's recommendation depends on the method you use to track events.

For client-side event tracking:

* [Amplitude’s SDK Catalog](https://amplitude.com/docs/sdks/analytics). Use your existing instrumentation method and reference Amplitude mapping to replace instrumentation.

For server-side event tracking:

* [Amplitude's HTTP API](https://amplitude.com/docs/apis/analytics/http-v2)

#### Map Mixpanel methods to Amplitude methods

##### Event tracking

* Mixpanel track events with the 'mixpanel.track()' method, which takes an event name and sets of properties.  
* Amplitude tracks events with the 'amplitude.getinstance().logEvent()' method. This also takes an event name and set of properties as a JSON object.

##### Property tracking

Super properties in Mixpanel are properties that attach to all subsequent events. Amplitude's User Properties function similarly in that once set, these properties attach to all subsequent events that Amplitude ingests.

* In Mixpanel, super properties are set with the 'mixpanel.register()' method.  
* In Amplitude, update user properties with the 'amplitude.identify()' method.

##### User identification

* Mixpanel uses a combination of distinct\_id (a randomly generated identifier on a specific platform) and user\_id (explicitly set by the instrumenting teams) to identify a user with the 'mixpanel.identify()' method.  
* Amplitude uses a combination of device\_id (a randomly generated id on a specific platform) and user\_id (explicitly set by the instrumenting teams) to identify a user with the 'amplitude.identify()' method.

For more on how Amplitude resolves user identifies, see [Track unique users](https://amplitude.com/docs/data/sources/instrument-track-unique-users).

## Data privacy considerations

Along with the ingestion methods above, here are some features or areas to consider when managing your customer data:

* [Time to Live (TTL)](https://amplitude.com/docs/data/time-to-live) \- feature within Amplitude to control how long event data lives in your Amplitude instance  
* [How to manage Opt-Outs](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2#opt-users-out-of-tracking) \- SDK settings to allow your website visitors to disable activity tracking on your website  
* [IP Address](https://amplitude.com/docs/apis/analytics/batch-event-upload) \- Amplitude captures IP address and location-based details by default in with client-side tracking. For information about disabling this tracking, see [Browser SDK | Optional Tracking](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2#optional-tracking)  
* [User Privacy API](https://amplitude.com/docs/apis/analytics/user-privacy) \- API to delete all data for a set of known Amplitude IDs or User IDs.  
* [Amplitude’s Stance on Security & Privacy](https://amplitude.com/amplitude-security-and-privacy)

## GDPR information

Amplitude is fully GDPR compliant.

For more information about compliance, see [Security and Privacy](https://amplitude.com/amplitude-security-and-privacy).

Amplitude maintains a [user privacy API](https://amplitude.com/docs/apis/analytics/user-privacy) that allows you to service end user data deletion requests.

## Feedback or questions

For any feedback or questions on this implementation guide, submit them [here](https://forms.gle/EMh9JeNs1iNCQzx67).  
