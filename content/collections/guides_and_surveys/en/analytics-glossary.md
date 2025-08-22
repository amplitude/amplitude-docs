---
id: ba2e2bbb-396d-4f49-9c59-66fab5476120
blueprint: guides_and_survey
title: 'Analytics Glossary'
landing: false
updated_by: 4870994b-20b1-4b89-b813-42091eaf6cb7
updated_at: 1747430252
glossary:
      -
        id: m6zctaju
        glossary_section_title: 'Common Guides and Surveys event properties'
        glossary_section_description: 'All Guides and Surveys events include the following event properties.'
        glossary_row:
      -
        id: m6zctcnn
        event_name: Key
        data_type: string
        event_description: 'A unique identifier for the guide or survey.'
      -
        id: m6zd3t6w
        event_name: 'Is From Debug Mode'
        data_type: boolean
        event_description: 'True when the event was sent from preview mode. Use this property to filter administrative activity.'
      -
        id: m6zkam1u
        event_name: 'Lifecycle UUID'
        data_type: string
        event_description: |-
          Enables grouping of Guides and Surveys events by lifecycle.
          A guide's or survey's "lifecycle" starts when it is triggered and ends when it is completed or dismissed. Lifecycle is independent of the application sessions.

          Lifecycle UUID is useful for analyzing events for a given guide/survey across multiple app sessions.
      -
        id: m6zd4uip
        event_name: Page
        data_type: json
        event_description: 'Details about the page of the guide or survey on which the event occured.'
      -
        id: m6zdjd6s
        event_name: 'Step ID'
        data_type: number
        event_description: 'The unique identifier of a guide or survey step.'
      -
        id: m6zdjxxu
        event_name: 'Step Index'
        data_type: number
        event_description: "The step's relative zero-based index."
      -
        id: m6zdkozf
        event_name: 'Step Title'
        data_type: string
        event_description: 'The title of the step.'
      -
        id: m6zdl8nm
        event_name: 'Is Last Step'
        data_type: boolean
        event_description: 'True when the event occured on the last step of a guide or survey. False otherwise.'
      -
        id: m6zdm2az
        event_name: Type
        data_type: string
        event_description: '`None` if guide, `Survey` if survey.'
      -
        id: m6zdmm45
        event_name: 'Variant ID'
        data_type: string
        event_description: 'A unique identifier for the guide or survey variant. Useful for analyzing guide or survey experiments.'
      -
        id: m6zdndpe
        event_name: Version
        data_type: number
        event_description: 'The version identifier for the guide or survey.'
        type: glossary_set
        enabled: true
      -
        id: m6zem80w
        glossary_section_title: 'Guides events'
        glossary_section_description: 'Events for guides.'
        event_row:
      -
        id: maraos0d
        event_name: 'Guide Viewed'
        event_description: 'A guide is viewed by a user.'
        event_specific_properties: |-
          The json source of the experience. Can be one of:
          - trigger
          - SDK
          - active experience
          - from experience x, step y
          - share link
      -
        id: maraocn2
        event_name: 'Tooltip Marker Viewed'
        event_description: 'The tooltip marker was seen by a user.'
      -
        id: maraos11
        event_name: Guide Dismissed
        event_description: 'A user dismissed a guide.'
      -
        id: marao0ds
        event_name: 'Guide Rage closed'
        event_description: 'The guide was closed within two seconds of appearing.'
      -
        id: maraowcp
        event_name: Guide Completed
        event_description: |-
          Indicates a guide is complete, through one of the following:

          1. The user clicks the _Done_ button in a checklist.
          2. The user clicks the button on the last step with a button.
          3. On the last step of a pin, the user clicks a button, the target element, or the advance target element.
          4. On a survey, the user clicks _Complete_ or finishes the last step.
          5. On a list or rating survey with no question on the last step, the user selects any option.

          This event doesn't fire on Tooltips.
      -
        id: maraomyn
        event_name: 'Guide Engaged'
        event_description: 'The user clicked or interacted with a guide.'
      -
        id: maraq2mj
        event_name: 'Guide Step Completed'
        event_description: 'The user completed a step or portion of the guide.'
      -
        id: maraj2dk
        event_name: 'Guide Snoozed'
        event_description: 'The user snoozed a step of the guide.'
      -
        id: marawlk9
        event_name: 'Pin Target Not Found'
        event_description: 'The target selector for the pin was not found.'
        type: event_set
        enabled: true
      -
        id: m6zemxyi
        glossary_section_title: 'Survey events'
        glossary_section_description: 'Events for surveys.'
        event_row:
      -
        id: m6zendv4
        event_name: 'Survey Submitted'
        event_description: 'A user provided input and completed a step in a survey. This event fires when a user submits their response for any step of the survey.'
        event_specific_properties: "`Survey Response` string. The user's response"
      -
        id: m6zeobhf
        event_name: 'Survey Abandoned'
        event_description: 'A user dismissed a survey when a response input was not empty.'
        event_specific_properties: "`Survey Response` string. The user's draft response"
      -
        id: m6zdu2th
        event_name: 'Survey Viewed'
        event_description: 'A survey is viewed by a user.'
        event_specific_properties: |-
          The json source of the experience. Can be one of:
          - trigger
          - SDK
          - active experience
          - from experience x, step y
          - share link
      -
        id: m6zdwrsc
        event_name: 'Tooltip Marker Viewed'
        event_description: 'The tooltip marker was seen by a user.'
      -
        id: m6zdx7xw
        event_name: Survey Dismissed
        event_description: 'A user dismissed a survey.'
      -
        id: m6zdxj4f
        event_name: 'Survey Rage closed'
        event_description: 'The survey was closed within two seconds of appearing.'
      -
        id: m6zdxx5e
        event_name: Survey Completed
        event_description: |-
          Indicates a survey is complete through one of the following:

          1. The user clicks the **Done** button in a checklist.
          2. The user clicks the button on the last step with a button.
          3. On the last step of a pin, the user clicks a button, the target element, or the advance target element.
          4. On a survey, the user clicks _Complete_ or finishes the last step.
          5. On a list or rating survey with no question on the last step, the user selects any option.

          This event doesn't fire on Tooltips.
      -
        id: m6zdxl2d
        event_name: 'Survey Step Completed'
        event_description: 'A user completed a step in a survey and advanced to the next step. This event fires when a user progresses from one step to another within the survey.'
      -
        id: m6zdxl1d
        event_name: 'Survey Engaged'
        event_description: 'The user clicked or interacted with a survey.'
      -
        id: m6zdxs0d
        event_name: 'Survey Snoozed'
        event_description: 'The user snoozed a step of the survey.'
      -
        id: m6zdxcvn
        event_name: 'Pin Target Not Found'
        event_description: 'The target selector for the pin was not found.'
        type: event_set
        enabled: true
      -
        id: rc001
        glossary_section_title: 'Resource Center events'
        glossary_section_description: 'Events for Resource Center interactions.'
        event_row:
      -
        id: rc002
        event_name: 'Resource Center Opened'
        event_description: 'The Resource Center is opened by a user.'
        event_specific_properties: 
      -
        id: rc003
        event_name: 'Resource Center Closed'
        event_description: 'The Resource Center is closed by a user.'
        event_specific_properties: 
      -
        id: rc004
        event_name: 'Resource Center Article Viewed'
        event_description: 'A user views a piece of content in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
      -
        id: rc005
        event_name: 'Resource Center Article Link Copied'
        event_description: 'A user copies the link to a document in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
      -
        id: rc006
        event_name: 'Resource Center Article Link Clicked'
        event_description: 'A user clicks a link within a piece of content in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
          - "Destination" string. The destination URL of the link.
      -
        id: rc007
        event_name: 'Resource Center Article Scrolled'
        event_description: 'A user scrolls through a piece of content in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
      -
        id: rc008
        event_name: 'Resource Center Video Viewed'
        event_description: 'A user views a video within the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
      -
        id: rc009
        event_name: 'Resource Center Video Played'
        event_description: 'A user clicks the play button of a video in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
      -
        id: rc010
        event_name: 'Resource Center Video Paused'
        event_description: 'A user clicks the pause button of a video in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
      -
        id: rc011
        event_name: 'Resource Center Video Closed'
        event_description: 'A user closes or stops a video within the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
          - "Duration" number. The duration in milliseconds that the video was viewed.
      -
        id: rc012
        event_name: 'Resource Center Article Closed'
        event_description: 'A user closes or navigates away from a piece of content in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the article.
          - "URL" string. The URL of the article.
          - "Source Key string. The source key of the article (if available).
          - "Duration" number. The duration in milliseconds that the video was viewed.
      -
        id: rc013
        event_name: 'Resource Center Search'
        event_description: 'A user executes a search in the Resource Center.'
        event_specific_properties: |-
          - "Input Text" string. The search query text.
          - "Results Count" number. The number of search results.
      -
        id: rc014
        event_name: 'Resource Center Result Clicked'
        event_description: 'A user clicks on a search result in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the clicked result.
          - "Excerpt" string. The excerpt of the clicked result.
          - "Type" string. The type of the clicked result (for example: 'document', 'video', 'resource', 'nudge').
          - "Source Key" string. The source key of the clicked result (if available).
          - "Position" number. The position of the clicked result in the list.
      -
        id: rc015
        event_name: 'Resource Center Recommendation Set Shown'
        event_description: 'A recommendation set is displayed in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the recommendation set.
          - "Key" string. The key of the recommendation set.
          - "Is Default" boolean. Whether the recommendation set is the default set.
      -
        id: rc016
        event_name: 'Resource Center Recommendation Clicked'
        event_description: 'A user clicks on an item in a recommendation set in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the clicked recommendation.
          - "Type" string. The type of the clicked recommendation (fir example: 'document', 'video', 'link', 'nudge').
          - "URL" string. The URL of the clicked recommendation (if available).
          - "Key" string. The key of the clicked recommendation (if available).
          - "Source Key" string. The source key of the clicked recommendation (if available).
          - "Position" number. The position of the clicked recommendation in the list.
          - "Recommendation Set Key" string. The key of the recommendation set that contains the clicked recommendation.
          - "Is Default" boolean. Whether the recommendation set is the default set.
          - "Is Autopilot" boolean. Whether the recommendation is an autopilot recommendation.
      -
        id: rc017
        event_name: 'Resource Center Quick Link Clicked'
        event_description: 'A user clicks on an item in the additional resources section (quick links) in the Resource Center.'
        event_specific_properties: |-
          - "Title" string. The title of the clicked quick link.
          - "Type" string. The type of the clicked quick link (for example: 'document', 'video', 'link', 'nudge').
          - "URL" string. The URL of the clicked quick link (if available).
          - "Key" string. The key of the clicked quick link (if available).
          - "Source Key" string. The source key of the clicked quick link (if available).
          - "Position" number. The position of the clicked quick link in the list.
          - "Is Default" boolean. Whether the quick link is in the default set.
        type: event_set
        enabled: true
---
Amplitude prefixes Guides and Surveys both events and event properties with `[Guides-Surveys]`. 


{{glossary}}
<h2 id="{{glossary_section_title | slugify}}">{{glossary_section_title}}</h2>
{{glossary_section_description | markdown}}
{{if glossary_row}}
<table>
<thead>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</thead>
<tbody>
{{glossary_row}}
<tr>
<td>{{event_name}}</td>
<td><code class="pr-2">{{data_type}}</code></td>
<td>{{event_description | markdown}}</td>
</tr>
{{/glossary_row}}
</tbody>
</table>
{{/if}}
{{if event_row}}
<table>
<thead>
<th>Event</th>
<th>Description</th>
<th>Properties</th>
</thead>
<tbody>
{{event_row}}
<tr>
<td>{{event_name}}</td>
<td>{{event_description | markdown}}</td>
<td>{{event_specific_properties | markdown}}</td>
</tr>
{{/event_row}}
</tbody>
</table>
{{/if}}
{{/glossary}}
