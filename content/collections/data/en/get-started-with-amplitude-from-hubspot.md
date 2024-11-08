---
id: 4acc238e-a2ef-4cee-b123-dd16e08c3dfd
blueprint: starter
title: 'Get Started with Amplitude from HubSpot'
categories:
  -
    id: m37u3be1
    category_name: 'CDP or warehouse'
    integrations:
      - 5016fc9f-620b-4dae-82b0-0d9d9377c73e
      - 13a22669-5b4e-4d55-b942-3b842ad48b56
    type: category
    enabled: true
    description: 'some text'
  -
    id: m393cg97
    category_name: 'Marketing analytics'
    integrations:
      - 9066a0a1-19b7-4291-887a-8af4375ff471
    type: category
    enabled: true
  -
    id: m393dfuw
    category_name: CRM
    integrations:
      - ff23beaa-2f72-4c86-a20a-d8b35088e08e
      - 643a3c96-cc8f-4824-a2e8-2e8af2873080
    type: category
    enabled: true
  -
    id: m393e54v
    category_name: Messaging
    integrations:
      - 010e6c63-2545-4d85-aa38-cbd3b01a3d12
      - 345dca9c-afa7-43bf-af15-0c3760546397
      - c2261c0e-9ea7-46d1-8cce-b27d6ef82e58
    type: category
    enabled: true
  -
    id: m393fdym
    category_name: Advertising
    integrations:
      - 14aabb31-0c11-4354-a611-ba27d6aaab70
      - 586ace39-2932-4b93-80e0-12bbbbbb22ee
    type: category
    enabled: true
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1731091934
---
some intro text will go here

{{categories}}
<h2>{{category_name}}</h2>
{{description}}
<div class="flex flex-wrap gap-4">
{{integrations}}
<a href="{{ url }}">
                <div
                  class="border border-amp-gray-100 rounded h-24 w-64 p-4 hover:shadow-lg transition-shadow flex items-center">
                  <div>
                    <img src="{{integration_icon}}" class="h-12 w-12 max-w-12 max-h-12" />
                  </div>
                  <div class="pl-8">{{ title }}</div>
                </div>
              </a>
{{/integrations}}
</div>
{{/categories}}