---
id: ca7e0544-2e99-4552-89d5-649a34c1956f
blueprint: migration
title: 'Migrate From mParticle'
source: 'https://www.docs.developers.amplitude.com/guides/mparticle-migration-guide'
---
Looking to combine on Amplitude for both your [Analytics](https://amplitude.com/amplitude-analytics) and [CDP](https://amplitude.com/customer-data-platform) needs? 

This document covers the necessary steps to:

1. Migrate your Source and Destination configuration
2. Update SDK implementation to send data to Amplitude
3. Validate the migration is successful


Quickly review the offerings that are available for mParticle and how that stacks up to Amplitude. 

| mParticle                                                                         | Amplitude |
|-----------------------------------------------------------------------------------| ----------- |
| [Connections](https://docs.mparticle.com/guides/platform-guide/connections/)      | [Sources](/docs/data/source-catalog) & [Destinations](/docs/data/destinations/) |
| [Audiences](https://docs.mparticle.com/guides/platform-guide/audiences/overview/) | [Audiences](https://help.amplitude.com/hc/en-us/sections/360011146031-Amplitude-Audiences) |
|                                                                              | [Data Management](https://help.amplitude.com/hc/en-us/categories/5078631395227-Amplitude-CDP) |

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

Both mParticle and Amplitude SDKs are meant to capture first party data by tracking user interactions. For the most part both work pretty similarly except some nuances around syntax. Here is high level mapping of concepts between mParticle & Amplitude.

| mParticle | Amplitude | Notes                                      |
|-----------|-----------|--------------------------------------------|
| app_key   | api_key   | Unique key to validate source of the data. |
| Workspace | Project   | [Projects](/docs/admin/account-management/manage-orgs-projects) allow you to organize your data.  |
| User      | User      | User who is performing action.             |
| Identify  | Identify  | [Identify](/docs/analytics/what-is-amplitude/#user-properties-are-details-about-your-user) updates properties/attributes of the user.|
| Event     | Event     | [Event](/docs/analytics/apis/http-v2-api-quickstart/) in Amplitude tracks the action user is performing.|
| Screen    | Event     | Create an Event to track Screen views.|
| Page      | Event     | Create an Event to track Page views.|
|           | Group     | [Group](/docs/guides/accounts-instrumentation-guide/) is a collection of users. In Amplitude one user could belong to multiple groups. Each group can have properties/attributes that will be available to query/forward on actions performed by any user in the group.|
| Kits      | Plugins   | [Plugins](/docs/data/sdk-plugins/) lets you extend Amplitude by running a sequence of custom code on every event.|


{{partial:tabs tabs="Browser, iOS, Android"}}
{{partial:tab name="Browser"}}
Documentation for [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2).

### Identify

#### mParticle
```typescript
var identityRequest = {
userIdentities: { email: 'updated-email@example.com' }
}
mParticle.Identity.modify(identityRequest, identityCallback);
```

#### Amplitude
```typescript
setUserId('12091906-01011992');
identify(
  Identify()
    .set('email', 'updated-email@example.com')
);
```

### Track

#### mParticle

```typescript
mParticle.logEvent('Article Completed',
    mParticle.EventType.EVENT-TYPE,
    {
        'title':'How to Create a Tracking Plan',
        'course':'Intro to Analytics'}
);
``` 

#### Amplitude

```typescript
track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
``` 

### Group  

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

#### mParticle
```swift
currentUser?.setUserAttribute("top_region", value: "Europe")
```     

#### Amplitude
```swift
Amplitude.instance().setUserId("abc")
Amplitude.instance().identify(
  AMPIdentify()
    .set("top_region", value: "Europe")
)
```

### Track

#### mParticle

```swift
if let event = MPEvent(name: "Video Watched", type: MPEventType.navigation) {
event.customAttributes = ["category": "Destination Intro", "title": "Paris"]
MParticle.sharedInstance().logEvent(event)
}
``` 

#### Amplitude

```swift
Amplitude.instance().logEvent("Video Watched", withEventProperties: ["category": "Destination Intro", "title": "Paris"] )
``` 

### Group

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

#### mParticle
```kotlin
IdentityApiRequest modifyRequest = IdentityApiRequest.withEmptyUser()
    .email("updated-email@example.com")
    .build()

MParticle.getInstance().Identity().modify(modifyRequest)
```

#### Amplitude
```kotlin
amplitude.setUserId("abc")
amplitude.identify(Identify().set("email", "updated-email@example.com"))
```

### Track

#### mParticle
```kotlin
val customAttributes: MutableMap<String, String> = HashMap()
customAttributes["name"] = "Moto 360"
val event = MPEvent.Builder("Product Viewed", MParticle.EventType.Navigation)
            .customAttributes(customAttributes)
            .build()
MParticle.getInstance()?.logEvent(event)
``` 

#### Amplitude
```kotlin
amplitude.track(
  "Product Viewed",
  mutableMapOf<String, Any?>("name" to "Moto 360")
)
``` 

### Group

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

Data validation is a critical step in the instrumentation process. Amplitude lets validate your event data via Amplitude's debugging [tools](/docs/data/debugger/).

## Add a destination

To add a [new destination](/docs/data/destination-catalog):

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
- [x] Validated downstream consumers are not impacted (for example, BI, Mktg, ML, Ops)

## Frequently asked questions


{{partial:collapse name="How long does it take to migrate?"}}
This depends on how you implemented your CDP. For most teams we'd recommend that you plan a few months to be able to complete your migration. If you're looking to update your taxonomy and tracking plan than this could require more upfront planning.
{{/partial:collapse}}

{{partial:collapse name="What if I don't see an integration that I need?"}}
Amplitude regularly adds new integrations so either add a request in product or communicate with your CSM and we'll provide a timeline.
{{/partial:collapse}}

{{partial:collapse name="What if I have an existing CDP contract?"}}
Contact your CSM or AE to discuss what options are available.
{{/partial:collapse}}



