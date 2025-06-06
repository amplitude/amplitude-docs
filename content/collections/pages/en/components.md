---
id: 4d2e02c1-9bf7-48ec-ab17-641fe208de23
blueprint: page
title: 'Site components'
package: "@amplitude/session-replay-browser"
---

## Playground

```yaml
---
# MegaLinter GitHub Action configuration file for our daily link check.
# This action runs a link check on our entire doc set every day at 12:00 AM so we're warned when a link breaks.
# This is a separate workflow file from main Megalinter checks because we needed to use different settings for this run.

name: Daily Link Check
on:
  schedule:
  # Run everyday at 12:00 AM
  - cron: "0 0 * * *"

jobs:
build:
name: MegaLinter
runs-on: ubuntu-latest
steps:
# Git Checkout
- name: Checkout Code
  uses: actions/checkout@v3
  with:
    token: ${{ secrets.PAT || secrets.GITHUB_TOKEN }}
    fetch-depth: 0


- name: Set up PHP
  uses: shivammathur/setup-php@v2
  with:
    php-version: '8.2' # Adjust as needed
    extensions: bcmath, ctype, exif, json, mbstring, openssl, pdo, tokenizer, xml, gd
    tools: composer, php-cs-fixer

- name: Install Dependencies
  run: composer install --no-interaction --prefer-dist --optimize-autoloader

- name: Setup Node.js
  uses: actions/setup-node@v2
  with:
    node-version: '20'

- name: Install NPM Dependencies
  run: npm install
# External Link Check
- name: Internal Link Check
  run: ./linkchecker external

```



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