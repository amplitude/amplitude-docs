---
title: "How will you identify your users?"
source: "https://help.amplitude.com/hc/en-us/articles/206404628-How-will-you-identify-your-users-"
id: 0540d355-59be-49fc-b93d-ac1a256c38af
---

#### This article will help you:

* Learn how Amplitude identifies and tracks your users
* Understand best practices for setting user IDs

Amplitude uses a combination of three different methods to identify your users: device IDs, Amplitude ID, and **user IDs**. The first comes directly from your users' devices, while the second is an ID that Amplitude automatically creates once it has enough information to conclusively identify a unique user. The user ID, however, is something you'd set up.

In Amplitude, a user ID is a unique identifier applied to individual users. Using them is optional, but recommended: your product should set a user ID once a user has created an account, logged in, or is otherwise identified in your product.

Amplitude can use a user ID to reconcile events across multiple devices under the same user ID. Additionally, a user's event data will be merged on the backend so that all anonymous events prior to the assignment of a user ID will be connected to the correct user. For this reason, you can wait to assign user IDs if that makes sense for your product. Conversely, this is also why you should **not** set user IDs for anonymous users.

Once set, user IDs in Amplitude **cannot be changed**.

If your product doesn't currently assign user IDs, then feel free to skip this section.

Before continuing on to the next step, be sure to see [this article about how Amplitude identifies unique users](/cdp/sources/instrument-track-unique-users). It's got all the details you'll need.

## Best practices for setting user IDs

* **Don't set the user ID if there isn't one.** For example, if you set the user ID to the string `None`  for multiple users, Amplitude will not recognize those users as separate users. Instead, it will assume all those users are actually the **same** user, and it will group all events for those users together under that `None`  user ID. As stated earlier, you can always set the user ID later.
* **Don't assign a user ID that might change.** User IDs are fixed forever, so don't, for example, set a user's email address as their user ID—email addresses change.
* **User IDs are case-sensitive.** If you set a user ID in a different case, Amplitude will track two separate profiles for the same user.
* **Assigning user IDs server-side can be tricky.** If you're running into issues assigning user IDs, please [contact us](/hc/en-us/requests/new).
