---
id: 6256c202-9b37-499f-ba00-750b6e0be99f
blueprint: guides_and_survey
title: 'Resource Center'
landing: false
updated_by: 15756874-6eaf-4a8c-8779-bd4081ba41b6
updated_at: 1750951929
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