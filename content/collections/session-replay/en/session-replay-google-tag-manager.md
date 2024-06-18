---
id: d225a8c4-c504-4cbe-b4f3-8709ab43fdc1
blueprint: session-replay
title: 'Implement Session Replay with Google Tag Manager'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714506527
source: https://www.docs.developers.amplitude.com/session-replay/tag-managers/google-tag-manager/
---
Instrumenting Amplitude Session Replay with Google Tag Manager requires a different procedure than with the standard [Browser SDK Plugin](/docs/session-replay/session-replay-plugin). To instrument Session Replay with Google Tag Manager:

1. Add the [Google Tag Manager Web Template for Amplitude Analytics Browser SDK](/docs/data/source-catalog/google-tag-manager) if it's not yet enabled.
2. In Google Tag Manager, create an **init** tag with the same API key as your Amplitude Project. This is the project that receives the session replays.
   1. Set the **Trigger** to `Initialization`.
   2. Amplitude recommends that you enable default event tracking for better search support with Session Replay. Default events count against your event quota.
3. Create a **Custom HTML** tag for Session Replay, and paste the code shown below.
4. Set **Trigger** for the Session Replay Tag to `Initialization`.
5. Sequence the Amplitude Initialization Tag to fire **after** the Session Replay tag. 
6. Deploy the tags. Replays should begin to appear on the home page of the Amplitude app. Ensure that you're looking at the correct project.

```html 
<script>
    function loadAsync(src, callback) {
      var script = document.createElement('script');
      script.src = src;
      if (script.readyState) { // IE, incl. IE9
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
      } else {
        script.onload = function() { // Other browsers
            callback();
        };
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    loadAsync("https://cdn.amplitude.com/libs/plugin-session-replay-browser-{{sdk_versions:session_replay_standalone}}-min.js.gz", 
      function () {
        var sessionReplayTracking = window.sessionReplay.plugin({sampleRate: 1});
        window.amplitude.add(sessionReplayTracking).promise;
    });

</script>
```

{{partial:admonition type="info" heading="Sample rate"}}
The sample rate in this sample is set to 1, or 100%, which means every session is captured. This is good for testing, but not recommended for production. For more information, see [Session Replay Plugin | Sample Rate](/docs/session-replay/session-replay-plugin#sampling-rate).
{{/partial:admonition}}

## Troubleshooting

Multiple instantiation of the Amplitude SDKs. This is a common problem seen with GTM and other code injection frameworks. Ensure that the initialization logic is only run once on your app. This could happen if:

- There is more than 1 “Init Tag” or another custom tag that’s running Amplitude. 
- You have another Code Injection Framework (for example, SquareSpace or Bubble) that also runs Amplitude. 

This template uses the Amplitude Browser SDK Plugin. For help troubleshooting, see [Troubleshooting | Session Replay Plugin](/docs/session-replay/session-replay-plugin#troubleshooting)