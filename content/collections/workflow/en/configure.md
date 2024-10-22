---
id: c33709fd-ba40-43e3-ba18-3b7467d2940c
blueprint: workflow
title: 'Configure your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061270372-Configure-your-experiment'
this_article_will_help_you:
  - 'Create a deployment to house your experiment'
  - 'Install the SDK you wish to use for your experiment'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714514522
---
The first step in creating an experiment is to configure it. Configuring is a brief, two-stage process: first you’ll create a deployment, then you’ll install the SDK you want to use.

## Create a deployment

In Amplitude Experiment, a deployment is where you can serve a group of flags or experiments for code execution. Once you create a deployment, Experiment generates an access key, which you can then use to properly route your flags and experiments.

Deployments live under Amplitude Analytics projects. A project can have multiple deployments, but you can attach  each deployment to a single project.

To create a deployment follow these steps:

1. From inside Experiment, click *Deployments* in the left-hand rail. Then click *+ Create Deployment.*
2. Choose the Amplitude Analytics project you’d like the deployment to be associated with. If you want to create deployments in multiple projects at once, just select all the relevant projects from the drop-down list.
3. Next, choose a name for your deployment and specify its type:

  * **Client-side**: These deployments run on a client device, such as a web browser or mobile app. The deployment key associated with client deployments is publicly viewable and should be used in client-side SDKs.
  * **Server-side:** These deployments run on a server you control, such as a web server or batch processing system. Keep the deployment key associated with server deployments secret and use it server-side SDKs. Server-side keys can access the REST API for flag evaluation. If, instead of running a full-blown experiment, you only need to evaluate flags using the REST API, you should create a server-side deployment.

4. Click *Add Deployment*. Amplitude Experiment creates your deployments and automatically generate keys to copy and use.

## Install the SDK

If you don't use the REST API, the next step is to install an [Experiment SDK](/docs/sdks/experiment-sdks).

All SDKs send a request to Amplitude Experiment to decide what flag configurations it should serve to a particular user. That said, there are some important differences between client-side and server-side SDKs you should be aware of.

**Client-side** SDKs should run in the end-user application deployment. When choosing between client-side and server-side, keep in mind that client-side SDKs:

* Assume a single user deployment
* Use client-side deployment keys, which are **public** and **visible** to end users
* Fetch variants up front for a given user
* Store variants locally on the client for offline mode

**Server-side** SDKs, should run in a server deployment. Server-side SDKs:

* Assume a multi user deployment
* Use Server-side deployment keys, which you should keep private
* Fetch variants on each request

## The User context

When assigning variants, the evaluation engine applies the targeting rules to a user context object, which represents the identity of an individual user. In client-side SDKs, this object-user relationship is set on initialization and passed to the server on every request for variants. In server-side SDKs, the user may change, and should be set on every request.

When targeting individual users to assign variants, Experiment matches on any of the listed user identifiers, such as `user_id` and `device_id`. Using rule-based user segments, users match on any of the predefined properties (country, platform, etc.), or on custom properties specified in the user\_properties object. Read more about [defining experiment users in this article](/docs/feature-experiment/data-model#users).

{{partial:admonition type='note'}}
You should use the same user identifiers for Amplitude Experiment that you use for sending data to Amplitude Analytics. This way, identities resolve correctly, and data generated is correctly associated with the same user in Analytics.
{{/partial:admonition}}
