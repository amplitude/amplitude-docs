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
AI Feedback is an AI-native tool that combines customer voice, product behavior, and AI-powered insights into actionable workflows. It monitors feedback sources that you define and delivers actionable insights through Amplitude. AI Feedback groups customer feedback into categories as well as connecting feedback insights into Amplitude cohorts, session replays and experiments. AI Feedback also lets you create guides and surveys based off of the insights to better connect you with your customers’ needs. 

Feedback events collect information about use cases such as:

* Providing feedback about specific product areas.
* Calling out complaints or loved features. 
* Feature requests
* Key takeaways

{{partial:admonition type="note" heading="Additional use cases"}}
The use cases listed above are examples only. For a full description of all the categories that AI feedback tracks, go to [Viewing insights](/docs/agents/ai-feedback#viewing-insights)
{{/partial:admonition}}

## Feedback Event overview
AI Feedback uses Feedback Events to record user feedback and create insights. 

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
  * `<AUTHOR_EMAIL>`: <AUTHOR_EMAIL> is a documentation notation for whichever field name is configured for the author’s email address. You can specify this property through [user mapping](/docs/apis/analytics/user-mapping). 

## Setting up a data source

Before you can gain any insights from your customers, you must add at least one data source to Amplitude. A data source is your repository of customer feedback. Popular data sources include Zendesk, Salesforce, Reddit, and others. You can also upload individual CSV or DOCX files as data sources.

For example, if your company generates discussions on Reddit, you could set up an integration with that website by pointing AI Feedback directly to the subreddit URL with the discussions. AI Feedback then monitors the subreddit and provides insights from the content that's posted there. Or as another example, you may have a transcript of a customer call. You can upload those transcripts directly to AI Feedback to gain insights from the conversation. 

AI Feedback can ingest and generate insights from multiple sources at the same time.

##### To add a data source

1. Open Amplitude and click **AI Feedback** and then **Add Source**.
2. Select one of:
  * **Connect an integration**: Lets you connect to an application such as Zendesk or G2.
  * **Upload a file**: Lets you upload a static CSV or DOCX file.
  * **Paste text**: Lets you paste text directly into AI Feedback.
3. If you’re connecting an integration:
  * Search for your application or select it from the list.
  * Depending on the integration, you may need to sign in to that application, specify relevant metadata tags, or point AI Feedback to a specific URL. The connector modal guides you through the necessary steps.
4. If you’re uploading a CSV or DOCX file, click **Upload** and then drag and drop the files you want to upload. 
5. If you’re pasting text, paste the content you want analyzed into the field. AI Feedback begins to parse the content automatically. 

{{partial:admonition type="note" heading="Requesting a new source"}}
If the integration you need isn’t listed, click **Request a new source** to ask for a new source.
{{/partial:admonition}}

## Managing a source

After you’ve added a data source, you can make further adjustments to it, as necessary. You can either change the source settings or you can delete the source from AI feedback. 

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

{{partial:admonition type="note" heading="Deleting sources"}}
Deleting a source deletes the previously analyzed feedback as well as preventing new feedback from that source. 
{{/partial:admonition}}

## Viewing Insights

AI Feedback automatically generates its insights. As your data sources update with new content, AI Feedback updates with additional insights. These insights align to the following categories:

* **Feature Request**: Additional features your customers want.
* **Complaint**: Issues and problems your customers experience.
* **Loved Feature**: Features and functions that your customers enjoy.
* **Brand**: Specific brands mentioned by your customers.
* **Bug**: Functionality issues experienced by customers.
* **Feature Mentioned**: Any features or functionality specifically called out by name by customers.
* **Pain Point**: Places within your product that are problematic or causing issues for customers. 
* **Takeaway**: High-level understandings and insight about your products, features, or functionality.

AI Feeedback's analysis of your customer's needs results in automatic categorization of your insights. 

AI Feedback counts how many customers have the same feedback for the same piece of functionality or feature. For example, if multiple customers report the same bug, AI Feedback calls out the bug and displays the number of mentions that bug received. 

You can specify any time range you want to view insights throughout the history of your data sources.  

You can also filter your data sources. For example, you might only want to view insights from social media data sources to understand how your products are being discussed publicly. Or, you might only want to view insights from your customer service tickets to understand how your product is performing. 

## Working with insights

Insights are useful to understand your customers’ experience with your product. For every insight, AI Feedback offers actions you can take to enhance your customers’ experience. AI Feedback lets you perform the following actions for each insight: 

* **Share**: Lets you share the insight with an internal colleague.
* **Create Survey**: Lets you create a [survey](/docs/guides-and-surveys/surveys/survey-overview) that you can send to customers. Automatically opens the Guide creation tool. Automatically adds the mentioned customers as a cohort for the survey. 
* **Watch Session Replays**: Lets you watch [session replays](/docs/session-replay) from customers directly related to the insight. 
* **Create Cohort**: Creates a [cohort](/docs/analytics/define-cohort) based on the insight. Automatically adds the customers mentioned in the insight to the cohort.
* **Delete mentions**: Lets you delete individual mentions from a specific insight.
* **Delete Insight**: Lets you delete the insight from AI Feedback. You can't undo deleting the insight.

### AI Feedback with AI Chat analysis

You can use Amplitude's Ask AI feature to analyze your Feedback data, perform semantic searches on feedback or insights, and answer requests such as:
* Summarize all recent feedback.
* Provide direct user quotes from customers about your website's search experience.
* Highlight the most talked about bug or complaint from the previous week.

You can also have Ask AI to perform actions such as:
* Create a product requirements doc (PRD) to improve your company's product functionality based on feedback. For example, Ask AI can create a PRD to improve your notification system based on feedback about notifications.

To get AI analysis on your feedback, click the **Ask AI** button and type in your request.

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

## Merging existing users from an AI Feedback source

This lets you merge your existing users with users from supported AI Feedback sources such as Zendesk or Intercom. Amplitude merges users with the same email address. 

##### To merge existing users

1. Go to *Organization Settings > Projects > your project > AI Feedback > User Mapping* and specify the field that contains the user's email address. 
2. From you system, send at least one event for each users that has that field populated. 

After Amplitude receives that event for a user, AI Feedback can merge that users with the user from an AI Feedback-supported source using that email address. 

## Deleting information based on user ID or Amplitude ID

When a deletion request is submitted to Amplitude's [User Privacy API](/docs/apis/analytics/user-privacy) for a specific user ID or Amplitude ID,  as long as you have merged your existing users with users from your supported AI Feedback sources, all AI Feedback data associated with that user ID or Amplitude ID is also deleted. If you haven't [merged your existing users](/docs/agents/ai-feedback#merging-existing-users-from-an-AI-Feedback-source) with users from your supported AI Feedback sources, the User Privacy API can't match any Feedback data with the user ID or Amplitude ID that have been submitted with the deletion request.

To ensure that the deletion is permanent and complete: 
* Delete Upstream first: You must first delete the data from the original source (such as Zendesk or Gong) before submitting your request to Amplitude. If you don't do this, the data syncs back into Amplitude. 
* Manual deletion of other data: The User Privacy API only handles deletions tied to specific user IDs or Amplitude IDs. Any other related data (for example general or aggregated feedback) must be deleted manually from the [source management page](/docs/data/sources/connect-to-source).

## Data access

AI Feedback follows your existing Amplitude project and role-based permissions. No new data access is granted. 

You authorize the source connectors you want (for example: Zendesk, Intercom, App Store/Google Play, Gong, G2/Trustpilot, Reddit/Discord/X) and they're scoped to your credentials using secure OAuth (or equivalent).

## AI Feedback and LLM use

AI Feedback uses a third party large language model (OpenAI) to turn connected feedback (for example tickets, reviews, call transcripts, social/forums) into product insights. 

You control which sources to connect and AI Feedback processes only the feedback you choose to ingest as well as the Amplitude data you already can access. Customer data is processed for inference only. It's not used to train foundation models. Requests are handled transiently, with data encrypted in transit and at rest in your regional data plane. Outputs are grounded in raw feedback data with source links, and proprietary safeguards (for example hallucination checks) to help ensure summaries reflect actual feedback. 

