---
id: 9d6bb290-f46f-4a43-8fda-86c49a0f0886
blueprint: guides_and_survey
title: Scraper
landing: false
updated_by: 15756874-6eaf-4a8c-8779-bd4081ba41b6
updated_at: 1750961207
landing_blurb: Learn how Resource Center's scraper ingests the content of your site and makes it available in Resource Center.
---
The Website source repository lets you scrape a public-facing website to pull in articles that may be useful for your users. Because there are such a wide variety of websites and rich content that can be included in any specific page, read the following information carefully when using this content source.  

{{partial:admonition type="" heading=""}}
If your documentation repositories are managed through a platform for which there is an integration, use the integration. The dedicated Resource Center integrations offers a better end-to-end experience. The website scraper is a powerful tool, but one that should be considered a fallback option.
{{/partial:admonition}}

## Website options
The website scraper provides unique options when it comes to setting up the source details. Use this information in conjunction with the procedure in the main Source Repository page.

### Extract from URLs
There are two options when specifying the exact URLs you want to include:
- **URLs**: Directly include as many URLs as you want. You can specify specific links or your entire website. Click the Add URL button to add each link. 
    - For each URL entered, Amplitude recursively pulls as many links as possible attached to those sites.
    - Use multiple URLs if you have support articles that can't be accessed from the main URL link. 
    - This method may not find all applicable links.
- **Upload**: Uploads a CSV or XML site map file of the specific URLs you want to include.  
    - Use this method if you want to specify the exact URL links and pages that should form the source repository.
    - By providing the sitemap, you are hard-coding the source repository and preventing it from automatically incorporating any new articles. New articles are then added manually. 
    - CSV and XML files don't need to have any special formatting associated with the URLs. We recommend that you use a sitemap.

### Advanced options
If you click the **Advanced** link beneath the URL section, you can access the following options: 
- **Only include these URL paths**: Lets you filter the source repository even further by only including specific URLs. This is most useful when adding entire websites. 
- **Exclude these URL paths**: Lets you filter the source repository even further by specifically excluding certain URLs from the source repository. This is useful if, for example, you want to exclude your company’s blog posts from the source repository. 
- **Override default selectors**: Lets you specify only the content selectors that you want to include or lets you ignore website elements. For more information review the following sections:

{{partial:tabs tabs="Content selectors, Ignore elements "}}
{{partial:tab name="Content selectors"}}
The website scraper, by default, pulls in all information about a page, not just the main content. This can include the page header, metadata, and other information. This means that not only is the main content of a page pulled into a Resource Center article, but extraneous content can also appear in the Resource Center articles. Amplitude does use heuristics to identify and remove as much extraneous content as possible, but some content may still be visible in the article. You can use the content selectors to help target and identify content to add to the Resource Center article. 

Selectors override what the scraper considers the main content is on your page. The website scraper uses the selector to pull only content associated with that selector. You can create multiple selectors to target different pieces of content. 

When you have multiple selectors, the website scraper looks for each selector in the order that you created it. If no selectors are found in a specific URL link, the website scraper saves information based on Amplitude heuristics.  
{{/partial:tab}}
{{partial:tab name="Ignore elements"}}
The ignore elements selectors lets you remove content from the final output of a Resource Center article. For example, you may not want to include tooltips, images, or sidebars that, while useful on your website, are not relevant in a Resource Center article. 

As with the main content selectors, you can add multiple ignore selectors and the website scraper looks for each one in the order that they appear. If no ignore selectors are found in a URL link, the website scraper includes all content. 
{{/partial:tab}}
{{/partial:tabs}}

## Re-syncing excluded pages
There are some pages that the website scraper automatically ignores. These typically include landing pages or pages that only contain links and no other text. Usually, these types of pages don't contain information suitable for a Resource Center article and can be safely removed from the source repository.
However, occasionally, you may want to re-include these pages to be active in your source repository. 

##### To re-sync pages

1. Go to **Guides and Surveys > Content** and select the source repository you want. 
2. Click **Sync errors**. 
3. Search through the excluded pages and select the ones you want to re-include.
4. Click **Force Sync and Publish**.
