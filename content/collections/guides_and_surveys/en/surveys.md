---
id: 2c2f82c7-16e5-42b6-8d4e-0068f9bb0066
blueprint: guides_and_survey
title: Surveys
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738273332
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