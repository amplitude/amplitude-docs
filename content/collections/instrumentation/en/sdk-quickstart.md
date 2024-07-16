---
id: bcd2bdb9-24a7-4c65-bb08-764eda6efaa5
blueprint: quickstart
template: quickstart
title: 'SDK Quickstart'
nav_title: developers
sdk:
  -
    id: lyhoq835
    sdk_label: Browser
    related_sdk:
      - 00d74a7b-23bd-4a24-86a1-92c046e7e1b5
    install_instructions: 'Install the dependency using NPM, YARN, or script loader.'
    installation_grid:
      -
        id: lyhoqmxu
        tab_label: 'Script loader'
        instructions: "This package is also distributed through a CDN. Copy and paste this script in your HTML file. For the latest script loader, visit [Amplitude's GitHub repository](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#installing-via-script-loader)."
      -
        id: lyhoy38o
        tab_label: npm
        instructions: |-
          ```bash
          npm install @amplitude/analytics-browser
          ```

          Import Amplitude into your project:
          ```js
          import * as amplitude from '@amplitude/analytics-browser';
          ```
      -
        id: lyhoyzf1
        tab_label: yarn
        instructions: |-
          ```bash
          yarn add @amplitude/analytics-browser
          ```

          Import Amplitude into your project:
          ```js
          import * as amplitude from '@amplitude/analytics-browser';
          ```
    type: intro
    enabled: true
    initialization_grid:
      -
        id: lyhozqou
        instructions: |-
          ```js
          amplitude.init(AMPLITUDE_API_KEY);
          ```
    send_data_grid:
      -
        id: lyhp0e7d
        instructions: |-
          ```js
          const eventProperties = {
              buttonColor: 'primary',
          };
          amplitude.track('Button Clicked', eventProperties);
          ```
    code_sample_grid:
      -
        id: lyhp0vbo
        instructions: |-
          ```js
          amplitude.init(AMPLITUDE_API_KEY, 'user@amplitude.com');
          const eventProperties = {
              buttonColor: 'primary',
          };

          const identifyObj = new Identify();
          identifyObj.set('location', 'LAX');
          amplitude.identify(identifyObj);

          amplitude.track('Button Clicked', eventProperties);
          ```
    ampli_article:
      - 5afa91b7-c12d-425a-b4b6-661061e5843a
    ampli_grid:
      -
        id: lyhp3xf2
        instructions: |-
          ```js
          import { ampli } from './ampli';
          ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });

          ampli.buttonClicked({
              buttonColor: 'primary',
          });
          ```
  -
    id: lyhpbh1f
    sdk_label: Node
    related_sdk:
      - e3b9838b-8d35-49d8-ba91-5a0840cbc603
    install_instructions: 'Install the dependency with npm or yarn.'
    installation_grid:
      -
        id: lyhrf9ie
        tab_label: npm
        instructions: |-
          ```bash
          npm install @amplitude/analytics-node
          ```
      -
        id: lyhrg8bd
        tab_label: yarn
        instructions: |-
          ```bash
          yarn add @amplitude/analytics-node
          ```
    initialization_grid:
      -
        id: lyhrgp8o
        tab_label: TypeScript
        instructions: |-
          ```ts
          import { init } from '@amplitude/analytics-node';

          init(AMPLITUDE_API_KEY);
          ```
      -
        id: lyhrhb77
        tab_label: JavaScript
        instructions: |-
          ```js
          import { init } from '@amplitude/analytics-node';

          init(AMPLITUDE_API_KEY);
          ```
    send_data_grid:
      -
        id: lyhrhozt
        tab_label: TypeScript
        instructions: |-
          ```ts
          import { track } from '@amplitude/analytics-node';

          const eventProperties = {
            buttonColor: 'primary',
          };

          track('Button Clicked', eventProperties, {
            user_id: 'user@amplitude.com',
          });
          ```
      -
        id: lyhri0o4
        tab_label: JavaScript
        instructions: |-
          ```js
          import { track } from '@amplitude/analytics-node';

          const eventProperties = {
            buttonColor: 'primary',
          };

          track('Button Clicked', eventProperties, {
            user_id: 'user@amplitude.com',
          });
          ```
    code_sample_grid:
      -
        id: lyhricy5
        instructions: |-
          ```ts
          import { init, identify, Identify, track } from '@amplitude/analytics-node';
          init(AMPLITUDE_API_KEY);

          const identifyObj = new Identify();
          identify(identifyObj, {
              user_id: 'user@amplitude.com',
          });

          const eventProperties = {
              buttonColor: 'primary',
          };
          track('Button Clicked', eventProperties, {
              user_id: 'user@amplitude.com',
          });
          ```
        tab_label: TypeScript
      -
        id: lyhrih3t
        instructions: |-
          ```js
          import { init, identify, Identify, track } from '@amplitude/analytics-node';
          init(AMPLITUDE_API_KEY);

          const identifyObj = new Identify();
          identify(identifyObj, {
              user_id: 'user@amplitude.com',
          });

          const eventProperties = {
              buttonColor: 'primary',
          };
          track('Button Clicked', eventProperties, {
              user_id: 'user@amplitude.com',
          });
          ```
        tab_label: JavaScript
    ampli_article:
      - 5f0a9b3c-627c-4014-bb2e-d1ac1c465db9
    ampli_grid:
      -
        id: lyhrjmnw
        tab_label: TypeScript
        instructions: |-
          ```ts
          ampli.load();

          ampli.yourEventType('ampli-user-id', {
              stringProp: 'Strongly typed property',
              booleanProp: true,
          });
          ```
      -
        id: lyhrjxhk
        tab_label: JavaScript
        instructions: |-
          ```js
          ampli.load();

          ampli.yourEventType('ampli-user-id', {
              stringProp: 'Strongly typed property',
              booleanProp: true,
          });
          ```
    type: intro
    enabled: true
  -
    id: lyhrtj8w
    sdk_label: Android
    related_sdk:
      - 4e6f43a0-1f71-4b9d-9193-f45500b42188
    introduction: |-
      {{partial:collapse name="Get started with an example project"}}
      #### Kotlin Android example project
      To get started fast, check out an [example Kotlin Android project](https://github.com/amplitude/Amplitude-Kotlin/tree/main/samples/kotlin-android-app):

      1. Clone the repo.
      2. Open it with Android Studio.
      3. Change your [API key](/docs/apis/keys-and-tokens) in `build.gradle` for `Module: samples: kotlin-android-app` under Gradle Scripts. 
      4. Sync the project with Gradle files. 
      4. Run `samples.kotlin-android-app`.
      5. Press the button to send events in the running application. 

      #### Java Android example project
      To get started fast, check out an [example Java Android project](https://github.com/amplitude/Amplitude-Kotlin/tree/main/samples/java-android-app):

      1. Clone the repo.
      7. Open it with Android Studio.
      8. Change your [API key](/docs/apis/keys-and-tokens) in `build.gradle` for `Module: samples: java-android-app` under Gradle Scripts. 
      9.  Sync the project with Gradle files. 
      10. Run `samples.java-android-app`.
      11. Press the button to send events in the running application. 

      #### Kotlin JVM example project
      To get started fast, check out an [example Kotlin JVM project](https://github.com/amplitude/Amplitude-Kotlin/tree/main/samples/kotlin-jvm-app):

      1. Clone the repo.
      13. Open it with Android Studio.
      14. Change your [API key](/docs/apis/keys-and-tokens) in `samples/kotlin-jvm-app/main/java/main.kt` and run the file.

      {{/partial:collapse}}
    install_instructions: |-
      ### Add permissions

      After you install the library, add the following to `AndroidManifest.xml`

      ```xml
      <uses-permission android:name="android.permission.INTERNET" />
      ```

      For Android 6.0 (Marshmallow) and higher, explicitly add permission to fetch the device [advertising ID](/docs/sdks/analytics/android/android-kotlin-sdk#advertiser-id). 

      The SDK internally uses a few Java 8 language APIs through desugaring. Make sure your project either [enables desugaring](https://developer.android.com/studio/write/java8-support#library-desugaring) or requires a minimum API level of 16.
    installation_grid:
      -
        id: lyhryrij
        tab_label: Gradle
        instructions: |-
          ```groovy
          dependencies {
              implementation 'com.amplitude:analytics-android:1.+'
          }
          ```
      -
        id: lyhrzj17
        tab_label: Maven
        instructions: |-
          ```xml
          <dependency>
              <groupId>com.amplitude</groupId>
              <artifactId>analytics-android</artifactId>
              <version>[1.0,2.0)</version>
          </dependency>
          ```
    type: intro
    enabled: true
    initialization_grid:
      -
        id: lyhs9i5c
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          import com.amplitude.android.Amplitude

          val amplitude = Amplitude(
              Configuration(
                  apiKey = AMPLITUDE_API_KEY,
                  context = applicationContext
              )
          )
          ```

          Configure the `serverZone` property to configure your application to use European data residency.

          ```kotlin
          import com.amplitude.android.Amplitude

          val amplitude = Amplitude(
              Configuration(
                  apiKey = AMPLITUDE_API_KEY,
                  context = applicationContext,
                  serverZone = ServerZone.EU //[tl! ~~]
              )
          )
          ```
      -
        id: lyhscms6
        tab_label: Java
        instructions: |-
          ```java
          import com.amplitude.android.Amplitude;

          Amplitude amplitude =  new Amplitude(new Configuration(
              apiKey = AMPLITUDE_API_KEY,
              context = applicationContext
          ));
          ```

          Configure the `serverZone` property to configure your application to use European data residency.

          ```java
          import com.amplitude.android.Amplitude;

          Amplitude amplitude =  new Amplitude(new Configuration(
              apiKey = AMPLITUDE_API_KEY,
              context = applicationContext,
              serverZone = ServerZone.EU //[tl! ~~]
          ));

          ```
    init_instructions: |-
      Amplitude recommends doing the initialization in the Main Activity, which never gets destroyed, or the Application class if you have one. After it's initialized, you can use the Android SDK anywhere in your Android application.

      {{partial:admonition type="note" title="EU residency"}}
      For EU data residency, the project must be set up inside Amplitude EU. Initialize the SDK with the API key from Amplitude EU.
      {{/partial:admonition}}
    send_data_instructions: 'Events tracked are buffered locally and flushed every 30 seconds. After calling track() in your app, it may take several seconds for event data to appear in Amplitude.'
    send_data_grid:
      -
        id: lyhsjymn
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          // Track a basic event
          amplitude.track("Button Clicked")
          // Track events with optional properties
          amplitude.track(
              "Button Clicked",
              mapOf("buttonColor" to "primary")
          )
          ```
      -
        id: lyhskbvy
        tab_label: Java
        instructions: |-
          ```java
          // Track a basic event
          amplitude.track("Button Clicked");
          // Track events with optional properties
          amplitude.track("Button Clicked", new HashMap() {{
              put("buttonColor", "primary");
          }});
          ```
    code_sample_grid:
      -
        id: lyhskotm
        instructions: |-
          ```kotlin
          package com.amplitude.android.sample

          import android.os.Bundle
          import com.amplitude.core.events.Identify
          import com.amplitude.android.Amplitude
          import com.amplitude.android.Configuration

          class MainActivity : AppCompatActivity() {
              private val amplitude = Amplitude(
                  Configuration(
                      apiKey = AMPLITUDE_API_KEY,
                      context = applicationContext
                  )
              );

              override fun onCreate(savedInstanceState: Bundle?) {
                  super.onCreate(savedInstanceState)
                  setContentView(R.layout.activity_main)

                  val identify = Identify()
                  identify.set("user-platform", "android")
                  amplitude.identify(identify)

                  amplitude.track("test event properties", mapOf("test" to "test event property value"))
              }
          }
          ```
        tab_label: Kotlin
      -
        id: lyhsl9l0
        instructions: |-
          ```java
          package com.amplitude.android.sample;

          import androidx.appcompat.app.AppCompatActivity;
          import android.os.Bundle;
          import com.amplitude.android.Amplitude;
          import com.amplitude.core.events.Identify;
          import java.util.HashMap;

          public class MainActivity extends AppCompatActivity {

              @Override
              protected void onCreate(Bundle savedInstanceState) {
                  super.onCreate(savedInstanceState);
                  setContentView(R.layout.activity_main);
                  Amplitude amplitude = new Amplitude(new Configuration(
                      apiKey = AMPLITUDE_API_KEY,
                      context = applicationContext
                  ));

                  Identify identify = new Identify().set("user-platform", "android")
                  amplitude.identify(identify);

                  amplitude.track("test event properties", new HashMap() {{
                      put("test", "test event property value");
                  }});
              }
          }
          ```
        tab_label: Java
    ampli_article:
      - 167c275e-0aad-4fd1-9658-43a25c4654d6
    ampli_grid:
      -
        id: lyhslzd0
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          ampli.load()

          ampli.yourEventType(
              stringProp = "Strongly typed property",
              booleanProp = true
          )

          ```
      -
        id: lyhsmhh0
        tab_label: Java
        instructions: |-
          ```java
          Ampli.getInstance().load();

          Ampli.getInstance().yourEventType(
              YourEventType.builder()
                  .stringProp("Strongly typed property")
                  .booleanProp(true)
                  .build()
          );
          ```
  -
    id: lyhsnw3r
    sdk_label: iOS
    related_sdk:
      - 36708c4b-d35c-4a7e-9c31-1c1571d6a73f
    install_instructions: 'Install the Amplitude Analytics iOS SDK with CocoaPods, Carthage, or Swift Package Manager'
    installation_grid:
      -
        id: lyhsoih2
        tab_label: CocoaPods
        instructions: |-
          1. Add the dependency to your `Podfile`:

              ```bash
              pod 'AmplitudeSwift', '~> 1.0.0'
              ```
          2. Run `pod install` in the project directory.
      -
        id: lyhsqupz
        tab_label: 'Swift Package Manager'
        instructions: |-
          1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
          2. Enter the URL `https://github.com/amplitude/Amplitude-Swift` in the search bar. 
          3. Xcode will automatically resolve to the latest version. Or you can select a specific version. 
          4. Click the "Next" button to confirm the addition of the package as a dependency. 
          5. Build your project to make sure the package is properly integrated.
      -
        id: lyhsrk5o
        tab_label: Carthage
        instructions: |-
          Add the following line to your `Cartfile`.
          ```bash
          github "amplitude/Amplitude-Swift" ~> 1.0.0
          ```
          Check out the [Carthage docs](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more info.
    type: intro
    enabled: true
    init_instructions: |-
      {{partial:admonition type="note" title="EU residency"}}
      For EU data residency, the project must be set up inside Amplitude EU. Initialize the SDK with the API key from Amplitude EU.
      {{/partial:admonition}}
    initialization_grid:
      -
        id: lyhst6j0
        tab_label: Swift
        instructions: |-
          ```swift
          import AmplitudeSwift

          let amplitude = Amplitude(
              configuration: Configuration(
                  apiKey: "YOUR-API-KEY"
              )
          )
          ```

          Configure the `serverZone` property to configure your application to use European data residency.

          ```swift
          import AmplitudeSwift

          let amplitude = Amplitude(
              Configuration(
                  apiKey: "YOUR-API-KEY",
                  serverZone: ServerZone.EU //[tl! ~~]
              )
          )
          ```
      -
        id: lyhsui94
        tab_label: Objective-C
        instructions: |-
          ```objc
          @import AmplitudeSwift;

          AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"YOUR-API-KEY"];
          Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
          ```

          Configure the `serverZone` property to configure your application to use European data residency.

          ```objc
          @import AmplitudeSwift;

          AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"YOUR-API-KEY"];
          configuration.serverZone = AMPServerZoneEU; //[tl! ~~]
          Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
          ```
    send_data_grid:
      -
        id: lyhsw7dx
        tab_label: Swift
        instructions: |-
          ```swift
          amplitude.track(
              eventType: "Button Clicked",
              eventProperties: ["my event prop key": "my event prop value"]
          )
          ```
      -
        id: lyhswgux
        tab_label: Objective-C
        instructions: |-
          ```objc
          [amplitude track:@"Button Clicked" eventProperties:@{
              @"my event prop key": @"my event prop value"
          }];
          ```
    code_sample_grid:
      -
        id: lyhswv4t
        instructions: |-
          ```swift
          import AmplitudeSwift

          let amplitude = Amplitude(
              configuration: Configuration(
                  apiKey: "YOUR-API-KEY"
              )
          )

          amplitude.track(
              eventType: "Button Clicked",
              eventProperties: ["my event prop key": "my event prop value"]
          )
          ```
        tab_label: Swift
      -
        id: lyhsxb9c
        instructions: |-
          ```objc
          @import AmplitudeSwift;

          AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"YOUR-API-KEY"];
          Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];

          [amplitude track:@"Button Clicked" eventProperties:@{
              @"my event prop key": @"my event prop value"
          }];
          ```
        tab_label: Objective-C
    ampli_article:
      - 4a49ddd0-6bd6-4758-9985-85149b794f13
  -
    id: lyhszf5m
    sdk_label: JRE
    related_sdk:
      - 29f79d9a-140e-4e0f-bd51-2b4fc47f5739
    installation_grid:
      -
        id: lyht05lc
        tab_label: Gradle
        instructions: |-
          If you use Gradle in your project, add the following dependency to `build.gradle`, and sync your project with the updated file.

          ```groovy
          dependencies {
              implementation 'org.json:json:20201115'
              implementation 'com.amplitude:java-sdk:1.+'
          }
          ```
      -
        id: lyht0gy1
        tab_label: Download
        instructions: "Download the latest [JAR file](https://github.com/amplitude/Amplitude-Java/releases) then add it to the project's build path. See instructions for your IDE."
    init_instructions: |-
      Import Amplitude into any file that uses it. Amplitude uses the open source JSONObject library to conveniently create JSON key-value objects.

      {{partial:admonition type="note" title="EU residency"}}
      For EU data residency, the project must be set up inside Amplitude EU. Initialize the SDK with the API key from Amplitude EU.
      {{/partial:admonition}}
    initialization_grid:
      -
        id: lyht1fj4
        tab_label: Java
        instructions: |-
          ```java
          import com.amplitude.Amplitude;
          import org.json.JSONObject;

          Amplitude amplitude = Amplitude.getInstance();
          amplitude.init(AMPLITUDE_API_KEY);
          ```

          Configure the `setServerUrl` property to configure your application to use European data residency.

          ```java
          import com.amplitude.Amplitude;
          import org.json.JSONObject;

          Amplitude amplitude = Amplitude.getInstance();
          amplitude.init(AMPLITUDE_API_KEY);
          amplitude.setServerUrl("https://api.eu.amplitude.com/2/httpapi"); //[tl !~~]
          ```
      -
        id: lyht3j10
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          import com.amplitude.Amplitude
          import org.json.JSONObject

          val amplitude = Amplitude.getInstance()
          amplitude.init(AMPLITUDE_API_KEY)
          ```

          Configure the `setServerUrl` property to configure your application to use European data residency.

          ```kotlin
          import com.amplitude.Amplitude
          import org.json.JSONObject

          val amplitude = Amplitude.getInstance()
          amplitude.init(AMPLITUDE_API_KEY)
          amplitude.setServerUrl("https://api.eu.amplitude.com/2/httpapi"); //[tl !~~]
          ```
    send_data_grid:
      -
        id: lyht4i4z
        tab_label: Java
        instructions: |-
          ```java
          amplitude.logEvent(new Event("Button Clicked", "test_user_id"));
          ```
      -
        id: lyht4qy0
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          amplitude.logEvent(Event("Button Clicked", "test_user_id"))
          ```
    code_sample_grid:
      -
        id: lyht5g6v
        tab_label: Java
        instructions: |-
          ```java
          import com.amplitude.Amplitude;
          import org.json.JSONObject;

          Amplitude amplitude = Amplitude.getInstance();
          amplitude.init(AMPLITUDE_API_KEY);

          Event event = new Event("Button Clicked", "test_user_id");

          JSONObject eventProps = new JSONObject();
          try {
              eventProps.put("Hover Time", 10).put("prop_2", "value_2");
          } catch (JSONException e) {
              System.err.println("Invalid JSON");
              e.printStackTrace();
          }
          event.eventProperties = eventProps;

          amplitude.logEvent(event);
          ```
      -
        id: lyht5puq
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          import com.amplitude.Amplitude
          import org.json.JSONObject

          val amplitude = Amplitude.getInstance()
          amplitude.init(AMPLITUDE_API_KEY)

          val eventProps= JSONObject()
          eventProps.put("Hover Time", 10).put("prop_2", "value_2")

          val event = Event("Button Clicked", "test_user_id")
          event.eventProperties = eventProps

          amplitude.logEvent(event)
          ```
    ampli_article:
      - 0128c1e3-dbc5-4612-982f-aefef4ad4db0
    ampli_grid:
      -
        id: lyht7vmp
        tab_label: Java
        instructions: |-
          ```java
          Ampli.getInstance().load();

          Ampli.getInstance().yourEventType("ampli-user-id",
              YourEventType.builder("Strongly typed property")
                  .stringProp()
                  .booleanProp(false)
                  .build()
          );
          ```
      -
        id: lyht84tz
        tab_label: Kotlin
        instructions: |-
          ```kotlin
          Ampli.getInstance().load()

          Ampli.getInstance().yourEventType("ampli-user-id",
              YourEventType(
                  stringProp = "Strongly typed property",
                  booleanProp = false
              )
          )
          ```
    type: intro
    enabled: true
  -
    id: lyht94r6
    sdk_label: Python
    related_sdk:
      - 48d6de5e-571a-4b30-bb6c-d2b615f3c73c
    install_instructions: |-
      Install `amplitude-analytics` with pip:

      ```bash
      pip install amplitude-analytics
      ```
    init_instructions: |-
      ```python
      from amplitude import Amplitude

      amplitude = Amplitude(AMPLITUDE_API_KEY)
      ```

      {{partial:admonition type="note" title="EU residency"}}
      For EU data residency, the project must be set up inside Amplitude EU. Initialize the SDK with the API key from Amplitude EU.
      {{/partial:admonition}}

      Configure `server_zone` when you initialize the client to send data to Amplitude's EU servers.

      ```python
      from amplitude import Amplitude

      amplitude = Amplitude(AMPLITUDE_API_KEY)
      amplitude.configuration.server_zone = 'EU' //[tl! ~~]
      ```
    send_data_instructions: |-
      ```python
      from amplitude import BaseEvent

      amplitude.track(
          BaseEvent(
              event_type="type of event",
              user_id="USER_ID",
              device_id="DEVICE_ID",
              event_properties={
                  "source": "notification"
              }
          )
      )
      ```
    code_sample_grid:
      -
        id: lyhtcxyw
        instructions: |-
          ```python
          from amplitude import Amplitude, Identify, BaseEvent

          amplitude = Amplitude("AMPLITUDE_API_KEY")

          identify_obj=Identify()
          identify_obj.set("location", "LAX")
          amplitude.identify(identify_obj)

          amplitude.track(
              BaseEvent(
                  event_type="type of event",
                  user_id="USER_ID",
                  device_id="DEVICE_ID",
                  event_properties={
                      "source": "notification"
                  }
              )
          )

          # Flush the event buffer
          amplitude.flush()

          # Shutdown the client, recommend to call before program exit 
          amplitude.shutdown()
          ```
    ampli_article:
      - 1af7ad64-aaae-45df-b562-e7ebe3470288
    ampli_grid:
      -
        id: lyhtdfs4
        instructions: |-
          ```python
          ampli.load()

          ampli.yourEventType(
              "user_id",
              YourEventType(
                  stringProp= "Strongly typed property",
                  booleanProp=True
              )
          )
          ```
    type: intro
    enabled: true
  -
    id: lyhtgj28
    sdk_label: 'React Native'
    related_sdk:
      - 1962c691-4ecd-4b0f-bff9-1807438bc582
    install_instructions: |-
      Install the native modules to run the SDK on iOS.

      ```bash
      cd ios
      pod install
      ```
    installation_grid:
      -
        id: lyhth4qx
        tab_label: npm
        instructions: |-
          ```bash
          npm install @amplitude/analytics-react-native
          npm install @react-native-async-storage/async-storage
          ```
      -
        id: lyhti6if
        tab_label: Yarn
        instructions: |-
          ```bash
          yarn add @amplitude/analytics-react-native
          yarn add @react-native-async-storage/async-storage
          ```
      -
        id: lyhtinxv
        tab_label: Expo
        instructions: |-
          ```bash
          expo install @amplitude/analytics-react-native
          expo install @react-native-async-storage/async-storage
          ```
    initialization_grid:
      -
        id: lyhtj2f2
        tab_label: TypeScript
        instructions: |-
          ```ts
          import { init } from '@amplitude/analytics-react-native';

          init(AMPLITUDE_API_KEY, 'user@amplitude.com');
          ```
      -
        id: lyhtjiop
        tab_label: JavaScript
        instructions: |-
          ```js
          import { init } from '@amplitude/analytics-react-native';

          init(AMPLITUDE_API_KEY, 'user@amplitude.com');
          ```
    send_data_grid:
      -
        id: lyhtjuqv
        tab_label: TypeScript
        instructions: |-
          ```ts
          import { track } from '@amplitude/analytics-react-native';

          const eventProperties = {
              buttonColor: 'primary',
          };
          track('Button Clicked', eventProperties);
          ```
      -
        id: lyhtk6cs
        tab_label: JavaScript
        instructions: |-
          ```js
          import { track } from '@amplitude/analytics-react-native';

          const eventProperties = {
              buttonColor: 'primary',
          };
          track('Button Clicked', eventProperties);
          ```
    code_sample_grid:
      -
        id: lyhtkdof
        tab_label: TypeScript
        instructions: |-
          ```ts
          import { init, track, Identify, identify } from '@amplitude/analytics-react-native';

          init(AMPLITUDE_API_KEY, 'user@amplitude.com');

          const identifyObj = new Identify();
          identifyObj.set('location', 'LAX');
          identify(identifyObj);

          const eventProperties = {
              buttonColor: 'primary',
          };
          track('Button Clicked', eventProperties);
          ```
      -
        id: lyhtkn2o
        tab_label: JavaScript
        instructions: |-
          ```js
          import { init, track, Identify, identify } from '@amplitude/analytics-react-native';

          init(AMPLITUDE_API_KEY, 'user@amplitude.com');

          const identifyObj = new Identify();
          identifyObj.set('location', 'LAX');
          identify(identifyObj);

          const eventProperties = {
              buttonColor: 'primary',
          };
          track('Button Clicked', eventProperties);
          ```
    ampli_article:
      - 4029875a-0e71-4ad0-869b-289dea48b625
    ampli_grid:
      -
        id: lyhtl3oe
        tab_label: TypeScript
        instructions: |-
          ```ts
          ampli.load();

          ampli.yourEventType({
              stringProp: 'Strongly typed property',
          });
          ```
      -
        id: lyhtldg4
        tab_label: JavaScript
        instructions: |-
          ```js
          ampli.load();

          ampli.yourEventType({
              stringProp: 'Strongly typed property',
          });
          ```
    type: intro
    enabled: true
  -
    id: lyhtm6cj
    sdk_label: Flutter
    related_sdk:
      - 91ff3c42-e0d0-493c-9fe4-65262f814883
    install_instructions: |-
      ```yaml
      dependencies:
          amplitude_flutter: ^3.13.0
      ```

      For iOS installation, add `platform :ios, '10.0'` to your Podfile.
    init_instructions: |-
      ```dart
      import 'package:amplitude_flutter/amplitude.dart';

      final Amplitude amplitude = Amplitude.getInstance();
      amplitude.init(AMPLITUDE_API_KEY);
      ```
    send_data_instructions: |-
      ```dart
      amplitude.logEvent('BUTTON_CLICKED', {"Hover Time": "100ms"});
      ```
    code_sample_grid:
      -
        id: lyhtoa0q
        instructions: |-
          ```dart
          import 'package:amplitude_flutter/amplitude.dart';
          import 'package:amplitude_flutter/identify.dart';

          class YourClass {
              Future<void> exampleForAmplitude() async {
              final Amplitude amplitude = Amplitude.getInstance();

              amplitude.init(AMPLITUDE_API_KEY);

              final Identify identify1 = Identify();
              identify1.setOnce('sign_up_date', '2015-08-24');
              Amplitude.getInstance().identify(identify1);

              amplitude.logEvent('MyApp startup', eventProperties: {
                  'friend_num': 10,
                  'is_heavy_user': true
              });
          }
          ```
    type: intro
    enabled: true
  -
    id: lyhtqcwx
    sdk_label: Go
    related_sdk:
      - 81b1c47d-3e5a-4c16-8f16-6ef65c3959a4
    install_instructions: |-
      ```bash
      go get github.com/amplitude/analytics-go
      ```
    init_instructions: |-
      ```go
      import (
          "github.com/amplitude/analytics-go/amplitude"
      )

      config := amplitude.NewConfig(AMPLITUDE_API_KEY)

      client := amplitude.NewClient(config)
      ```
    send_data_instructions: |-
      ```go
      client.Track(amplitude.Event{
            EventType: "Button Clicked",
            EventOptions: amplitude.EventOptions{
            UserID:   "user-id",
            DeviceID: "device-id",
          },
          EventProperties: map[string]interface{}{"source": "notification"},
      })
      ```
    code_sample_grid:
      -
        id: lyhtrkiz
        instructions: |-
          ```go
          package main

          import (
              "github.com/amplitude/analytics-go/amplitude"
          )

          func main() {
              config := amplitude.NewConfig(AMPLITUDE_API_KEY)
              client := amplitude.NewClient(config)

              identifyObj := amplitude.Identify{}
              identifyObj.Set("location", "LAX")
              client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})

              client.Track(amplitude.Event{
                  EventType: "Button Clicked",
                  EventOptions: amplitude.EventOptions{
                      UserID:   "user-id",
                      DeviceID: "device-id",
                  },
                  EventProperties: map[string]interface{}{"source": "notification"},
              })
          }
          ```
    ampli_article:
      - c71d80ea-d8a8-4bf2-8c78-fa3e8f061a95
    ampli_grid:
      -
        id: lyhtx7kr
        instructions: |-
          ```go
          import "<your-module-name>/ampli"
           
          ampli.Instance.Load(ampli.LoadOptions{
              Client: ampli.LoadClientOptions{
                  Configuration: ampli.NewClientConfig(AMPLITUDE_API_KEY),
              },
          })
          ```
    type: intro
    enabled: true
  -
    id: lyhtxxfn
    sdk_label: Unity
    related_sdk:
      - 9dc79fa3-30b2-4f67-954e-f03433c6cdbd
    introduction: 'The Amplitude Analytics Unity SDK is a plugin to simplify the integration of Amplitude iOS and Android SDKs into your Unity project. This SDK works with Unity 2019.3.11 and higher.'
    installation_grid:
      -
        id: lyhtyvb6
        tab_label: 'Unity Package Manager'
        instructions: |-
          1. Make sure you have [Git](https://git-scm.com/) installed.
          2. In Unity, click `Window > Package Manager`.
          3. Click the plus **+** sign and select `Add package from Git URL`.
          4. Enter `https://github.com/amplitude/unity-plugin.git?path=/Assets`, and then click **Add**.
          5. The Unity editor imports the package from Git.
      -
        id: lyhtzyww
        tab_label: 'Manual download'
        instructions: |-
          1. Download the latest [`amplitude-unity.unitypackage`](https://github.com/amplitude/unity-plugin/releases) from GitHub releases.
          2. Double click `amplitude-unity.unitypackage` to import the package into your Unity project.
    init_instructions: |-
      ```csharp
      Amplitude amplitude = Amplitude.getInstance()
      amplitude.init("YOUR_API_KEY");
      ```
    send_data_instructions: |-
      ```csharp
      import 'package:amplitude_flutter/amplitude.dart';

      amplitude.logEvent('MyApp startup', eventProperties: {
        'friend_num': 10,
        'is_heavy_user': true
      });
      ```
    code_sample_grid:
      -
        id: lyhu153r
        instructions: |-
          ```csharp
          Amplitude amplitude = Amplitude.getInstance();
          amplitude.init("AMPLITUDE_API_KEY");

          amplitude.addUserProperty("oranges", 5);
          Dictionary<string, object> values = new Dictionary<string, object>();
          values.Add("Key A", "Value A");
          amplitude.addUserPropertyDict("user_facts", values);

          JSONObjecteventProperties=newJSONObject().put("key", "value");
          Amplitude.getInstance().logEvent("initialize_game", eventProperties);
          ```
    type: intro
    enabled: true
  -
    id: lyhu1ybz
    sdk_label: Unreal
    related_sdk:
      - 77394402-6156-49e0-84ed-2ff1fee9a136
    introduction: 'The Amplitude Analytics Unreal Engine SDK supports projects targeting iOS, MacOS, or tvOS.'
    install_instructions: |-
      Install the Unreal Engine SDK by downloading the latest version of `AmplitudeUnreal.zip` found on the [GitHub releases](https://github.com/amplitude/Amplitude-Unreal/releases/latest) page.
       Unzip it into a folder inside your Unreal project's `Plugins` directory.

      ```bash
      mkdir -p Plugins/AmplitudeUnreal
      unzip AmplitudeUnreal.zip -d Plugins/AmplitudeUnreal
      ```
    init_instructions: |-
      1. In Unreal, navigate to _Settings > Plugins > Project > Analytics_ to enable the plugin. Learn more about [how to enable SDK plugin](/docs/sdks/analytics/unreal/unreal-sdk#enable-the-sdk-plugin-in-the-editor).
      2. Navigate to _Settings -> Project Settings -> Analytics -> Providers_ to set Amplitude as your analytics provider. Learn more about [how to set analytics provider](/docs/sdks/analytics/unreal/unreal-sdk#set-amplitude-as-your-analytics-provider).
      3. Navigate to _Settings -> Project Settings -> Analytics -> Amplitude_ to set API keys. Learn more about [how to set API keys](/docs/sdks/analytics/unreal/unreal-sdk/#add-your-api-keys).
      4. Add the following code:

        ```csharp
        #include "Runtime/Analytics/Analytics/Public/Analytics.h"
        #include "Runtime/Analytics/Analytics/Public/Interfaces/IAnalyticsProvider.h"
        ```
    send_data_instructions: |-
      ```csharp
      TArray<FAnalyticsEventAttribute> AppendedAttributes;
      AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
      AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
      FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
      ```
    code_sample_grid:
      -
        id: lyhu5t7i
        instructions: |-
          ```csharp
          FAnalytics::Get().GetDefaultConfiguredProvider()->SetLocation(TEXT("Test location"));
          FAnalytics::Get().GetDefaultConfiguredProvider()->SetGender(TEXT("Test gender"));
          FAnalytics::Get().GetDefaultConfiguredProvider()->SetAge(TEXT(27));

          TArray<FAnalyticsEventAttribute> AppendedAttributes;
          AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
          AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
          FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
          ```
    type: intro
    enabled: true
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1720736831
---
