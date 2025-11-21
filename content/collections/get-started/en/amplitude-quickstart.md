---
id: 29b8b9d1-1063-4b23-926b-69b8333531ed
blueprint: get-started
title: 'Amplitude Quickstart'
landing: true
landing_blurb: 'Follow this guide to get data from your site into Amplitude in ~10 minutes.'
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1763678212
---
As an early-stage startup, you need answers fast. Which features drive retention? Where do users drop off? What's working and what's not? Traditional analytics implementations can take weeks or months. Amplitude's modern approach gets you from zero to insights in minutes, not months.

## Speed run your installation: Browser SDK and Autocapture

Quickly get data flowing into Amplitude with Browser SDK and Autocapture.

### Install Amplitude

When you create your Amplitude account, you'll receive a pre-configured snippet. Simply paste it inside the `<head>` tag of every page you want to track:

{{partial:admonition type="tip" heading="Get your data flowing!"}}
{{partial:partials/quickstart}}
{{/partial:admonition}}

### Use autocapture

With `autocapture: true`, Amplitude automatically tracks:
- **Sessions** – How users engage over time
- **Page views** – Which pages matter most
- **Clicks & interactions** – What users engage with
- **Form interactions** – Where users get stuck
- **File downloads** – Content engagement
- **Marketing attribution** – Where users come from


### Add Session Replay

The snippet above includes Session Replay at 100% sampling (`sampleRate: 1`). This lets you watch exactly what users experience and helps you debug issues and understand user behavior. Lower the sample rate in production to control volume and cost.

## Benefits of this approach

- **Time to insights: Minutes, not months** – Start analyzing user behavior the same day  
- **No engineering bottleneck** – Non-technical team members can define events using Visual Labeling
- **Flexible foundation** – Add custom precision tracking later as needs emerge  
- **Complete picture** – Autocapture + Session Replay shows what users do AND why  
- **Cost-effective** – Only pay for what you use; scale as you grow

---

## Startup vs. enterprise: Why your path is different

| Aspect          | Startups (you)                 | Enterprises                                                                                                                                 |
| ------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Speed           | Ship in minutes with autocapture   | Weeks of planning, tracking plans, reviews                           |
| Governance      | Lightweight, one person manages    | Formal roles, approval workflows, compliance controls         |
| Instrumentation | Autocapture first, precision later | Structured tracking plans with Ampli CLI and code generation           |
| Team structure  | Founder/developer wears all hats   | Dedicated Project Lead, Data Governor, Instrumentation Lead              |
| Configuration   | Minimal. Paste snippet and go       | Strict permissions, environment separation, integration setup. |


## Things to consider before you begin

### Define your north star metric

What's the one thing that matters most right now? User signups? Feature adoption? Retention? Start with 1-3 key questions you need answered. Don't try to track everything.

### User identification strategy
- **Anonymous users:** Amplitude tracks them automatically through device ID.
- **Logged-in users:** Assign a user ID only after authentication (signup/login).
- **Best practice:** Use immutable IDs (not email addresses) and Amplitude connects pre- and post-login activity automatically.

### Data privacy from day one
- Only track what you need. Data minimization is both smart and compliant.
- Use Amplitude's User Privacy API if you need to delete user data.
- Separate dev/test and production environments to keep data clean.

### Plan for growth (but don't over-engineer)
- Use clear naming conventions early (for example, `Song Played`, `Checkout Completed`).
- Document what you're tracking and why, even a simple spreadsheet helps.
- Start with 20-50 events; you can always add more.

### Leverage startup resources
Apply for the [Amplitude Startup Scholarship](https://amplitude.com/startups) to access advanced features free during your growth phase.
