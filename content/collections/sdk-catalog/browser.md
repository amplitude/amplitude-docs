---
id: d97ddfe8-6b08-4dce-91dc-53d41ef7eb0a
blueprint: sdk-catalog
title: 'Browser SDK'
source: 'https://www.docs.developers.amplitude.com/data/sdks/browser-2/'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1709241991
---
```ts
// Option 1, initialize with Amplitude API key only
amplitude.init(AMPLITUDE_API_KEY);

// Option 2, initialize with options
amplitude.init(AMPLITUDE_API_KEY, options);

// Option 3, initialize with user ID if it's already known
amplitude.init(AMPLITUDE_API_KEY, 'user@amplitude.com');

// Option 4, initialize with a user ID and options
amplitude.init(AMPLITUDE_API_KEY, 'user@amplitude.com', options);
```