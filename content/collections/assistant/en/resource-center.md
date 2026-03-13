---
id: 6999a10b-7684-423b-9a49-dc1c191c6522
blueprint: assistant
title: 'Resource Center'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1773093692
---
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
{{collection:resource_center}}
<a href="{{ url }}">
<div class="border border-black-100 rounded h-64 md:h-60 p-4 hover:shadow-lg transition-shadow text-black-900">
<p class="mt-0 leading-6 font-[Gellix] text-[1.25rem]">{{ title }}</p>
<div class="mb-0 text-[.875rem] leading-5 text-amp-gray-600 landing-blurb">{{ landing_blurb | markdown}}</div>
</div>
</a>
{{/collection:resource_center}}
</div>