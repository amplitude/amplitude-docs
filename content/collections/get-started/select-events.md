---
id: 669876e4-a2ae-44d5-bfb2-5def51504a25
blueprint: get-started
title: 'What events will you need?'
source: 'https://help.amplitude.com/hc/en-us/articles/16800098709275-What-events-will-you-need-'
landing: true
landing_blurb: 'Events and properties are the backbone of every analysis in Amplitude.'
this_article_will_help_you:
  - 'Identify promising events to track in Amplitude, based on your specific industry'
  - "Learn more about Amplitude's industry-specific guides"
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716572509
---
Events and properties are the backbone of every analysis in Amplitude. [Deciding which ones to track](/data/create-tracking-plan) can be daunting, especially if you're new to product analytics.

## How many events should you track?

Often, we see new customers try to track most—or even all—of the actions a user could possibly take in their product. **Resist this urge**. Though it feels logical to say that more data will lead to more insights, it usually doesn't work out that way. Too much data actually **obscures** insights, burying them under an avalanche of events and properties you don't really need to know about.

The real answer to the question of how many events you should track depends entirely on the complexity of your product. If your app has a more focused feature set, you might only need to track 20 events or so; if your product is feature-rich, on the other hand, 200 might be more appropriate.

Finding the right number will require you to really think about **what kinds of insights** you're hoping to find via Amplitude. What are the questions you'd like Amplitude to help you answer in the next quarter? The next two quarters? Identify those, and choose the events that will lead you where you want to go.

## What events should you track?

No matter what, you should be tracking **any actions** that fit into these three categories:

* Those that are important in completing a process within your product, like completing a tutorial or signup process
* Those that guide a user through the main mechanics of your product
* Those that enable a user to make an in-app purchase

When you've decided which events to track, you'll be ready to [plan your events](/data/data-planning-playbook) takes a deep dive into this question, so be sure to read that as well.

## Common events and properties to track by industry

This section offers some advice, broken down by industry, about which events and properties to track if you're interested in answering the questions most commonly asked by others in your industry. This is not a comprehensive list of everything you'll need, but are instead suggestions you should keep in mind as you create your [taxonomy](/data/create-tracking-plan). 

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| How many page views do we get? | Event Segmentation |
| How many sessions were there? | User Sessions |
| How long do users stay in session? | User Sessions |
| How much content does a user consume? | Event Segmentation |
| Which content has changed MoM? | Data Table |
| How many new users retain each week? | Retention Analysis |
| What content do users view? | Data Table |
| Where are our users? | Event Segmentation |
| What device families do our users use? | Event Segmentation |
| What platforms do our users use? | Event Segmentation |
| When are unique visitors coming to my site? | Data Table |
| What percentage of users convert? | Funnel Analysis |
| Is conversion improving or worsening? | Event Segmentation |
| How well do my channels convert? | Data Table |
| How many goals are users completing? | Data Table |
| What content represents the largest percentage of all page views? | Event Segmentation |

**Required events and properties:**

* Event: `Page View` 
	* Properties: `url`, `channel`, `[Amplitude] Event hour of the day`
* Your conversion event
* `[Amplitude] New User`
* `[Amplitude] Any Active Event`

### Ecommerce

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| What are the top referrers or sources for our users? | Event Segmentation or Data Table |
| Which referrers have the highest purchase conversion? | Funnel Analysis |
| How many items are viewed per session? | User Sessions |
| What are the most popular items viewed? | Event Segmentation |
| What are the most popular items purchased? | Event Segmentation |
| What percentage of users complete an order after they view an item? | Funnel Analysis |
| How long does it take a user to complete an order? | Funnel Analysis |
| How many purchases are made weekly?  | Event Segmentation |
| What is the total revenue in a given day/week/month?  | Event Segmentation |
| What is the lifetime value of my users? | Revenue LTV |

**Required ecommerce events and properties:**

* Event: `Page View` 
	* Property: `utm_source`
* Event: `View Item` 
	* Property: `product_id`

### B2B / SaaS

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| How many daily active businesses do we have? | Event Segmentation |
| How many daily active users do we have? | Event Segmentation |
| What are the top engaged user roles?  | Event Segmentation |
| What percent of businesses start a trial and convert to paying customers?  | Funnel Analysis |
| What percent of businesses on a trial perform [key event]?  | Event Segmentation |
| How many users sign up per week?  | Event Segmentation |
| How long does it take for a new user to perform [key event]?  | Funnel Analysis |
| What % of daily active users perform [key event]?  | Event Segmentation |
| How frequently do users perform [key event]?  | Event Segmentation |
| What are the most popular paths users take when they log in? | Pathfinder |

**Required B2B / SaaS events and properties:**

* Group type: `Business`
* User property: `role = eng`, `design`, etc
* User property: `Paying = true/false`
* Event: `Trial Started`
* Event: `Trial Canceled`
* Event: `Account Signed Up`
* Event: `Account Logged In`
* Your organization's own `[key event]`

### Finance

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| How many users sign up per week? | Event Segmentation |
| Which marketing channels have the most conversion to sign-ups?  | Funnel Analysis |
| What percentage of users who sign up then connect their bank?  | Funnel Analysis |
| What percentage of users have automatic transfers set up?  | Event Segmentation |
| What is the monthly retention of users who come back to submit money transfers?  | Retention |
| What is the conversion of users who connect a bank and make three money transfers?  | Funnel Analysis |
| How frequently do users submit money transfers? | Event Segmentation |

**Required finance events and properties:**

* User property: `utm_source`
* Event: `Account Signed Up`
* Event: `Bank Connected (bank name)`
* Event: `Automatic Transfer Created`
* Event: `Transfer Submitted (transfer amount)`

### Media

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| How many users sign up per week?  | Event Segmentation |
| What percent of users start a free trial and then purchase a subscription?  | Funnel Analysis |
| On what day within the trial do free-trial users usually cancel their trial?  | Event Segmentation |
| What percent of users view content on phone vs tablet vs desktop?  | User Composition |
| What is the average count of content viewed during a trial?  | Event Segmentation |
| What percentage of users perform a search and then view content?  | Funnel Analysis |
| What is the average count of content viewed per user per day?  | Event Segmentation |
| What is the percentage of content viewed per genre?  | Event Segmentation |
| What is the average session length per user? | User Sessions |

**Required media events and properties:**

* User property: `Active Trial = true/false`
* User property: `Device Category = phone, tablet, desktop`
* Event: `Account Signed Up`
* Event: `Trial Started`
* Event: `Trial Canceled`
* Event: `Subscription Purchased`
* Event: `Search Performed`
* Event: `Content Viewed (genre property = comedy, romance, etc)`

### Healthcare

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| How many users sign up per week?  | Event Segmentation |
| What percentage of weekly active users schedule an appointment?  | Event Segmentation |
| What percentage of users perform a search and then schedule an appointment?  | Funnel Analysis |
| How many users rate their visit after scheduling an appointment?  | Funnel Analysis |
| What is the average appointment rating provided by users?  | Event Segmentation |
| Of users who have booked an appointment, which regions are they from? | User Composition |

**Required healthcare events and properties:**

* User property: `Region`
* Event: `Account Signed Up`
* Event: `Search Performed`
* Event: `Appointment Scheduled`
* Event: `Appointment Rated (rating = 1, 2, 3, 4, 5)`

### Gaming

|  |  |
| --- | --- |
| **Typical questions** | **Charts that answer them** |
| How many users install the app per day?  | Event Segmentation |
| How many users start a level per day?  | Event Segmentation |
| What percentage of users complete a level per day?  | Funnel Analysis |
| Which level do users fail the most?  | Event Segmentation |
| What percentage of users who have played a game make a purchase?  | Funnel Analysis |
| What is the average session count of users per day?  | User Sessions |
| What is the average session length of users who start a level?  | User Sessions |
| What is the lifetime value of users? | Revenue |

**Required gaming events and properties:**

* User Property: `Region`
* Event: `App Installed`
* Event: `Level Started (level = integer)`
* Event: `Level Completed (level = integer)`
* Event: `Level Failed (level = integer)`
* Event: `Purchase Completed (revenue)`

## Industry-specific guides

Amplitude also offers **industry-specific best practices guides** that are intended to help you implement and start getting insights quickly. With the goal of driving tangible conversion, retention, and product outcomes, these guides provide you with **recommended use cases and business questions**, a **proposed taxonomy**, and an **example dashboard** that can be used for your own implementation, all carefully tailored to meet the specific needs of your industry.

We currently offer guides for companies in the [e-commerce](https://analytics.amplitude.com/share/8f32b20708e743e597b75c99b7a766d5), [fintech](https://analytics.amplitude.com/share/cbb3827995aa4d03852a3cdf9a3c46b0), [print media](https://analytics.amplitude.com/share/5940753342e04394bd0379cdd952cc18), and [streaming media](https://analytics.amplitude.com/share/6f40a915c14144b8ac992a5a8d7cf7cb) sectors, with more on the way.