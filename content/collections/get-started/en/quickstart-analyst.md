---
id: 5b4c3d2e-1f0a-9b8c-7d6e-5f4a3b2c1d0e
blueprint: get-started
title: 'Analyst quickstart'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732147200
---
Start analyzing user behavior quickly. This quickstart walks you through creating your first chart, understanding your data, and building insights.

## Before you begin

You need:
- An [Amplitude account](/docs/get-started/create-a-new-account) with access to a project that has data.
- If your project is new and empty, ask your developer to [instrument some events](/docs/get-started/quickstart-developer) first, or enable [Autocapture](/docs/get-started/autocapture).

## Step 1: Explore your data

Before building charts, understand what data you have.

1. Navigate to *Data > Events* in Amplitude.
2. Browse the list of events your team is tracking.
3. Click any event to see its properties and volume.

**Quick tip:** Look for events with high volume—these are good starting points for analysis.

### Key data concepts

| Concept | Description | Example |
|---------|-------------|---------|
| Event | An action users take | "Button Clicked", "Purchase Completed" |
| Event property | Details about an event | Button name, purchase amount |
| User property | Details about a user | Plan type, signup date |

## Step 2: Create your first chart

Build an Event Segmentation chart to see how often an event occurs.

1. Navigate to *Analytics > New > Event Segmentation*.
2. Click **Select event** and choose an event (for example "Page Viewed" or your most common event).
3. The chart automatically displays event counts over the last 30 days.

You've just created your first chart!

### Customize your chart

Try these modifications:

| Action | How to do it |
|--------|--------------|
| Change date range | Click the date picker in the top right. |
| Group by property | Click **+ Group by** and select a property (like "page" or "country"). |
| Filter users | Click **+ Where** to filter by user or event properties. |
| Change metric | Click the metric dropdown to switch between Uniques, Totals, or Average. |

## Step 3: Answer a business question

Let's build a chart that answers: "How many users completed signup this week?"

1. Create a new Event Segmentation chart.
2. Select your signup or account creation event (for example "Account Created" or "Sign Up Completed").
3. Set the date range to **Last 7 days**.
4. Change the metric to **Uniques** to count unique users.
5. Click **+ Group by** and select **Day** to see daily trends.

**What you learned:** How many users signed up each day this week.

## Step 4: Save and share your work

Save your chart so you and your team can reference it later.

1. Click **Save** in the top right.
2. Give your chart a descriptive name (for example "Daily Signups - Last 7 Days").
3. Choose a [Space](/docs/get-started/spaces) to organize your chart.
4. Click **Save**.

### Share with your team

- **Link sharing:** Click **Share** to copy a direct link.
- **Add to dashboard:** Click **Add to Dashboard** to include in a collection of related charts.
- **Download:** Click the menu (⋮) and select **Export** for PNG or CSV.

## Step 5: Try other chart types

Amplitude offers different chart types for different questions.

| Chart type | Best for | Example question |
|------------|----------|------------------|
| [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) | Trends and comparisons | "How many users clicked Buy this month?" |
| [Funnel Analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-build) | Conversion through steps | "What % of users who view a product complete purchase?" |
| [Retention](/docs/analytics/charts/retention-analysis/retention-analysis-build) | Users returning over time | "Do users come back after their first week?" |
| [User Sessions](/docs/analytics/charts/user-sessions/user-sessions-track-engagement) | Session depth and length | "How long do users spend in the app?" |

### Quick exercise: Build a funnel

1. Navigate to *Analytics > New > Funnel Analysis*.
2. Add steps for a user journey (for example: Page Viewed → Add to Cart → Purchase).
3. View conversion rates between each step.
4. Identify where users drop off.

## What's next?

You've learned the basics! Here's what to explore next:

| Goal | Resource |
|------|----------|
| Learn chart types | [Chart overview](/docs/analytics/charts) |
| Start from templates | [Use templates](/docs/get-started/start-from-template) |
| Build dashboards | [Organize with Spaces](/docs/get-started/spaces) |
| Understand user activity | [User activity analysis](/docs/get-started/understand-user-activity) |
| Analyze acquisition | [Acquisition channels](/docs/get-started/analyze-acquisition-channels) |

## Common questions

### I don't see any events

If the Events page is empty:
- **Data not flowing:** Ask your developer if instrumentation is complete.
- **Wrong project:** Check that you're in the correct project (top-left dropdown).
- **No access:** Your admin may need to grant you access to the project.

### Which event should I start with?

Start with events that represent key user actions:
- **Activation events:** Sign up, first purchase, profile completed.
- **Core actions:** The main thing users do in your product.
- **Revenue events:** Purchases, subscriptions, upgrades.

### What's the difference between Uniques and Totals?

- **Uniques:** Counts each user once, regardless of how many times they did the action.
- **Totals:** Counts every occurrence of the action.

**Example:** If one user clicks "Buy" 5 times:
- Uniques = 1
- Totals = 5

### Can I undo changes to a chart?

Amplitude auto-saves as you work. To revert:
- Use your browser's back button for recent changes.
- Check **Version History** (menu > Version History) for saved versions.

## Related resources

- [Create a chart](/docs/get-started/create-a-chart).
- [Understand user activity](/docs/get-started/understand-user-activity).
- [Event Segmentation deep dive](/docs/analytics/charts/event-segmentation/event-segmentation-build).
- [Funnel Analysis deep dive](/docs/analytics/charts/funnel-analysis/funnel-analysis-build).

