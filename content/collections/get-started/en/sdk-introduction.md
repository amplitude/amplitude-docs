---
id: 7e2d1c0b-3a4f-5e6d-7c8b-9a0b1c2d3e4f
blueprint: get-started
title: 'Introduction to Amplitude SDKs'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732147200
---
Amplitude SDKs are client libraries that help you track user behavior in your applications. This guide explains what SDKs do, how to choose the right one, and the key concepts you need to understand before implementing.

## What SDKs do

Amplitude SDKs handle the complexity of analytics instrumentation so you can focus on building your product. They provide:

| Capability | Description |
|------------|-------------|
| Event tracking | Send user actions and behaviors to Amplitude. |
| User identification | Link events to specific users across sessions and devices. |
| Automatic tracking | Capture sessions, page views, and attribution without code. |
| Offline support | Queue events when users are offline and send when connectivity returns. |
| Batching | Group events for efficient network usage and better performance. |
| Data validation | Ensure events are properly formatted before sending. |

## Choose the right SDK

Amplitude offers SDKs for every major platform. Choose based on where your application runs.

### Client-side SDKs

Use client-side SDKs for applications that run on user devices.

| Platform | SDK | Best for |
|----------|-----|----------|
| Web | [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) | Websites, web apps, SPAs |
| iOS | [iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk) | Native iOS apps |
| Android | [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk) | Native Android apps |
| React Native | [React Native SDK](/docs/sdks/analytics/react-native/react-native-sdk) | Cross-platform mobile apps |
| Flutter | [Flutter SDK](/docs/sdks/analytics/flutter/flutter-sdk) | Cross-platform mobile apps |
| Unity | [Unity SDK](/docs/sdks/analytics/unity/unity-sdk) | Games built with Unity |

### Server-side SDKs

Use server-side SDKs for applications that run on your servers.

| Platform | SDK | Best for |
|----------|-----|----------|
| Node.js | [Node.js SDK](/docs/sdks/analytics/node/node-js-sdk) | Node.js backends, serverless functions |
| Python | [Python SDK](/docs/sdks/analytics-sdks/python/python-sdk) | Python backends, data pipelines |
| Go | [Go SDK](/docs/sdks/analytics/go/go-sdk) | Go backends, microservices |
| Java | [Java SDK](/docs/sdks/analytics/java/java-sdk) | Java backends, Android (advanced) |

### When to use client-side vs server-side

| Scenario | Recommendation |
|----------|----------------|
| Track user interactions (clicks, page views) | Client-side SDK |
| Track business events (purchases, subscriptions) | Server-side SDK |
| Track events from both frontend and backend | Use both |
| Track server-only events (API calls, jobs) | Server-side SDK |

## Key concepts

Before implementing an SDK, understand these core concepts.

### Events

Events are the foundation of Amplitude analytics. An event represents something a user did.

```javascript
// Basic event
amplitude.track('Button Clicked');

// Event with properties
amplitude.track('Purchase Completed', {
  product_id: 'SKU-123',
  price: 49.99,
  currency: 'USD'
});
```

**Best practices for events:**
- Use verb + noun format: "Button Clicked", "Purchase Completed", "Video Played".
- Keep event names consistent across platforms.
- Include relevant properties that help you analyze the event.

### Event properties

Event properties are metadata about an event. They help you segment and filter your analysis.

```javascript
amplitude.track('Search Performed', {
  query: 'running shoes',           // What they searched
  results_count: 42,                // How many results
  filter_applied: true,             // Did they filter?
  category: 'footwear'              // Product category
});
```

### User properties

User properties are attributes that describe a user. Unlike event properties, they persist across events.

```javascript
// Set user properties
amplitude.identify(new amplitude.Identify()
  .set('plan', 'premium')
  .set('company', 'Acme Inc')
  .set('signup_date', '2024-01-15')
);
```

**Common user properties:**
- Account type or plan tier.
- Company or organization.
- User preferences.
- Signup or registration date.

### User identification

Amplitude tracks users through different identifiers.

| Identifier | Description | When to use |
|------------|-------------|-------------|
| Device ID | Auto-generated, device-specific | Anonymous users |
| User ID | Your identifier (email, UUID) | Logged-in users |
| Amplitude ID | Amplitude's internal ID | Used for cross-device tracking |

```javascript
// Set user ID when user logs in
amplitude.setUserId('user@example.com');

// Clear user ID when user logs out
amplitude.reset();
```

### Sessions

A session represents a period of continuous user activity. Amplitude automatically tracks sessions with a default timeout of 30 minutes.

Sessions help you understand:
- How long users spend in your app.
- How many sessions before conversion.
- Session frequency over time.

## Implementation patterns

### Basic implementation

The simplest implementation tracks a few key events:

```javascript
import * as amplitude from '@amplitude/analytics-browser';

// Initialize once at app start
amplitude.init('AMPLITUDE_API_KEY');

// Track events throughout your app
amplitude.track('Page Viewed', { page: 'Homepage' });
amplitude.track('Button Clicked', { button: 'Sign Up' });
amplitude.track('Form Submitted', { form: 'Registration' });
```

### Implementation with user identification

Track anonymous users, then identify them when they sign up or log in:

```javascript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('AMPLITUDE_API_KEY');

// User browses anonymously - events tracked with device ID
amplitude.track('Page Viewed', { page: 'Pricing' });

// User signs up - link their identity
amplitude.setUserId('user@example.com');
amplitude.identify(new amplitude.Identify()
  .set('plan', 'free')
  .set('signup_source', 'organic')
);
amplitude.track('Account Created');

// Continue tracking with user ID
amplitude.track('Feature Used', { feature: 'Dashboard' });
```

### Implementation with Autocapture

For web applications, enable [Autocapture](/docs/get-started/autocapture) to track events automatically:

```javascript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('AMPLITUDE_API_KEY', {
  autocapture: {
    elementInteractions: true,  // Track clicks, changes
    pageViews: true,            // Track page views
    sessions: true,             // Track sessions
    attribution: true           // Track marketing attribution
  }
});
```

## SDK architecture

Understanding how SDKs work helps you troubleshoot and optimize your implementation.

### Event flow

```
Your Code → SDK → Event Queue → Batch → HTTP Request → Amplitude
```

1. **Your code** calls `track()`.
2. **SDK** validates and enriches the event.
3. **Event queue** stores the event locally.
4. **Batching** groups events (default: every 30 seconds or 30 events).
5. **HTTP request** sends events to Amplitude's servers.
6. **Amplitude** processes and stores the events.

### Offline handling

SDKs handle network issues gracefully:

1. Events are stored locally when offline.
2. SDK retries with exponential backoff on failure.
3. Events are sent in order when connectivity returns.
4. Storage limits prevent memory issues (default: 1000 events).

### Performance considerations

SDKs are designed for minimal performance impact:

- **Async operations**: Tracking doesn't block your UI.
- **Efficient batching**: Fewer network requests.
- **Compressed payloads**: Smaller data transfer.
- **Background sending**: Events sent without user awareness.

## Common questions

### Do I need a separate SDK for each platform?

Yes. Use the SDK designed for your platform. If you have a web app and mobile apps, implement the Browser SDK for web and the iOS/Android SDKs for mobile. Events from all platforms appear in the same Amplitude project.

### What happens if users have ad blockers?

Some ad blockers may block requests to Amplitude's servers. Options include:
- Use a [proxy](/docs/sdks/analytics/browser/browser-sdk-2#use-a-custom-proxy) to route requests through your domain.
- Implement server-side tracking for critical events.
- Accept some data loss from privacy-focused users.

### How do I track events from both frontend and backend?

Use both client-side and server-side SDKs with the same API key. Pass the user ID from frontend to backend to ensure events are linked to the same user.

```javascript
// Frontend: Track user action
amplitude.track('Checkout Started');

// Backend: Track purchase completion
amplitude.track('Purchase Completed', purchaseDetails, {
  user_id: userId  // Same user ID as frontend
});
```

### Can I use Amplitude with my existing analytics?

Yes. Amplitude SDKs work alongside other analytics tools. You can also use [integrations](/docs/data/source-catalog) to import data from other sources.

## Related resources

- [Developer quickstart](/docs/get-started/quickstart-developer).
- [Select events to track](/docs/get-started/select-events).
- [Identify users](/docs/get-started/identify-users).
- [SDK reference](/docs/sdks).
- [HTTP API](/docs/apis/analytics/http-v2) for direct server integration.

