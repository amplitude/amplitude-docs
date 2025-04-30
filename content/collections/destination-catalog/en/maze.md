---
id: 5e51c104-98ac-4362-a036-4ae3257ba8ec
blueprint: destination-catalog
short_description: 'The Maze integration allows you to send audiences from Amplitude to Maze to create more personalized campaigns.'
integration_category:
  - qualitative-feedback
integration_type:
  - cohorts
title: Maze
source: 'https://docs.developers.amplitude.com/data/destinations/maze'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/maze.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479485
connection: destination
---
[Maze](https://maze.co/) empowers product teams to continuously collect and consume user insights across the entire product development cycle. With solutions for participant recruitment, product research, and reporting, Maze helps teams build the habit of continuous product discovery in a platform that enables everyone to run great research. 

The Maze integration allows you to send audiences from Amplitude to Maze to create more personalized campaigns. 

## Considerations

- This integration must be enabled on a per-project basis within Amplitude.
- To use this integration, you must have an Amplitude user property that maps to a Maze key. Maze only supports Amplitude `user_ID`. 

## Setup

### Maze setup

1. Log into your Maze account and [switch to the relevant team](https://help.maze.co/hc/en-us/articles/4651328987155-Switching-between-teams).
2. Open your team settings and navigate to the **Integrations** tab.
3. Under *Amplitude*, click **Connect**. Copy the API key. You need that for Amplitude setup.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Maze**.
3. Enter a name and Maze API key.
4. Map an Amplitude field to the Maze User ID field.
5. When finished, save your work.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Maze**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.
