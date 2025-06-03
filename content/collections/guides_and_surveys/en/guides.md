---
id: 2ce5d590-00c1-46a4-aad9-39465ed1eacf
blueprint: guides_and_survey
title: Guides
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738273216
ai_summary: "You can access technical documentation for Amplitude features. The content includes information on children, titles, and landing blurbs. This documentation serves as a resource for you to understand and utilize the various aspects of Amplitude's functionality."
---
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
{{ children}}
<a href="{{ url }}">
<div class="border border-black-100 rounded h-64 md:h-60 p-4 hover:shadow-lg transition-shadow text-black-900">
<p class="mt-0 leading-6 font-[Gellix] text-[1.25rem]">{{ title }}</p>
<div class="mb-0 text-[.875rem] leading-5 text-amp-gray-600 landing-blurb">{{ landing_blurb | markdown}}</div>
</div>
</a>
{{/children}}
</div>