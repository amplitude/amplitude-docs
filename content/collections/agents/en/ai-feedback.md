---
id: 61027aa7-267f-479f-b379-912c1fea207f
blueprint: agent
title: 'AI Feedback'
this_article_will_help_you:
  - 'Understand what AI Feedback is'
  - 'Link your data sources to AI Feedback'
  - 'Create actions based on the insights provided by AI Feedback'
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1761239369
---
AI Feedback is an AI-native tool that combines customer voice, product behavior and AI-powered insights into actionable workflows. AI Feedback monitors feedback sources that you define and then delivers actionable insights through Amplitude. AI Feedback groups customer feedback into categories as well as connecting feedback insights into Amplitude cohorts, session replays and experiments. AI Feedback also lets you create guides and surveys based off of the insights to better connect you with your customers’ needs. 

Feedback events collect information about use cases such as:

* Providing feedback about specific product areas.
* Calling out complaints or loved features. 
* Feature requests
* Key takeaways

{{partial:admonition type="note" heading="Additional use cases"}}
The use cases listed above are examples only. For a full description of all of the categories that AI feedback tracks, go to [Viewing insights](/docs/agents/ai-feedback#viewing-insights)
{{/partial:admonition}}

AI Feedback is available to all customers with a paid Amplitude subscription. For more pricing details, go to [Pricing](https://amplitude.com/pricing).

## Feedback Event overview
The Feedback event records user feedback and those events are what AI Feedback uses to create insights. 

Feedback events capture the following information:

* `UserId`: The customer’s email address
* `timestamp`: When the feedback was created
* Event name: `[AI Feedback] Feedback`
* Event properties:
  * `feedback_id`: unique identifier
  * `text`: Feedback text (first 1k characters)
  * `source`: Source system such as Zendesk, Intercom, or Gong
  * `insights`: Array of insights
  * `timestamp`: Date the feedback occurred
  * `author`: Feedback author
  * `<AUTHOR_EMAIL>`: <AUTHOR_EMAIL> is a documentation notation for whichever field name is configured for the author’s email address. You can specify this property through user mapping <LINK>. 

## Setting up a data source

Before you can gain any insights from your customers, you must add at least one data source to Amplitude. A data source is your repository of customer feedback. Popular data sources include Zendesk, Salesforce, Reddit, and others. You can also upload individual CSV or DOCX files as data sources.

For example, if your company is regularly discussed on Reddit, you could set up an integration with that website by pointing AI Feedback directly to the subreddit URL with the discussions. AI Feedback then monitors the subreddit and provides insights from the content that's posted there. Or as another example, you may have a transcript of a customer call. You can upload those transcripts directly to AI Feedback to gain insights from the conversation. 

AI Feedback can ingest and generate insights from multiple sources at the same time.

##### To add a data source

1. Open Amplitude and go to *AI Feedback > Add Source*.
2. Select one of:
  * **Connect an integration**: Lets you connect to an application such as Zendesk or G2.
  * **Upload a file**: Lets you upload a static CSV or DOCX file.
  * **Paste text**: Lets you paste text directly into AI Feedback.
3. If you’re connecting an application:
  * Search for your application or select it from the list.
  * Depending on the integration, you may need to sign in to that application, specify relevant metadata tags, or point AI Feedback to a specific URL. The connector modal guides you through the necessary steps.
4. If you’re uploading a CSV or DOCX file, click **Upload** and then drag and drop the files you want to upload. 
5. If you’re pasting text, paste the content you want into the field. AI Feedback begins to parse the content automatically. 

{{partial:admonition type="note" heading="Requesting a new source"}}
If the integration you need isn’t listed, click the Request a new source link to ask for your source to be included.
{{/partial:admonition}}

## Managing a source

After you’ve added a data source, you can make further adjustments to it, if you want. You can either change the source settings or you can delete the source from AI feedback. 

{{partial:admonition type="note" heading=""}}
Not all sources have additional settings. If your source doesn’t have any settings for you to modify, the Settings option only displays a status page.
{{/partial:admonition}}

##### To change the settings of a source
1. Go to *AI Feedback > Sources*.
2. Click the **three-dot menu** icon next to the source you want to change.
3. Click **Settings**. 
4. If there are settings for your source, you can change them here.
5. Click **Back to sources** to return to the source menu.

##### To delete a source
1. Go to *AI Feedback > Sources*.
2. Click the **three-dot menu** icon next to the source you want to delete.
3. Click **Confirm**.

{{partial:admonition type="note" heading="deleting sources"}}
Deleting a source deletes the previously analyzed feedback as well as preventing new feedback from that source. 
{{/partial:admonition}}

## Viewing Insights

AI Feedback automatically generates its insights. As your data sources update with new content, AI Feedback automatically updates with additional insights. These insights are categorized by the following types:

* **Feature requests**: Additional features your customers want.
* **Complaints**: Issues and problems your customers experience.
* **Loved features**: Features and functions that your customers enjoy.
* **Brands mentioned**: Specific brands mentioned by your customers.
* **Pain points**: Places within your product that are problematic or causing issues for customers. 
* **Features mentioned**: Any features or functionality specifically called out by name by customers.
* **Bugs**: Functionality issues experienced by customers.
* **Key takeaways**: High-level understandings and insight about your products, features, or functionality.

Insights are automatically categorized based on AI Feedback’s analysis of your customer’s feedback. 

AI Feedback counts how many customers have the same feedback for the same piece of functionality or feature. For example, if multiple customers report the same bug, AI Feedback calls out the bug and displays the number of mentions that bug received. 

You can specify any time range you want to view insights throughout the history of your data sources.  

You can also specify from which data sources you want to view insights. You can view insights from all data sources together or select combinations of data sources. For example, you might only want to view insights from all social media data sources to understand how your products are being discussed publicly. Or, you might only want to view insights from your customer service tickets to understand how your product is performing. 

## Working with insights

Insights are useful to understand your customers’ experience with your product. For every insight, AI Feedback offers actions you can take to enhance your customers’ experience. AI Feedback lets you perform the following actions for each insight: 

* **Share**: Lets you share the insight with an internal colleague.
* **Create Survey**: Lets you create a [survey](/docs/guides-and-surveys/surveys/survey-overview) that you can send to customers. Automatically opens the Guide creation tool. Automatically adds the mentioned customers as a cohort for the survey. 
* **Watch Session Replays**: Lets you watch [session replays](/docs/session-replay) from customers directly related to the insight. 
* **Create Cohort**: Creates a [cohort](/docs/analytics/define-cohort) based on the insight. Automatically adds the customers mentioned in the insight to the cohort.
* **Delete mentions**: Lets you delete individual mentions from a specific insight.
* **Delete Insight**: Lets you delete the insight from AI Feedback. You can't undo deleting the insight.

##### To perform an action

1. Open the insight you want and click **Actions**.
2. Select the action you want.
   Actions are performed as soon as they're selected. Depending on the action, the system may take a few minutes to update.

##### To delete a mention

1. Open an insight with multiple mentions.
2. Next to the mention you want to delete, click the **three-dot menu** item and select **Delete Mention**. 
  You can't undo this deletion.

##### To share an insight
 
* Click **Share**. 

A link to the insight is automatically saved to your clipboard. Only colleagues with access to your Amplitude project have access to view.

## Migrating user mapping

You may, at some point, want to migrate from one user ID system to another. For example, migrating from a plain email address system to a hashed email address that protects customer PII. You don’t, however, want to lose the history of the previous ID system for your customers. To keep the history together with the new ID system, the new system must be mapped to the pre-existing Amplitude ID. 

User mapping lets you select any user property that contains your users’ email addresses and link that to an associated Amplitude ID. 

##### To map a new ID system to a pre-existing Amplitude ID

1. Go to *Organizational settings > Projects > AI Feedback*.
2. Under User Mapping, click the drop down menu and select the user property that contains your users’ email address.

### Deleting information based on user ID or Amplitude ID

When a deletion request is submitted to Amplitude’s User Privacy API for a specific user ID or Amplitude ID, all AI Feedback data associated with that user ID and/or Amplitude ID is also be deleted. 