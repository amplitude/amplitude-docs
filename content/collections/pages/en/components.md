---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
package: "@amplitude/session-replay-browser"
---

The following wording is preferred:

"after" instead of "once"
Example: After the priority list is set, the list of proposed product requests are communicated to the Engineering team.
Not Once the priority list is set, the list of proposed product requests are communicated to the Engineering team.

"allow list" or "allow-listing" instead of "whitelist"
Example: Add the API key to the allow list.

"block list" instead of "blacklist"
Example: All Twitch stream endpoints must be added to the block list.

“customers” for Amplitude customers and “users” for end users.

“currently” 
Do not use. The documentation is the current state of the product.

"descope" instead of de-scope
Example: These expedited requests are product requests that are meant to replace or descope work that was already planned for the quarter.

"dropdown" instead of "drop-down" or "drop down"
Example: Select the end user drop-down menu and select your user ID.

"end user" instead of end-user
Example: "The function will benefit end users by…"

"fullscreen" instead of "full screen" or "full-screen"
When referring to the mode, it is a single word. When directing people, it can be two words. Don’t use the hyphen. 

"lifecycle" instead of "life cycle"
Example: The lifecycle of the product is dependent upon the following decisions..."

"More Information" instead of "See Also" 
Example: Used as a heading at the bottom of a page before including additional, related links.
By preference, remove "See Also" references, including "for more information, see <LINK>" references as "see" is an ableist term.

For more information, go to <LINK>

“typical” or “general” instead of “normal” unless describing mathematical statistical ranges.
Preferred wording. 

"parent/child" instead of "master/slave" 
Example: Nest all child pages under the main parent page within the wiki.

"Recap" instead of "re-cap"
Example: We should sit down and recap the Engineering All-Hands Meeting. 
Not We should sit down and re-cap the Engineering All-Hands Meeting. 

"sync/synced" instead of "synch/synched"
Preferred spelling.

## Tabs

Uses two partials, `tabs` and `tab`. `tabs` provides the wrapper and sets the tab names. `tab` renders the individual tab content. 

{{partial:tabs tabs="js, ts"}}
{{partial:tab name="js"}}
JS example
```php
// Merging in multiple
return array_merge(
    $this->context->only('foo', 'bar', 'baz')->all(),
    ['local' => 'value']
);
```
{{/partial:tab}}
{{partial:tab name="ts"}}
TS example
```java
// Set logger 
client.setLogger(new AmplitudeLog() {
  @Override
  public void log(String tag, String message, LogMode messageMode) {
    if (messageMode.level >= logMode.level) {
      // implement using custom logging framework and format
    }
  }
});
```
{{/partial:tab}}
{{/partial:tabs}}

## Collapse

{{partial:collapse name="Test collapse"}}
| Name  | Description | Default Value |
| --- | --- | --- |
|`instanceName`| `string`. The instance name. | `$default_instance` |
|`flushIntervalMillis`| `number`. Sets the interval of uploading events to Amplitude in milliseconds. | 1,000 (1 second) |
|`flushQueueSize`| `number`. Sets the maximum number of events that are batched in a single upload attempt. | 30 events |
|`flushMaxRetries`| `number`. Sets the maximum number of reties for failed upload attempts. This is only applicable to retryable errors. | 5 times.|
|`logLevel` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. | `LogLevel.Warn` |
|`loggerProvider `| `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. | `Amplitude Logger` |
|`minIdLength`|  `number`. Sets the minimum length for the value of `userId` and `deviceId` properties. | `5` |
|`optOut` | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events. | `false` |
|`serverUrl`| `string`. Sets the URL where events are upload to. | `https://api2.amplitude.com/2/httpapi` | 
|`serverZone`| `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center. | `US` |
|`transportProvider`| `Transport`. Sets a custom implementation of `Transport` to use different request API. | `FetchTransport` |
|`useBatch`| `boolean`. Sets whether to upload events to Batch API instead of instead of the default HTTP V2 API or not. | `false` |

{{/partial:collapse}}

## Admonition

{{partial:admonition type="note" heading=""}}
This is a note
{{/partial:admonition}}

{{partial:admonition type="info" heading=""}}
Information that's different than a note.
{{/partial:admonition}}

{{partial:admonition type="warning" heading=""}}
This is a warning
{{/partial:admonition}}

{{partial:admonition type="example" heading=""}}
Show an example here
{{/partial:admonition}}

{{partial:admonition type="tip" heading=""}}
General tip
{{/partial:admonition}}

{{partial:admonition type="alpha" heading=""}}
Alpha
{{/partial:admonition}}

{{partial:admonition type="beta" heading=""}}
Beta
{{/partial:admonition}}

{{partial:admonition type="deprecated" heading=""}}
This is no longer available
{{/partial:admonition}}