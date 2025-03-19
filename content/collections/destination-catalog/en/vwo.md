---
id: 315afdcc-bb3e-47de-afdb-32119a0f0e06
blueprint: destination-catalog
title: VWO
---
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
2. From the left panel of the VWO dashboard, navigate to *Configurations > Integrations*.  
3. Click the **Amplitude** integration and switch the toggle to enable it. Once enabled, the Amplitude screen within VWO’s Integration section appears as follows:

   ![image11.png](https://static.wingify.com/gcp/uploads/2025/03/unnamed-2.png)

   On the **Config** tab, select the data to transfer between VWO and Amplitude.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed.png)

   The integration provides three options. Enable one or more of these options based on your specific tracking and targeting needs. Click the linked text for more information about each option, including its benefits and how it works.

   1. If you want to send VWO Test and Personalize campaign data to Amplitude**,** select [**Enable sending VWO campaign data to Amplitude**](#send-vwo-campaign-data-to-amplitude).

   2. If you want to send VWO survey data to Amplitude, select [**Enable sending VWO insights data to Amplitude**](#send-vwo-insights-\(surveys\)-data-to-amplitude).

   3. If you want to import Amplitude cohorts in VWO and target visitor data, select [**Enable use of Amplitude cohorts for visitor targeting**](#use-amplitude-cohorts-in-vwo-for-visitor-targeting).  

4. Click **Save**.

{{partial:admonition type="note" heading=""}}
The options you select above at the account level serve as defaults for all new VWO testing campaigns and surveys. To update an existing campaign, navigate to *Configuration > Integrations* from the campaign, and select Amplitude.

To configure it for existing surveys, go to *Insights > Surveys*. Select the Surveys campaign, go to *Settings > Others > Integrate with third-party products > Amplitude*.
{{/partial:admonition}}

## Send VWO campaign data to Amplitude

This option lets you send VWO Test and Personalize campaign data to Amplitude. VWO shares the campaign visitor data through the **campaign ID**, and variation-level visitor data through the **variation ID**. Use this data to track visitors in Amplitude.

VWO sends data to Amplitude with the following specifics:

```json
"user_properties": { "$set": { "VWO-Test-ID-#":"[varName]" }}

"event_properties": { "VWO-Test-ID-#":"[varName]" } 

```
Where `#` is the **campaign ID** and `varName` is the **variation name** in VWO. For more information on how to retrieve the corresponding visitor data, see to [View reports in Amplitude](#view-reports-in-amplitude).

### View reports in Amplitude

To view VWO visitor data reports in your Amplitude dashboard, you must create an event. Here’s how you can create one:

{{partial:admonition type="note" heading=""}}
To view an existing event's report, navigate to *My Workspace > Saved Content*, and select the chart you want to view.
{{/partial:admonition}}

1. Log in to your Amplitude account.  
2. On the Amplitude dashboard, from the top panel, navigate to *Create > Chart > Segmentation*.
3. In the events section, click *Select event... > Uncategorized > VWO*.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-5.png)  
4. Create a segment for **Variation-1** where the user property is **VWO-Test-ID-(XX) \= Variation-1**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-6.png)

   {{partial:admonition type="note" heading=""}}
   To find your Test ID, log in to your VWO account. Go to the testing dashboard and select the test. Go to *Settings > Summary*. Scroll down to the **Other Information** section and check the **Campaign ID**.
   {{/partial:admonition}}


   The report displays in the right panel.  

5. To save the chart, click **Save**.

   {{partial:admonition type="note" heading=""}}
   If you notice a visitor's event property or custom user property counts as *none* or shows an unexpected value, see [Unexpected values in users counts](/docs/faq/unexpected-values-in-user-counts).
   {{/partial:admonition}}
   

## Send VWO Insights (Surveys) data to Amplitude

VWO sends survey data to Amplitude when a visitor attends your survey. Amplitude receives this data as events. Use these events to analyze data from various perspectives and optimize it for future interactions. You can also use them to create several reports in Amplitude. For example you can use the `VWO-survey-answer-submitted` event to generate a report as follows:

1. Log in to Amplitude.  
2. Click *Create > Chart > Data Table*.
3. Click **Add Event or Metric** and select **VWO-survey-answer-submitted**.

   This generates a data table featuring the total number of survey answers submitted.

4. To view the number of answers as a product of questions asked, click **Select property** in the **Overall** cell and select `QuestionText`.

5. To view the breakdown of the number answers group each question by **Answer**.

   ![image](https://static.wingify.com/gcp/uploads/2025/03/unnamed-10.png)

You can also add survey activities such as **Survey started** and **Survey completed** to build funnels based on these events and enhance visitor engagement further.

## Use Amplitude cohorts in VWO for visitor targeting

Create targeted experiences in VWO for specific user segments identified in Amplitude. For example, if you have an Amplitude cohort of Power Users who performed specific key actions in your product (like using advanced features or having high engagement metrics). With this integration, you can import this cohort into VWO and create personalized A/B tests or targeted campaigns specifically for these power users.

### Enable the setting in VWO

1. In VWO, go to *Configurations > Integrations > Amplitude > Config*.
2. Select **Enable use of Amplitude cohorts for visitor targeting**. 

VWO autogenerates this API key, which you need when you configure the VWO destination in Amplitude

### Configure VWO Amplitude Destination in Amplitude

Configuring a VWO destination in Amplitude enables the transfer of cohort data from Amplitude to VWO. To create a VWO destination:

1. From the Amplitude dashboard, navigate to **Data** \> **Catalog** \> **Destinations** \> **VWO**.  *Data > Catalog > Destinations > VWO*.
2. Click **Add another destination**.  
3. Enter a suitable name for the destination.  
4. Enter the API key generated in VWO.  
5. In the **User ID** section, click **Select user property**, search for **Device ID,** and select it.
6. Click **Save**.

The VWO destination is successfully created.

### Sync Amplitude Cohort with VWO destination

1. In Amplitude, hover over the **Users** icon and select **Cohorts**.  
2. Go to any cohort and click **Sync**.
3. In the **Select Destination** pop-up, select the **VWO** destination and click **Next**.
4. Define how frequently you want the sync to execute.
   
   Select the frequency and click **Sync**.

   {{partial:admonition type="note" heading=""}}
   VWO recommends that you use the **Enable Scheduled Sync** option to ensure that any new data added to the segment pushes to VWO. If you only need current data, and don't require new data, choose **One-time Sync**.
   {{/partial:admonition}}

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-13.png)

Once you connect the Amplitude cohort with the VWO Amplitude destination, you must complete the rest of the procedure in VWO to complement the inbound transfer of cohort data from Amplitude to VWO.

### Import Amplitude Audience into VWO

Before you start, ensure you have [enabled the use of Amplitude cohorts for visitor targeting](#use-amplitude-cohorts-in-vwo-for-visitor-targeting) setting in VWO and saved it. Once enabled and saved, follow these steps:

1. Click **Add Cohort**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/Amplitude-3-copy.png) 
2. In the **Add Amplitude Cohorts** pop-up, enter the name of the Amplitude cohort in the search field or directly select from the list of displayed cohorts.  
3. Click **Add**.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-15.png)

   A confirmation toast appears on the screen once Amplitude adds the cohort.

   {{partial:admonition type="note" heading=""}}
   After you add the cohort, VWO takes around 24 hours to sync the data to VWO. After that, the data syncs once every 24 hours.

   Click **Sync All**, located above the list of cohorts, to manually sync the cohort data.

   Click the menu in the row of an individual cohort to sync it manually.

   All synced data has a one hour lag. For example, if you sync the data at 4:00 PM, VWO receives the data collected through 3:00 PM.
   {{/partial:admonition}}

Once you complete these steps, you can target a VWO campaign using Amplitude cohorts.

## Target a VWO Campaign using Amplitude cohorts

1. Log in to your VWO account.  
2. Go to **Testing** and create a test campaign.  
3. In the **Audience and Traffic** section, click **Custom Segment** and create a segment using the **Amplitude Cohort** condition. Use this condition to fetch the cohorts you synced in VWO from your Amplitude account.

   ![](https://static.wingify.com/gcp/uploads/2025/03/unnamed-17.png)  
4. To add multiple conditions, click **Add another condition**. Also, you can define the logical relationship between the different conditions using the **and**/**or** operators and use brackets to organize the segment condition.  
5. Once done, click **Save Now**.

The targeted experience in VWO for specific user segments identified in Amplitude is configured successfully.

## Additional help

For more information or further help, contact your VWO customer success manager.
