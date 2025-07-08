---
id: e8751734-3ee9-4d9e-aaaf-a0e840d88c29
blueprint: analytic
title: 'Sync your Amplitude data to Google Drive and Sheets'
source: 'https://help.amplitude.com/hc/en-us/articles/17787338689307-Sync-your-Amplitude-data-to-Google-Drive-and-Sheets'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717696633
this_article_will_help_you:
  - 'Export chart data to Google Sheets and chart images to Google Slides'
ai_summary: "With Amplitude's Sync to Drive and Sheets extension, you can export chart data to Google Sheets and chart images to Google Slides. In Google Sheets, you can sync your Amplitude data by selecting charts for export within the extension. The data will populate in a new tab in your Google spreadsheet. In Google Slides, you can export chart images to your presentation, one per slide. You have the option to refresh or delete selected charts from the sheet using the Manage feature. Remember to sign in with the same email for both your Amplitude account and Google Sheets for successful data export."
---
Sometimes you need to share refreshable chart data with team members, or sync chart images into presentations. Amplitude's **Sync to Drive and Sheets extension** (downloadable from [Google Workspace Marketplace](https://workspace.google.com/marketplace/app/amplitude_sync_to_drive_and_sheets/998012258772)) lets you easily export your chart data to Google Sheets and your chart images to Google Slides. 


## Sync your Amplitude data to Google Sheets

After you download the extension, follow these steps to sync your chart data with Google Sheets:

1. From within a Google spreadsheet, navigate to *Extensions >* *Amplitude Sync to Drive and Sheets.* Then click *Start Exporting Amplitude Data.*

	![](/docs/output/img/analytics/17785851254939.png)

2. In the modal that appears, click *Sign in with Google*.

	![](/docs/output/img/analytics/17785851995035.png)

  {{partial:admonition type='note'}}
  Use the same email to sign into Google Sheets that you use to log in to your Amplitude account. If the emails don't match, you won’t be able to export data from your organization.
  {{/partial:admonition}}

3. Next, allow Amplitude access to your Google account.

	![](/docs/output/img/analytics/17785883327771.png)

4. Choose your organization. Hover over the desired chart's name and click *Add* to export its data. You can select multiple charts for the same export.

	![](/docs/output/img/analytics/17785922947611.png)

5. A tab in your Google spreadsheet populates with the selected chart's data; this tab is titled *Amplitude [DO NOT EDIT]*.
6. As desired, use *Manage* to refresh or delete selected charts from the sheet. Click the refresh icon to refresh and the delete icon to delete.

	![](/docs/output/img/analytics/17787044724891.png)

{{partial:admonition type='note'}}
Export to Sheets uses Amplitude's [Dashboard REST API](/docs/apis/analytics/dashboard-rest) to generate results, so ensure your charts abide by the same limits.
{{/partial:admonition}}

## Sync your Amplitude data to Google Slides

After you download the extension, follow these steps to sync your chart images with Google Slides:

1. From within a Google Slides presentation, navigate to *Extensions >* *Amplitude Sync to Drive and Sheets.* Then click *Start Exporting Amplitude Data.
2. As with steps 2 and 3 in the previous section, Amplitude prompts you to sign into Google in the modal that appears. You should then allow Amplitude access to your Google account when prompted.
3. Next, choose your organization. Hover over the desired chart's name and click *Add* to export its data. You can select multiple charts for the same export.

At this point, your presentation populates with chart images, one per slide, depending on how many charts you chose for export.

![](/docs/output/img/analytics/17786281483803.png)

{{partial:admonition type='note'}}
Charts with a lot of data might take longer to export.
{{/partial:admonition}}

5. As desired, use *Manage* to refresh or delete selected charts from the sheet. Click the refresh icon to refresh and the delete icon to delete.

![](/docs/output/img/analytics/17787100775195.png)