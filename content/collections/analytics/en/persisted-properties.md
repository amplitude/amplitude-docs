---
id: 7a3f2c91-4e5b-4a1d-9f82-1b8c6d3e5a7f
blueprint: analytic
title: 'Persisted properties (beta)'
landing: false
exclude_from_sitemap: false
---



This article explains what persisted properties are, how they work, and how to set them up in Amplitude. It is intended as a foundational reference.

Property persistence helps teams create consistent, reliable reporting across Amplitude by controlling how long event property values like page path or search term remain attached to events. It ensures that context—like which campaign, channel, or merchandising asset drove engagement—remains available across the entire user journey.

For example:

- Marketing teams can persist page path values across multiple sessions to understand campaign effectiveness over time
- Merchandising teams can persist search term with item-level data for enhanced purchase attribution

## What persisted properties are and are not

Persisted properties are not user properties and do not represent long lived user state. They are evaluated at query time, and apply allocation and expiration rules to event level data for analysis. Persisted properties do not update the user profile, do not mutate user state, and are not intended to replace core event or user properties. Their purpose is to control how context like marketing or merchandising data is applied during analysis.

### What it does

Property persistence defines which property values "stick" beyond the event where they were first seen and how long they remain valid.

Instead of requiring every event to include its own source or merchandising data, Amplitude can remember the property value and apply it automatically to later events—until it expires or is replaced.

This is especially powerful in marketing and merchandising analysis, where you want to connect early engagement with later outcomes.

For example:

- Marketing teams can persist page path values across multiple sessions to understand campaign effectiveness over time
- Merchandising teams can persist search term with item-level data for enhanced purchase attribution

## Persisted properties vs User properties

| User properties | Persisted properties |
|-----------------|----------------------|
| Stored on the user profile | Not stored on the user profile |
| Set at ingest time | Evaluated at query time (ex: when you use a chart) |
| Represent user level state | Apply allocation and expiration rules |
| Examples include device type, location, User ID | Designed for session or time-bounded analysis context |

## Key concepts

### Allocation: what gets credit

Allocation decides which property value should "stick" across a series of events for the same user. Amplitude offers four allocation types:

- **Original:** The first value persists and never changes
- **Most recent:** The latest value overwrites earlier ones
- **First known** (Not incl. in beta ❌): The first observed value applies to all events before and after
- **Last known** (Not incl. in beta ❌): The most recent value applies to all events before and after

### Expiration: how long it gets credit for

Expiration defines when a persisted property value stops applying.

| Expiration type | What it means | Example use case |
|-----------------|---------------|------------------|
| Session | Value resets when the session ends | Attribute product engagement per browsing session |
| Custom time | Value expires after a chosen duration | Maintain campaign context for 7 days or max 30 days |

## How it works

### Step 1: Define persistence in data settings

From Data Settings > Properties > Persisted > Create persisted property, select the type of persisted property you want to create

- **Persistence settings:** Use this set up by default
- **Advanced: Merchandising use case:** This advanced set up allows us define which products should be tied to the persisted property, then attribute carts with multiple items to each merchandising source.

#### Example 1: Product source

**Persistence settings:**

1. First, navigate to the Properties section of my Data Settings - and click to create a new Persisted Property:

Give this Persisted Property a name, like "Entry Page", and in the description, provide some additional information, like the allocation method and expiration. This helps ensure that anyone using this property in a chart or data table understands the configuration.

2. Then, select the event property I want to persist — for this Entry Page example, we'll use Page Path

3. Next, choose an Allocation method. Since we want to identify the "Entry Page", we'll select "Original". This ensures we lock in that first touchpoint.

4. Finally, we'll set the Expiration. The default setting is for the Persisted Property to expire at the end of the session - which is exactly what I want for this Entry Page example.

That's it for the set up of this example. Before going into how you can use persisted properties in your analysis, we'll share a more advanced example that requires both the persisted setting and the Advanced: Merchandising use case toggle you noticed at the bottom.

#### Example 2 (advanced): Finding method

**Persistence settings:**

1. For this example, we'll create a new Persisted Property called "Most recent Finding Method":

2. Then, select the event property I want to persist — for this Most recent Finding Method example, we'll use Finding Method.

Next, choose an Allocation method. Since we want to identify the "Most recent Finding Method", we'll select "Most recent". This ensures we lock in that last touchpoint.

Finally, we'll set the Expiration. The default setting is for the Persisted Property to expire at the end of the session - which is exactly what I want for this Most recent Finding Method example.

**Advanced: Merchandising use case:**

This advanced setup allows us to define which products should be tied to the persisted property, then attribute carts with multiple items to each merchandising source. It allows us to attribute metrics that are cart related (such as "add to cart", "AOV" or "Revenue") to their right persisted property.

Let's go on and set up this part too:

1. First, we'll select which product identifier is being used in the metrics you'd want to look at, that are cart related. In this case I have implemented the property called product.item_id, so I go and select it:

2. Next, we'll select one or multiple events that link the persisted property with the product identifier I've selected above. This is a technical requirement on our side to make sure we can run a cross-analysis properly.

In this case, the events I have with both the Finding Method and the product.item_id properties are Home Hero Clicked, Promotion Clicked and Recommendation Clicked. So I'll go and pick them up:

### Step 2: Use persisted properties across analyses

Once you define a persisted property (like Entry Page or Most Recent Finding Method), we automatically apply it to upstream/downstream events based on the allocation and expiration rules you configured. You do not need to manually re-attribute or ensure the original property exists on every event.

You can find persisted properties directly in Data Tables:

- Open a Data Table
- In the Group-by selector, look for your persisted properties alongside standard event properties
- They appear by the name you gave them in Data Settings (for example, "Entry Page"), so they are easy to recognize when building charts.

In practice, this means the context you captured earlier in the journey is available wherever you analyze outcomes.

For example:

- **Entry Page (Original, Session)**  
  A user lands on /mens-shoes, browses several pages, then completes a purchase. Even though the Purchase event does not include Page Path, your persisted Entry Page will still show /mens-shoes, letting you group purchases by where sessions originally started

- **Most recent Finding Method (Most recent, Session)**  
  A user first discovers a product via Search, later clicks a Recommendation, and finally adds the item to cart. Because the allocation is set to Most recent, the persisted value on Add to Cart and Purchase will be Recommendation, reflecting the last touchpoint before conversion

For merchandising teams using the advanced setup:

- Product-level context (like Finding Method or homepage module) is carried forward to cart and purchase events using the product identifier you configured
- If a cart contains multiple items, each item keeps its own persisted value, so revenue, AOV, and add-to-cart metrics are attributed to the correct source per product

This allows you to:

- Group or filter outcome events (Add to Cart, Purchase, Revenue) by persisted properties in data tables
- Measure which entry pages, homepage modules, or recommendation zones drive conversions
- Analyze results consistently across charts without rebuilding attribution logic each time

## Multiple Groupbys

You can group by more than one property in the same data table to combine persisted context with regular event data.

For example, you might group purchases by Entry Page and Most Recent Finding Method to understand how session entry points and discovery behavior work together.

Add additional groupbys by clicking Add top-level group-by at the top of a data table column.

When multiple properties are included in the same analysis, Amplitude evaluates each property independently.

**If both properties are persisted:**

- Each property is populated using its own allocation and expiration rules
- For example, Entry Page reflects where the session started (Original, Session), while Most recent Finding Method reflects the last discovery action before conversion (Most recent, Session)
- Both values are available on outcome events like Add to Cart or Purchase, even if those events did not originally contain them

**If only some properties are persisted:**

- Persisted properties retain their computed values based on their configuration
- Non-persisted properties are taken directly from the outcome event being analyzed
- For example, Entry Page comes from persistence, while Device Type comes from the Purchase event itself

**If none are persisted:**

- All property values are taken as-is from the outcome events, with no carryover from earlier interactions

This means you can freely combine journey context and event-level attributes in a single table, knowing that persisted properties keep their defined behavior while regular properties reflect what happened at the moment of conversion.

## Current availability and limitations

- Persisted properties are available in Data Tables and analyses
- They do not appear on the user profile
- They are not included in raw data exports such as BigQuery
- Values are computed at query time and are not materialized
- Cart and array properties are not supported yet
- 30-day time range in data tables

## Understanding the difference: attribution vs. persistence

Persistence controls how long property context remains available, while attribution controls how conversion credit is assigned. They solve related but distinct problems and are configured independently.

If, after reading this article, the difference between attribution and persistence in Amplitude still isn't clear, here is a recap for you.

| Concept | Attribution | Property persistence |
|---------|-------------|----------------------|
| Scope | Metric-level (applies across properties) | Property-level (applies across Metrics) |
| What it does | Assigns conversion credit to a campaign, product, or channel | Keeps those property values active across time |
| Where defined | In Data Tables | In project-level data settings |
| Where is it used | In Data Tables | Starts with data tables, eventually other charts as well. |
| Used for | Deciding who gets credit | Ensuring the right context exists for that credit |
| Example | "Which campaign drove this purchase?" | "Which campaign or product should this purchase be associated with?" |
| Supported Allocation Models | Linear, Participation, U-shaped, J-shaped, Inverse J-shaped, Data driven, Custom | Original (First touch), Most recent (Last touch) |
| Multi-property semantics (Data tables) | Attribution is only applied to outermost groupby property, rest of the properties follow the attributed event: [attribution with multiple properties](/docs/analytics/charts/data-tables/data-tables-attribute-credit#attribution-with-multiple-properties) | If there are multiple persisted properties, each property gets persisted individually. The persisted property also doesn't have to be the outermost groupby property. (see above section Multiple Groupbys, Groupbys with filters) |
