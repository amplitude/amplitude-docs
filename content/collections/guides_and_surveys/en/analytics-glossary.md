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
        id: m6zdnd7g
        event_name: App Type
        data_type: string
        event_description: 'The app type for the guide or survey. Possible values: "ios", "android", "react native", "web".'
      -
        id: m6zd3t6w
        event_name: 'Is From Debug Mode'
        data_type: boolean
        event_description: 'True when the event was sent from preview mode. Use this property to filter administrative activity.'
      -
        id: m6zdl8nm
        event_name: 'Is Last Step'
        data_type: boolean
        event_description: 'True when the event occured on the last step of a guide or survey. False otherwise.'
      -
        id: m6zctcnn
        event_name: Key
        data_type: string
        event_description: 'A unique identifier for the guide or survey.'
      -
        id: m6zbea5t
        event_name: Page
        data_type: object
        event_description: |-
          Details about the page the user was on for the guide or survey event. Current object keys: 
          - "domain" (string): Page domain, for example: `example.com` 
          - "path" (string): URL path, for example: `/example-path/123
          - "title" (string): Page title, for example: `Dashboard`
      -
        id: m6zkam1u
        event_name: 'Lifecycle UUID'
        data_type: string
        event_description: |-
          Enables grouping of Guides and Surveys events by lifecycle.
          A guide's or survey’s lifecycle starts when it is triggered and ends when it is completed or dismissed. Lifecycle is independent of the application sessions.

          Lifecycle UUID is useful for analyzing events for a given guide/survey across multiple app sessions.
      -
        id: m6zdhv36
        event_name: 'Localization Language'
        data_type: string
        event_description: 'The language code for localization.'
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
        id: m6z0sdk1
        event_name: Tags
        data_type: array
        event_description: 'The list of tags on the guide or survey.'
      -
        id: m6z37ck
        event_name: Title
        data_type: string
        event_description: 'The title of the guide or survey.'
      -
        id: m6zdm2az
        event_name: Type
        data_type: string
        event_description: '`None` if guide, `Survey` if survey.'
      -
        id: m6zd4uip
        event_name: Page
        data_type: json
        event_description: 'Details about the page of the guide or survey on which the event occured.'
      -
        id: m6zdmm45
        event_name: 'Variant ID'
        data_type: string
        event_description: 'A unique identifier for the guide or survey variant. Useful for analyzing guide or survey experiments.'
      -
        id: m6zdndpe
        event_name: Version
        data_type: number
        event_description: 'The version identifier.'
      
    type: glossary_set
    enabled: true
  -
    id: m6zem80w
    glossary_section_title: 'Guides events'
    glossary_section_description: 'Events for guides.'
    event_row:
      -
        id: maraocn2
        event_name: 'Guide Tooltip Icon Viewed'
        event_description: 'The tooltip icon was seen by a user.'
      -
        id: maraos0d
        event_name: 'Guide Viewed'
        event_description: 'A guide is viewed by a user.'
        event_specific_properties: |-
          `Source` (json): Explains why the guide was viewed.
          
          `Source.type` (string): Values:
          - nudge
          - trigger
          - sdk
          - share_link
          - active
          - debug

          `Source.properties.triggerType` (string): Details the trigger's type.
      -
        id: maraos11
        event_name: Guide Dismissed
        event_description: 'A user dismissed a guide.'
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
        id: marao0ds
        event_name: 'Guide Rage Closed'
        event_description: 'The guide was dismissed within two seconds of appearing.'
      -
        id: maraq2mj
        event_name: 'Guide Step Completed'
        event_description: 'The user completed a step or portion of the guide.'
        event_specific_properties: |-
          `Was Completed Via CTA` (boolean): True if the step was completed through one of the step's CTA's.
      -
        id: maraj2dk
        event_name: 'Guide Snoozed'
        event_description: 'The user snoozed a step of the guide.'
        event_specific_properties: "`Snooze Duration` (number): Duration of the snooze in ms"
      -
        id: maraomyn
        event_name: 'Guide Engaged'
        event_description: 'The user clicked or interacted with a guide.'
        event_specific_properties: |-
          `Engagement` (object): Object with details about the type of engagement. 
          
          Current keys:
          - `type` (string): The type of engagement. Possible values: "cta", "link", "survey_focused".
          - `level` (string): For CTA engagement events, the type of CTA engaged. Possible values: "primary", "secondary", "tertiary".
          - `url` (string): For link engagement events, the URL of the link that the user clicked.
      -
        id: marawlk9
        event_name: 'Error: Pin Target Not Found'
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
        event_specific_properties: |-
          `Survey Response` (number | string | array): The user's response. The value type depends on the question type. For list surveys, this property indicates the survey indices as shown in the survey's Build tab. E.g., [0,3] corresponds to the user selecting the first and fourth options as shown in the survey's Build tab. These indices are particularly useful when randomizing the list order.

          `Survey Response Array` (array): The user's response as an array. Useful if the question is a list with multi-select. Example: ["Option 1", "Option 3"]

          `Survey Response Number` (number): The user's response as a number. Useful if the question type is rating.

          `Survey Response String` (string): The user's response as a string. Useful if the question type is: long text, short text, or list.

          `Survey Response Other` (string): The user's input for the "other" field. Useful if the question is a list with the setting "Other option" enabled.
      -
        id: m6zeobhf
        event_name: 'Survey Abandoned'
        event_description: 'A user dismissed a survey when a response input was not empty.'
        event_specific_properties: |-
          `Survey Response` (number | string | array): The user's response. The value type depends on the question type. For list surveys, this property indicates the survey indices as shown in the survey's Build tab. E.g., [0,3] corresponds to the user selecting the first and fourth options as shown in the survey's Build tab. These indices are particularly useful when randomizing the list order.

          `Survey Response Array` (array): The user's response as an array. Useful if the question is a list with multi-select. Example: ["Option 1", "Option 3"]

          `Survey Response Number` (number): The user's response as a number. Useful if the question type is rating.

          `Survey Response String` (string): The user's response as a string. Useful if the question type is: long text, short text, or list.

          `Survey Response Other` (string): The user's input for the "other" field. Useful if the question is a list with the setting "Other option" enabled.
      -
        id: m6zdu2th
        event_name: 'Survey Viewed'
        event_description: 'A survey is viewed by a user.'
        event_specific_properties: |-
          `Source` (json): Explains why the survey was viewed.
          
          `Source.type` (string): Values:
          - nudge
          - trigger
          - sdk
          - share_link
          - active
          - debug

          `Source.properties.triggerType` (string): Details the trigger's type.
      -
        id: m6zdx7xw
        event_name: Survey Dismissed
        event_description: 'A user dismissed a survey.'
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
        id: m6zdxj4f
        event_name: 'Survey Rage Closed'
        event_description: 'The survey was dismissed within two seconds of appearing.'
      -
        id: 
        event_name: 'Survey Step Completed'
        event_description: 'A user completed a step in a survey and advanced to the next step. This event fires when a user progresses from one step to another within the survey.'
        event_specific_properties: |-
          `Was Completed Via CTA` (boolean): True if the step was completed via one of the step's CTA's.
      -
        id: m6zdxs0d
        event_name: 'Survey Snoozed'
        event_description: 'The user snoozed a step of the survey.'
        event_specific_properties: "`Snooze Duration` (number): Duration of the snooze in ms
      -
        id: m6zdxl1d
        event_name: 'Survey Engaged'
        event_description: 'The user clicked or interacted with a survey.'
        event_specific_properties: |-
          `Engagement` (object): Object with details about the type of engagement. 
          
          Current keys:
          - `type` (string): The type of engagement. Possible values: "cta", "link", "survey_focused".
          - `level` (string): For CTA engagement events, the type of CTA engaged. Possible values: "primary", "secondary", "tertiary".
          - `url` (string): For link engagement events, the URL of the link that the user clicked.
      -
        id: m6zdxcvn
        event_name: 'Error: Pin Target Not Found'
        event_description: 'The target selector for the pin was not found.'
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
