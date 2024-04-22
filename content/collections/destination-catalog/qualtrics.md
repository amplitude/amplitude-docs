---
id: 49f6c328-a8b9-4ff7-8ece-04b4ebee57ea
blueprint: destination-catalog
use_cases:
  - "Utilize Amplitude's cohort data to refine targeted email marketing lists within Qualtrics, enhancing the effectiveness of email campaigns by leveraging insights from Amplitude's analytics."
  - 'Enrich segmentation in Amplitude by integrating Qualtrics survey responses, providing deeper insights into customer experiences and preferences to optimize marketing strategies and product development efforts.'
short_description: 'Qualtrics Experience Management helps brands continually assess the quality of their four core experiences—customers, employees, products, and brands.'
integration_category:
  - qualitative-feedback
integration_type:
  - raw-events
  - cohorts
title: Qualtrics
source: 'https://docs.developers.amplitude.com/data/destinations/qualtrics'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/qualtrics-xm.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480035
---
With the Qualtrics cohort export integration, you can export Amplitude user cohorts into an existing mailing list in your Qualtrics XM directory.


## Considerations

- In Qualtrics, your cohorts appear as `[Amplitude] <cohort name> (<cohort ID>)`, with a value of `active`. If a user doesn't exist in Qualtrics, a contact is added to the mailing list. See the [Qualtrics documentation](https://www.qualtrics.com/support/iq-directory/lists-tab/creating-mailing-lists/) for more information.
- This integration supports only Email as a `user_id` mapping option.

## Setup

You need to complete setup simultaneously in Amplitude and Qualtrics.

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Qualtrics**.
3. Click **Connect to Qualtrics** and follow the directions on the Qualtrics site to authorize Amplitude to send cohorts to Qualtrics.
4. In a separate window, log in to your Qualtrics XM account.<!--vale off-->
5. Click the profile icon. From the *My Account* menu, select **Account Settings**.
6. On the *Qualtrics IDs* tab under *Directories*, find *Default Directory* and copy the ID (it starts with `POOL_`).<!--vale on-->
7. In Amplitude, paste this ID into the *Directory ID* field.
8. In Qualtrics, locate *Data Center ID* (under *User*) and copy the ID, a short string of lowercase-alphanumeric characters.
9. Back in Amplitude, paste the ID into the *Data Center ID* field.
10. In Qualtrics, find a mailing list ID.
    1.  Click on the hamburger menu and select **Directories**.
    2.  In the *Segments & lists* tab, click **Lists**.
11. Select the mailing list you want to add exported Amplitude cohort to. If you don't have a mailing list created, or want to export users to a new list, click *Create a list* and follow the instructions.
12. In the URL (for example `https://org.qualtrics.com/iq-directory/#/POOL_XXXXX/groups/lists/CG_XXXXX`) retrieve your mailing list ID, starting with `CG_`, from the end of the URL.
13. In Amplitude, paste this ID into the *Mailing List ID* field. Then enter a name in the *Name* field to identify your destination.
14. Select an Amplitude user property. It must contain an email address for each user, such as `[Amplitude] User ID`, `email`, or a valid custom user property.
15. Save when finished.
