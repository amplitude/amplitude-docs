---
title: "Get data into Amplitude"
source: "https://help.amplitude.com/hc/en-us/articles/17472723888411-Get-data-into-Amplitude"
id: 1473fc96-a097-4045-a6f9-43ad3bf5027e
---

#### This article will help you:

* Pull data into Amplitude from your app or a third-party source
* Identify valuable resources and APIs to consider during instrumentation

Amplitude Analytics relies on **data** to generate charts, experiments, and other types of analyses. This data comes from your product, app, or website, or from a third-party product like Salesforce or Segment.

**NOTE:** You'll probably need to involve your developer or engineer for this step.

This article is intended as a broad overview. For a more in-depth explanation of setting up a taxonomy, we **strongly recommend** checking out our [Data Taxonomy Playbook](/data/data-planning-playbook). 

### Feature availability

This feature is available to users on **all Amplitude plans**.

## Send data to Amplitude

Getting data into Amplitude from your product is done at the **project** level. Remember when you created [your first Amplitude project](/get-started/create-project)? When you did that, Amplitude generated an API key that will ensure your product data finds its way to the correct Amplitude project. You'll need this key to initialize the SDK in your product or website; [here's how to find it in an existing Amplitude project](/admin/account-management/manage-orgs-projects).

### Data from your product

The most popular way to get data into Amplitude from web products or websites is the [Browser SDK](https://www.docs.developers.amplitude.com/data/sdks/browser-2/). Learn more about it in the [Amplitude Developer Center](https://www.docs.developers.amplitude.com/data/sdks/sdk-quickstart/#initialize-the-library).

Once you've got the API key mentioned in the beginning of this section, add it to the Amplitude Javascript snippet, then paste that snippet to all parts of your product that generate the data you want Amplitude to [track](https://help.amplitude.com/hc/en-us/articles/5078731378203). This **must** be placed at the **top** of **every page** you want to track via Amplitude, and it **must** include the `amplitude.init()` statements. An example snippet is shown in the screenshot below.

![send data with browser sdk.png](/output/img/get-started/send data with browser sdk.png)

Again, depending on your level of knowledge and / or comfort with Javascript, you may want to involve someone from your development or engineering team in this phase. And definitely take advantage of all the resources around [SDKs that are available in the Amplitude Developer Center](https://www.docs.developers.amplitude.com/data/sdks/).

After instrumenting Amplitude successfully, your data will be visible just as soon as your product begins sending events. (You'll have to [instrument](/data/data-planning-playbook) for detailed documentation on how to approach your event taxonomy.

### Data from a third-party source

You can import data from a wide range of third-party data sources. To learn more, [check out Amplitude's SDK documentation.](https://www.docs.developers.amplitude.com/data/sdks/)

## Take note of APIs and resources

Data can be sent to Amplitude in different ways: SDKs, HTTP API v2, Batch API, Amplitude's integration with Segment, or Amplitude's integration with mParticle. The below lists include examples of powerful APIs and useful resources to keep in mind. Your Success Manager is always available to help answer questions.

### APIs

* [Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/): Use the Identify API to modify the user properties of a particular user without sending an event. You can modify Amplitude default user properties as well as custom user properties you've already defined.
* [Dashboard REST API](https://www.docs.developers.amplitude.com/analytics/apis/dashboard-rest-api/): Use the Dashboard REST API to obtain any data that can be displayed on the dashboard graphs. The results are returned as JSON.
* [Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/): Export all events data for a given app that occurred within a specified range of dates. The results are returned as a zipped archive of JSON files with one or multiple files per hour.
* [Attribution API](https://www.docs.developers.amplitude.com/analytics/apis/attribution-api/): Associate users from various attribution campaigns on Amplitude.
* [HTTP API](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/): Use the HTTP API to send data directly from your server to our endpoint.
* [Behavioral Cohorts API](https://www.docs.developers.amplitude.com/analytics/apis/behavioral-cohorts-api/): Use the Behavioral Cohorts API to get all cohorts for an app.

### Resources

* [Amplitude Developer Center](https://www.docs.developers.amplitude.com/), specifically the article [Getting Started for developers](https://www.docs.developers.amplitude.com/getting-started/)
* [Amplitude SDKs](https://www.docs.developers.amplitude.com/data/sources/)
* [Amplitude Github Repository](https://github.com/amplitude?page=1)
* [Data Taxonomy Playbook](/data/data-planning-playbook)
* [Amplitude Academy](https://academy.amplitude.com/)
