---
id: ec6127d5-1384-41b1-b85a-04d21d0678f1
blueprint: analytic
title: 'Out-of-the-box Marketing Analytics'
this_article_will_help_you:
  - 'Track industry-standard marketing analytics in one place'
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1761586978
source: 'https://help.amplitude.com/hc/en-us/articles/25181928085019-Gain-marketing-insights-with-web-analytics'
landing: false
academy_course:
  - cafa90d0-f101-4234-bdf3-c9525c221850
---
Amplitude’s Out-of-the-box Marketing Analytics acts as a centralized hub where you can track page engagement and session-based metrics using common KPIs, such as page views, session duration, and bounce rate. Custom settings are available to:

- **Filter by domain**: Filter metrics by a specific domain to target a specific website for analysis.
- **Track conversions**: Easily define a conversion funnel, enable detailed tracking, and visualize conversion metrics with data tables and charts.
- **Uncover deeper insights with nested group-bys**: Add additional detail to your top-level channels or campaigns analytics with nested group-bys.

### Permissions

Your ability to edit views in Marketing Analytics depends on your role within the project.

| Role    | Default view | Custom view (yours) | Custom view (others) |
| ------- | ------------ | ------------------- | -------------------- |
| Admin   | ✅            | ✅                   | ✅                    |
| Manager | ✅            | ✅                   | ✅                    |
| Member  | ❌            | ❌                   | ❌                    |

## Before you begin

If you haven’t already read up on the basics of building charts in Amplitude, you should do so before proceeding.

{{partial:partials/web-product-analytics hub="Marketing"}}


## Analyze industry-standard metrics
Out-of-the-box Marketing Analytics offers four sets of insights with default metrics, as well as optional goals or key outcomes, that you are driving users to:

- **Traffic by Channel**: Provides an overview of users visiting your product by channel. Metrics include visitors, bounce rate, session totals, average session duration, sessions per user, and marketing analytics views.
- **Traffic by Campaign**: Provides an overview of the users visiting your product by campaign. Metrics include visitors, bounce rate, session totals, average session duration, sessions per user, and any defined goals.
- **Ad Performance**: Provides an overview of your ad campaigns (for example, Google Ads and Facebook Ads) with key metrics like Impressions, Clicks, Click-Through Rate (CTR), Cost Per Click (CPC), Customer Acquisition Cost (CAC), and Return on Ad Spend (ROAS), plus flexible settings for acquisition and revenue tracking.
- **Page Engagement**: Details user engagement by page. Metrics include visitors, page views, bounce rate, page views per session, entry rate, exit rate, and any defined goals.
- **Conversion**: Provides over-time and aggregated analyses of user conversion based on your defined funnel. Metrics include total conversion and step-by-step conversion.

{{partial:admonition type="note" heading="If your CAC and ROAS are 0"}}
CAC and ROAS may display as `0` if your ads haven't led to conversions, or if the UTM parameters in your campaigns don't match those in your events. 

For example, if `utm_content` in a Facebook add is `image_xyz`, but the value you set in Amplitude is `xyz`, Amplitude can't accurately track that campaign.

To ensure accurate results, ensure the UTM properties you use in your campaigns match what you [configure in Amplitude](#configure-utm-properties). If you notice a discrepency, you can update the property definition in Amplitude. For more information, go to [Fix your data with Transformations](/docs/data/transformations#rename-property-values)
{{/partial:admonition}}

Each insight displays a time series chart and an aggregated data table below it.

{{partial:admonition type='note'}}
Visit the [Marketing metrics recipes article](/docs/analytics/charts/user-sessions/marketing-metrics-recipes) for a more detailed explanation of commonly used marketing analytics and how to replicate them in Amplitude charts.
{{/partial:admonition}}

Follow these steps to analyze metrics in Out-of-the-box Marketing Analytics:

1. Click *Marketing Analytics* in the left-hand sidebar and select the insight you’d like to view.
2. (*Optional*), click *Add segment > Amplitude segments* to filter your analysis by user type:
    * **All users**: Users who triggered any event during the selected date range.
    * **Active users**: Users who triggered at least one active event during the selected date range.
    * **New users**: Users who triggered at least one new user event during the selected date range.
    * **Mobile web**: Users who triggered events on a web platform from an Apple iPad, Apple iPhone, or Android device.
    * **Desktop web**: Users who triggered events on a web platform from a Mac or Windows device.

From there, use the data table to further your analysis:
- Click *Open in Data Table* to view your results in a separate chart.
- For traffic by channel or conversion insights, select the channel you'd like to analyze from the Default Channels dropdown.

For conversion insights, you can also:
- View the data table fields by channel or campaign.
- Display total conversions or conversion rate.

### Ad metric definitions

Here are the default Ad metrics available in Out-of-the-box Marketing Analytics, along with the high-level formulas and definitions:

| Metric     | Formula                                             | Definition                                                                                                                                                     |
|----------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Impressions**| `PROPSUM(ad_metrics.impressions)`                      | Total number of times your ad is served (shown) to users. **Derived from Daily Ad Metrics**.                                                                       |
| **Clicks**     | `PROPSUM(ad_metrics.clicks)`                           | Total number of times users click your ad. **Derived from Daily Ad Metrics**.                                                                                      |
| **CTR**        | `%: (ad_metrics.clicks / ad_metrics.impressions) * 100` | Click-through rate. Shows the percentage of impressions that result in a click. **Derived from Daily Ad Metrics**.                       |
| **Ad Spend**   | `PROPSUM(ad_metrics.cost)`                             | Total amount spent on your ad campaign. **Derived from Daily Ad Metrics**.                                                                                      |
| **CPC**        | `ad_metrics.cost / ad_metrics.clicks`                  | Cost per click. Shows how much you pay, on average, for each click on your ad. **Derived from Daily Ad Metrics**.                                     |
| **CAC**        | `ad_metrics.cost / [Acquisition Event]`                | Customer Acquisition Cost. Shows how much you pay, on average, to acquire a single new user. **Cost from Daily Ad Metrics; acquisition event set in Settings**.   |
| **ROAS**       | `[Revenue Property] / ad_metrics.cost`                            | Return on Ad Spend. Shows how much revenue you earn for every dollar spent on advertising. **Cost from Daily Ad Metrics; revenue property set in Settings**.      |


## Modify settings and create goals

Out-of-the-box Marketing Analytics uses default events and properties from the Browser SDK or Ad Networks, but admins or managers can modify them in settings.

Follow these steps to manage settings, create goals, or customize tracked events:

1. Click *Customize*.
2. Select the type of setting you’d like to modify:
   * If *Page View and Filter*, choose the event and property that you’d like to use. This affects all page-related metrics.
   * For *Breakdown*, choose the default channels you want to display, as well as your campaign and page engagement properties.
   * Set *Conversion Funnel* settings by choosing the events that make up your funnel.
   * For Ad Performance, select events and properties to calculate CAC and ROAS metrics, along with properties such as ad source, campaign, and content.

If *Goals*, choose the key events or metrics you'd like to set up as additional metrics. Break down goals by  channels, campaigns, or pages.

## Advertising metrics and properties

To view insights on ad performance, connect to an ad network (for example, Google or Facebook). For more information, see the [Source Catalog](/docs/data/source-catalog).

Amplitude associates advertising metrics with an event called `Daily Ad Metrics`. This event includes both user properties and event properties that you can use for campaign analysis.

### User properties

The following user properties display by default in the breakdown table on the **Ad Performance** tab. Use these properties to link ad spend to user behavior across your product.

| Property | Description |
|---|---|
| `utm_campaign` | The campaign name from UTM tracking. Identifies which marketing campaign drove the user. |
| `utm_content` | The ad content or variation from UTM tracking. Distinguishes between different ads within the same campaign. |
| `utm_medium` | The advertising or marketing medium. For example, `cpc`, `email`, or `social`. |
| `utm_source` | The source that referred the user. For example, `google`, `facebook`, or `newsletter`. |
| `utm_term` | The search term or keyword from UTM tracking. Identifies which keywords drove clicks. |

{{partial:admonition type="tip" heading="Use UTM properties as breakdowns"}}
To gain insight on both ad metrics and product metrics, use UTM properties as the breakdown.
{{/partial:admonition}}

### Event properties

The `Daily Ad Metrics` event includes two types of event properties: numeric properties for computing metrics, and descriptive properties that identify the ad and campaign.

#### Numeric properties

Use these properties to compute advertising metrics like CTR, CPC, CAC, and ROAS.

| Property | Description |
|---|---|
| `ad_metrics.impressions` | Total number of times the ad appeared to users. |
| `ad_metrics.clicks` | Total number of times users clicked the ad. |
| `ad_metrics.cost` | Total amount spent on the ad. |
| `ad_metrics.conversions` | Total number of conversions attributed to the ad. |
| `ad_metrics.interactions` | Total number of user interactions with the ad. |

#### Descriptive properties

These properties identify and describe ads and campaigns. Property values match what you see in your ad network (for example, Google Ads). Property names may vary slightly between ad networks.

| Property | Description |
|---|---|
| `ad_id` | Unique identifier for the ad. |
| `ad_name` | Name of the ad. |
| `ad_platform` | The advertising platform. For example, `google` or `facebook`. |
| `ad_group_id` | Unique identifier for the ad group. |
| `ad_group_name` | Name of the ad group. |
| `ad_group_type` | Type of the ad group. |
| `ad_segment_device` | Device type used to view the ad. For example, `mobile` or `desktop`. |
| `campaign_id` | Unique identifier for the campaign. |
| `campaign_name` | Name of the campaign. |
| `campaign_advertising_channel_type` | The advertising channel type for the campaign. For example, `search` or `display`. |
| `campaign_start_date` | The start date of the campaign. |
| `campaign_end_date` | The end date of the campaign. |
| `final_url` | The final destination URL of the ad. |
| `tracking_url_template` | The tracking URL template used for the ad. |

{{partial:admonition type="tip" heading="Amplitude recommends UTM properties"}}
Amplitude recommends that you use UTM properties to track the full user journey from impression to in-product action.

The `Daily Ad Metrics` event supports other properties like `ad_platform` or `campaign_name`. These properties let you measure ad-level metrics like impressions and clicks, but don't support values for CAC, ROAS, or any custom goals you define that tie to Amplitude events. Those require UTM-based matching within the `Daily Ad Metrics` event.
{{/partial:admonition}}

### Configure UTM properties

To ensure your UTMs end up in Amplitude:

1. Add UTM parameters to your ad campaign URLs.
2. Instrument those UTMs as user properties in Amplitude.
3. Ensure the UTM values match between your advertising URLs and the event data you see in Amplitude.

If you don't see results, ensure the following:

* You ran an ad campaign during the selected date range.
* You added UTM parameters to your ad campaign URLs.

## Purchase by item (beta)

The purchase by item hub helps ecommerce teams analyze purchase behavior at the SKU, product, or category level. It gives you a detailed view of your purchase funnel, allowing you to understand where users drop off and how revenue performs across products.

Unlike the Conversion hub, which focuses on overall funnel performance, the Purchase by item hub adds ecommerce-specific granularity. You can:

* Break down your purchase funnel by product name, SKU, or category
* Measure conversion and cart drop-off rates
* Analyze revenue and average order value (AOV) at an item level

This hub supports ecommerce use cases where you need to track multiple products or product categories within a single checkout flow.

### Tracking setup

To use Purchase by item, your Amplitude implementation must send cart data as arrays. Learn more about this setup in [Cart Analysis](/docs/analytics/charts/cart-analysis).

Arrays let you send structured product information like `product_id`, `sku`, `price`, and `category` without creating hundreds of event properties. Each item in the array represents a product in the cart.

### Plan availability

This feature is available to organizations with the eCommerce package on Growth or Enterprise plans.

### Permissions

Editing this hub requires Manager or Admin permissions. For more information, review [User Roles and Permissions](/docs/admin/account-management/user-roles-permissions).

### Configuring the hub

To begin, navigate to *Marketing Analytics > Purchase by Item*.

1. Click **Select event** to create a new configuration, or **Customize** to edit an existing configuration.
2. Complete the **Purchase funnel** setup.
   1. Define the funnel steps. Start with an event like `View Product` and end with `Complete Purchase`.

      {{partial:admonition type="tip" heading="Example purchase funnel events"}}
      A purchase funnel may have events like:

      1. `Add Item to Cart`
      2. `Begin Checkout`
      3. `Complete Purchase`
      {{/partial:admonition}}

       4. Identify your `Add to Cart` step. Selecting this step enables the Cart drop-off rate metric, which includes the percentage of users who abandon their cart between this step and the last step.
       5. Select a unique identifier. This identifier helps Amplitude understand your individual products. For example, you could choose a property like `product_id`.
       6. Add revenue detail. Select the event that includes your revenue property. If you don't track revenue, you can create a [derived property](/docs/data/derived-properties) that multiplies price and quantity, and stores the result as the value of a property.
     
#### Error handling

If you pick a step that doesn't include a cart item property, Amplitude displays an error message that states:

> Breakdown may be incomplete: this event doesn't include an item property.

To avoid this, ensure your event follows the [Cart analysis](/docs/analytics/charts/cart-analysis) structure.

### Results

After you complete setup, the hub displays:

* A funnel visualization that shows conversion at each step
* Average Order Value (AOV) and total revenue metrics
* Cart drop-off rate for your "Add to cart" step
* A breakdown table that shows performance by product, category, or brand

![](statamic://asset::help_center_conversions::analytics/purchase-by-item-funnel.png)

{{partial:admonition type="note" heading="Metric definitions"}}
* **Total revenue**: The sum of the item revenue for the row. For example, if the row were `Digital Content` the revenue would equal the revenue value for the `Digital Content` items in the cart.
* **AOV**: Revenue divided by the number of orders that contain that item.
{{/partial:admonition}}

The breakdown table includes:

* Conversion rate between steps
* Average order value (AOV)
* Total revenue
* Cart drop-off rate

### Next steps

The Purchase by item hub is a good starting point for ecommerce analysis. To explore deeper:

* Click **Open as chart** to view the underlying funnel or table.
* Adjust the filters, metrics, or visualizations to refine your analysis.
* Save your custom chart to a [Space](/docs/get-started/spaces) for ongoing tracking.

## Create a web experiment for specific URLs

On the Page Engagement tab of Marketing Analytics, when you breakdown your data by Page URL, you can create a [web experiment](/docs/web-experiment/set-up-a-web-experiment) from the table.

Click the flask icon in the Action column of the table, and the New Web Experiment dialog appears pre-populated with the targeted page URL.