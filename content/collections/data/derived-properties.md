---
id: 66b1d5fc-c05b-4418-9cff-0be3286e437f
blueprint: data
title: 'Derived properties'
source: 'https://help.amplitude.com/hc/en-us/articles/5874857623707-Derived-properties'
this_article_will_help_you:
  - 'Understand how derived properties can benefit your analysis'
  - 'Review the functions and operators that can be used when creating your derived properties'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1718646395
---
In some cases, you may want to run analyses based on properties that were not sent to Amplitude but can be derived from existing properties. Amplitude Data’s **derived properties** allow you to create new event and user properties retroactively, based on functions and operators that you can apply across multiple existing properties. These do not affect your raw data and will be computed on the fly.

For example, you may want to create a chart that groups by whether an item added to a shopping cart is eligible for a discount. In that case, you could create a derived property whose value is a boolean based on whether the price exceeds a certain amount.

![Screen_Shot_2021-08-03_at_2.35.25_PM.png](/docs/output/img/data/screen-shot-2021-08-03-at-2-35-25-pm-png.png)

### Feature availability

This feature is available to users on **Enterprise plans only**. See our pricing page (https://amplitude.com/pricing) for more details.

## Create a derived property

{{partial:admonition type="note" heading=""}}
You must be in your project's `main` branch to create a derived property.
{{/partial:admonition}}

To create a derived property, follow these steps:

1. In Amplitude Data, navigate to *Tracking Plan—>Properties* and click the *Derived Properties* tab.
2. Click *+ Add Derived Property*.
3. Give your derived property a name.
4. Add any relevant metadata to your property, including a description (optional, unless you want to use the Suggest feature) and the visibility of the property in charts within this project.
5. Enter your formula. See below for the list of valid functions and operators.
6. Click *Save*.

## Preview your results

As long as the formula you entered is valid, you can test the results in the space below the formula editor. Do this by selecting existing values for properties used in the formula, or test out any free-form values. You can do this from either the *Create/Edit* modal or from the side panel for a saved derived property.

![Screen_Shot_2021-08-03_at_12.46.09_PM.png](/docs/output/img/data/screen-shot-2021-08-03-at-12-46-09-pm-png.png)

## Derived property use cases

Taking our previous referrer URL example, you can write a formula using string operators that looks like this:

`SPLIT(PROPERTY('referrer\_url','event'), "/", 2)`

This formula will convert a value like "https://www.google.com/search?q=amplitude" into the value "www.google.com." But what if you want to strip this down even further, to just "google"? You can achieve this by wrapping the result of a SPLIT function inside another SPLIT function. The resulting formula would look like this:

`SPLIT(SPLIT(PROPERTY('referrer\_url','event'), "/", 2), ".", 1)`

Amplitude also supports math operators. Let’s say you have events that contain subtotal and tip properties, and you want to run some analyses based on the total amount. You can use this formula:

`SUM(PROPERTY('subtotal','event'), PROPERTY('tip','event'))`

Maybe you're also interested in knowing how many orders you would have given discounts to if the total order size was over $50. This formula will tell you whether a particular order would receive a discount:

`IF(SUM(PROPERTY('subtotal','event'), PROPERTY('tip','event')) >= 50, 'true')`

{{partial:admonition type="note" heading=""}}
Queries using derived properties may experience longer query times depending on the complexity of the formulas. There is also a limit of up to 10 property references per derived property.
{{/partial:admonition}}

## Functions and operators

### String functions

| **Function** | **Description** | **Example** | **Result** |
| --- | --- | --- | --- |
| REGEXEXTRACT (text\_property, regular\_expression) | Extracts substrings matching the regular\_expression | REGEXEXTRACT("shirt-150", "[0-9]+") | "150" |
| REGEXREPLACE (text\_property, regular\_expression, replacement\_text) | Replaces the property's values with text matching the regular\_expression with replacement\_text | REGEXREPLACE("en-US", "-.\*", "") | "en" |
| CONCAT(property1, property2) | Concatenates a property with another property or text value. | CONCAT("firstName", "lastName") | "firstName lastName" |
| LOWERCASE (text\_property) | Lowercases all characters in property's values | LOWERCASE("John") | "john" |
| UPPERCASE (text\_property) | Uppercases all characters in property's values | UPPERCASE("John") | "JOHN" |
| SPLIT (property, separator, [index]) | Split a property based on a delimiter and return an array of split elements.  Takes an optional index that returns the element at that index. | SPLIT("a\_b\_c", "\_") <br/>SPLIT("john@example.com", "@", 0)  | ["a", "b", "c"] <br />"john" |
| REMOVE (property, text) | Remove all occurrence of text in property | REMOVE("en-US", "en-") |   |
| EXTRACT\_FROM\_DICT (property, text) | Extract a value from a dictionary string based on a specific key | EXTRACT\_FROM\_DICT("{'id': 1, 'name': 'John', 'country': 'US'}", "name") | "John" |

### Math functions

| **Function** | **Description** | **Example** | **Result** |
| --- | --- | --- | --- |
| SUM(num\_property1, num\_property2) or ADDITION( | Adds a property with other properties or with numbers. Equivalent to the `+` operator | SUM(subtotal, tip) >>>  SUM(10, 2) | 12 |
| MINUS(num\_property1, num\_property2) or SUBTRACT( | Subtracts a property with other properties or with numbers. Equivalent to the `-` operator. | MINUS(total, tip) >>> MINUS(12, 2) | 10 |
| MULTIPLY (num\_property1, num\_property2) | Multiplies a property with other properties and/or with numbers. Equivalent to the `\*` operator. | MULTIPLY(price, quantity) >>> MULTIPLY(2.50, 4) | 10 |
| DIVIDE(numerator, denominator) | Divides a property by another property or number. Equivalent to the `/` operator. | DIVIDE(calorie\_intake, calorie\_goal) >>> DIVID(1000, 2000) | 0.5 |
| POWER(num\_property, exponent) | Takes the property's values to the exponent power | POWER(property, 3) >>> POWER(2, 3) | 8 |
| MIN(num\_property1, num\_property\_2) | Returns the minimum value between two numbers. | MIN(5, 10) | 5 |
| MAX(num\_property1, num\_property\_2) | Returns the maximum value between two numbers. | MAX(5, 10) | 10 |
| CEIL(num\_property) | Rounds up to the nearest integer. | CEIL(3.8) | 4.0 |
| FLOOR(num\_property) | Rounds down to the nearest integer. | FLOOR(3.8) | 3.0 |

### Object functions

| **Function** | **Description** | **Example** | **Result** |
| --- | --- | --- | --- |
| EXTRACT\_FROM\_DICT (property, text) | Extract a value from a dictionary string based on a specific key | EXTRACT\_FROM\_DICT("{'id': 1, 'name': 'John', 'country': 'US'}", "name") | "John" |

### Date/ time functions

Amplitude requires all Unix timestamps to be expressed in milliseconds.

| **Function** | **Description** | **Example** | **Result** |
| --- | --- | --- | --- |
| DATE\_TO\_LONG (date\_property) | Convert date into unix timestamp | DATE\_TO\_LONG("2020-12-01") | 1606780800000 |
| TIME\_TO\_LONG (time\_property) | Convert date time (YYYY-MM-dd[T]HH:mm:ss) into unix timestamp | TIME\_TO\_LONG("2020-12-01 12:00:00") | 1606780800000 |
| LONG\_TO\_TIME (number\_property) | Convert unix timestamp into date-time | LONG\_TO\_TIME (1606780800000) | "2020-12-01 12:00:00" |
| LONG\_TO\_DATE (number\_property) | Convert unix timestamp into date | LONG\_TO\_DATE (1606780800000) | "2020-12-01" |
| DATE\_TIME\_FORMATTER (datetime\_property, old\_format, new\_format) | Convert format of a datetime property to a new format. See [Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) for more details. | DATE\_TIME\_FORMATTER ("05.01.2021 12:00:00:000", "MM.dd.yyyy hh:mm:ss:SSS", "yyyy/MM/dd") | "2021/05/01" |
| TODAY() | Current day represented as a long in epoch time in UTC. | TODAY() - start\_date\_in\_ms >>> 1609459200000 - 1577836800000  | 31622400000 |
| EVENT\_HOUR\_OF\_DAY() | Get hour of day from the event's timestamp. (0-23) | EVENT\_HOUR\_OF\_DAY()  | 10 |
| EVENT\_DAY\_OF\_WEEK() | Get day of week from the event's timestamp as string. i.e. Monday | EVENT\_DAY\_OF\_WEEK() | Monday |

### Array functions

When performing computations on derived properties created from array properties, Amplitude assumes that only the first child is an array property, and only considers the first value of the other children, even if they are also array properties.  

Here are some illustrative examples:

```
Example 1  
 propA = [1,2,3], propB = [a,b,c]  
 CONCAT(propA, propB) = [1a, 2a, 3a]  
Example 2  
 propA = [1, 2, 3], propB = [a]  
 CONCAT(propA, propB) = [1a, 2a, 3a]  
Example 3  
 propA = [1], propB = [a, b, c]  
 CONCAT(propA, propB) = [1a]
```

| **Function** | **Description** | **Example** | **Result** |
| --- | --- | --- | --- |
| ITEM\_COUNT (property) | Length of array property; defaults to 1 for non-arrayed properties | ITEM\_COUNT(products) | 3 |
| GREATEST(property) | Get max value of the array | GREATEST(prices) | 10 |
| LEAST(property) | Get min value of the array | LEAST(prices) | 2 |
| COALESCE(property) | Get the first non-null value of the array | COALESCE(locations\) | 'California' |

### Property functions

When you select a property from the *Insert Property* dropdown, Amplitude Data will insert a property function referencing it directly into the editor for you. You can also manually insert this function wherever you want to reference a different Amplitude property.

These functions can only be used within another function.

| Function | Description | Example  | Result |
| --- | --- | --- | --- |
| PROPERTY(property\_name, property\_type) | Reference to property within Amplitude. Possible property types: “user”, “event”, “derived”, “lookup”, “group” | PROPERTY(“first name”,”user”) | A reference to the user property “first name” in your project. This is how derived properties communicate with Amplitude’s query service. |
| PROPERTY(property\_name, “group”, group\_type) | Reference to group property within Amplitude. Group type is required for group properties. | PROPERTY(“name”,”group”, “business“) | A reference to the group property “name” in the group type “business” within your project. This is how derived properties communicate with Amplitude’s query service. |

### Conditional operators

| **Operator** | **Description** | **Example** |
| --- | --- | --- |
| IF(logical\_expression, value\_if\_true, value\_if\_false) | Returns value\_if\_true if logical\_expression is true, otherwise return value\_if\_false | IF(property == "(none)", "Property was not set", "Property was set")|
| AND(logical\_expression\_1, logical\_expression\_2) | Returns True if both logical expressions are true, false otherwise | AND(is\_subscribed == "true", has\_valid\_promo == "true") |
| OR(logical\_expression\_1, logical\_expression\_2) | Returns True if any logical expression is true, false otherwise | OR(has\_email == "true", has\_phone == "true") |
| SWITCH(expression, case\_1, value\_1, [case\_2, value\_2 ...], [default]) | Evaluates an expression and returns values based on defined cases.  Returns a default value if no cases are met if defined, otherwise null. | SWITCH(tier, "gold", 2, "silver", 2, "bronze", 1, 0) |

### String/numerical operators

| **Operator** | **Example** |
| --- | --- |
| == | action == “purchase” |
| != | item\_count != 0 |
| contains | email contains “@gmail.com” |
| does not contain | title does not contain “officer” |
| <, <=, >, >= | duration >= 60 |
| glob match | url glob match “https://www.google.\*/\*” |
| glob does not match | query glob does not match “\*/query=\*“ |
| has prefix | title has prefix “sir” |

### Set operators

Set literals (e.g. ("apple", "orange")) must appear on the right hand side of the operator.

| **Operator** | **Example** |
| --- | --- |
| == | IF(product == (“apple”,“orange”), "true", "false")<br />*product = “apple”, Returns "true"* |
| != | IF(product != (“apple”,“orange”), "true", "false") <br />*product = “banana”, Returns "true"* |

## Common derived properties formulas

This section provides a description of several common use cases for derived properties formulas.
###Calculate the age of a customer

```
CEIL(
DIVIDE(
MINUS(
PROPERTY('server_upload_time', 'amplitude_user'),
TIME_TO_LONG(PROPERTY('Created At', 'user'))
),
86400000
)
)
```
Use this when tracking a user property with a date-time data type, and you want to calculate the age of that user (in other words, how long that user has existed in your system) since the time of the event that triggered when this user property was set.

### Get the difference between two dates

```
DIVIDE(  
  SUBTRACTION(  
  DATE\_TO\_LONG(  
  PROPERTY(  
  'Subscription Start Date', 'user'  
  )  
  ),  
  DATE\_TO\_LONG(  
  PROPERTY(  
  'Subscription End Date', 'user'  
  )  
  )  
  ),  
  86400000   
)
```

Sample output:

![Date Diff.png](/docs/output/img/data/date-diff-png.png)

In the derived property above, the properties end\_date and start\_date are converted into UNIX timestamps, so that Amplitude can calculate the difference between them. That result is then divided by 86400000, which is the number of milliseconds in one day.

{{partial:admonition type="note" heading=""}}
This output will be a double type (for example. 2.0).
{{/partial:admonition}}

### Output a standardized date format

```
IF(  
DATE_TIME_FORMATTER(  
PROPERTY(  
'publishDate',  
'event'  
),  
"yyyy-MM-dd'T'HH:mm:ssX",  
'yyyy-MM-dd'  
) contains '-',  
DATE_TIME_FORMATTER(  
PROPERTY(  
'publishDate',  
'event'  
),  
"yyyy-MM-dd'T'HH:mm:ssX",  
'yyyy-MM-dd'  
),  
IF(  
DATE_TIME_FORMATTER(  
PROPERTY(  
'publishDate',  
'event'  
),  
"yyyy-MM-dd HH:mm:ss",  
'yyyy-MM-dd'  
) contains '-',  
DATE_TIME_FORMATTER(  
PROPERTY(  
'publishDate',  
'event'  
),  
"yyyy-MM-dd HH:mm:ss",  
'yyyy-MM-dd'  
),  
DATE_TIME_FORMATTER(  
PROPERTY(  
'publishDate',  
'event'  
),  
"yyyy-MM-dd",  
'yyyy-MM-dd'  
)  
)  
)IF(DATE_TIME_FORMATTER(  
 $60 ,  
 "yyyy-MM-dd'T'HH:mm:ssX",  
 'yyyy-MM-dd'  
) contains '-', DATE_TIME_FORMATTER(  
 $61  ,  
 "yyyy-MM-dd'T'HH:mm:ssX",  
 'yyyy-MM-dd'  
), IF(DATE_TIME_FORMATTER(  
 $72 ,  
 "yyyy-MM-dd HH:mm:ss",  
 'yyyy-MM-dd'  
) contains '-', DATE_TIME_FORMATTER(  
 $73 ,  
 "yyyy-MM-dd HH:mm:ss",  
 'yyyy-MM-dd'  
), DATE_TIME_FORMATTER(  
 $76 ,  
 "yyyy-MM-dd",  
 'yyyy-MM-dd'  
)))
```

Sample output:

![Date Formatter.png](/docs/output/img/data/date-formatter-png.png)

One way to format dates to Standard Date Format is to use a series of IF statements. Make sure the higher specificity conditional comes first. Replace the `$<number>` here with the actual properties.

### Get the month and year a customer signed up

```
CONCAT(  
REGEXEXTRACT(  
PROPERTY(  
'Subscription Start Date',  
'user'  
),  
'\d\d\d\d\-\d\d'  
),  
"-01"  
)
```

Sample output:

### Screenshot 2023-08-25 at 4.38.47 PM.png

In this example, the derived property will pull the sign-up month and year from a property that contains a more detailed value, and append the "-01" to set it to the beginning of the month. Use the `REGEXEXTRACT()` to pull the year and month from the value, and use `CONCAT()` to append the "-01". Replace the `$<number>` here with the actual properties.

### Replace existing property values

```
IF(
    OR(
        REGEXEXTRACT(
            PROPERTY(
                "package",
                "event"
                ),
            'Casual'
        ) =='Casual',
        REGEXEXTRACT(
            PROPERTY(
                "package",
                "event"
            ),
            '1 Job Posting'
        )=='1 Job Posting',
        REGEXEXTRACT(
            PROPERTY(
                "package",
                "event"
            ),
            '1 Basic'
        )=='1 Basic'
    ),
    'Casual',
    'False'
)
```

Sample output:

![Screen Shot 2023-01-19 at 3.23.29 PM.png](/docs/output/img/data/screen-shot-2023-01-19-at-3-23-29-pm-png.png)

To replace multiple property values, use `REGEXEXTRACT()` to pull the string in the property, and use OR statements inside an IF statement to see if the value pulled from the properties contains any of the values you wish to replace. In this example, if the property value matches any of the values specified, it will replace the value with `Casual`. Otherwise, it will replace the property with `False`. Replace the `$<number>` here with the actual properties.

### Count length of an array that was accidentally ingested as a string

Convert the string to an array format by using SPLIT:

```
SPLIT(  
PROPERTY('color', 'event'),  
','  
)
```

Sample output:

![Screenshot 2023-09-28 at 14.39.54.png](/docs/output/img/data/screenshot-2023-09-28-at-14-39-54-png.png)

The property color was ingested as a string into Amplitude "Red, Green, Blue". After using SPLIT, the resulting value will be `[Red, Green, Blue]`.

Use the above derived property within a new derived property that uses `ITEM_COUNT`.

```
ITEM_COUNT(  
PROPERTY("Transform into Array", "derived")  
)
```

Sample output:

![Screenshot 2023-09-28 at 14.42.30.png](/docs/output/img/data/screenshot-2023-09-28-at-14-42-30-png.png)

Now the underlying data being used is an array. `ITEM_COUNT` will count the number of items that make up the array.