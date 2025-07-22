---
id: 188707ef-ad21-464e-a692-a419ed326665
blueprint: data
title: 'Currency Conversion'
this_article_will_help_you:
  - 'Analyze multi-currency revenue data'
  - 'Understand how Amplitude converts derived properties'
  - 'Manage project settings'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753202057
---

Currency conversion lets you analyze multi-currency revenue data in Amplitude. With currency conversion, you can:
- Send Amplitude transaction data with local currency codes.
- Use revenue data for insight generation or decision making without first needing to manually pre-convert data into a single currency.
- Run queries based on a series of lookup tables connected to daily exchange rates to convert transaction amounts based on transaction dates and daily exchange rates. You can use the primary currency set at the project level (for example, convert all global currencies to USD).

You can control where you view currency-converted data throughout Amplitude. Target currencies are configurable at the project level through project settings. This means that you can use both converted and non-converted values for `$revenue` and `$price` fields. You can also:

- Send standard `$revenue` and `$price` fields or map your own custom fields (or cart properties) into the conversion logic.
- View original, non-converted, values in user timelines. This ensures alignment with the data that was sent and avoids confusion when comparing information against chart data.

## Enabling conversion

To enable currency conversion, you must send the `$currency` property as a 3-character [ISO 4217](https://www.iban.com/currency-codes) code such as USD, EUR, and so forth alongside your revenue-related data. 

## OOTB Derived properties

Amplitude provides two out-of-the-box (OOTB) derived properties that let you view currency-converted data. These OOTB derived properties are:

- Currency Converted Revenue
- Currency Converted Price

These derived properties are only applicable to events containing both `$currency` and either `$revenue` or `$price` fields. 

You can find these properties by going to *Data > Properties > Derived*. They appear as read-only fields and you can use them for filtering, grouping, and aggregations. 

### Currency Converted Revenue

Converts the `$revenue` field into the project's target currency using the `$currency` field as the original currency code in which the `$revenue` was received.

```typescript
CURRENCY_CONVERT(PROPERTY("$currency", "event"), PROPERTY("$revenue", "event"))
```
### Currency Converted Price

Converts the `$price` field into the project's target currency using the `$currency` field as the original currency code in which the `$price` was received. 

```typescript
CURRENCY_CONVERT(PROPERTY('$currency', 'event'), PROPERTY('$price', 'event'))
```

## Custom derived properties

If you are using `$Cart Properties` or if you don't use `$revenue`, `$price`, or `$currency`, custom derived properties can be created to apply currency conversion. This requires project-level currency configuration. 

For example:
Adding a derived property to currency convert the custom `$revenue` or `$currency` field.

```typescript
CURRENCY_CONVERT(PROPERTY("_currency_", "event"), PROPERTY("_revenue_", "event"))
```

And then adding the derived property to currency convert cart properties.

```typescript
CURRENCY_CONVERT(PROPERTY("_currency_", "event"),PROPERTY("products.revenue", "event"))
```

## Project Settings

The target currency to which derived property revenue fields are converted can be configured in the project settings.

##### To configure currencies

1. Open your project and then go to *Organization Setting > Projects > General*.
2. Select the currency you want from the **Which currency should your be converted to?** dropdown menu.
All options are in standard ISO 4217 3-digit format.

## Property selectors

Both OOTB and custom derived properties can be selected when you are [building charts.](/docs/get-started/create-a-chart). 

##### To select currency conversion properties in a chart

1. Go to an existing chart or go to *Create > chart* to create a new one.
2. In the Events modal, select **Any Active Event** and then click **Select property**.
3. In the search field, look for **Derived Properties**. 
4. Select the properties you want. You can select any of:
    - Currency Converted Revenue
    - Currency Converted Price
    - Custom derived properties

## Currency Converted Revenue in charts

When viewing the chart, both the original revenue value and the currency-converted value are available.