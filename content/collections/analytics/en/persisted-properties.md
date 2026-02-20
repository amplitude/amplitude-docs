---
id: 7a3f2c91-4e5b-4a1d-9f82-1b8c6d3e5a7f
blueprint: analytic
title: 'Persisted properties (beta)'
landing: false
exclude_from_sitemap: false
---

{{partial:admonition type="tip" heading="Feature is in Beta"}}
The Persisted Properties feature is in Beta. 
This feature may continue to evolve and change as development completes. The documentation may not cover all aspects of the feature. 
{{/partial:admonition}}

Property persistence helps teams create consistent, reliable reporting across Amplitude by controlling how long event property values like page path or search term remain attached to events. It ensures that context, such as which campaign, channel, or merchandising asset drove engagement, remains available across the entire user journey.

For example:

- Marketing teams can persist page path values across multiple sessions to understand campaign effectiveness over time.
- Merchandising teams can persist search term with item-level data for enhanced purchase attribution.

## What persisted properties are and are not

Persisted properties aren't user properties and don't represent long-lived user state. Amplitude evaluates them at query time and applies allocation and expiration rules to event-level data for analysis. Persisted properties don't update the user profile, don't mutate user state, and aren't intended to replace core event or user properties. Their purpose is to control how Amplitude applies context such as marketing or merchandising data during analysis.

### What it does

Property persistence defines which property values "stick" beyond the event where they were first experienced and how long they remain valid.

Instead of requiring every event to include its own source or merchandising data, Amplitude can remember the property value and apply it automatically to later events until it expires or Amplitude replaces it.

This is especially useful in marketing and merchandising analysis, where you want to connect early engagement with later outcomes.

For example:

- Marketing teams can persist page path values across multiple sessions to understand campaign effectiveness over time.
- Merchandising teams can persist search term with item-level data for enhanced purchase attribution.

## User properties compared to Persisted properties

| User properties | Persisted properties |
|-----------------|----------------------|
| Stored on the user profile. | Not stored on the user profile. |
| Set at ingest time. | Evaluated at query time (for example, when you use a chart). |
| Represent user level state. | Apply allocation and expiration rules. |
| Examples include device type, location, User ID. | Designed for session or time-bounded analysis context. |

## Key concepts

### Allocation: what gets credit

Allocation decides which property value should "stick" across a series of events for the same user. Amplitude provides the following allocation types:

- **Original:** The first value persists and never changes.
- **Most recent:** The latest value overwrites earlier ones.
- **First known** (Not incl. in beta): The first observed value applies to all events before and after.
- **Last known** (Not incl. in beta): The most recent value applies to all events before and after.

The table below displays an example of a user’s activity, from sign-up through page views to purchase. The first column shows the events and property values as they exist in the dataset. The remaining four columns show different allocation methods and how property values change under each method.

| Event | Dataset Value | Original | Most Recent | First Known | Last Known |
|---|---|---|---|---|---|
| Sign up | page path: not captured | — | — | /gift_guide ◌ | /best_seller ◌ |
| Page View | page path: /gift_guide | /gift_guide ● | /gift_guide ● | /gift_guide ● | /best_seller ◌ |
| Page View | page path: /flash_sale | /gift_guide ◌ | /flash_sale ● | /gift_guide ◌ | /best_seller ◌ |
| Purchase | page path: not captured | /gift_guide ◌ | /flash_sale ◌ | /gift_guide ◌ | /best_seller ◌ |
| Page View | page path: /best_seller | /gift_guide ◌ | /best_seller ● | /gift_guide ◌ | /best_seller ● |

● = Property value present on the event &nbsp;&nbsp; ◌ = Property value filled by allocation

### Expiration

Expiration defines when a persisted property value stops applying.

| Expiration type | What it means | Example use case |
|-----------------|---------------|------------------|
| Session | Value resets when the session ends. | Attribute product engagement per browsing session. |
| Custom time | Value expires after a chosen duration. | Maintain campaign context for 7 days or max 30 days. |

## Setting up persisted properties
The following section contains examples for using the Persistence and Advanced settings. Review each one as they apply to different ways you can implement persisted properties. 

### Step 1: Define persistence in data settings

Go to *Data Settings > Properties > Persisted* and click **Create persisted property**, select the type of persisted property you want to create:

- **Persistence settings:** The default settings.
- **Advanced: Merchandising use case:** This advanced setup lets Amplitude define which products should be tied to the persisted property and then attribute carts with multiple items to each merchandising source.

#### Example 1: Product source

**Persistence settings:**

1. Navigate to the Properties section of Data Settings and then click to create a new Persisted Property.
   Give this Persisted Property a name, such as `Entry Page`. In the description, provide some additional information such as the allocation method and expiration. This helps ensure that anyone using this property in a chart or data table understands the configuration.

2. Select the event property you want to persist.
   For this example, use `Page Path`.
3. Choose an **Allocation** method.
   In the example, because you want to identify the `Entry Page`, select **Original**. This ensures you include the first touchpoint.
4. Set the **Expiration**.
   By default, the Persisted Property expires at the end of the session. 

Before going into how you can use persisted properties in your analysis, review the more advanced example that requires both the persisted setting and the Advanced: Merchandising toggle.

#### Example 2 (Advanced): Merchandising finding method

**Persistence settings:**

1. Create a new Persisted Property called `Most recent Finding Method`.
2. Select the event property you want to persist.
   For this Most recent Finding Method example, use `Finding Method`.
3. Choose an Allocation method. 
Because you want to identify the `Most recent Finding Method`, select **Most recent**. This ensures you include the last touchpoint.
4. Set the Expiration.
5. By default, the Persisted Property expires at the end of the session.

**Advanced: Merchandising use case:**

This advanced setup lets Amplitude define which products to tie to the persisted property and then attribute carts with multiple items to each merchandising source. It allows you to attribute metrics that are cart related (such as `add to cart`, `AOV`, or `Revenue`) to their correct persisted property.

To set up this effect: 

1. Select which product identifier you use in the cart-related metrics you want. In this example you've implemented the property called `product.item_id`. 
2. Select one or multiple events that link the persisted property with the product identifier you've selected.
   This ensures Amplitude can run a cross-analysis properly.

In this example, the events you generate that contain both the `Finding Method` and the `product.item_id` properties are `Home Hero Clicked`, `Promotion Clicked` and `Recommendation Clicked`. 

### Step 2: Use persisted properties across analyses

After you define a persisted property (such as Entry Page or Most Recent Finding Method), Amplitude automatically applies it to upstream/downstream events based on the allocation and expiration rules you've configured. You don't need to manually re-attribute or ensure the original property exists on every event.

You can find persisted properties directly in Data Tables:

1. Open a Data Table.
2. In the Group-by selector, look for your persisted properties alongside standard event properties.
   They appear under the name you gave them in Data Settings (for example, `Entry Page`).

This means the context you captured earlier is available wherever you analyze outcomes.

For example:

- **Entry Page (Original, Session)**  
  A user lands on `/mens-shoes`, browses several pages, then completes a purchase. Even though the Purchase event doesn't include `Page Path`, your persisted Entry Page still displays `/mens-shoes`, letting you group purchases by where sessions originally started.

- **Most recent Finding Method (Most recent, Session)**  
  A user first discovers a product through Search, later clicks a Recommendation, and finally adds the item to cart. Because you set the allocation to Most recent, the persisted value on `Add to Cart` and `Purchase` is `Recommendation`, reflecting the last touchpoint before conversion.

For merchandising teams using the advanced setup:

- Amplitude carries product-level context (such as Finding Method or homepage module) forward to cart and purchase events using the product identifier you configured.
- If a cart contains multiple items, each item keeps its own persisted value. Amplitude attributes revenue, AOV, and add-to-cart metrics to the correct source per product.

This allows you to:

- Group or filter outcome events (Add to Cart, Purchase, Revenue) by persisted properties in data tables.
- Measure which entry pages, homepage modules, or recommendation zones drive conversions.
- Analyze results consistently across charts without rebuilding attribution logic each time.

## Multiple groupbys

You can group by more than one property in the same data table to combine persisted context with regular event data.

For example, you can group purchases by `Entry Page` and `Most Recent Finding Method` to understand how session entry points and discovery behavior work together.

Add additional groupbys by clicking **Add top-level group-by** at the top of a data table column.

When you include multiple properties in the same analysis, Amplitude evaluates each property independently.

**If both properties are persisted:**

- Amplitude populates each property using its own allocation and expiration rules.
- For example, `Entry Page` reflects where the session started (`Original`, `Session`), while `Most recent Finding Method` reflects the last discovery action before conversion (`Most recent`, `Session`).
- Both values appear on outcome events such as `Add to Cart` or `Purchase`, even if those events didn't originally contain them.

**If only some properties are persisted:**

- Persisted properties retain their computed values based on their configuration.
- Amplitude takes non-persisted properties directly from the outcome event being analyzed.
  For example, `Entry Page` comes from persistence, while `Device Type` comes from the `Purchase` event itself.

**If none are persisted:**

- All property values come as-is from the outcome events, with no carryover from earlier interactions.

This means you can combine journey context and event-level attributes in a single table, knowing that persisted properties keep their defined behavior while regular properties reflect what happened at the moment of conversion.

## Current availability and limitations

- You can use persisted properties in Data Tables and analyses.
- They don't appear on the user profile.
- Raw data exports such as BigQuery don't include them.
- Amplitude computes values at query time; they aren't materialized.
- Cart and array properties aren't supported yet.
- 30-day time range in data tables.

## Understanding the difference: attribution or persistence

Persistence controls how long property context remains available, while attribution controls how Amplitude assigns conversion credit. They solve related, but distinct, problems; you configure them independently.

If, after reading this article, the difference between attribution and persistence in Amplitude still isn't clear, here is a recap for you:

| Concept | Attribution | Property persistence |
|---------|-------------|----------------------|
| Scope | Metric-level (applies across properties) | Property-level (applies across Metrics). |
| What it does | Assigns conversion credit to a campaign, product, or channel | Keeps those property values active across time. |
| Where defined | In Data Tables | In project-level data settings. |
| Where is it used | In Data Tables | Starts with data tables, eventually other charts as well. |
| Used for | Deciding who gets credit | Ensuring the right context exists for that credit. |
| Example | "Which campaign drove this purchase?" | "Which campaign or product should this purchase be associated with?" |
| Supported Allocation Models | Linear, Participation, U-shaped, J-shaped, Inverse J-shaped, Data driven, Custom | Original (First touch), Most recent (Last touch). |
| Multi-property semantics (Data tables) | Amplitude applies attribution only to the outermost groupby property; the rest of the properties follow the attributed event: [attribution with multiple properties](/docs/analytics/charts/data-tables/data-tables-attribute-credit#attribution-with-multiple-properties) | If there are multiple persisted properties, each property gets persisted individually. The persisted property also doesn't have to be the outermost [groupby property](#multiple-groupbys). |
