---
id: a64c1c43-88d3-415d-b895-d27bb6decfd9
blueprint: get-started
title: 'Create a project in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/16796780525339-Create-a-project-in-Amplitude'
landing: true
landing_blurb: 'After you create and add users to your organization, create a project.'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724879660
exclude_from_sitemap: false
this_article_will_help_you:
  - 'Create a project in Amplitude'
ai_summary: "In Amplitude, you can create projects to organize your analyses. Each project has its own API key for data tracking. To create a project, go to Settings > Organization settings > Projects, click Create Project, add a name and description, select users and roles, then submit. Projects help group related analyses together. Remember to create a test project before production. Once data is recorded, it can't be changed. Now that you have a project, you can start working with data in Amplitude."
---
Once your organization is set up and users have joined it, you can begin adding **projects**. Each analysis you create belongs to a specific project. In Amplitude, a project is a way to subdivide your Amplitude organization into distinct territories—for example, you might want to create individual projects for different products, or for different areas or sections of your app. It’s a useful way to keep related analyses grouped together.

Each project in Amplitude has its own separate API key for sending data. For example, if you have one iOS project and one Android project within your organization, each app sends data to their respective API keys.

## Create a new project

To create a new project, follow these steps:

1. Navigate to *Settings > Organization settings > Projects*.
2. Click *Create Project*.
3. In the *Create New Project* modal, type in the project’s name and a description. Then click *Next*.
4. Select the users you’d like to have access to the project, and specify their roles from the drop-down menus next to their names. Users must belong to the organization before you can add them to a project.
5. Click *Submit*.

{{partial:admonition type='note'}}
You should always create a test project or a dev environment for each production project to test your instrumentation. Once data has been recorded to a project, it can't be modified or deleted.
{{/partial:admonition}}

Now that you’ve got a project to work with, let’s talk about [data in Amplitude](/docs/get-started/select-events).