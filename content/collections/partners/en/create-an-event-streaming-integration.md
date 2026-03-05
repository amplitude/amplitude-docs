---
id: bc987a8b-b051-4633-a4b0-8436ace2ace5
blueprint: partner
title: 'Create an Event Streaming Integration'
landing: true
source: 'https://www.docs.developers.amplitude.com/partners/event-streaming-integration-guide/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718647218
landing_blurb: 'Create your own Event Streaming tile in Amplitude to let your users to forward events in real-time.'
---
{{partial:admonition type="note" heading="Prework requirements"}}
This guide assumes that you've completed the prerequisites for building partner integrations listed in [Amplitude Integration Portal](/docs/partners/integration-portal)
{{/partial:admonition}}

This guide walks through the basics of creating your own Event Streaming tile in Amplitude to let your users forward events in real time from Amplitude.

## Considerations

### Supported features

- **Event Forwarding:** Forwarding Amplitude Track calls to a destination is named *event forwarding*. Amplitude forwards both the 'raw' event and merged or [transformed events](/docs/data/transformations). Amplitude also sends the `event_name` and `created_at` to your destination.
- **Event Filtering:** Amplitude has fine-grain filtering options that let users choose which events to send based on event types and property conditions.
- **Event Selective Property Forwarding:** Users can select which event, user, or group properties to include in the payload of forwarded events.
- **Regular User Identify Forwarding (creating and updating a user):** Enable Identify Forwarding for your destination. This lets the destination send users and their properties created under the Identify API in real time. For more information, refer to the [Identify documentation](/docs/apis/analytics/identify).
- **User Property Mapping:** Users can select an Amplitude user property to map to a field in your destination. This also allows for custom user identifiers.

### Limitations

- **User selective property forwarding:** Forwarding certain event, group, or user properties from an event based on an allow-list isn't supported.
- **Forwarding arrays or object type properties:** You can't forward arrays or object type properties. For example, you can't forward a property called `cities` that is an array of cities.
- **Change-based user Identify Forwarding:** Amplitude doesn't automatically generate and forward an identify event when a user property changes during event ingestion.
- **Property Value Transformation:** You can't transform a property value or type to another value or type if the type of the original event isn't known.
- **Selective Property Forwarding Type:** All custom properties forwarded by the user are sent as strings.
- **OAuth Authentication:** Amplitude doesn't support OAuth, so partners need to generate their API key.
- **Event Category name:** Amplitude doesn't send the Event Category name.

## Preparation tips

1. **Freemarker:** Familiarize yourself with [Freemarker](https://freemarker.apache.org/), the template that Amplitude uses to send events.
2. **Rate limits:** Make your rate limits as high as possible to minimize throttling. For example, Amplitude respects the rate limit that [Braze](/docs/data/destination-catalog/braze) communicates: 50,000 requests per minute for event tracking. Amplitude has a retry mechanism with exponential backoff that tries nine times over four hours, which resolves most temporary throttling.
3. **Event limits:** Make your event size limit flexible enough for customer use cases.

    {{partial:admonition type="example" heading="Example event limits"}}
    For example, [Customer.io](/docs/data/destination-catalog/customer-io) events have the following limits:

    - Maximum length of Customer ID: 150 bytes
    - Maximum number of Unique Identify attributes: 300
    - Maximum size of event data: 100K bytes

    For example, [Intercom](/docs/data/destination-catalog/intercom) has a limit of 120 Event Types and 20 meta (which are event properties) per event types. You must use the event filter to select the specific events to forward from Amplitude to Intercom.
    {{/partial:admonition}}

4. **Authentication method:** Amplitude doesn't support OAuth, so partners need to generate their API key.
5. **Endpoint flexibility:** Amplitude generates a list of objects in a specific format. Make sure your endpoint handles this specific payload structure. See the next section for a payload example.

## Integration setup

Configure the integration tile that appears on the Destinations page in Amplitude.

1. From the Integration Portal page (*Settings > Developer Portal*), click **Add New Destination**.
2. Under **Select Destination Type**, choose **Event Streaming**.

### Example setup modal

To see an example of what a finished setup modal looks like in Amplitude, navigate to *Data Destinations* in Amplitude, and add any integration marked with Event Streaming.

## Configuration

The configuration page has two sections.

- The **Configuration** tab is where you configure your payload and what you expect to receive from Amplitude.
- The **Testing** tab summarizes your configurations, including your setup modal screen for your integration, parameters, and payload. It also lets you test your configuration using a custom payload.

## Integration name

This determines what users see on the catalog page. The name must be globally unique across all other event streaming integrations.

## Create parameters

This section lets you define the parameters that can be used in the URL, headers, and event body.

- **Parameter Display Name:** This is fully customizable, so use something descriptive, because this is the display name in Amplitude. For example, "REST API Endpoint & REST API Key."
- **Parameter Name:** This is the ID used in the payload, URL, or header corresponding to this parameter.

## Customize user properties mapping

This section lets you define fields in the payload that users can populate with an Amplitude user property of their choice.
For example, most destinations use a field here for their user identifier and set it as required.

- **Destination Property Name:** This acts as both the field name and display name.
- **Required Checkbox:** If checked, users can't forward events to your destination until they configure this field.

## Customize events payload

Use the Customize Events Payload section to customize what's included in your payload.

- **URL Endpoint:** Depending on your endpoint, choose from PUT, POST, or PATCH.
- **REST API Headers:** Customize the API headers type to suit your use case. Some examples include:
    - **Authorization:** Contains the authentication credentials for HTTP authentication.
    - **Content-Type:** Tells the client what the response's media type is. For example, `application/json` or `application/javascript`. This header helps the client know how to process the response body correctly.
    - **WWW-Authenticate:** The server may send this as an initial response if it needs authentication before responding with the requested resource. This header often accompanies response code 401 (unauthorized).
    - **Accept-Charset:** Set with the request, this header tells the server which character sets (for example, UTF-8, ISO-8859-1, Windows-1251) the client accepts.
    - **Cache-Control:** The cache policy defined by the server for this response. The client stores a cached response and reuses it until the time defined by the Cache-Control header.
- **Header Key & Header Value:** This is fully customizable, so use something descriptive. For example, "API Key." This isn't included in the payload.

### Example payload structure

```json

{
  "external_id": "some user id",
  "app_id": "some app id",
  "name": "test_event_type",
  "time": "2022-01-06T17:29:04Z",
  "optional_property": "some Amplitude property",
  "optional_property_again": "some Amplitude property again",
  "properties" : {
        "test_nested_property": "some nested property",
        "library": "some library",
        "user_property_1": "some user property value 1"
  },
},

```

## Event body editor

This section is a Freemarker template that lets you construct the payload sent to your destination.
The template in the screenshot can correspond to the above payload depending on how the user configures their sync and based on the *Customize user properties mapping* section above.

- **Input:** This object includes the forwarded event and its fields, enriched with the user's other events and user properties. These fields aren't guaranteed and rely on the way each user has instrumented their events. Amplitude suggests keeping input field usage to a minimum and using only the most common ones such as: `user_id`, `event_type`, `event_time`.
- **Parameters:** A key-value pair where the key is a *Parameter Name* defined in the **Create Parameters** section, and the value corresponds to the value that the user provided when setting up their sync.
- **MappedProperties:** A key-value pair of event, user, or group properties that the customer may want to forward to your destination. For example, they may be tracking a property `email: example@example.com` and may want to forward that to your platform. These properties are only forwarded if the user selects them in the UI under **Specify event properties to send**.
- **MappedFields:** A key-value pair where the key is a *Destination Property Name* specified in the **Customize user properties mapping** section, and the value corresponds to the value of an Amplitude property that the user selects in the UI under the **Mappings** tab. For example, you may have specified `external_id` as a field, and the user might have selected the Amplitude property `email: example@example.com` in the UI. Then *MappedFields* is a key-value pair: `{external_id: example@example.com}`.

## Preview and test

1. Before you submit your configuration for review, test the mock payload that you expect to receive from Amplitude on the Testing tab. The Destination Preview form is identical to what users of the integration see. Enter the parameters you defined in this form to use as test values. You can also configure mapped properties and filters on this form.

2. Click **Test Connection** to open the testing modal. **Test Connection** is available after you enter all required parameters. This lets you customize your payload. Click **Send Test Event** — any responses from the endpoint you specified appear on the right.
3. If you see any errors, check the parameters table to make sure all declared parameters are used.
      - **DECLARED:** All declared parameters in the *Create Parameters* section.
      - **USED:** All parameters used in the URL, headers, or event body.

## Release internally

To test in your organization, click **Release Internally**. This makes the integration available to anyone within your organization. Allow up to five minutes for changes to take effect.

## Submit

After you finish testing, click **Submit** to submit your integration to the Amplitude team. The review process takes about one week. When Amplitude approves your integration, you're notified by email and can see your integration tile in the Destination section of Amplitude.
