---
id: e4d9e0f6-a440-47d9-9f21-f1af62645bff
blueprint: get-started
title: 'What is Amplitude?'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718902608
source: "/docs/analytics/what-is-amplitude/"
---
Amplitude is a powerful product analytics platform that enables you to build better products by tracking and understanding user behavior. 

Use Amplitude to track user data and gain insights into user engagement, retention, and revenue. Amplitude keeps your data trustworthy and secure, ensuring that you have access to accurate and reliable information. Amplitude offers powerful analytics tools that help answer questions about what happened, why it happened, and which actions to take next. With Amplitude, you can seamlessly share your work across teams, facilitating collaboration and driving growth.

## Key concepts

Amplitude is an event-based analytics tool that tracks the behaviors of users based on in-product interactions and analyzes user behavior in real-time. Event-based analytics is the method of tracking and analyzing interactions between users and your product, also known as events. Before you get started with Amplitude, it's important to understand some key concepts. 

| Name             | Description                                                        | A music player app example               |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| Events           | An event is an action a user has taken                             | A user presses the "Play Song" button    |
| Event Properties | Event properties are details about an event.                       | The genre of the music                   |
| Users            | A user is the specific individual that interacts with your product | A user uses the app to play music        |
| User Properties  | User properties are details about a user                           | Whether a user is on a paid or free plan |
| Sessions         | A session is the period of time a user has your app                | A user uses the app to play music        |

TL;DR: If you aren't interested in the details of these concepts you can stop reading now. 

### Events

Events are actions that users take in your product, such as clicking a button, making a purchase, or creating an account. You define the events you want to track in Amplitude, and the data you want to capture for each event. For example, you could send an “Play Song” event every time a user presses the Play button in a music player application.

You can learn more about how to decide which events to [track](/docs/get-started/select-events).

#### Event properties

Event properties are details about events. For example, when someone presses the “Play Song” event in a music player application, event properties can track the genre for you. Any detail related to the event can be an event property.

### Users

A user is the specific individual who completed an interaction with your product. Amplitude analyses depend on accurately tracking **unique users**. This is often trickier than it sounds, because your users can log in and out at will, browse anonymously, or use multiple devices. 

Learn more about how to [identify your users](/docs/get-started/understand-user-activity) and [how Amplitude tracks unique users](/docs/cdp/sources/instrument-track-unique-users) by using a combination of device IDs, user IDs, and Amplitude IDs.

#### User properties

User properties are details about users. For example, use them to keep track of whether a user was on a paid or free plan in a music player application.

### Sessions

A session is the duration a user has your app in the foreground or has your website open. Sessions are useful for understanding the frequency and duration of your users' engagement with your product. Amplitude assigns a session ID to each session, and all events within the same session share the same session ID. To send data, Amplitude SDKs automatically generate and manage session IDs. However, you have to manage session IDs yourself, using HTTP APIs. 

You can learn more about [how Amplitude tracks sessions](/docs/cdp/sources/instrument-track-sessions).

If you are new to Amplitude, you should complete [this course](https://academy.amplitude.com/path/getting-started-with-amplitude-analytics-learning-path) to get started and learn more [helpful definitions](/docs/get-started/helpful-definitions).