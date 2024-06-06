---
id: cfa39989-0859-4dcc-a689-9f0215ae2657
blueprint: analytic
title: 'Share charts, dashboards, and notebooks with stakeholders outside your company'
source: 'https://help.amplitude.com/hc/en-us/articles/235717108-Share-charts-dashboards-and-notebooks-with-stakeholders-outside-your-company'
this_article_will_help_you:
  - "Share analyses with people who do not have full access to your organization's data"
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717695661
---
Sometimes, you may need to share your Amplitude analyses with people who are not in your organization, or who should not have full access to your data. You can create **public links** to charts, dashboards, and notebooks and send them to **any** person, even if they are not registered under your Amplitude organization.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Before you begin

* Remember, public links can be shared with anyone until you revoke the link. On the Enterprise plan, anyone with the password can access your links prior to their expiration.
* Once you revoke a link, you will not be able to re-enable it. Users who click revoked links will be directed to a 404 page.
* Public links are not supported for [Personas](/docs/analytics/charts/compass/compass-aha-moment) charts.
* If you share a public link to a notebook or a dashboard that contains a [Journeys](/docs/analytics/charts/journeys/journeys-understand-paths) chart, that chart will not be visible to the recipient of that link. (Journeys charts can instead be viewed via direct public links to the chart itself.)
* Charts are cached for ten minutes for everyone.

## Create a public link

To create a public link to a chart, dashboard, or notebook, follow these steps:

1. Click *Share*, in the top right corner of the menu bar.
2. In the modal that appears, click *Create Public Link* (or *Manage Public Links*), then *Create new public link*.

![create_public_link.gif](/docs/output/img/analytics/create_public_link.gif)

3. Add a password, if desired, and enter the date the public link will expire. Then click *Create Link*.

Amplitude will randomly generate a link to the content. Click *Copy Public Link* to copy the URL to your clipboard.

![public_links_2.png](/docs/output/img/analytics/public_links_2.png)

## Generate embed code for your content

Another way you can share your charts, notebooks, and dashboards with external stakeholders is by embedding your analysis into a document created outside of Amplitude Analytics. Simply paste the Amplitude-generated embed code into a tool that accepts embeds, like WordPress, Confluence, or wikis. Your Amplitude content will then be visible to unauthenticated users, in much the same way as public links.

To generate this embed code, follow these steps:

1. After saving your chart, dashboard, or notebook, click *Share*.
2. In the *Share* modal, click the Embed tab and flip the toggle switch to On.  
  
	![embed_modal.png](/docs/output/img/analytics/embed_modal.png)

3. Click *Copy Embed Code*. You can now paste the embed code from your clipboard.
4. To revoke external permissions to view the content, simply flip the toggle switch to Off. The embed code will no longer work in any of the documents where it appears.

## Copy, edit, or delete a public link

You can view and manage all your public links by navigating to *Settings > Content Access,* or by clicking *Share > Manage public links* from within the chart, dashboard, or notebook you want to manage.

![public_links_3.png](/docs/output/img/analytics/public_links_3.png)

Public links are not editable via the *Manage Content Access* page; however, you can remove them from there. Hover over the public link to bring up the *Remove* button. To edit the link's password or change its expiration date, click on the name of the chart to open it, then click *Share* to begin making those changes.

## Set public link permissions

Admins on Enterprise plan accounts can control whether members are required to set a password and/or expiration date when creating a public link. When setting an expiration, you can control how long public links are allowed to exist before expiring. 

Even if your account does not require passwords or expirations, you may set either when creating a public link. See [Create a public link](#create-a-public-link) for details.

**Passwords are not recoverable**. If you forget your password, you can edit the link and choose a new one. If you choose to set an expiration date, any recipients will receive an error message when opening the link after your selected date. You can always edit your link and choose a new expiration date if you need to extend access.

## Visual links and unfurling public links on Slack

Read more about the Amplitude Slack integration [here](/docs/analytics/integrate-slack).
