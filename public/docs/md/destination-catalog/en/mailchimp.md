---
id: f97ce3c7-f09a-4a0d-8886-c92885c15455
blueprint: destination-catalog
use_cases:
  - 'Create targeted cohorts for your email marketing needs by sending Amplitude cohorts to MailChimp'
  - 'Personalize your messaging by sending your Amplitude events and users to MailChimp with one click.'
short_description: 'Mailchimp provides an email marketing platform. Features include campaign design, tracking, segmentation and list management.'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
title: 'Mailchimp (Cohort)'
source: 'https://docs.developers.amplitude.com/data/destinations/mailchimp'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/mailchimp.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1720115869
---
Send Amplitude cohorts to Mailchimp to create targeted audiences for your email marketing needs.

## Considerations

- Cohort names must be fewer than 88 characters. 

## Setup

### Mailchimp setup

[Find your Mailchimp audience ID](https://mailchimp.com/help/find-audience-id/ "https://mailchimp.com/help/find-audience-id/") for the audience you would like to use for sending events to Amplitude. If you have multiple audiences, you need to set up this integration for each one. If you don't have an existing audience, [create one](https://mailchimp.com/help/create-audience/ "https://mailchimp.com/help/create-audience/").

### Amplitude setup 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Mailchimp**.
3. Click **Connect to Mailchimp** and log in to your Mailchimp account. 
4. Authorize Amplitude access to your account. Mailchimp redirects back to Amplitude. 
5. Enter the Mailchimp audience ID and select an Amplitude user property to export from the drop down. This user property **must** contain an email address; without one, the mapping to Mailchimp fails.
6. Save your work. 
7. Open or create the [cohort](https://help.amplitude.com/hc/en-us/articles/231881448-Behavioral-Cohorts) of users you wish to export from Amplitude to Mailchimp and click **Sync** . This opens the *Select Sync Type* modal.
8. From *Sync Type*, select **Messaging**, and then under *Select Destination*, select **Mailchimp**. Click **Next**.
9. Select your destination from the *API Target* dropdown. Under *Define Cadence,* select either a one-time or scheduled sync. Then click *Sync* and wait for Amplitude to sync your cohort to Mailchimp.

After the sync is complete, navigate to your audience on Mailchimp. Your cohort is identifiable on Mailchimp by a [Mailchimp tag](https://mailchimp.com/help/getting-started-tags/ "https://mailchimp.com/help/getting-started-tags/") named  `<Amplitude cohort name>`. You can filter by tags on Mailchimp to view the members of your audience belonging to the exported Amplitude cohort