---
id: 30ca78d7-d0ec-40fa-99fa-f79b9f14db59
blueprint: source-catalog
use_cases:
  - 'Integrating Taplytics with Amplitude allows businesses to synchronize experiment data seamlessly, facilitating controlled feature rollouts, A/B tests, and development efficiency in mobile app optimization. This collaboration enables real-time analysis, user segmentation, and push notification campaigns, empowering teams to optimize engagement and enhance user retention effectively.'
short_description: 'Taplytics lets you deploy controlled feature rollouts, execute server-side and client-side A/B tests, cut deployment risk, and improve development time.'
integration_category:
  - experimentation
integration_type:
  - raw-events
partner_doc_link: 'https://docs.taplytics.com/docs/integrations-amplitude'
title: Taplytics
source: 'https://www.docs.developers.amplitude.com/data/sources/taplytics'
category: Experimentation
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/taplytics.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825729
---
By integrating [Taplytics](https://taplytics.com/)' mobile A/B testing and experiment tools with Amplitude, you can:

- Share all user data between the platforms in real-time.
- Let non-technical product and marketing team members to do full-circle tracking, analysis, and engagement across mobile apps.
- Share experiment data from Taplytics to Amplitude upon startup.

## About Taplytics

Taplytics provides cross-platform A/B testing solutions, and this integration exports Taplytics experiment data to Amplitude.

When the Taplytics SDK is installed alongside Amplitude, your existing and future analytics events are sent to both Amplitude and Taplytics. Measure the impact of your Taplytics experiments by segmenting your Amplitude funnels, retention, and more by variations your users were exposed to.

## Set up and use the integration

For detailed instructions, see the [Taplytics documentation](https://docs.taplytics.com/docs/integrations-amplitude). The integration uses Amplitude's [Attribution API endpoint](/docs/apis/attribution-api).

Taplytics sends experiment data as a single event to Amplitude. The event is named `TL_experiments` and includes the experiment data as properties.

The properties for all sources are formatted like this:

```json
{
"Experiment One":"Variation One",
"Experiment Two":"baseline"
}
```

For [Android integrations](https://docs.taplytics.com/docs/guides-integrations-for-android#section-amplitude), Taplytics logs experiment and variation events to the Amplitude Android SDK as follows:

```java
HashMap<String, String> experimentsAndVariations = new HashMap<>();\
experimentsAndVariations.put("Experiment 1", "Variation 1");\
experimentsAndVariations.put("Experiment 2", "Variation 3");

Amplitude.getInstance().logEvent("TL_Experiments", experimentsAndVariations)
```

For [iOS integrations](https://docs.taplytics.com/docs/guides-integrations-for-ios#section-amplitude), Taplytics logs experiment and variation events to the Amplitude iOS SDK as follows:

```obj-c
NSDictionary* experimentsAndVariations = @{
    @"Experiment 1": @"Variation 1",
    @"Experiment 2": @"baseline"
};

[[Amplitude instance] logEvent:@"TL_Experiments" withEventProperties:experimentsAndVariations];
```