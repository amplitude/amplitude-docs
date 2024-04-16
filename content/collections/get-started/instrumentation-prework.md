---
id: 5243dcbb-02c5-4ffb-a32b-8c3e50b2b121
blueprint: get-started
title: 'Instrumentation pre-work'
source: 'https://help.amplitude.com/hc/en-us/articles/206404618-Instrumentation-pre-work'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713287181
this_article_will_help_you:
  - 'Determine how best to instrument Amplitude based off of your business goals'
---
So much of your overall Amplitude experience will be determined by the decisions you make during the instrumentation process. To lay the foundation for a successful instrumentation, there are a few things you'll need to do.

## Define your business goals

This is critical to getting the most out of Amplitude. The more you know about your business goals—and the better you are able to articulate them—the more Amplitude will be able to help you achieve them.

So start by identifying—as specifically as possible—your business goals. What aspects of your product do you want to better understand or improve? For example, your goals for this quarter might be improving user acquisition, user retention, and paying user conversion. Once you've identified your goals, think about what data or events you'll need to reach them.

## Understand how users are identified and tracked in Amplitude

If you're not properly tracking your users, you will not get what you need from Amplitude. It's as simple as that. So be sure to **read and understand** our Help Center article on [how Amplitude identifies and tracks unique users](/cdp/sources/instrument-track-unique-users) before you get started with instrumentation.

## Organize events and related properties

Consider making a spreadsheet listing each event and its associated properties. It might look something like this:  

![Screen_Shot_2017-03-20_at_9.34.15_AM.png](/output/img/get-started/Screen_Shot_2017-03-20_at_9.34.15_AM.png)  

**Event names should be clear and intuitive**. If your organization doesn't have a standard naming scheme, we recommend naming your events using the following syntax:  
  
verb + noun (`clicked signup` ) or noun + verb (`signup clicked` ).  
  
Check out our [Data Taxonomy Playbook](/data/data-planning-playbook) for best practices regarding your event taxonomy. Download the above template as an [Excel](https://drive.google.com/file/d/1dIiJrLJXdVNBh6VQ4bcII0THNyEkaooO/view) or [Google Sheets](https://docs.google.com/spreadsheets/d/1-6rXRomzq05YDQ9A6QG9A2i-jez72amPw-Johhd-heQ/view) spreadsheet.  

### Resist the urge to track everything immediately

It's common for new Amplitude users to assume that by tracking as much data as possible, they'll generate more insights more quickly. However, the opposite is often true: too **much** data can obscure the answers you're looking for just as easily as too **little** data.  
  
Instead, track only the events that are essential to answering the business goals defined in the previous section. Your team will have an easier time understanding and using the data Amplitude sends you. Customers often tell us that the most difficult thing to teach new hires is not the Amplitude platform itself, but is instead what the event data means and how it's generated.   
  
We recommend that each event have no more than 20 properties. (This also applies to user properties.) If you eventually find it necessary, you can always add more events and properties later on.

## Consider instrumenting a cross-platform project

We recommend combining web and mobile data into the same project if your product is similar across all platforms and the taxonomy is consistent. This will allow you to analyze how users move between different platforms. Different products with distinct taxonomies should be instrumented in separate projects. [Evaluate here the pros and cons of combining Android and iOS data or multiple apps to the same Amplitude project](/get-started/cross-platform-vs-separate-platform). 

## Next steps

If you still have questions, read the [Help Center article on instrumentation FAQs](/get-started/create-project) and [get data into Amplitude.](/get-started/get-data-in)