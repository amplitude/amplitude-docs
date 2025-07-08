---
id: b287cffb-096c-4dbd-a4f4-a8a99607e723
blueprint: account-management
title: 'Change the unit of currency your project uses'
source: 'https://help.amplitude.com/hc/en-us/articles/15581410157339-Change-the-unit-of-currency-your-project-uses-'
this_article_will_help_you:
  - 'Set the unit of currency used by your Amplitude project to your local currency, or any other that is appropriate'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724884797
ai_summary: 'You can modify the currency display in Amplitude Analytics for a specific project without changing the underlying data. Navigate to *Settings > Organization settings > Projects*, select the project, and change the currency display in the *General* section. The updated currency will show in Revenue LTV charts, Revenue metrics in Event Segmentation and Data Tables charts, dashboards, and notebooks. This allows you to quickly understand your data in the preferred currency format.'
---
Displaying an accurate currency in your charts is often necessary to quickly grasp what your data is telling you. Amplitude Analytics displays the United States dollar ($) by default, but managers and admins can modify the unit of currency displayed for a particular project. 

{{partial:admonition type='note'}}
 Changing the currency display doesn't modify nor convert the underlying data. 
{{/partial:admonition}}

Follow the below steps to modify your currency display for a project: 

1. Navigate to *Settings > Organization settings > Projects* to view a list of your projects.
2. Select the project you'd like to modify the currency display for.
3. Click `United States ($)` in *General* to open the drop down for *Currency Display.*

![change_currency.png](/docs/output/img/account-management/change-your-currency.png)

4. Select the desired currency from the drop-down list.

This updates the currency display. The new currency is now visible for all users. 

Once you've made this change, you can see the new unit of currency in:

* Revenue LTV charts
* Revenue metrics in Event Segmentation charts
* Revenue metrics in Data Tables charts
* Any dashboard or notebook versions of the above

This chart shows a modified display currency from `United States ($)` to `UK (£)`:

![currency_display_pounds.png](/docs/output/img/account-management/currency-display-pounds-png.png)