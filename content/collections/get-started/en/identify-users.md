---
id: 0540d355-59be-49fc-b93d-ac1a256c38af
blueprint: get-started
title: 'How Amplitude identifies your users'
source: 'https://help.amplitude.com/hc/en-us/articles/206404628-How-will-you-identify-your-users-'
this_article_will_help_you:
  - 'Learn how Amplitude identifies and tracks your users'
  - 'Understand best practices for setting user IDs'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716571480
---
Amplitude uses a combination of three different methods to identify your users: device IDs, Amplitude ID, and **user IDs**. The first comes directly from your users' devices, while the second is an ID that Amplitude automatically creates once it has enough information to conclusively identify a unique user. The user ID, however, is something you'd set up.

In Amplitude, a user ID is a unique identifier applied to individual users. Using them is optional, but recommended: your product should set a user ID once a user has created an account, logged in, or is otherwise identified in your product.

Amplitude can use a user ID to reconcile events across multiple devices under the same user ID. Additionally, Amplitude merges a user's event data on the backend: this connects the correct user ID to any anonymous events the user generated before the assignment of their user ID. For this reason, you can wait to assign user IDs if that makes sense for your product. Conversely, this is also why you shouldn't set user IDs for anonymous users.

Once set, you can't change user IDs in Amplitude.

If your product doesn't currently assign user IDs, then feel free to skip this section.

Before continuing on to the next step, be sure to see [this article about how Amplitude identifies unique users](/docs/data/sources/instrument-track-unique-users) for all the details you need to know.

## Best practices for setting user IDs

* **Don't set the user ID if there isn't one.** For example, if you set the user ID to the string `None`  for multiple users, Amplitude doesn't recognize those users as separate users. Instead, it assumes all those users are actually the **same** user, and it groups all events for those users together under that `None`  user ID. As stated earlier, you can always set the user ID later.
* **Don't assign a user ID that might change.** User IDs are fixed forever: don't, for example, set a user's email address as their user ID—email addresses change.
* **User IDs are case-sensitive.** If you set a user ID in a different case, Amplitude tracks two separate profiles for the same user.
* **Assigning user IDs server-side can be tricky.** If you're running into issues assigning user IDs, [contact Amplitude Support](https://support.amplitude.com).