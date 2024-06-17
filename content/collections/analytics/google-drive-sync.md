---
id: e8751734-3ee9-4d9e-aaaf-a0e840d88c29
blueprint: analytic
title: 'Sync your Amplitude data to Google Drive and Sheets'
source: 'https://help.amplitude.com/hc/en-us/articles/17787338689307-Sync-your-Amplitude-data-to-Google-Drive-and-Sheets'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1718650991
this_article_will_help_you:
  - 'Export chart data to Google Sheets and chart images to Google Slides'
---
Sometimes you need to share refreshable chart data with team members, or sync chart images into presentations. Amplitude's **Sync to Drive and Sheets extension** (downloadable from [Google Workspace Marketplace](https://workspace.google.com/marketplace/app/amplitude_sync_to_drive_and_sheets/998012258772)) lets you easily export your chart data to Google Sheets and your chart images to Google Slides. 

{{partial:admonition type='note'}}
The Amplitude Sync to Drive and Sheets extension is currently unavailable for [EU-based organizations](https://analytics.eu.amplitude.com/yourorganization/).
{{/partial:admonition}}

## Sync your Amplitude data to Google Sheets

After you download the extension, follow these steps to sync your chart data with Google Sheets:

1. From within a Google spreadsheet, navigate to *Extensions >* *Amplitude Sync to Drive and Sheets.* Then click *Start Exporting Amplitude Data.*

	![](/docs/output/img/analytics/17785851254939.png)

2. In the modal that appears, click *Sign in with Google*.

	![](/docs/output/img/analytics/17785851995035.png)

  {{partial:admonition type='note'}}
Be sure you use the same email to sign into Google Sheets that you use to log in to your Amplitude account. If the emails don't match, you won’t be able to export data from your organization.
  {{/partial:admonition}}

3. Next, allow Amplitude access to your Google account.

	![](/docs/output/img/analytics/17785883327771)

4. Choose your organization. Hover over the desired chart's name and click *Add* to export its data. You can select multiple charts for the same export.

	![](/docs/output/img/analytics/17785922947611)

5. A tab in your Google spreadsheet populates with the selected chart's data; this tab is titled *Amplitude [DO NOT EDIT]*.
6. As desired, use *Manage* to refresh or delete selected charts from the sheet. Click the refresh icon to refresh and the delete icon to delete.

	![](/docs/output/img/analytics/17787044724891)

{{partial:admonition type='note'}}
Export to Sheets uses Amplitude's [Dashboard REST API](/docs/apis/analytics/dashboard-rest) to generate results, so ensure your charts abide by the same limits.
{{/partial:admonition}}

## Sync your Amplitude data to Google Slides

After you download the extension, follow these steps to sync your chart images with Google Slides:

1. From within a Google Slides presentation, navigate to *Extensions >* *Amplitude Sync to Drive and Sheets.* Then click *Start Exporting Amplitude Data.*

	![](/docs/output/img/analytics/17786253763099)

2. As with steps 2 and 3 in the previous section, you'll be prompted to sign into Google in the modal that appears. You should then allow Amplitude access to your Google account when prompted.
3. Next, choose your organization. Hover over the desired chart's name and click *Add* to export its data. You can select multiple charts for the same export.

At this point, your presentation populates with chart images, one per slide, depending on how many charts you chose for export.

![](/docs/output/img/analytics/17786281483803)

{{partial:admonition type='note'}}
Charts with a lot of data might take longer to export.
{{/partial:admonition}}

5. As desired, use *Manage* to refresh or delete selected charts from the sheet. Click the refresh icon to refresh and the delete icon to delete.

![](/docs/output/img/analytics/17787100775195)