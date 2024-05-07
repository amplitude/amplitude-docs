---
title: "Use recommendations in personalization campaigns"
source: "https://help.amplitude.com/hc/en-us/articles/360059626072-Use-recommendations-in-personalization-campaigns"
id: 314e6a98-3da6-4985-9ab3-f58b81646a75
---

#### This article will help you:

* Use the Profile API to deploy your recommendations
* Understand and analyze the results

Once you've created a new recommendation, you'll need to integrate it into your personalization campaigns. This article describes the process, using the Profile API.

## Deploy your recommendation

The primary destination for deploying a recommendation is Amplitude’s [Profile API](https://www.docs.developers.amplitude.com/analytics/apis/user-profile-api/?h=profile+api). This is a real-time API, which you can call by user ID or device ID, and in less than a second, Amplitude will return an array of information about the user.

You can give a recommendation access to the Profile API by navigating to the *Syncs* tab and selecting the Profile API as a destination for the recommendation.

### The API

The Profile API is a REST endpoint, queryable by user ID or device ID and serving JSON responses on a per user basis:

|  |
| --- |
| `https://profile-api.amplitude.com/v1/userprofile` |

To authenticate to use the API, use the **Secret Key** from the project settings in Amplitude (*Settings → Projects → [select project] → General*).

Query parameters are set to specify the user ID and the recommendation. Results are returned as a JSON response body.

The following example request returns the results for a specific user and recommendation. The ID for a specific recommendation is found in the *Details* section of a recommendation page.

|  |
| --- |
| `curl -H "Authorization: Api-Key Secret-Key" 'https://profile-api.amplitude.com/v1/userprofile?user_id=myuser&rec_id=s234ssg'` |

A sample response for this query is:

|  |
| --- |
| {
`"userData": {`
`"recommendations":
 [` 
`{` 
`"rec_id":
 "s234ssg",` 
`"is_control":
 true,` 
`"items":
 ["investing-101", "mortgage-rates-primer", "retirement-goals",
 "what-is-a-cd", "setting-up-direct-deposit"],` 
`"recommendation_source":
 "recommendations_model_v2",` 
`"last_updated":1.61419226E9` 
`},` 
`...` 
        ],
`"user_id":"myuser",` 
`"device_id":"bef34a71-62cd-5b2e-af2f-58cd2eabb4d9",` 
`"amp_props":null`
`}`
} |

The response contains three key pieces of information:

* `rec_id`: the unique identifier of the recommendation
* `Is_control`: a true/false result, indicating whether the user is in the control or treatment for recommendation
* `items`: an array of strings. The items are ordered by predicted likelihood to optimize the outcome, with the first having the highest probability

The API can also be used to retrieve user properties, predictions, and cohort membership. The following example sends a request to retrieve a recommendation, all user properties, a prediction and cohort memberships:

|  |
| --- |
| `curl -H "Authorization: Api-Key Secret-Key" 'https://profile-api.amplitude.com/v1/userprofile?user_id=myuser&rec_id=s234ssg&get_amp_props=true&prediction_id=t456tth&get_cohorts=true'`  |

A sample response for this query is:

|  |
| --- |
| `{`
`"userData": {`
`"user_id": "myuser",` 
`"device_id":"bef34a71-62cd-5b2e-af2f-58cd2eabb4d9",` 
`"amp_props":
 {` 
`"country":
 "United States",` 
`"city":"Springfield",` 
`"first_used":"2019-04-30",` 
`"language":"English",` 
`"carrier":"Verizon",` 
`"last_used":"2021-02-25"` 
`"plan_type":
 "starter",` 
`"device":"samsung
 samsung SM-N976V",` 
`"os":
 "android 30",` 
`"app_version":"6.1.0",` 
`"gp:membership_points":
 "1752",` 
`"gp:initial_utm_campaign":
 "abcd",` 
`"gp:email":"user@example.com",` 
`},`
`"recommendations":
 [` 
`{` 
`"rec_id":
 "s234ssg",` 
`"is_control":
 true,` 
`"items":
 ["investing-101", "mortgage-rates-primer", "retirement-goals",
 "what-is-a-cd", "setting-up-direct-deposit"],` 
`"is_control":
 false,` 
`"recommendation_source":
 "recommendations_model_v2",` 
`"last_updated":1.61419226E9` 
`},` 
`...` 
`],`
`"predictions":
 [` 
`{` 
`"name":
 "Likelihood to Convert",` 
`"percentile":
 97.5,` 
`"pred_id":
 "t456tth",` 
`"probability":
 0.734` 
`},` 
`...` 
`],`
`"cohort_memberships":
 [` 
`"u567uui",` 
`...` 
`]`
`}`
`}` |

### Integrate the API

The Profile API makes embedding recommendations into a customer’s digital workflows highly extensible. To do so, follow these steps:

1. Call the API:
	* * * * * Pass in a user ID or device ID to retrieve a user profile.
					* A call may be made in real time during a user session. In this case, the user profile returned will be the most recent at the moment of the call.
					* A call may be made at application startup and cached throughout a user session, to be used when appropriate. Though the Profile API is designed to return with low latency and handle reasonable volumes of traffic, caching in this way will further reduce latency variability. The tradeoff is that results may be less fresh. In most cases, cached results remain valid for several hours or longer, so this is typically a viable option, especially in situations where responsiveness is paramount.
					* The application-level secret key **should not be published** to client-side apps or in web source code, so a backend or proxy may be needed to validate user identity and forward requests on to Amplitude’s API.
2. When a response is returned, decide which recommended experience to serve, by checking the value of `is_control` :
	* * * * * if `false` , then use `items`  in the recommended payload.
					* if `true` , then default to the baseline product experience. `items`  is populated with a random selection of items; this may or may not be a good choice for a baseline.
					* If the `recommendations`  block is `null` , or the API returns an error, default to the baseline product experience. This means either the user is not yet known to Amplitude, or there isn’t enough user history to provide recommendations for this user.
3. Match the returned items from the payload with your internal CMS or feature flagging system, to indicate which items to serve to the user.
4. Integrate the API with your delivery system.
	* * * * * If serving users via an internal system, follow your normal delivery method.
					* If serving experiences via Braze connected content, [follow these instructions](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/connected_content/making_an_api_call/#using-basic-authentication).
					* If serving experiences via Movable Ink, [follow these instructions](https://github.com/movableink/Developer-Docs).

## Analyze your results

Once the Profile API is deployed into a customer’s app, website, or email channels, Amplitude Audiences will be able to measure performance of the recommendation. It does this by logging an Amplitude event ( `[Recs] Recommendation Event` ) every time the Profile API is called for that specific recommendation.

**NOTE:** This **will not count** against your event volume

To view the performance of your recommendation, open the recommendation you’re interested in and click on the *Performance* tab.

You will see summary stats from a funnel conversion chart:

* Lift against baseline
* Recommendation conversion rate
* Control conversion rate
* Significance

Amplitude defines "significance" as the value of `1 - *p*`, where *p* is determined by a two-sided *t* test. (In some cases, certain previously-saved charts may still display chance to outperform, in order to maintain the consistency of past results.)

This funnel compares two segments: a **control** segment and a **treatment** segment. For the control segment, `recommendations.recommendation_control = True` . For the treatment segment, `recommendations.recommendation_control = False` .

The default funnel consists of two steps, the exposure event and outcome event. You can update this manually if you need to. It will show you a comparison of the two segments over time.

You can see whether the difference between the Control and Treatment segments is statistically significant by checking the value in the Significance column.

With this information, you should be able to quantify the concrete impact each recommendation has made to your bottom line.
