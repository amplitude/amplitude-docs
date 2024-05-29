---
id: 7a1768f9-816c-45ee-a844-f75858b2ad18
blueprint: revenue-ltv
title: "The Revenue LTV chart: Track how well you're monetizing new users"
source: 'https://help.amplitude.com/hc/en-us/articles/230680867-The-Revenue-LTV-chart-Track-how-well-you-re-monetizing-new-users'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717017015
---
Successfully acquiring, engaging, and retaining new users won't help your company grow if you can't monetize them. 

With Amplitude's **Revenue Long-Term Value (LTV)** chart, you can:

* See how well your organization is monetizing new users, using common, relevant, easy-to-understand revenue metrics.
* Analyze new-user monetization with a time horizon of as much as twelve months into the past.
* See how quickly and effectively segments of new users are transitioning to paying users.
* Set benchmarks and goals for new user monetization going forward.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

First and foremost, events will not appear in any Amplitude charts until instrumentation is complete, so make sure you've got that done. You'll definitely want to read our article on [building charts in Amplitude](/get-started/helpful-definitions).

Also, check out the [tracking revenue](/cdp/sources/instrument-track-revenue) documentation to learn how to track revenue events. For example, if you're using [Amplitude's SDKs](https://www.docs.developers.amplitude.com/data/sdks/sdk-quickstart/), you will have to call `logRevenueV2()` in conjunction with the provided revenue interface. If you're tracking in-app purchases (IAPs), we recommend using Amplitude's revenue authentication system.  

{{partial:admonition type='note'}}
Amplitude does not currently support currency conversion. The revenue value you send Amplitude is what will be aggregated and displayed. If you get revenue in different currencies, we recommend normalizing to a single currency before you send any revenue data to Amplitude.
{{/partial:admonition}}

## Set up a Revenue LTV chart

Like most other Amplitude charts, the Revenue LTV chart has an Events Module. In most cases, you'll want to use `![amplitude_logo.png](/output/img/revenue-ltv/amplitude-logo-png.png) Any Revenue Event` here. This lets you analyze the data sent by Amplitude's SDK when it logs revenue events. 

However, you can also choose to calculate revenue based on other events. You can segment on the event itself by adding properties to it in the Events Module.

To build a Revenue LTV chart, follow these steps:

1. Select your revenue event and the event property that contains the revenue information, if one exists. If you are using `![amplitude_logo.png](/output/img/revenue-ltv/amplitude-logo-png.png) Any Revenue Event`, you should select `$revenue`. If you are using your own custom revenue event, you can select your own custom revenue property.  
  
{{partial:admonition type='note'}}
You do not have to use a revenue property here, though that is the most common use case of the Revenue LTV chart.
{{/partial:admonition}}

2. Add properties to the revenue event by clicking on *+ where*, selecting the property name, and specifying the property value you’re interested in. You can add as many properties as you like, though you'll have to add them one at a time.  
  
	![revenue_LTV_basic_screenshot.png](/output/img/revenue-ltv/revenue-ltv-basic-screenshot-png.png)  
		
	{{partial:admonition type='note'}}
	These properties must be explicitly sent **by you** via Amplitude's SDKs when you log revenue events.  
	{{/partial:admonition}}

	If you are using `![amplitude_logo.png](/output/img/revenue-ltv/amplitude-logo-png.png) Any Revenue Event`, you can filter on one of five event properties to filter on, all prefixed with a `$`:  

	* **$price**: The price of the products purchased
	* **$productId**: A product-specific identifier for each item purchased
	* **$quantity**: The quantity of products purchased
	* **$revenueType**: The revenue category—common values include income, tax, refund, etc.
	* **$eventProperties**: An object of event properties to include in the revenue event

3. In the Segmentation Module, identify the user segment you want to include in this analysis. You can import a previously-saved segment by clicking *Saved Segments* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis will target all users.

4. If you do not want to import a previously-saved user segment, you can start building your own by adding properties. To do so, click *+ where*, choose the property you want to include, and specify the property value you’re interested in.

5. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ perform*, then choose the event you’re interested in.

6. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 3 and 4.

7. Choose the measure you'd like to use for this analysis.  
  
	![revenue_LTV_screenshot_2.png](/output/img/revenue-ltv/revenue-ltv-screenshot-2-png.png)  
	
	* **Total Revenue**: This shows the total revenue received during the timeframe of your analysis. Specifically, it's the sum of all total revenue from all new users, beginning the day they sent their first Amplitude event. You can break this out on an hourly, daily, weekly, monthly, or quarterly frequency, which we'll get to in the next step of this process.
	* **New Paying Users**: This shows the number of users who triggered a revenue event for the first time during the specified hour/day/week/month after their cohort's start date.
	* **ARPU**: Short for average revenue per user, this is a new user cohort's **cumulative** total revenue as of the hour/day/week/month you're looking at, divided by the number of users in the cohort.
	* **ARPPU**: This is the same as ARPU, except it considers **paying users only**. A paying user is a user who's ever triggered a revenue event, even if their first revenue event occurs **after** the specific data point you're looking at. For example, if a user first purchases something on the fifth day after they began using your product, they will still be considered a paying user when calculating ARPU over their first four days.

	{{partial:admonition type='note'}}
	Each of these metrics only looks at users who were **new to Amplitude** during the timeframe of your analysis. However, they do not have to have triggered a revenue event to be included, except for ARPPU.
	{{/partial:admonition}}

8. Use the date picker to set the frequency breakdown and timeframe of your analysis.

## Next steps

Next, learn how to [interpret your revenue analysis](/analytics/charts/revenue-ltv/revenue-ltv-interpret).