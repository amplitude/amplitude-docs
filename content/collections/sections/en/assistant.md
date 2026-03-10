---
id: 840d28bb-ee63-408f-aeaf-e3d88f15d124
blueprint: section
title: Assistant
author: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
nav_title: assistant
current-collection: assistant
updated_at: 1773092361
hide_toc: false
---
Amplitude Assistant is an in-product AI helper that answers questions, recommends content, and can launch in-app guides to walk users through common tasks. It isn't a general-purpose support bot, it helps your users succeed in your product.

Assistant bases its answers on content you connect to Amplitude, such as docs and help center articles, plus any custom guidance your team configures.

## How Assistant and Resource Center fit together

Assistant lives in the same widget as Resource Center:

* **Resource Center** is the content hub that surfaces docs, guides, and other resources in-product.
* **Assistant** is the conversational interface that:
  * Searches that same content.
  * Pulls in specialized Assistant-only content such as **Answers**.
  * Launches Guides & Surveys through tools and workflows, or directly from the chat itself.

Assistant and Resource Center share:

* The same front-end widget (launcher, panel, layout).
* Themes and styling.
* The same underlying Content & Sources (for articles and documents), with additional Assistant-specific layers like Answers.

## Capabilities

Assistant can:

* **Answer how-to and troubleshooting questions** based on your connected documentation and help content.
* **Link directly to relevant articles** so users can explore deeper.
* **Launch in-app guides and checklists** created in Guides & Surveys to walk users through multi-step tasks.
* **Run workflows or tools** that you enable. For example, you can launch a specific product experience based on user input.

You can:

* Customize Assistant's communication style and tone.
* Use Amplitude targeting to customize how individual users or groups of users experience Assistant.
* View conversation history and customer feedback.

## Limitations

* Assistant doesn't read or cite arbitrary external websites unless your team has explicitly connected them as a content source.
* Assistant doesn't change data or take sensitive actions unless:
  * Your team has set up a tool or workflow for the action.
  * The user gives explicit approval in chat (where configured).

## Privacy and trust

Assistant operates within your organization's existing Amplitude environment:

* It bases answers on your org's content sources, not on random public content.
* Your admins control which tools and workflows Assistant can use.
* For sensitive actions, your admins can configure Assistant to ask for explicit user approval in chat before it proceeds.

If you have questions about how Assistant uses data in your specific deployment, contact your internal Amplitude admin or support team.