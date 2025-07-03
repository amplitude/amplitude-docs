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
          A guide's or survey’s "lifecycle" starts when it is triggered and ends when it is completed or dismissed. Lifecycle is independent of the application sessions.

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
    id: m6zdth1m
    glossary_section_title: 'Generic events'
    glossary_section_description: 'These events occur for both guides and surveys'
    event_row:
      -
        id: m6zdu2th
        event_name: Viewed
        event_description: 'A guide or survey is viewed by a users.'
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
        event_name: Dismissed
        event_description: 'A user dismissed a guide or survey.'
      -
        id: m6zdxj4f
        event_name: 'Rage closed'
        event_description: 'The guide or survey was closed within two seconds of appearing.'
      -
        id: m6zdxx5e
        event_name: Completed
        event_description: |-
          Indicates a guide or survey is complete, through one of the following:

          1. The user clicks the _Done_ button in a checklist.
          2. The user clicks the button on the last step with a button.
          3. On the last step of a pin, the user clicks a button, the target element, or the advance target element.
          4. On a survey, the user clicks _Complete_ or finishes the last step.
          5. On a list or rating survey with no question on the last step, the user selects any option.

          This event doesn't fire on Tooltips. For surveys, this is equivalent to the "Survey Completed" event.
    type: event_set
    enabled: true
  -
    id: m6zem80w
    glossary_section_title: 'Guide-specific events'
    glossary_section_description: 'Guide-specific events are only relevant to guides.'
    event_row:
      -
        id: m6zemhhp
        event_name: 'Guide completed'
        event_description: 'The user made it through all steps of the guide.'
      -
        id: marap59c
        event_name: 'Guide dismissed'
        event_description: 'The user clicked to dismiss or close a guide'
      -
        id: maraomyn
        event_name: 'Guide Engaged'
        event_description: 'The user clicked or interacted with a guide.'
      -
        id: maraq2mj
        event_name: 'Guide Step Completed'
        event_description: 'The user completed a step or portion of the guide.'
    type: event_set
    enabled: true
  -
    id: m6zemxyi
    glossary_section_title: 'Survey-specific events'
    glossary_section_description: 'Survey-specific events are only relevant to surveys.'
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
        id: 
        event_name: 'Survey Step Completed'
        event_description: 'A user completed a step in a survey and advanced to the next step. This event fires when a user progresses from one step to another within the survey.'
      -
        id: 
        event_name: 'Survey Completed'
        event_description: 'A user completed the last step of a survey. This event fires when a user finishes the entire survey by completing the final step.'
    type: event_set
    enabled: true
---
Amplitude prefixes guide-related events with `[Guides-Surveys] Guide` and survey-related events with `[Guides-Surveys] Survey`. 


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