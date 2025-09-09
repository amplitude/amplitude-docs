---
id: cc86bea6-52a3-4c4b-8da4-2c5c159ccccc
blueprint: browser_sdk
title: 'Next.js Installation Guide'
sdk_status: current
article_type: guide
supported_languages:
  - js
  - ts
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser'
updated_at: 1749752109
exclude_from_sitemap: false
platform: browser
nav_title: developers
---

This guide covers the installation and setup of Amplitude's Browser SDK in Next.js applications and includes instructions for both client-side and server-side configurations.

## Prerequisites

- Next.js 13.0 or higher
- Node.js 16.8 or higher
- An Amplitude account with an API key

## Installation

{{partial:admonition type="info" heading="Unified SDK Recommended"}}
The [Unified SDK](/docs/sdks/analytics/browser/browser-unified-sdk) provides access to Analytics, Experiment, and Session Replay in a single package. Amplitude recommends this approach for new Next.js projects.
{{/partial:admonition}}

Install the Amplitude SDK using your package manager:

{{partial:tabs tabs="npm, yarn, pnpm"}}
{{partial:tab name="npm"}}
```bash
# Recommended: Install Unified SDK (includes Analytics, Experiment, Session Replay)
npm install @amplitude/unified

# Or install Analytics SDK only
npm install @amplitude/analytics-browser
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
# Recommended: Install Unified SDK (includes Analytics, Experiment, Session Replay)
yarn add @amplitude/unified

# Or install Analytics SDK only
yarn add @amplitude/analytics-browser
```
{{/partial:tab}}
{{partial:tab name="pnpm"}}
```bash
# Recommended: Install Unified SDK (includes Analytics, Experiment, Session Replay)
pnpm add @amplitude/unified

# Or install Analytics SDK only
pnpm add @amplitude/analytics-browser
```
{{/partial:tab}}
{{/partial:tabs}}

## Client-side setup

Follow the instructions in this section to configure Amplitude on the client.

### App Router (Next.js 13+)

Create an Amplitude provider component to initialize the SDK on the client side.

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// app/providers/AmplitudeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as amplitude from "@amplitude/unified";

interface AmplitudeContextType {
  isInitialized: boolean;
  amplitude: typeof amplitude;
}

const defaultContext: AmplitudeContextType = {
  isInitialized: false,
  amplitude: amplitude,
};

const AmplitudeContext = createContext<AmplitudeContextType>(defaultContext);

export function AmplitudeProvider({
  children,
  apiKey,
}: {
  children: React.ReactNode;
  apiKey: string;
}) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== "undefined" && !isInitialized) {
      amplitude.initAll(apiKey, {
        analytics: {
          autocapture: {
            sessions: true,
            pageViews: true,
            formInteractions: true,
            fileDownloads: true,
            elementInteractions: true,
          },
          logLevel: amplitude.Types.LogLevel.Warn,
          flushIntervalMillis: 30000,
          flushQueueSize: 30,
        },
      });

      setIsInitialized(true);
    }
  }, [apiKey, isInitialized]);

  const contextValue = { isInitialized, amplitude };
  
  return (
    <AmplitudeContext.Provider value={contextValue}>
      {children}
    </AmplitudeContext.Provider>
  );
}

export const useAmplitude = () => {
  const context = useContext(AmplitudeContext);
  if (!context) {
    throw new Error("useAmplitude must be used within AmplitudeProvider");
  }
  return context;
};
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// app/providers/AmplitudeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";

interface AmplitudeContextType {
  isInitialized: boolean;
  amplitude: typeof amplitude;
}

const defaultContext: AmplitudeContextType = {
  isInitialized: false,
  amplitude: amplitude,
};

const AmplitudeContext = createContext<AmplitudeContextType>(defaultContext);

export function AmplitudeProvider({
  children,
  apiKey,
}: {
  children: React.ReactNode;
  apiKey: string;
}) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== "undefined" && !isInitialized) {
      amplitude.init(apiKey, undefined, {
        autocapture: {
          sessions: true,
          pageViews: true,
          formInteractions: true,
          fileDownloads: true,
          elementInteractions: true,
        },
        logLevel: amplitude.Types.LogLevel.Warn,
        flushIntervalMillis: 30000,
        flushQueueSize: 30,
      });

      setIsInitialized(true);
    }
  }, [apiKey, isInitialized]);

  const contextValue = { isInitialized, amplitude };
  
  return (
    <AmplitudeContext.Provider value={contextValue}>
      {children}
    </AmplitudeContext.Provider>
  );
}

export const useAmplitude = () => {
  const context = useContext(AmplitudeContext);
  if (!context) {
    throw new Error("useAmplitude must be used within AmplitudeProvider");
  }
  return context;
};
```
{{/partial:tab}}
{{/partial:tabs}}

Add the provider to your root layout.

```typescript
// app/layout.tsx
import { AmplitudeProvider } from './providers/AmplitudeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AmplitudeProvider apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!}>
          {children}
        </AmplitudeProvider>
      </body>
    </html>
  );
}
```

### Pages router (legacy)

For the Pages Router, initialize Amplitude in `_app.tsx`.

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import * as amplitude from '@amplitude/unified';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Amplitude on client side only
    if (typeof window !== 'undefined') {
      amplitude.initAll(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
        analytics: {
          autocapture: {
            sessions: true,
            pageViews: true,
            formInteractions: true,
            fileDownloads: true,
          },
        },
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import * as amplitude from '@amplitude/analytics-browser';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Amplitude on client side only
    if (typeof window !== 'undefined') {
      amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, undefined, {
        autocapture: {
          sessions: true,
          pageViews: true,
          formInteractions: true,
          fileDownloads: true,
        },
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```
{{/partial:tab}}
{{/partial:tabs}}

### Using Amplitude in components

With the App Router setup:

```typescript
// app/components/TrackingButton.tsx
'use client';

import { useAmplitude } from '../providers/AmplitudeProvider';

export function TrackingButton() {
  const { amplitude, isInitialized } = useAmplitude();

  const handleClick = () => {
    if (isInitialized) {
      amplitude.track('Button Clicked', {
        buttonName: 'CTA Button',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

## Server-side setup

Follow the instructions in this section to configure Amplitude on the server.

### Server components and API routes

For server-side tracking, use the Node.js SDK instead of the Browser SDK.

```bash
npm install @amplitude/analytics-node
```

Create a server-side Amplitude client.

```typescript
// lib/amplitude-server.ts
import { init, track, identify, flush, Identify } from '@amplitude/analytics-node';

// Initialize once
const amplitudeServer = init(process.env.AMPLITUDE_API_KEY!);

export async function trackServerEvent(
  eventName: string,
  userId?: string,
  eventProperties?: Record<string, any>
) {
  try {
    track(eventName, eventProperties, {
      user_id: userId,
    });
    
    // Ensure events are sent before function ends
    await flush().promise;
  } catch (error) {
    console.error('Failed to track server event:', error);
  }
}

export async function identifyServerUser(
  userId: string,
  userProperties?: Record<string, any>
) {
  try {
    const identifyObj = new Identify();
    
    // Set user properties if provided
    if (userProperties) {
      Object.entries(userProperties).forEach(([key, value]) => {
        identifyObj.set(key, value);
      });
    }
    
    identify(identifyObj, {
      user_id: userId,
    });
    
    await flush().promise;
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
}
```

Add the server-side client to API routes.

```typescript
// app/api/track/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';
import { trackServerEvent } from '@/lib/amplitude-server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { eventName, userId, properties } = body;
  
  await trackServerEvent(eventName, userId, properties);
  
  return NextResponse.json({ success: true });
}
```

```typescript
// pages/api/track.ts (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';
import { trackServerEvent } from '@/lib/amplitude-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { eventName, userId, properties } = req.body;
  
  await trackServerEvent(eventName, userId, properties);
  
  res.status(200).json({ success: true });
}
```

## Best Practices

Keep the following best practices in mind as you build your integration.

### Environment variables

Store your API keys in environment variables:

```bash
# .env.local
NEXT_PUBLIC_AMPLITUDE_API_KEY=your_client_api_key
AMPLITUDE_API_KEY=your_server_api_key
```

{{partial:admonition type="warning" heading="Security Note"}}
Only use `NEXT_PUBLIC_` prefix for client-side API keys. Server-side API keys should never be exposed to the client.
{{/partial:admonition}}

### User identification

Identify users after authentication:

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// After successful login
const handleLogin = async (email: string, userId: string) => {
  // Client-side identification
  if (typeof window !== 'undefined') {
    amplitude.setUserId(userId);
    amplitude.identify(new amplitude.Identify()
      .set('email', email)
      .set('loginTime', new Date().toISOString())
    );
  }
  
  // Server-side identification (if needed)
  await fetch('/api/identify', {
    method: 'POST',
    body: JSON.stringify({ userId, email }),
  });
};
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// After successful login
const handleLogin = async (email: string, userId: string) => {
  // Client-side identification
  if (typeof window !== 'undefined') {
    amplitude.setUserId(userId);
    amplitude.identify(new amplitude.Identify()
      .set('email', email)
      .set('loginTime', new Date().toISOString())
    );
  }
  
  // Server-side identification (if needed)
  await fetch('/api/identify', {
    method: 'POST',
    body: JSON.stringify({ userId, email }),
  });
};
```
{{/partial:tab}}
{{/partial:tabs}}

### Automatic page view tracking

Amplitude's autocapture feature automatically tracks page views in Next.js applications.

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// Page views are automatically tracked when you enable autocapture
amplitude.initAll(apiKey, {
  analytics: {
    autocapture: {
      pageViews: true, // Automatically tracks route changes
    },
  },
});
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// Page views are automatically tracked when you enable autocapture
amplitude.init(apiKey, undefined, {
  autocapture: {
    pageViews: true, // Automatically tracks route changes
  },
});
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="info" heading="Page View Configuration"}}
Autocapture intelligently detects Next.js route changes and tracks them as page views. For advanced configuration, review [Track page views](/docs/sdks/analytics/browser/browser-sdk-2#track-page-views).
{{/partial:admonition}}

### Session Replay integration

Capture user sessions to understand behavior and debug issues:

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// Enable Session Replay with the Unified SDK
import * as amplitude from '@amplitude/unified';

amplitude.initAll(apiKey, {
  analytics: {
    autocapture: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
    },
  },
  sessionReplay: {
    enabled: true,
    sampleRate: 0.5, // Sample 50% of sessions
    maskAllTexts: true, // Privacy: mask sensitive text
    maskAllInputs: true, // Privacy: mask input fields
  },
});
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// Session Replay requires separate installation with Analytics SDK
import * as amplitude from '@amplitude/analytics-browser';
import * as sessionReplay from '@amplitude/session-replay-browser';

// Initialize Analytics
amplitude.init(apiKey, undefined, {
  autocapture: {
    sessions: true,
    pageViews: true,
    formInteractions: true,
  },
});

// Initialize Session Replay separately
sessionReplay.init(apiKey, {
  sampleRate: 0.5, // Sample 50% of sessions
  maskAllTexts: true, // Privacy: mask sensitive text
  maskAllInputs: true, // Privacy: mask input fields
});
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="info" heading="Session Replay"}}
Session Replay provides visual playback of user sessions. Learn more in the [Session Replay documentation](/docs/session-replay).
{{/partial:admonition}}

### Use Autocapture and custom events

Use Amplitude's autocapture to automatically track common interactions:

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// Enable comprehensive autocapture
amplitude.initAll(apiKey, {
  analytics: {
    autocapture: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
      elementInteractions: true, // Tracks clicks on buttons, links, and more.
    },
  },
});
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// Enable comprehensive autocapture
amplitude.init(apiKey, undefined, {
  autocapture: {
    sessions: true,
    pageViews: true,
    formInteractions: true,
    fileDownloads: true,
    elementInteractions: true, // Tracks clicks on buttons, links, and more.
  },
});
```
{{/partial:tab}}
{{/partial:tabs}}

For business-specific events that autocapture doesn't cover:

```typescript
// hooks/useTrackEvent.ts
import { useCallback } from 'react';
import { useAmplitude } from '@/app/providers/AmplitudeProvider';

export function useTrackEvent() {
  const { amplitude, isInitialized } = useAmplitude();

  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      if (isInitialized) {
        amplitude.track(eventName, properties);
      }
    },
    [amplitude, isInitialized]
  );

  return trackEvent;
}

// Usage for custom business events
export function ProductCard({ product }: { product: Product }) {
  const trackEvent = useTrackEvent();

  const handleAddToCart = () => {
    trackEvent('Product Added to Cart', {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
    });
    // Add to cart logic
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

{{partial:admonition type="tip" heading="Autocapture vs Custom Events"}}
Autocapture handles standard interactions like clicks, form submissions, and page views. Use custom events for business-specific actions like "Product Added to Cart" or "Subscription Upgraded."
{{/partial:admonition}}

### Visual Labeling for Next.js

Use Amplitude's Visual Labeling to tag elements directly in your browser without code changes:

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// Visual Labeling works automatically with autocapture enabled
amplitude.initAll(apiKey, {
  analytics: {
    autocapture: {
      elementInteractions: true, // Required for Visual Labeling
    },
  },
});
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// Visual Labeling works automatically with autocapture enabled
amplitude.init(apiKey, undefined, {
  autocapture: {
    elementInteractions: true, // Required for Visual Labeling
  },
});
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="tip" heading="Visual Labeling"}}
Visit your Next.js app with the [Amplitude Chrome Extension](https://chromewebstore.google.com/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp) to view the fired events in the page.
{{/partial:admonition}}

### Middleware integration

Track server-side events using Next.js middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Track API requests
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Log to server-side analytics
    console.log('API Request:', {
      path: request.nextUrl.pathname,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
```

### Session management

Ensure you handle user sessions correctly.

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// utils/amplitude-session.ts
import * as amplitude from '@amplitude/unified';

export function handleUserSession() {
  // On login
  const onLogin = (userId: string, userProperties?: Record<string, any>) => {
    amplitude.setUserId(userId);
    if (userProperties) {
      const identify = new amplitude.Identify();
      Object.entries(userProperties).forEach(([key, value]) => {
        identify.set(key, value);
      });
      amplitude.identify(identify);
    }
  };

  // On logout
  const onLogout = () => {
    amplitude.setUserId(undefined);
    amplitude.reset();
  };

  return { onLogin, onLogout };
}
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// utils/amplitude-session.ts
import * as amplitude from '@amplitude/analytics-browser';

export function handleUserSession() {
  // On login
  const onLogin = (userId: string, userProperties?: Record<string, any>) => {
    amplitude.setUserId(userId);
    if (userProperties) {
      const identify = new amplitude.Identify();
      Object.entries(userProperties).forEach(([key, value]) => {
        identify.set(key, value);
      });
      amplitude.identify(identify);
    }
  };

  // On logout
  const onLogout = () => {
    amplitude.setUserId(undefined);
    amplitude.reset();
  };

  return { onLogin, onLogout };
}
```
{{/partial:tab}}
{{/partial:tabs}}

### TypeScript support

Create type-safe event tracking:

```typescript
// types/amplitude-events.ts
export interface AmplitudeEvents {
  'Page Viewed': {
    page: string;
    url: string;
    referrer?: string;
  };
  'Button Clicked': {
    buttonName: string;
    page: string;
    section?: string;
  };
  'Form Submitted': {
    formName: string;
    fields: string[];
    success: boolean;
  };
  'Product Added to Cart': {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  };
}

// hooks/useTypedTracking.ts
import { useAmplitude } from '@/app/providers/AmplitudeProvider';
import type { AmplitudeEvents } from '@/types/amplitude-events';

export function useTypedTracking() {
  const { amplitude, isInitialized } = useAmplitude();

  function track<K extends keyof AmplitudeEvents>(
    eventName: K,
    properties: AmplitudeEvents[K]
  ) {
    if (isInitialized) {
      amplitude.track(eventName, properties);
    }
  }

  return { track };
}
```

### Testing

Mock Amplitude in tests:

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// __mocks__/amplitude.ts
export const mockAmplitude = {
  initAll: jest.fn(),
  track: jest.fn(),
  identify: jest.fn(),
  setUserId: jest.fn(),
  reset: jest.fn(),
};

jest.mock('@amplitude/unified', () => mockAmplitude);

// In your tests
import { render, fireEvent } from '@testing-library/react';
import { TrackingButton } from '@/components/TrackingButton';
import { mockAmplitude } from '@/__mocks__/amplitude';

describe('TrackingButton', () => {
  it('tracks click event', () => {
    const { getByText } = render(<TrackingButton />);
    fireEvent.click(getByText('Click Me'));
    
    expect(mockAmplitude.track).toHaveBeenCalledWith(
      'Button Clicked',
      expect.objectContaining({
        buttonName: 'CTA Button',
      })
    );
  });
});
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// __mocks__/amplitude.ts
export const mockAmplitude = {
  init: jest.fn(),
  track: jest.fn(),
  identify: jest.fn(),
  setUserId: jest.fn(),
  reset: jest.fn(),
};

jest.mock('@amplitude/analytics-browser', () => mockAmplitude);

// In your tests
import { render, fireEvent } from '@testing-library/react';
import { TrackingButton } from '@/components/TrackingButton';
import { mockAmplitude } from '@/__mocks__/amplitude';

describe('TrackingButton', () => {
  it('tracks click event', () => {
    const { getByText } = render(<TrackingButton />);
    fireEvent.click(getByText('Click Me'));
    
    expect(mockAmplitude.track).toHaveBeenCalledWith(
      'Button Clicked',
      expect.objectContaining({
        buttonName: 'CTA Button',
      })
    );
  });
});
```
{{/partial:tab}}
{{/partial:tabs}}

### Performance optimization

Optimize SDK initialization and loading:

```typescript
// app/providers/AmplitudeProvider.tsx
import dynamic from 'next/dynamic';

// Lazy load Amplitude for better initial page load
const AmplitudeProviderClient = dynamic(
  () => import('./AmplitudeProviderClient'),
  { 
    ssr: false,
    loading: () => null,
  }
);

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AmplitudeProviderClient>
      {children}
    </AmplitudeProviderClient>
  );
}
```

## Debugging

Enable debug mode during development:

{{partial:tabs tabs="Unified SDK, Analytics SDK"}}
{{partial:tab name="Unified SDK"}}
```typescript
// Development configuration
amplitude.initAll(apiKey, {
  analytics: {
    logLevel: amplitude.Types.LogLevel.Debug,
    minIdLength: 1, // Allow shorter IDs in development
    serverUrl: process.env.NEXT_PUBLIC_AMPLITUDE_SERVER_URL, // Custom server URL if needed
    autocapture: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
      elementInteractions: true,
    },
  },
});
```
{{/partial:tab}}
{{partial:tab name="Analytics SDK"}}
```typescript
// Development configuration
amplitude.init(apiKey, undefined, {
  logLevel: amplitude.Types.LogLevel.Debug,
  minIdLength: 1, // Allow shorter IDs in development
  serverUrl: process.env.NEXT_PUBLIC_AMPLITUDE_SERVER_URL, // Custom server URL if needed
  autocapture: {
    sessions: true,
    pageViews: true,
    formInteractions: true,
    fileDownloads: true,
    elementInteractions: true,
  },
});
```
{{/partial:tab}}
{{/partial:tabs}}

Check browser console for Amplitude logs:
- Event tracking confirmation
- Configuration issues
- Network request status

## Common issues and solutions



### Window is not defined

Always check for browser environment before using Browser SDK:
```typescript
if (typeof window !== 'undefined') {
  // Browser-only code
}
```

### Duplicate events

Ensure you initialize the SDK one time using React hooks:

```typescript
useEffect(() => {
  // Initialization code
}, []); // Empty dependency array
```

### Missing user context

Set the user ID after authentication and clear it on logout:

```typescript
// After auth
amplitude.setUserId(userId);

// On logout
amplitude.reset();
```

## Additional resources

- [Browser SDK 2 Documentation](/docs/sdks/analytics/browser/browser-sdk-2)
- [Next.js Documentation](https://nextjs.org/docs)
- [Amplitude HTTP API Reference](/docs/apis/analytics/http-v2)
- [TypeScript SDK GitHub Repository](https://github.com/amplitude/Amplitude-TypeScript)