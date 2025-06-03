---
id: 9e896326-38fa-4b70-b016-df2906dc4e48
blueprint: analytic
title: 'Releases: See how users respond to changes in your product'
source: 'https://help.amplitude.com/hc/en-us/articles/360017800371-Releases-See-how-users-respond-to-changes-in-your-product'
this_article_will_help_you:
  - 'Use changes in your product as points to build an analysis around'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726163151
ai_summary: 'In Amplitude, a **release** signifies a change in your product, displayed as a marker in time-series charts. Users on different plans can create automated or manual releases. Automated releases follow semantic versioning and can be configured in the *Release Timeline*. Manual releases allow more customization. The *Release Report* provides insights on user exposure and adoption of releases. You can link analyses to a release for better understanding. The *Release Timeline* tracks all product updates. Use releases to share context and outcomes within your team effectively.'
---
In Amplitude, a **release** represents a change in your product. It can be a major update like the launch of a new feature, a minor patch to fix a small bug, or the launch of an experiment. Releases display as a marker in your time-series charts when they occur.

![release_line_chart.png](/docs/output/img/analytics/release-line-chart-png.png)

### Feature availability

* Users on **Growth** or **Enterprise** plans can take advantage of [automated releases](#automated-releases).
* Users on the **Plus** plan can create [manual releases](#manual-releases).

For more information, see the [pricing page](https://amplitude.com/pricing).


## Create a release

Amplitude automatically creates releases for customers on **Growth** and **Enterprise** plans. **Plus** plan users can manually create releases.

### Automated releases

If you're on a **Growth** or **Enterprise** plan, Amplitude continuously listens for a new value for the `Version` user property. When Amplitude detects a new value, it automatically creates a release the next day. It applies the following heuristics when creating a new release:

* A release must follow [semantic versioning format](https://semver.org/): `major.minor.patch` with `.patch` as optional. For example, `Version = 12345` doesn't automatically create a release, but `Version = 123.45.6` does.
* Amplitude excludes development projects (projects that contain names like "Test", "Development", "Staging," etc.) from automatic release generation.
* If you send event data server-side through Amplitude's HTTP/Batch API, use the `app_version` user property.

Automated releases aren't created retroactively for backfilled data.

#### Configure an automated release

You can configure automated release detection in the *Release Timeline*, if you are an admin or manager. Simply click the settings icon to gain access to the *Project Settings* fly out panel. Here you can enable or disable automatic release detection and automatic annotation.

### Manual releases

If your product doesn't use semantic versioning, or you're on the **Plus** plan, you can manually create a release from the [release timeline](#the-release-timeline-view) frame, or from the Microscope in a chart.

To create a manual release, click *Create Release* and fill in the modal that appears:

![create_release.png](/docs/output/img/analytics/create-release-png.png)

* **Release name**: The name of the release. This is visible on charts and in the *Release Timeline*.
* **Version**: The `Version` user property that defines the product change. Amplitude uses this field to show you any new events introduced in the release, in the [Release Report](#the-release-report). The Version field selected must be an existing value in your data.
* **Description**: The product change brought about in the release. This is visible in the release timeline view.
* **Release date**:The date the release shipped.
* **End date**: The end date of the release rollout.
* **Platforms**: The `Platform`(s) this release applies to.
* **Visibility**: Whether the release is visible on all charts or not.

### Releases API

Create releases programmatically with the [Releases API](https://developers.amplitude.com/docs/releases-api). This allows you to integrate the creation of releases into your own internal deployment processes.

## Edit a release

Edit releases that were manually created or automatically detected can to add additional context and information to the release. To do so, open the release from within the release timeline view and click *Edit.*

By default, all releases are visible across all charts. You can toggle the visibility of a release from the [release report](#the-release-report) page (this view), or the release timeline view.

## The release report

From the *Release Timeline*, you can click on a release to view the **release report**. A release report is a collection of metadata and analysis, generated by Amplitude*.*

In the *Metrics* section, you can see the number of unique users who have been exposed to your release, and the percentage of your active user base that figure represents. The percentage of active users is the number of users that have seen the version of the release, divided by the number of users on the platform specified in the release definition.

![release_report.png](/docs/output/img/analytics/release-report-png.png)

If the release includes new events, Amplitude shows them in the table to the right of *Metrics*. The *% Active* metrics shows you the percentage of your active user base who are triggering the new events detected since the release date.

The *Adoption* section shows a time series depicting adoption of your release since its launch date. Amplitude limits the time series to 30 days since the start of the release.

### Add items to a release

You can link to other Amplitude content in the *Analyses* section. This makes it easy for others in your organization to understand how the experiences you've launched have performed, and the impact they've had on your users.

Use releases to distribute both context and outcomes across your team.

To attach items to a release, click *+ Add Item* in the *Analyses* section of the Release Report.

![add_analyses_items.png](/docs/output/img/analytics/add-analyses-items-png.png)

## The release timeline view

The *Release Timeline* serves as a living history of all the product updates your team has shipped. It's a chronology of the releases Amplitude has automatically created, and the ones that have been manually added by your team.

To access the *Release Timeline*, follow these steps:

1. Navigate to *Settings> Organization settings > Projects*.
2. Find the project you're interested in and click it.
3. Open the *Releases* tab.

{{partial:admonition type='note'}}
The release timeline view only populates new versions in real time. When backfilling historical data, Amplitude doesn't consider these releases to be new, as they happened in the past. You must manually add any backfilled releases to the timeline.
{{/partial:admonition}}
