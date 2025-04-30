---
id: abf952ae-fdc9-4f51-8691-c0f4ed6a73f4
blueprint: migration
title: 'Migrate From Segment'
source: 'https://www.docs.developers.amplitude.com/guides/segment-migration-guide'
---

If you're looking for a platform that can handle both your [Analytics](https://amplitude.com/amplitude-analytics) and [CDP](https://amplitude.com/customer-data-platform) needs, Amplitude can.

This document covers the necessary steps to:

1. Migrate your Source and Destination configuration
2. Update SDK implementation to send data to Amplitude
3. Validate the migration is successful


Review the offerings that are available for Segment and how that stacks up to Amplitude. 

| Segment                                                 | Amplitude                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Connections](https://segment.com/product/connections/) | [Sources](/docs/data/source-catalog) & [Destinations](/docs/data/destination-catalog) |
| [Profiles](https://segment.com/product/profiles/)       | [Audiences](/docs/cdp/audiences)                                                      |
| [Protocols](https://segment.com/product/protocols/)     | [Data Management](/docs/data)                                                          |

{{partial:admonition type="info" heading="Recommended best practice"}}
Follow a strict release process and [configure multiple environments](/docs/data/amplitude-data-settings). Validate changes within each environment before deploying.
{{/partial:admonition}}

## Add a source

To add a [new source](/docs/data/source-catalog):

1. From Data, click **Sources** in the Connections section.
2. Click **Add Source**.
3. Browse or search for the source you want to add.
4. Follow the on-screen prompts.

For detailed instructions, see the documentation for the [source](/docs/data/source-catalog) you want to add.

## Update SDK implementation

Both Segment and Amplitude SDKs capture first party data by tracking user interactions. Other than some nuances around syntax, they work similarly. Here is high level mapping of concepts between Segment & Amplitude.

| Segment   | Amplitude | Notes                                                                                                                                                                                                                    |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| write_key | api_key   | Unique key to validate source of the data.                                                                                                                                                                               |
| Workspace | Project   | [Projects](/docs/admin/account-management/manage-orgs-projects) allow you to organize your data.                                                                                                                         |
| User      | User      | User who is performing action.                                                                                                                                                                                           |
| Identify  | Identify  | Identify updates properties/attributes of the user.                                                                                                                                                                      |
| Track     | Event     | [Event](/docs/apis/analytics/http-v2/) in Amplitude tracks the action user is performing.                                                                                                                                |
| Screen    | Event     | Create an Event to track Screen views.                                                                                                                                                                                   |
| Page      | Event     | Create an Event to track Page views.                                                                                                                                                                                     |
| Group     | Group     | Group is a collection of users. In Amplitude one user could belong to multiple groups. Each group can have properties/attributes that are then available to query/forward on actions performed by any user in the group. |
| Plugins   | Plugins   | Plugins let you extend Amplitude by running a sequence of custom code on every event.                                                                                                                                    |


{{partial:tabs tabs="Browser, iOS, Android"}}
{{partial:tab name="Browser"}}
Documentation for [Browser 2 SDK](/docs/sdks/analytics/browser/browser-sdk-2).

### Identify

#### Segment
```typescript
analytics.identify('12091906-01011992', {
  name: 'Grace Hopper',
  email: 'grace@usnavy.gov'
});
```

#### Amplitude
```typescript
setUserId('12091906-01011992');
identify(
  Identify()
    .set('name', 'Grace Hopper')
    .set('email', 'grace@usnavy.gov')
);
```

### Track

#### Segment

```typescript
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
``` 

#### Amplitude

```typescript
track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
``` 

### Group

#### Segment
```typescript
analytics.group('UNIVAC Working Group', {
  principles: ['Eckert', 'Mauchly'],
  site: 'Eckert–Mauchly Computer Corporation',
  statedGoals: 'Develop the first commercial computer',
  industry: 'Technology'
});
```

#### Amplitude

Assign user to a group:
```typescript
amplitude.setGroup('Working Group', 'UNIVAC')
```

Update properties of a group:
```typescript
groupIdentify(
  'Working Group',
  'UNIVAC' ,
  new Identify()
    .set('principles', ['Eckert', 'Mauchly']);
    .set('site', 'Eckert–Mauchly Computer Corporation');
    .set('statedGoals', 'Develop the first commercial computer');
    .set('industry', 'Technology')
);
``` 

{{/partial:tab}}
{{partial:tab name="iOS"}}
Documentation for [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk).

### Identify

#### Segment
```swift
Analytics.shared().identify("abc", traits: ["email": "abc@domain.com"])
```

#### Amplitude

```swift
Amplitude.instance().setUserId("abc")
Amplitude.instance().identify(
  AMPIdentify()
    .set("email", value: "female")
    .set("age",value: NSNumber(value: 20))
)
```

### Track

#### Segment
```swift
Analytics.shared().track("Button Clicked", properties: ["Hover Time": "100ms"])
``` 

#### Amplitude
```swift
Amplitude.instance().logEvent("Button Clicked", withEventProperties: ["Hover Time": "100ms"] )
``` 

#### Group

#### Segment
```swift
Analytics.shared().group("OrgName-xyz", traits: ["plan": "enterprise"])
```

#### Amplitude
Assign user to a group:
```swift
Amplitude.instance().setGroup("orgName", groupName:NSString(string:"xyz"))
```
Update properties of a group:
```swift
Amplitude.instance().groupIdentifyWithGroupType(
  "orgName",
  groupName:NSString(string:"xyz"),
  groupIdentify:AMPIdentify().set("plan", value: "enterprise")
)
```
{{/partial:tab}}
{{partial:tab name="Android"}}
Documentation for [Android Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk).

### Identify

#### Segment
```kotlin
Analytics.with(context).identify("abc", Traits().putEmail("abc@domain.com"), null)
```

#### Amplitude
```kotlin
amplitude.setUserId("abc")
amplitude.identify(Identify().set("email", "abc@domain.com"))
```

### Track

#### Segment

```kotlin
Analytics.with(context).track("Product Viewed", Properties().putValue("name", "Moto 360"))
``` 

#### Amplitude

```kotlin
amplitude.track(
  "Product Viewed",
  mutableMapOf<String, Any?>("name" to "Moto 360")
)
``` 

### Group

#### Segment
```kotlin
Analytics.with(context).group("abc", "orgName-xyz", Traits().putplan("enterprise"))
```

#### Amplitude

Assign user to a group:
```kotlin
amplitude.setGroup("orgName", "xyz");
```
Update properties of a group:
```kotlin
amplitude.groupIdentify("orgName", "xyz", Identify().set("plan", "enterprise"))
```
{{/partial:tab}}
{{/partial:tabs}}


For all other SDKs, see the relevant [SDK documentation](/docs/sdks/analytics).

## Validate events

Data validation is a critical step in the instrumentation process. Amplitude lets validate your event data via Amplitude's debugging [tools](/docs/analytics/debug-analytics).

## Add a destination

You can add a [new destination](/docs/data/destination-catalog) in just a few clicks. 

1. From Data, click **Destinations** in the Connections section. 
2. Click **Add Destination**.
3. Browse or search for the destination you want to add. 
4. Follow the on-screen prompts. 

For detailed instructions, see the documentation for the [destination](/docs/data/destination-catalog) you want to add. 

## Migration checklist

It's important to validate the migration to make sure there is minimal impact on downstream data consumers. 

- [x] Added all sources to Amplitude
- [x] Migrated existing tracking code to Amplitude SDKs
- [x] Validated events are flowing in to Amplitude correctly
- [x] Added all destinations to Amplitude
- [x] Validated data is flowing into destinations correctly
- [x] Validated downstream consumers aren't affected (for example, BI, Mktg, ML, Ops)

## Frequently asked questions


{{partial:collapse name="How long does it take to migrate?"}}
This depends on how you implemented your CDP. Most teams should plan a few months to be able to complete your migration. If you're looking to update your taxonomy and tracking plan, this could require more upfront planning.
{{/partial:collapse}}

{{partial:collapse name="What if I don't see an integration that I need?"}}
Amplitude regularly adds new integrations so either add a request in-product or ask your CSM and for a timeline.
{{/partial:collapse}}

{{partial:collapse name="What if I have an existing CDP contract?"}}
Contact your CSM or AE to discuss what options are available.
{{/partial:collapse}}

