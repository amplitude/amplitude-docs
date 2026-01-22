---
id: cfa39989-0859-4dcc-a689-9f0215ae2657
blueprint: analytic
title: 'Share charts, dashboards, and notebooks with stakeholders outside your company'
source: 'https://help.amplitude.com/hc/en-us/articles/235717108-Share-charts-dashboards-and-notebooks-with-stakeholders-outside-your-company'
this_article_will_help_you:
  - "Share analyses with people who do not have full access to your organization's data"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724882858
---
Sometimes, you may need to share your Amplitude analyses with people who aren't in your organization, or who shouldn't have full access to your data. You can create **public links** to charts, dashboards, and notebooks and send them to **any** person, even if they're not registered under your Amplitude organization.


## Before you begin

* Remember, anyone can view a public link until you revoke it. On the Enterprise plan, anyone with the password can access your links before their expiration.
* After you revoke a link, you can't to re-enable it. Amplitude redirects users who click a revoked link to a 404 page.
* If you share a public link to a notebook or a dashboard that contains a [Journeys](/docs/analytics/charts/journeys/journeys-understand-paths) chart, that chart isn't visible to the recipient of that link. Use the direct link to the journey chart to share it.
* Amplitude caches charts for 10 minutes.
* Experiment results charts don't support access by public link.

## Creating a public link

##### To create a public link to a chart, dashboard, or notebook

1. Click *Share*, in the top right corner of the menu bar.
2. In the modal that appears, click **Public Link**, then **Create link**.
3. Set the link's expiration date, and optionally set a password. Click **Create Link**.

Amplitude generates a link to the content. Click **Copy Public Link** to copy the URL to your clipboard.

## Generate embed code for your content

Another way you can share your charts, notebooks, and dashboards with external stakeholders is by embedding your analysis into a document created outside of Amplitude Analytics. Paste the Amplitude-generated embed code into a tool that accepts embeds, like WordPress, Confluence, or wikis. Your Amplitude content becomes visible to unauthenticated users, in much the same way as public links.

To generate this embed code, follow these steps:

1. After saving your chart, dashboard, or notebook, click **Share**.
2. In the Share modal, click the Embed tab and flip the toggle switch to On.  
3. Click **Copy Embed Code**. You can now paste the embed code from your clipboard.
4. To revoke external permissions to view the content, flip the toggle switch to Off. The embed code no longer works in any of the documents where it appears.

## Copy, edit, or delete a public link

You can manage public links from two locations:

**From the Share modal:**
1. Click **Share** in the top right corner.
2. Navigate to the **Public Link** tab.
3. Click the three-dot menu (kebab menu) next to your public link.
4. Select **Copy URL**, **Edit**, or **Delete** from the dropdown.

**From Organization Settings:**
Navigate to *Settings > Organization Settings > Content Access*. You can remove public links from this page by hovering over the link and selecting the **Remove** button. To edit a link's password or expiration date, open the chart and use the Share modal.

## Set public link permissions

Admins on Enterprise plan accounts can control whether members need to set a password and/or expiration date when creating a public link. When setting an expiration, you can control how long public links exist before they expire. 

Even if your account doesn't require passwords or expirations, you can set either when creating a public link. Review [Create a public link](#create-a-public-link) for details.

Passwords aren't recoverable. If you forget your password, you can edit the link and choose a new one. If you choose to set an expiration date, any recipients receive an error message when opening the link after your selected date. You can always edit your link and choose a new expiration date if you need to extend access.

## Visual links and unfurling public links on Slack

For more information, review [Integrate Slack with Amplitude](/docs/analytics/integrate-slack).
