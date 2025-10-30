---
id: 123f636e-6ab8-48e1-bbc0-60e0b8ecf86d
blueprint: agent
title: 'AI Visibility'
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1761677299
---
As internet searches are being replaced by AI chatbots, AI Visibility helps marketers and growth teams understand, measure, and amplify their brand presences in AI-generated answers. It surfaces visibility scores, competitor rankings, and recommendations for improvement. This lets you understand how your brand appears in AI searches and to act to improve your AI-driven traffic. 

Although most AI Visibility functionality is available to everyone, with or without an Amplitude subscription. However, some functionality is only available with a paid Amplitude subscription. Any functionality descriptions in this article that aren't visible to your version of AI Visibility are part of the subscription tier.

Free visibility reports are available to everyone on the Amplitude [Try AI Visibility](https://www.amplitude.com/try-ai-visibility) page of the website. 

{{partial:admonition type="note" heading=""}}
If a current Amplitude customer builds a free report, it's not tied to their Amplitude account. To connect a report to their Amplitude account, they must first log into Amplitude and then go to the AI Visibility page.
{{/partial:admonition}}

In depth AI Visibility functionality for your specific brand is available by going to your Amplitude home page and then going to *Marketing Analytics > AI Visibility*.

The rest of this article describes the AI Visibility functionality available through the Amplitude tool. 

## Overview tab

The Overview tab contains high-level information about how your website is performing through AI-generated search. High level information includes:

* **Mentions this Week**: Percentage of AI responses that mention your brand.
* **Average Rank this Week**: Average position of your brand in AI-generated responses.
* **Citations this Week**: Number of responses mentioning your brand in the current week. 
* **Visibility/Rank over Time**: A graph describing your visibility or your rankings over time compared to your competitors. You can further refine this graph by specific topics.
* **Competitor Mentions**: A graph describing competitor mentions compared to mentions about your brand. By default, your competitors are limited to the top seven.
* **Top Topics by Visibility**: Displays the top topics relating to your brand that were returned by AI agents. Describes the number of mentions and responses used to calculate the percentage amount. 
* **Top Cited Sources**: Displays the top sources AI agents used to generate results. 
* **AI Chat Traffic**: Takes you to Amplitude's SEO Web Analytics page (if enabled.). Displays insights about your AI chat traffic such as overall totals, top pages, top countries, and sources.

## Prompts tab

The Prompts tab contains all of the prompts asked of the available AI agents that mentioned your brand or generated its results from your content. The page contains metrics as well as the ability to investigate individual prompts. 

You can filter individual AI models to investigate such as Claude, ChatGPT, or Gemini. You can also filter prompt results to include or exclude competitor brands or your own brand. Click either the **All Models** or **All Brands** drop-downs to filter AI models or competitor brands. If you want to exclude your own brand, select the **Exclude <BRAND>** checkbox. 

You can export all of these prompts to a CSV file for further analysis. Click **Export CSV** to download the exported file. 

### Metrics

The Prompts tab contains the following metrics:

* **Topics**: The total number of topics that have been generated relating to your brand.
* **Prompts**: The total number of prompts across all topics that relate to your brand or to your competitors.
* **Responses**: The total number of responses generated from the prompts that relate to your brand or to your competitors.

### Topics and prompts

The Prompts tab displays a searchable list of all topics and their associated prompts. Each topic represents a category or theme of queries that AI agents received. By default, insights are arranged first by topic and then by the prompts that relate to that topic. For example, in the topic "Product Analytics", you might find the following prompts:

* "Compare leading product analytics services"
* "Ranking product analytics platforms 2025"
* "Best platforms for user behavior tracking"
* "How to analyze user retention in SaaS products"

Clicking into the topic displays all the prompts related to that topic. 

Both topic and prompt views contain metrics for:

* Visibility
* Relevancy
* Average rank
* Citations

#### Topics

Topics are organized in expandable rows that show:

* **Topic name**: The subject or theme of related prompts (for example, "product analytics tools" or "customer data platforms").
* **Prompt count**: The number of individual prompts within that topic.
* **Response count**: The total number of AI-generated responses across all prompts in the topic.

Click a topic row to expand it and view all associated prompts.

#### Individual prompts

Clicking into an individual prompt displays:

* The specific prompt the user entered.
* Brands mentioned in the response.
* The AI Model used to answer the prompt.
* The response to the prompt.
* Citations used to generate the response.
* The date and time when the prompt was last run.

Click on any prompt to view the complete AI response and analyze how your brand and competitors were represented in the answer.

Use the search bar at the top of the list to find specific topics or prompts by keyword.

#### Working with topics and prompts

You can edit or delete any topic or prompt from the list. Deleting the prompt removes it from the metrics about your brand. It doesn't delete the topic or prompt from the AI model. 

Editing a topic or a prompt lets you rewrite the content to be more understandable. It only updates the topic or prompt in the list. It doesn't update the topic or prompt in the AI model.

## Sources tab

The Sources tab displays two categories of source information: All Cited Sources and My Website Pages. 

### All Cited Sources

The All Cited Sources page displays the total number of sources referenced by AI chats that reference your brand or your competitors. 

The page lists the source, or domain, the number of pages that were referenced, and the number of responses for each source. You can click into each source to view the specific pages that were referenced by AI chat. Each page lists the number of responses that cited that specific page and how many times your brand was explicitly mentioned in the page.

You can filter the All Cited Sources page by topic, AI model, brands, and group subdomains. 

### My Website Pages

The My Website Pages content displays information about how your own website is referenced and cited. This information not only includes AI chat references but also search engine traffic. The page displays metrics for:

*** Total cited pages**: The total number of website pages cited. 
* **Overall search engine traffic**: The total number of search engine traffic for all website pages.
* **Overall AI chat traffic**: The total number of AI chat traffic for all website pages.
* **Total errors**: The total number of website pages with errors.
* **Total warnings**: The total number of website pages with warnings.

The page also includes a list of every page on your website and the following metrics for each page: 

* Search engine traffic
* AI chat traffic
* Citations

You can click into each website section to gain further understanding of how each paged is cited and referenced. 

For further analysis, you can create a cohort from any of the pages or groups of pages. 

##### To create a cohort from your page citations
1. Click the **Create Cohort** button next to the page or page group you want. 
2. Select the traffic type you want in your cohort. Traffic types can be:
   * All Traffic
   * Search Engine Traffic
   * AL Chat Traffic 
3. Select the date range for your cohort. 
4. Name the cohort.
5. If you want to place this cohort in a specific space, click the **Location** drop-down and select where you want the cohort.
6. Add a short description and click **Save Cohort**.

## Competitors

The Competitors tab lets you view information about your competitors and how their AI Visibility results compare with your own. This information lets you understand how AI chat is comparing you to your competitors and areas where you can improve against your competitors. 

AI Visibility automatically selects your competitors by the number of mentions it finds for other brands similar to yours. You can filter out competitors from your analysis. If you want to either add or delete a competitor, go to [Competitor Settings](/docs/agents/ai-visibility#competitor-settings). 

### Comparisons

The Comparisons section displays direct comparisons between you and your competitors about how your brands are being referenced and cited by AI chat. For each competitor, you'll receive an analysis for the subject areas you and your competitor are leading in and an overall score for who appears higher in shared prompts. 

The subject areas are automatically identified and analyzed by AI Visibility. However, these subject areas tend to be the major functional areas of your business. 

Where possible, these subject areas are repeated across each competitor analysis.

### Competitor Topics Matrix

The Competitor Topics Matrix section displays the primary topics that are being searched and referenced by AI chat and how your citations and references are performing against your competitors. 

You can view these comparisons as either by Visibility Percentage or by Average Rank. 

The brand, either you or a competitor, that has the best performance in a particular topic is highlighted.

### Competitor Settings

The Competitor Settings section lets you view your primary competitors and either delete an existing competitor from the analysis or manually add a competitor to your analysis. 

The section also displays the number of prompts that each competitor appears in and a visibility score.

##### To add a competitor
1. Click **Add Competitor**.
2. Enter the competitor's name and their website URL. 
3. Click **Create**.

AI Visibility then searches for that competitor and includes their information into your visibility analysis.

## Actions

AI Visibility automatically creates actions that you can take to improve your visibility within AI responses. You can implement any, or none, of the recommended actions. These actions are divided into the following categories:

* **Recommendations**: Implement specific actions to improve your overall LLM visibility.
* **Analyze Page**: Have AI Visibility analyze a specific URL, topic, or piece of content and generate recommendations specific to that page.
* **Simulate Changes**: Have AI Visibility simulate recommended changes. This list you view the suggested changes in real time before committing them to your website.
* **Generate Content**: Have AI Visibility generate content for your website that's targeted towards increasing your visibility and engagement with LLMs. 

{{partial:admonition type="note" heading="Suggestions for Improvement"}}
Be aware that AI Visibility can't directly access or make changes to your website. You must implement these suggestions and recommendations yourself. For any content suggestion, AI Visibility let's you copy or download the content and port it over to your website. 
{{/partial:admonition}}

The following procedures describe how to implement or create AI Visibility's actions:

##### To implement a recommendation
1. Go to *AI Visibility > Actions > Recommendations*.
2. Review the recommendations to improve your overall LLM visibility.
3. Click **Optimize** for the recommendation you want to implement.
This takes you to the Simulate Changes section where you can view the recommended changes and make any edits you want. Typically, this involves updating blog posts or other content and then refining LLM prompts.
4. After you finish reviewing or editing the content, select the prompts you want to run to update the LLMs. 
5. Select the AI model you want to run the prompts on.
6. Click **Run Test**.
After the test runs, you can review the simulation results. If the results improve your visibility, you can then implement the changes directly on your website. If the results don't improve your visibility, continue to make edits and update the prompts until you have the results you want.

##### To analyze a page or topic
1. Go to *AI Visibility > Actions > Analyze Page*.
2. Select either **Analyze URL** or **Analyze content**. 
3. Enter the website URL you want analyzed or copy/paste the content.
4. If you want AI Visibility to focus on a specific topic, select one from the drop-down list. 
If you don't select a topic, AI Visibility analyzes the URL against all topics.
5. Click **Analyze**.
AI Visibility may take some time to complete the analysis, depending on the complexity or amount of content. After the analysis completes, you can scroll through the recommended optimizations. Click **Simulate Changes** to try out the recommendations. 

##### To simulate changes
This pages opens with the most recent suggested change.
1. Go to *AI Visibility > Actions > Simulate Changes*.
2. Review and, if necessary, change the source for the change.
3. Review the changes in the Content Editor field. Make any changes you want. 
4. Select the prompts you want to run on the suggested changes. 
5. Select the AI Model to run the prompts.
6. Click **Run Test**.
After the test runs, you can review the simulation results. If the results improve your visibility, you can then implement the changes directly on your website. If the results don't improve your visibility, continue to make edits and update the prompts until you have the results you want.

##### To generate content
1. Go to *AI Visibility > Actions > Generate Content*. 
2. Select the topic about which you want AI Visibility to generate content. 
3. Select the content type. You can select one of:
   *  Blog post
   *  Product description
   *  FAQ
   *  Landing Page
4. Optionally, enter one or more reference URLs as an example and for context. 
5. Select if you want AI Visibility to match your brand's voice or to generate example content. 
6. Click **Generate Content**.
After AI Visibility generates your content, you can edit it as much as you want. After you're satisfied with the content, you can click either **Copy** or **Download as Markdown** to implement it on your website.

If you aren't satisfied with the original generated content, click **Generate Again** to have AI Visibility make a new attempt. If you regenerate the content after you have manually edited it, those edits aren't retained. 
