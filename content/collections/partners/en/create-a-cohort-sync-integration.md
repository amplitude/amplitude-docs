---
id: 7193cbd2-100e-4a40-8f95-260103571976
blueprint: partner
title: 'Create a Cohort Syncing Integration'
landing: true
source: 'https://www.docs.developers.amplitude.com/partners/cohort-integration-guide/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718647137
landing_blurb: 'Learn the basics of creating a cohort syncing integration.'
---
{{partial:admonition type="note" heading="Prework requirements"}}
This guide assumes that you've completed the prerequisites for building partner integrations listed in [Amplitude Integration Portal](/docs/partners/integration-portal)
{{/partial:admonition}}

This guide walks through the basics of creating a cohort sync integration with Amplitude.

This doc uses a list-based integration in its examples. If you create a property-based cohort sync integration, some steps may be slightly different than what you see here.

## Integration setup

Configure the integration tile that appears on the Amplitude **Destinations** page after Amplitude validates your integration. You also need to decide between a **List-based cohort integration** or a **Property-based cohort integration**. For more information, see [Receiving Behavioral Cohorts](/docs/partners/receiving-behavioral-cohorts/).

1. From the Integration Portal page (*Settings > Developer Portal*), click **Add New Destination**.
2. Choose the target connection from the *Select Connection Information* dropdown.
3. Choose whether you're building a list-based or property-based cohort integration:
      - **List-based cohort integration**: A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. The first sync requires a call to a list creation API, then subsequent calls to the add API and remove API keep the list membership up to date.
      - **Property-based cohort integration**: A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. Amplitude invokes the update API when cohort membership changes to update the user property. Although you don't need the list creation API, some manual steps may be required to create the custom user property.
4. Click **Next** to configure the destination.

## Integration name

This determines what users see on the catalog page. The name must be globally unique across all other cohort sync integrations.

## Configuration

The configuration page has two sections.

- The **Configuration** tab is where you configure your payload and what you expect to receive from Amplitude.
- The **Testing Integration** tab summarizes your configurations, including the **Destination Settings** form, which previews your integration's variables and payload. You can also test your integration from this tab.

The next several sections walk through configuration and testing options.

### Set authentication method

The first step is determining how you plan to authenticate the API call between Amplitude and your company.

Click **Custom Headers**, then choose from the following:

- **No authentication**: No authentication header is required.
- **Basic Authentication**: Use API key and API Secret (optional) as authentication headers.
- **Authentication Header**: Authenticate with an API key.
- **Bearer Token**: Use Bearer Token as an Authorization header.

### Create custom fields

These fields collect and replace the `$variable` declared in the payloads in the API calls, and build the modal customers use to enable your integration. Fields you add here are required when your users set up the integration.

- **Field Type**: Specify the field type (String, Single Select, Button Group).
- **Field variable name used in the payload**: By default, this matches your authentication choice. For example, if you choose Bearer Token as the authentication method, the value is `bearer_token`.
- **Display name**: The name your users see in the setup modal for your integration. By default, this matches your authentication choice. For example, if you choose Bearer Token as the authentication method, the placeholder display name is "Bearer Token."
- **Add New Custom Field**: To add another identifier required for the payload, add custom fields such as String, Single Select, and Button Group.

{{partial:admonition type="note" heading=""}}
Amplitude recommends using an underscore "_" instead of a dash in the Header Values. for example, `$api_key` instead of `$api-key`.
{{/partial:admonition}}

### Map fields

Map fields to specify how Amplitude fields connect to the fields in your system. The value of the mapping replaces `item_template` in the payloads.

When you configure Mapping Fields in the Integration Portal, users of your integration see a **Mappings** section in their Destination Settings. This section lets users select any Amplitude user property to map to a field in your destination system, and supports custom user identifiers.

- **Mapping Field Display Name**: Amplitude recommends setting this as "Key," "Identifier," or "User ID Mapping."
- **Amplitude Mapping Field**: The field name in Amplitude. For example, `user_id_field_amplitude`.
- **Field Type**: Either "String" or "Single Select."
- **Display name**: This is fully customizable, so use something descriptive. For example, "User ID" or "Email."
- **Add New Mapping**: Add more mappings if required, such as String, Single Select, or Button Group.

### Slugify Amplitude cohort name

You can slugify cohort names to standardize them. This is helpful if your system doesn't support special characters or foreign characters. This option converts your cohort name to a URL slug by replacing Unicode special characters and spaces with ASCII and hyphens. This feature is only available when the variable `$amplitude_cohort_name` appears in the payload of the endpoints. The slugify rule is as follows:

- Convert the original cohort name to normalization form KD (NFKD), which is compatibility decomposition.
- Substitute hyphens for characters except alphabets (a-z, A-Z), numbers (0-9), and underscores (_).
- Limit the slug to 100 characters.

{{partial:admonition type="example" heading=""}}
This option turns a cohort named `Saturday's cohort & héllo` to  `Saturday-s-cohort-he-llo`
{{/partial:admonition}}

### List creation endpoint

A list-based integration requires three different API calls. The first is the list creation endpoint. When a cohort syncs for the first time, Amplitude calls this API to create a list on your platform. Amplitude expects your app to return a response containing the unique identifier for `listID`. Amplitude stores the `listID` and uses it as part of the payload for list updates.

- **URL Endpoint**: The endpoint that you define. For example, `https://api.yourapp.com/list`. Choose which method to use in the call.
- **API payload to send to the destination**: Customize and define this payload to fit your needs.
- **Path to List ID in the response**: N/A.

{{partial:admonition type="note" heading="Payload editor"}}
The payload editor is a developer-friendly JSON editor tool. Type `$` to find created variables easily.
{{/partial:admonition}}

#### Errors for the list creation endpoint

Add error status codes and error messages for every endpoint so that end users can debug faster.

Expand **Error Classifications**, and click **Add New Error** to add status codes. Include as many status codes and sub-error codes as you need. Clear codes and messages make debugging much faster for your end users.

Amplitude recommends using sub-error codes if you use the same status code for multiple errors.

Here are some common status codes that most partners include:

- 200: Success.
- 400: Invalid request.
- 401: Unauthorized (bad api_key).
- 404: Invalid User ID.
- 429: Throttling/rate limiting.

Provide a clear failure reason and error message in case cohort sync fails. Clear messages improve your end user's experience and help deflect support issues.

{{partial:admonition type="note" heading="How Amplitude handles undefined status codes"}}
For any error response code that's "undefined" at the point of configuration (without failure reason or status code), Amplitude will by default show an "unclassified" error type with the following error message:

"This cohort sync has encountered an unidentified kind of error for this integration. Please contact support or your CSM to create a ticket and ask for help in solving this issue."
{{/partial:admonition}}

### Add users endpoint

Amplitude calls the add users API every time a cohort syncs from Amplitude to your app. This could be hourly or daily. This call calculates the difference in the current cohort size compared to the last successful sync.

- **URL Endpoint**: There's a `$list_Id` placeholder in the URL, but it's not required. You can design your API to place this in the payload instead. For example: `https://your.domain/lists/$listId/add`.
- **API payload to send to the destination**: Customize and define whether this payload is a batch. The key here is the `$items` variable, which the contents of *An array of items that replaces the $items variable in the payload* replaces.
This `$items` variable is usually the identifier for every user in a cohort. For example, if there are 20 new users to add to your existing cohort, the batch object contains a collection of those 20 users, and Amplitude sends all 20 objects to your endpoint. Your payload might look like this:

    ```json
    {
      "userIds": $items,
      "context": {
        "integration":{
          "name": "Amplitude Cohort Sync",
          "version": "1.0.0"
        }
      }
    }
    ```

- **Maximum number of items in each API call (batch size)**: The default is 10,000, but you can specify this. Amplitude recommends 10,000 users per cohort batch.
- **An array of items that replaces the `$items` variable in the payload**: Specify the format of the object that replaces the `$item` variable in the payload. For example, `"$user_id_field_amplitude"`.

Avoid rate limiting if possible. If you do have rate limits — for example, 90 requests per second — make them explicit in your user documentation. Amplitude sends out four requests in parallel, with each request containing up to 10,000 users.

#### Errors for add users endpoint

Instead of recreating every status code, failure reason, error message, and sub-error code, Amplitude recommends reusing the same error codes from your list creation endpoint. Select **Copy errors from other endpoints** and choose an endpoint you've already written errors for.

### Remove users endpoint

Amplitude calls the remove users API every time a cohort syncs from Amplitude to your app. This could be hourly or daily. This call calculates the difference in the current cohort size compared to the last successful sync.

- **URL Endpoint**: There's a `$listId` placeholder in the URL, but it's not required. You can design your API to place this in the payload instead. For example: `https://your.domain/lists/$listId/remove`.
- **API payload to send to the destination**: Customize and define whether this payload is a batch. The key here is the `$items` variable, which the contents of *An array of items that replaces the $items variable in the payload* replaces.
This `$items` variable is usually the identifier for every user in a cohort. For example, if there are 20 users to remove from your existing cohort, the batch object contains a collection of those 20 users, and Amplitude sends all 20 objects to your endpoint. Your payload might look like this:

    ```json
    {
      "userIds": $items,
      "context": {
        "integration":{
          "name": "Amplitude Cohort Sync",
          "version": "1.0.0"
        }
      }
    }
    ```

- **Maximum number of items in each API call (batch size)**: The default is 10,000, but you can specify this. Amplitude recommends 10,000 users per cohort batch.
- **An array of items that replaces the `$items` variable in the payload**: Specify the format of the object that replaces the `$item` variable in the payload. For example, `"$user_id_field_amplitude"`.

#### Errors for remove users endpoint

Instead of recreating every status code, failure reason, error message, and sub-error code, Amplitude recommends reusing the same error codes from your list creation endpoint. Select **Copy errors from other endpoints** and choose an endpoint you've already written errors for.

### Preview and test endpoint

Before submitting your configuration for review, test the mock payload that you expect to receive from Amplitude. In the Testing tab, follow these steps to preview and test your configuration.

In the Testing tab, the Destination Settings form is identical to what users of your integration see. Use this form to control the parameters you defined in the headers of the payload.

{{partial:admonition type="note" heading="Mappings don't work in the Testing tab"}}
The **Mappings** section doesn't function in the Testing tab because the tab uses CSV input with pre-defined variables (like `user_id_field_amplitude`). In production, user-selected mappings replace these values, but in testing, the CSV values take precedence.
{{/partial:admonition}}

To generate users, upload a CSV or click **Regenerate** to generate users based on your configurations. The CSV must have an Operation column with values of either `add` or `remove`. Any parameters used in the List Creation payload must be consistent across all rows in the CSV. The CSV must also have columns for each of the parameters used.

Here is a sample CSV for the default configurations:

```
operation,user_id_field_amplitude,amp_cohort_name,amp_cohort_id
add,user123,Unified Cohort,unified_cohort_001
add,user456,Unified Cohort,unified_cohort_001
remove,user789,Unified Cohort,unified_cohort_001
add,john.doe@example.com,Unified Cohort,unified_cohort_001
```

Check the parameters table to make sure all variables are accounted for and resolve any errors. Ensure that all declared fields are non-empty.

- **DECLARED**: All declared variables in the "Authentication calls, Custom Fields and Mapping Fields section."
- **USED**: All variables used in the list users endpoint, add users endpoint, or remove users endpoint.
- **PRE-DEFINED**: Pre-defined variables that Amplitude replaces with values.

To modify the headers, use the **Destination Settings** form, which appears on both the **Configuration** and **Testing** tabs.

Check your headers and payloads. When ready, click **Test Endpoint** to send a test API call to the predefined endpoint. You can also see the response or error for debugging.

After you click **Test Endpoint**, you should get a success response. Retrieve the `$list_id` here — Amplitude uses the `$list_id` for the "Add Users Endpoint."

The `{listId: $list_id}` is the expected response for the list creation API call. To change the structure, update the *Path to List ID in the response* value in the list creation configuration.

Use the `$list_id` you retrieved to test the add users and remove users endpoints.

You can also run an end-to-end test with the **Test Endpoint** button in the Test Integration section, which automatically runs all necessary tests.

## Release internally

To test in your organization, click **Release Internally**. This makes the integration available to anyone within your organization. The integration is available immediately after you do this.

### Submit your integration

After you finalize testing, click **Submit** to submit your integration to the Amplitude team. The review process takes about one week. When Amplitude approves your integration, you're notified by email and can see your integration tile in the Destination section of Amplitude.
