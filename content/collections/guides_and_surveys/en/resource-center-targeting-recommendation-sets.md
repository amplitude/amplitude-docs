---
id: a297263e-d953-4a8c-bd42-6194a56459ae
blueprint: guides_and_survey
title: 'Resource Center Targeting Recommendation Sets'
this_article_will_help_you:
  - 'Create targeting segments for Resource Center recommendation sets'
landing: false
parent: 20749d99-c2d4-4576-80a3-24233897706c
updated_by: 15756874-6eaf-4a8c-8779-bd4081ba41b6
updated_at: 1750794992
---
Targeting in the Resource Center is exactly the same as targeting in the rest of Amplitude. For more information, go to [Setup and Targeting] (docs/guides-and-surveys/setup-and-target).

Some things to keep in mind: 
- If you have specified targeting on your content source, that targeting takes precedence before the entry targeting. 
    - For example, if you designate source content as only applicable for people in the European Union (EU), users outside of that region will not be able to access that content. 
- If source content has been targeted to a specific segment but has been added as a specific link in the Resource Center, the link title may be visible to non-targeted users.
    - In this situation, the content is still restricted to the targeted group, but the link titles may be visible to all users.

1. For the resource entry you want, click the **Setup** tab.
2. In the Targeting section, click **Targeted Users** and then specify your segments.
3. Under the Page targeting section, specify whether you want the entries to be available on any page or only on specific pages.
4. If you only want content to be available on specific pages, click **On specific pages** and then specify the specific pages you want.
5. Specify the priority level that you want your content to appear. By default, all entries are set to Medium priority level.
6. Click **Save**.
