---
id: 315afdcc-bb3e-47de-afdb-32119a0f0e06
blueprint: destination-catalog
title: VWO
connection: destination
integration_type:
  - cohorts
integration_category:
  - experimentation
partner_maintained: true
integration_icon: partner-icons/vwo-logo-color.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1742423712
---
| NOTE: The VWO-Amplitude integration is currently unavailable in the EU region. Our team is working on this, and it is expected to be available soon. |
| :---- |


{{partial:admonition type="note" heading="Partner-maintained integration"}}
VWO maintains this integration. For questions or concerns about functionality, contact [VWO](https://vwo.com/contact-us/).
{{/partial:admonition}}

[VWO](https://vwo.com/) is a powerful experimentation platform that helps brands enhance key business metrics. It enables teams to run conversion optimization programs backed by customer behavior data. With VWO, you can unify customer data, gain behavioral insights, build hypotheses, run A/B tests across multiple platforms (server, web, and mobile), roll out features, personalize experiences, and optimize the entire customer journey.

By integrating VWO with Amplitude, you can:

* Use VWO experiment data to create and target segments to deliver personalized campaigns in Amplitude.  
* Import Amplitude cohorts in VWO and use them to set up campaign targeting conditions.

## Prerequisites

| Requirement | Description |
| ----- | ----- |
| VWO account | A VWO account with access to experimentation data. |
| Amplitude account | An active Amplitude account. |

{{partial:admonition type="warning" heading="US region only"}}
This integration isn't available in the EU region.
{{/partial:admonition}}

## Integrate VWO with Amplitude

Integrating VWO with Amplitude allows you to transfer your website visitor data from VWO to Amplitude for further analysis. It also lets you import Amplitude cohorts in VWO and use them to set up campaign targeting conditions.

To integrate VWO with your Amplitude account:

1. Log in to your VWO account.  
2. From the left panel of your VWO dashboard, go to **Configurations** \> **Integrations**.  
3. Click on the **Amplitude** integration and switch the toggle to enable it. Once enabled, the Amplitude screen within VWO’s Integration section looks like this:

   ![image11.png](https://static.wingify.com/gcp/uploads/2025/03/unnamed-2.png)

   You are auto-navigated to the **Config** tab. From this tab, you can decide which data to transfer between VWO and Amplitude.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed.png)

   This integration provides three options. You can enable one or more of these options based on your specific tracking and targeting needs. Click on the linked text for more information about each option, including its benefits and how it works.

   1. If you want to send VWO Test and Personalize campaign data to Amplitude**,** select [**Enable sending VWO campaign data to Amplitude**](#send-vwo-campaign-data-to-amplitude).

   2. If you want to send VWO survey data to Amplitude, select [**Enable sending VWO insights data to Amplitude**](#send-vwo-insights-\(surveys\)-data-to-amplitude).

   3. If you want to import Amplitude cohorts in VWO and target visitor data, select [**Enable use of Amplitude cohorts for visitor targeting**](#use-amplitude-cohorts-in-vwo-for-visitor-targeting).  
4. Click **Save**.

| INFO: For all options listed above, once the integration is configured at the account level from the Integrations section, it is configured by default for all new VWO testing campaigns and surveys. To configure it for your existing campaigns, select the campaign, go to Configuration \> Integrations, and select Amplitude. |
| :---- |

![image3](https://static.wingify.com/gcp/uploads/2025/03/unnamed-1.png) <br /> <br/> Similarly, to configure it for existing surveys, go to Insights \> Surveys. Select the Surveys campaign, go to Settings \> Others \> Integrate with third-party products \> select Amplitude. <br /> <br/> ![image4](https://static.wingify.com/gcp/uploads/2025/03/unnamed-3.png) |
| :---- |

## Send VWO campaign data to Amplitude

This option lets you send VWO Test and Personalize campaign data to Amplitude. The campaign visitor data is shared via the *campaign ID*, while the variation-level visitor data is shared via the *variation ID*. You can leverage this data to track visitors in Amplitude.

The data from VWO is sent to Amplitude with the following specifics:

```
"user_properties": { "$set": { "VWO-Test-ID-#":"[varName]" }}

"event_properties": { "VWO-Test-ID-#":"[varName]" } 

```
Where \# is the *campaign ID* and *varName* is the variation name in VWO. For more information on how to retrieve the corresponding visitor data, refer to [View reports in Amplitude](#view-reports-in-amplitude).

### View reports in Amplitude

To view VWO visitor data reports in your Amplitude dashboard, you must create an event. Here’s how you can create one:

**NOTE**: If you want to view the report for an existing event, go to **My Workspace** \> **Saved Content** and select the chart for which to view the report.

1. Log in to your Amplitude account.  
2. On the Amplitude dashboard, from the top panel, go to **Create** \> **Chart** \> **Segmentation**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-4.png)

3. From the events section, click **Select event...** \> **Uncategorized** \> **VWO**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-5.png)  
4. Create a segment for **Variation-1** where the user property is **VWO-Test-ID-(XX) \= Variation-1**.

   **NOTE**: To find your Test ID, log in to your VWO account. Go to the testing dashboard and select the test. Go to **Settings** \> **Summary.** Scroll down to the **Other Information** section and check the **Campaign ID**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-6.png)

   The report is displayed in the right panel.  
5. To save the chart, click **Save**.

   **NOTE**: If you notice a visitor's event property or custom user property getting counted under *none* or showing an unexpected value, refer to [Unexpected values in user counts](https://help.amplitude.com/hc/en-us/articles/360016257391-FAQ-User-counted-under-none-or-an-unexpected-value).

## Send VWO Insights (Surveys) data to Amplitude

VWO sends the survey data to Amplitude when a visitor attends your survey. This data is received in Amplitude as events. You can use these events to analyze data from various perspectives and optimize it for future interactions. You can also use them to create several reports in Amplitude. **For example,** you can use the **VWO-survey-answer-submitted** event to generate a report as follows:

1. Log in to your Amplitude dashboard.  
2. Click **Create** \> **Chart** \> **Data Table.**

   **![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-7.png)**  
3. Click **Add Event or Metric** and select **VWO-survey-answer-submitted**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-8.png)

   This generates a data table featuring the overall number of survey answers submitted.  
4. To view the number of answers **question-wise**, click **Select property** in the **Overall** cell and select **QuestionText**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-9.png)  
5. Additionally, you can view the breakdown of the number **answer-wise** by grouping each question by **Answer**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-10.png)

You can also add survey activities such as **Survey started** and **Survey completed** to build funnels based on these events and enhance visitor engagement further.

## Use Amplitude cohorts in VWO for visitor targeting

You can create targeted experiences in VWO for specific user segments identified in Amplitude. For example, you might have an Amplitude cohort of Power Users who have performed specific key actions in your product (like using advanced features or having high engagement metrics). Using this integration, you can import this cohort into VWO and create personalized A/B tests or targeted campaigns specifically for these power users.

Enabling the import of Amplitude cohorts into VWO is a four-step process:

- [Prerequisites](#prerequisites)
- [Integrate VWO with Amplitude](#integrate-vwo-with-amplitude)
- [Send VWO campaign data to Amplitude](#send-vwo-campaign-data-to-amplitude)
  - [View reports in Amplitude](#view-reports-in-amplitude)
- [Send VWO Insights (Surveys) data to Amplitude](#send-vwo-insights-surveys-data-to-amplitude)
- [Use Amplitude cohorts in VWO for visitor targeting](#use-amplitude-cohorts-in-vwo-for-visitor-targeting)
  - [Enable the setting in VWO](#enable-the-setting-in-vwo)
  - [Configure VWO Amplitude Destination in Amplitude](#configure-vwo-amplitude-destination-in-amplitude)
  - [Sync Amplitude Cohort with VWO destination](#sync-amplitude-cohort-with-vwo-destination)
  - [Import Amplitude Audience into VWO](#import-amplitude-audience-into-vwo)
- [Target a VWO Campaign using Amplitude cohorts](#target-a-vwo-campaign-using-amplitude-cohorts)
- [Need more help?](#need-more-help)

### Enable the setting in VWO

1. In VWO, go to **Configurations** \> **Integrations** \> **Amplitude** \> **Config.**  
2. Select **Enable use of Amplitude cohorts for visitor targeting**.

The API key is auto-generated. You will need this API key when configuring the VWO destination in Amplitude.

### Configure VWO Amplitude Destination in Amplitude

Configuring a VWO destination in Amplitude enables the transfer of cohort data from Amplitude to VWO. To create a VWO destination:

1. From the Amplitude dashboard, navigate to **Data** \> **Catalog** \> **Destinations** \> **VWO**.  
2. Click **Add another destination**.  
3. Enter a suitable name for the destination.  
4. Enter the API key generated in VWO.  
5. In the **User ID** section, click **Select user property**, search for **Device ID,** and select it.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-11.png)  
6. Click **Save**.

   The VWO destination is successfully created.

### Sync Amplitude Cohort with VWO destination

1. In Amplitude, hover over the **Users** icon and select **Cohorts**.  
2. Go to any cohort and click **Sync**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-18.png)  
3. In the **Select Destination** pop-up, select the **VWO** destination and click **Next**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-12.png)  
4. Define how frequently you want the sync to execute.

   **NOTE**: We recommend using the **Enable Scheduled Sync** option, which ensures that any new data added to the segment is pushed to VWO. However, if you need only the current data and do not require any new data to be moved to VWO, you can choose **One-Time Sync**.

   Select the frequency and click **Sync**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-13.png)

Once you connect the Amplitude cohort with the VWO Amplitude destination, you must complete the rest of the procedure in VWO to complement the inbound transfer of cohort data from Amplitude to VWO.

### Import Amplitude Audience into VWO

Before you start, ensure you have [enabled the use of Amplitude cohorts for visitor targeting](#use-amplitude-cohorts-in-vwo-for-visitor-targeting) setting in VWO and saved it. Once enabled and saved, follow these steps:

1. Click **Add Cohort**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/Amplitude-3-copy.png) 
2. In the **Add Amplitude Cohorts** pop-up, enter the name of the Amplitude cohort in the search field or directly select from the list of displayed cohorts.  
3. Click **Add**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-15.png)

   A confirmation toast appears on the screen once the cohort is added successfully.

**NOTE**:  

* After you add the cohort, VWO takes around 24 hours to sync the data into VWO. After that, the data is synced once every 24 hours. However, if required, you can manually sync the cohorts' data anytime by clicking the **Sync all** link above the list of imported cohorts. You can also sync an individual cohort list by clicking on the corresponding vertical ellipsis (**⋮**) \> **Sync**.

  ![](https://static.wingify.com/gcp/uploads/2025/03/Amplitude-copy.png)  
* The synced data has an hour-long lag. **For example**, if the data is synced at 4 PM, the system receives all the data collected up until 3 PM.

Once you have completed these steps, you can target a VWO campaign using Amplitude cohorts.

## Target a VWO Campaign using Amplitude cohorts

1. Log in to your VWO account.  
2. Go to **Testing** and create a test campaign.  
3. In the **Audience and Traffic** section, click **Custom Segment** and create a segment using the **Amplitude Cohort** condition. Use this condition to fetch the cohorts you synced in VWO from your Amplitude account.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-17.png)  
4. To add multiple conditions, click **Add another condition**. Also, you can define the logical relationship between the different conditions using the **and**/**or** operators and use brackets to organize the segment condition.  
5. Once done, click **Save Now**.

The targeted experience in VWO for specific user segments identified in Amplitude is configured successfully.

## Need more help?

For more information or further assistance, contact your VWO customer success manager.