---
id: 9996cae3-403c-44be-9b25-61efb780a3e9
blueprint: data
title: 'Block bot web traffic'
source: 'https://help.amplitude.com/hc/en-us/articles/14884769332507-Block-bot-web-traffic'
this_article_will_help_you:
  - 'Understand how bot traffic can affect ingested data from third party sites'
  - 'Learn how to create a block filter to exclude bot web traffic'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717620431
---
If you're tracking events on public, unauthenticated websites, your metrics may be affected by bot web traffic from crawlers, scrapers, and other similar tools. Amplitude Data allows you use a **block filter** to prevent that data from being ingested at all.

## How bot blocking works

Bot traffic is blocked based on User-Agent, as identified by the [IAB/ABC International Spiders and Bots List](https://www.iab.com/guidelines/iab-abc-international-spiders-bots-list/). This applies by default to data sent via the [legacy JavaScript SDK](https://github.com/amplitude/Amplitude-JavaScript) or the [TypeScript Browser SDK](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser) (version 1.10.0 and later). You can also provide the `user_agent` field directly on events sent via the HTTP API or Batch API. Be careful when doing this, as the value **must represent a valid browser** or the event will be dropped.

Any **data filtered out by a block filter cannot be recovered** because it is never ingested in the first place.

## Create a block filter for bot web traffic

To create a block filter for bot web traffic, follow these steps:

1. Make sure you’re on `main`, as filters are not accessible from any other branch.
2. In the left-hand sidebar, click *Filters*, then select the *Block Filters* tab.
3. Click *+ Create Block Filter* to open the Filter Configuration fly-out panel.
4. Select *Bot Traffic* from the *Block* drop-down.  
  
![block_filter.png](/output/img/data/block-filter-png.png)
5. When you’re ready, click *Block Data* to initiate the block filter.