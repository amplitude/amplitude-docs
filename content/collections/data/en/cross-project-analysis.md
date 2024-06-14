---
id: 6389c912-154c-42fe-afea-07db4a295404
blueprint: data
title: 'Cross-project analysis in Amplitude Data'
source: 'https://help.amplitude.com/hc/en-us/articles/14909802992283-Cross-project-analysis-in-Amplitude-Data'
this_article_will_help_you:
  - 'Create or import a data portfolio to analyze data from multiple source projects at once'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717622895
---
Amplitude Data's **portfolio** feature lets you create cross-product analyses by combining multiple source projects into a single view. 

With this feature, you can create portfolios in Analytics and build charts using data aggregated across all the source projects in your portfolio. To learn more, see our Help Center article on [conducting cross-project analyses in Amplitude Analytics.](/docs/admin/account-management/portfolio)

The behavior of portfolios managed in Amplitude Data is different from legacy portfolios once managed in the Govern section of Amplitude Analytics. For one thing, legacy portfolios did not enable users to prioritize source projects, or to show event or property metadata from the source projects in the portfolio by default.

This article covers portfolios that are only editable from within Amplitude Data product*.* Both Analytics- and Data-managed portfolios return the same aggregated data when queried through charts.

## Create a portfolio

To create a portfolio in Amplitude Data, follow these steps:

1. From the project selector in Amplitude Data, click *+Create new Portfolio*.  
  
    ![create a portfolio](statamic://asset::help_center_conversions::data/portfolio1.png)

2. In the modal that appears, name your portfolio and select the projects in Amplitude Analytics that it will draw from. When you're done, click *Next*.  
  
    ![portfolio_in_amplitude_data_2.png](/docs/output/img/data/portfolio-in-amplitude-data-2-png.png)

3. Next, you must **prioritize the schemas** of the source projects you included. This is required in case Amplitude Data encounters conflicts or differences in the schemas. The order in which you prioritize them will determine which schemas Amplitude Data regards as the **source of truth**; if an event or property name exists in multiple source projects, Amplitude Data will use and display the metadata from the prioritized project in this portfolio.  
  
    To prioritize the schemas, simply drag the project names into your preferred prioritization order.  
      
    {{partial:admonition type="note" heading=""}}
    The metadata for an event or property from the source project (description, category, display name, activity, visibility) will be shown in the Data-managed portfolio by default.
    {{/partial:admonition}}

1. Click *Create Portfolio* to finish the creation process.

Customize events and property metadata in the portfolio  

You can customize event and property metadata in your portfolio through the use of an [override](/docs/data/override-property).

## Import existing portfolios into Amplitude Data

You can import existing Analytics-managed portfolios into Amplitude Data. To do so, click on the project selector and find the portfolio you'd like to import, either by searching for it or locating it under “Projects (managed in Analytics)”.

Once your portfolio has been imported, you will be able to view the existing aggregated list of events and properties.

{{partial:admonition type="note" heading=""}}
Amplitude Data will create overrides in the imported portfolio for **all** events and properties. This will maintain the existing schema for users of the Analytics-managed portfolio.
{{/partial:admonition}}