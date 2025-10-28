---
description: Use approved Amplitude-specific vocabulary and technical terms
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Amplitude Vocabulary

Use these approved terms consistently throughout the documentation.

## Product Names

Always capitalize Amplitude product and feature names:
- **Amplitude** (the product)
- **Amplitude Analytics**
- **Session Replay**
- **Heatmaps**
- **Guides & Surveys** (note the ampersand)
- **Resource Center**
- **Experiment** (for the experimentation product)
- **Data**

## Core Concepts

### Events and Properties
- **event** - An action a user takes
- **event type** - The name/category of an event
- **event properties** - Attributes describing an event
- **user properties** - Attributes describing a user
- **group properties** - Attributes describing a group

Use "properties" not "attributes" in most contexts.

### User Identification
- **user ID** (not userId in prose, but `userId` in code)
- **device ID**
- **anonymous user**
- **identified user**

### Data Management
- **tracking plan** - Definition of events and properties
- **schema** - Structure of data
- **taxonomy** - Organization and naming of events
- **data governance**

### Access Control
- **Role-Based Access Control** or **RBAC** (after first use)
- **role** - A set of permissions
- **permission** - Ability to perform specific actions
- **group** - Collection of users with shared access

## Technical Terms (Approved Spellings)

These technical terms are approved in our vocabulary:

### General Tech Terms
- **API** (Application Programming Interface)
- **SDK** (Software Development Kit)
- **HTTP** / **HTTPS**
- **JSON** (not Json)
- **OAuth** (not oAuth or OAUTH)
- **UUID** (Universally Unique Identifier)
- **URL** / **URI**
- **JavaScript** (not Javascript or javascript in prose)
- **TypeScript**
- **Node.js** (note the capitalization and period)

### Development Terms
- **boolean** (not Boolean in general prose)
- **config** (short for configuration, acceptable)
- **middleware**
- **async** (short for asynchronous)
- **callback**
- **webhook**
- **endpoint**
- **payload**
- **namespace**

### Data Terms
- **anonymized** (not anonymised)
- **backfill** / **backfilling**
- **deduplicate** / **deduplication**
- **allowlist** (one word)
- **block list** (two words) 
- **real-time** (hyphenated when used as adjective: "real-time analytics")
- **realtime** (one word when used as noun in technical contexts)

### Platform and Integration Terms
- **iOS** (not IOS or ios)
- **Android**
- **React Native**
- **CocoaPods**
- **Gradle**
- **npm** (not NPM)
- **Xcode**

### Amplitude-Specific Technical Terms
- **Ampli** - Amplitude's type-safe analytics wrapper
- **batch events** - Sending multiple events together
- **event ID** - Unique identifier for an event (`event_id` in code)
- **session ID** - Unique identifier for a session (`session_id` in code)
- **instrumentation** - Implementation of event tracking
- **amplitude.init()** - SDK initialization method

## Common Abbreviations (Approved)

These abbreviations are acceptable without definition:
- **API** - Application Programming Interface
- **SDK** - Software Development Kit
- **HTML** - HyperText Markup Language
- **CSS** - Cascading Style Sheets
- **JSON** - JavaScript Object Notation
- **XML** - Extensible Markup Language
- **HTTP** / **HTTPS**
- **URL** / **URI**
- **UUID**
- **IDFA** - Identifier for Advertisers (iOS)
- **IDFV** - Identifier for Vendors (iOS)
- **GCLID** - Google Click Identifier
- **CRM** - Customer Relationship Management
- **KPI** - Key Performance Indicator
- **MTU** - Monthly Tracked Users
- **RBAC** - Role-Based Access Control (define on first use)

## Time and Date Terms

- **real-time** (hyphenated as adjective: "real-time analytics")
- **datetime** (one word for technical contexts)
- **timestamp**
- **time zone** (two words)
- **UTC** - Coordinated Universal Time

## Data Flow Terms

- **upstream** - Earlier in the data pipeline
- **downstream** - Later in the data pipeline
- **ingest** / **ingestion** - Process of receiving data
- **export** - Sending data out
- **sync** / **syncing** - Synchronizing data
- **streaming** - Continuous data flow

## Analytics Terms

- **cohort** - A group of users with shared characteristics
- **segment** - A filtered subset of users (use sparingly; prefer "cohort")
- **funnel** - Series of steps users take
- **retention** - Users returning over time
- **metric** - Measured value
- **dimension** - Attribute for grouping data
- **aggregation** - Combining data points

## Avoid These Terms

Don't use these outdated or incorrect terms:

- ❌ **"please"** in instructions
- ❌ **"currently"** (documentation represents the current state)
- ❌ **"blacklist"** → Use "block list"
- ❌ **"whitelist"** → Use "allow list"
- ❌ **"master"** → Use "primary" or "main"
- ❌ **"slave"** → Use "replica" or "secondary"
- ❌ **"sanity check"** → Use "validation" or "verify"
- ❌ **"dummy data"** → Use "placeholder data" or "sample data"

## Capitalization Rules

### Sentence Case for Features
Use sentence case for feature names in running text:
- ✅ "Use the tracking plan feature to define your events."
- ❌ "Use the Tracking Plan Feature to define your events."

**Exception:** Product names and proper nouns always capitalized:
- ✅ "Configure Amplitude Analytics"
- ✅ "Use Session Replay to watch user sessions"

### Code vs. Prose
- In prose: "user ID", "API key", "event type"
- In code: `userId`, `apiKey`, `eventType` (follow code conventions)
- In API docs: `user_id`, `api_key`, `event_type` (match actual parameter names)

## Third-Party Product Names

Maintain official capitalization for third-party products:

- **AWS** (Amazon Web Services)
- **Google Analytics**
- **Segment**
- **mParticle**
- **Snowflake**
- **BigQuery**
- **Redshift**
- **Salesforce**
- **HubSpot**
- **Marketo**
- **Braze**
- **Iterable**
- **GitHub** (not Github)
- **JavaScript** (not Javascript)
- **TypeScript** (not Typescript)
- **Node.js** (not NodeJS or Node.JS)
- **npm** (not NPM)
- **iOS** (not IOS)
- **macOS** (not MacOS)

## When in Doubt

If you're unsure about a term:
1. Check the approved vocabulary in `.github/styles/config/vocabularies/dev/accept.txt`
2. Follow the conventions in existing Amplitude documentation
3. Use the most widely accepted industry standard spelling
4. Be consistent throughout the document

