---
id: 183eec11-905d-4333-afaf-089e46ca0b55
blueprint: workflow
title: 'Estimate the duration of your experiments'
source: 'https://help.amplitude.com/hc/en-us/articles/11502996649371-Estimate-the-duration-of-your-experiments'
this_article_will_help_you:
  - Calculate how long your experiment needs to run to reach statistical significance.
  - Use automated data from Analytics to plan experiments without manual lookups.
  - Compare different scenarios to prioritize which tests to run first.
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720718556
landing: false
---
The Duration Estimator helps you figure out which experiment ideas are viable before you build anything. Use it to avoid running tests that may never reach statistical significance, and to prioritize experiments that can deliver results in a reasonable timeframe.

{{partial:admonition type='note'}}
The Duration Estimator supports T-tests. Sequential testing, Bayesian methods, and multi-armed bandit methods aren't available in this workflow.
{{/partial:admonition}}

## Open the duration estimator

In your experiment setup, select **Estimate Duration** to open the Duration Estimator.

When you first open it, you see an empty state. After you add your traffic event and success metric, the tool automatically calculates how long your test needs to run.

## Set up your estimate

### Step 1: Add your traffic event

Select **+ Add Event**, and choose the event that represents traffic where you run your experiment.

For example, if you test your homepage, select `Page Viewed`, and add a filter for your homepage URL.

The Duration Estimator automatically pulls the last 29-30 days of traffic data from Analytics, and shows visitors per day in the results panel.

If you don't have the right event, select **Enter Manually** to input your own total daily traffic estimate. Traffic is total traffic, not per variant.

### Step 2: Add your success metric

Select **+ Add Metric**, and choose the conversion metric you want to improve with this experiment.

A success metric is the visitor action you're trying to change with your experiment. Think about what you want more visitors to do because of your changes.

Common success metrics:
- Conversions: Visitor completes a key action, such as signed up, purchased, enrolled, or subscribed.
- Form completions: Visitor submits a form or completes a flow.

How to choose:
- Ask: `If this experiment works, what will more visitors do?`
- Look for metrics that match that action.
- If you see similar metrics, choose a conversion metric (marked as `Conversion of...`) or a metric with an official blue badge.

Tip: Choose a metric your team uses often.

For example, if you test your homepage hero banner and want more visitors to enroll in a course, select `Conversion of registration: course enrolled`.

The Duration Estimator automatically calculates your current conversion rate from the last 29-30 days of Analytics data and shows it in the results panel (for example, `78.8% -> 82.8%`).

If you don't see the metric you need:
- Search with the search bar at the top of the dropdown.
- Select **Create Metric** at the bottom to build a new one.
- Select **Enter Manually** to input your own baseline conversion rate.

### Step 3: Set your minimum detectable effect (MDE)

The relative MDE is the smallest improvement you want to detect. The default is 5%, which means you test whether you can improve your baseline by 5%.

For example, if your baseline conversion is 78.8% and you set a 5% MDE, you test whether you can reach 82.8%.

How to think about MDE:
- Big, bold changes (like redesigning a hero banner above the fold): expect a large lift, such as 8%.
- Small, subtle changes (like changing button text below the fold): expect a small lift, such as 2%.
- Smaller MDEs require much longer test durations.

If you don't have historical data, select **Enter Manually** to input your own baseline conversion rate.

## Understand your results

After you add your traffic and success metric, the **Estimated Duration** panel shows:
- Duration: How many days you need to run the test (for example, `~130 days`).
- Visitors per day: Daily traffic automatically pulled from Analytics.
- Lift: Your baseline conversion rate to target conversion rate with your MDE percentage.
- Summary: Plain-language explanation you can share with stakeholders.

If your duration is very long, you see a **Long Duration** warning badge. Use the Duration Scenarios table to explore different scenarios.

## Use the Duration Scenarios table to prioritize

The Duration Scenarios table is the most important part of the Duration Estimator. It shows exactly how your choices affect test duration, so you can make smarter decisions about what to test and when.

### How to read the table

Rows (confidence level):
- Low (85%): Less certainty your results are real, but faster results.
- Medium (90%): Balanced approach (default setting).
- High (95%): More certainty your results are real, but takes longer.
- Custom %: Enter your own confidence level.

Columns (lift size/MDE):
- 2%: Small, subtle changes (takes longest to detect).
- 5%: Medium-sized changes (default setting).
- 8%: Large, bold changes (fastest to detect).
- Custom %: Enter your own MDE.

The table highlights your selected combination and shows durations for all other scenarios.

### How to think about confidence level

Your confidence level is the risk you're willing to take with your results. Choose based on what's at stake.

95% confidence: Use when the cost of being wrong is high.
- Revenue-critical tests (checkout flows, pricing, subscriptions).
- High-impact placements (homepage hero, above-the-fold content, navigation).
- Sensitive or costly bets (brand-new features, compliance-heavy areas, high-cost builds).

90% confidence: Use when you want balance between speed and reliability (default).
- Medium-stakes decisions where time matters, but the cost of being wrong is manageable.
- Engagement-focused outcomes (click-throughs, mid-funnel steps).
- Iterative improvements in areas with prior evidence.

85% confidence: Use when you need a directional signal.
- Early validation (MVPs, prototypes you follow up on).
- Low-stakes tests (low-traffic pages, below-the-fold changes).
- Well-understood areas where a topline read is enough.

### How to think about MDE (lift size)

MDE reflects the expected impact of your experiment idea. Ask: `How much lift do I realistically expect this change to drive?`

Large MDE (8%+): Use for bold changes with dramatic impact.
- Prominent new CTAs at the top of the homepage.
- Major redesigns of key flows.
- Revenue-driving promotions.
- Because the effect is big, the test resolves quickly.

Medium MDE (3-5%): Use for meaningful but not dramatic improvements.
- UX enhancements.
- Layout adjustments.
- Copy changes.
- This is the most balanced choice for everyday experimentation.

Small MDE (1-2%): Use for subtle tweaks, or when tiny gains are valuable.
- Microcopy changes.
- Slight color adjustments.
- Incremental funnel optimizations.
- These require the most time and traffic, but can add up in mature, high-volume products.

### How to use the scenario table for prioritization

Scenario 1: Your test takes too long.

If your estimate shows `~130 days` at 5% MDE and 90% confidence, review the table:
- At 8% MDE (larger change), duration drops to `~51 days`.
- At 85% confidence (lower certainty), duration drops to `~102 days`.

Decision framework:
- Can you test a bigger, bolder idea to get results faster?
- Are the stakes low enough to justify 85% confidence for a quicker read?
- Or is this a high-stakes test where 90-95% confidence is worth the wait?

Scenario 2: Compare multiple test ideas.

You have three test ideas in your backlog:
- Homepage hero redesign (expected 8% lift): `~51 days` at 90% confidence.
- CTA button text change (expected 5% lift): `~130 days` at 90% confidence.
- Footer link color change (expected 2% lift): `~632 days` at 90% confidence.

Decision: The hero redesign is viable and can deliver results quickly. The CTA change may be worth running if you lower to 85% confidence (`~102 days`). The footer change takes over a year, so it isn't worth testing now.

Scenario 3: Balance your testing portfolio.

Use the Duration Scenarios table to create a balanced mix:
- Bold bets (8% MDE, 90-95% confidence): One to two major tests for each quarter that resolve in two to four weeks.
- Everyday optimizations (3-5% MDE, 90% confidence): Regular tests that deliver steady improvements in three to six weeks.
- Quick validation (5-8% MDE, 85% confidence): Fast directional reads on new ideas before heavier investment.

Scenario 4: Low-traffic pages.

If you test a low-traffic page and durations are very long across all scenarios, you may need to:
- Test on a higher-traffic page.
- Wait until you accumulate more traffic.
- Test something with a larger expected impact.

The Duration Scenarios table makes these trade-offs visible, so you can prioritize experiments that fit your traffic and timeline constraints.

## Adjust advanced settings (optional)

Select **Advanced Settings** to access additional controls:
- Confidence level: Low (85%), medium (90%), or high (95%).
- Statistical power: Probability of detecting a true effect (default 80%).
- Rollout: Percentage of visitors exposed to the experiment (default 100%).
- Number of variants: Total variants including control.
- Distribution: How traffic splits between variants (default evenly).
- Statistical method: T-test.

Most teams don't need to adjust these settings. The defaults work well for standard A/B tests.

## Tips for reducing test duration

If your estimated duration is longer than your timeline allows, use these options.

### 1. Test a bigger idea (increase MDE)

The biggest factor in test duration is the size of the change you're trying to detect. Bold changes produce larger lifts and resolve faster.

For example, moving from 5% MDE to 8% MDE can reduce duration from `~130 days` to `~51 days`.

Ask:
- Can I test a more impactful variation instead of a subtle tweak?
- Instead of changing button color, can I redesign the entire CTA section?
- Instead of tweaking microcopy, can I rewrite the entire headline?

Large-impact ideas resolve faster. Small-impact ideas take longer, but can add up in mature, high-volume products.

### 2. Lower your confidence level (when stakes allow)

Dropping from 90% to 85% confidence reduces duration, but increases false-positive risk (calling a winner when there isn't one).

For example, at 85% confidence, the same 5% MDE test takes `~102 days` instead of `~130 days`.

Ask:
- What's the cost of being wrong?
- Is this a low-stakes test (below-the-fold change, well-understood area)?
- Can I validate results with a follow-up test if needed?

Don't lower confidence for:
- Revenue-critical tests.
- High-impact placements.
- Brand-new features, or unknown customer segments.

### 3. Choose a higher-traffic page or event

Low traffic is a common reason tests take too long.

Ask: Can I run this test on a higher-traffic page, or choose a more frequent conversion event?

### 4. Increase rollout percentage

If you only expose 50% of visitors to the experiment, increasing to 100% can reduce duration by about half.

### 5. Reduce number of variants

Testing four variations takes much longer than testing two. Consider multiple sequential tests instead of one large multi-variant test.

### 6. Decide if the test is worth running

Sometimes a test isn't feasible. If the Duration Scenarios table shows hundreds of days across all scenarios, it probably isn't worth building.

## Common mistakes to avoid

- Defaulting to 95% confidence every time. This makes sense for high-stakes tests, but can slow low-stakes experiments.
- Chasing only small lifts. Looking for 1-2% MDE improvements can require large traffic and long run times.
- Skipping a duration check. Even with the right settings, some experiments can't reach significance with available traffic.

The Duration Estimator helps you make this call before you spend time and resources on a test that may never reach significance.

## Common questions

### Why does my estimate say `Long Duration`

Your test takes a long time to reach statistical significance, often because of low traffic or small MDE. Use the Duration Scenarios table to explore faster alternatives.

### What if I don't have 30 days of historical data

Update the timeframe, or select **Enter Manually** to input your own traffic and conversion estimates. Results are most accurate with at least a few weeks of stable data.

### Can I change the MDE after I see the estimate

Yes. Adjust the MDE percentage in the success metric section, and the estimate updates automatically. Use this to explore different scenarios before committing to your test design.

### What does `Last 29 days offset by 1` mean

This shows the data timeframe used for calculations. `Offset by 1` means the calculation excludes today because today's data is incomplete, and looks at the previous 29 complete days.

### Should I always aim for high (95%) confidence

No. Many experiments run at medium (90%) confidence, which balances speed and accuracy. Use high confidence when stakes are high, or when you need maximum certainty before a decision.

### I'm stuck choosing a success metric. Which one should I pick

Start by asking `If this experiment works, what will more visitors do?` Then choose a metric that matches that action. Conversion metrics (marked as `Conversion of...`) are often the best choice.

If you're still unsure, search for metrics related to your goal, or select **Enter Manually** to input your own baseline.

### Where can I learn about live experiment duration estimates

Review [Experiment duration estimates](/docs/faq/experiment-duration-estimates) to understand the duration estimate that Experiment shows while an experiment runs.
