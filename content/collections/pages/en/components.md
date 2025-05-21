---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
---

{{partial:experiment/interactive_table-test api-name="Evaluation"}}


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