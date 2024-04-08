---
id: a64c1c43-88d3-415d-b895-d27bb6decfd9
blueprint: get-started
title: 'Create a project in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/16796780525339-Create-a-project-in-Amplitude'
landing: true
landing_blurb: 'Once you’ve got your organization set up and users added to it, you can begin adding projects. Each analysis you create will belong to a specific project.'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1712268171
---
#### This article will help you:

* Create a project in Amplitude

Once you’ve got your [organization set up](/get-started/create-org) and users added to it, you can begin adding **projects**. Each analysis you create will belong to a specific project. In Amplitude, a project is a way to subdivide your Amplitude organization into distinct territories—for example, you might want to create individual projects for different products, or for different areas or sections of your app. It’s a useful way to keep related analyses grouped together.

Each project in Amplitude has its own separate API key you'll use to send data. For example, if you have one iOS project and one Android project within your organization, you'll have your iOS app and your Android app send data to their respective API keys.

## Create a new project

To create a new project, follow these steps:

1. Navigate to ![gear_icon_for_settings.png](/output/img/get-started/gear_icon_for_settings.png){.inline} *> Projects*.
2. Click *Create Project*.
3. In the *Create New Project* modal, type in the project’s name and a description. Then click *Next*.
4. Select the users you’d like to have access to the project, and specify their roles from the drop-down menus next to their names. Users will have to belong to the organization before you can add them to a project.
5. Click *Submit*.

**Important**: You should always create a test project or a dev environment for each production project in order to test your instrumentation. Once data has been recorded to a project, it cannot be modified or deleted.

Now that you’ve got a project to work with, let’s talk about [data in Amplitude](/get-started/select-events).