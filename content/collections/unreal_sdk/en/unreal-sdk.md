---
id: 77394402-6156-49e0-84ed-2ff1fee9a136
blueprint: unreal_sdk
title: 'Unreal SDK'
sdk_status: Beta
article_type: core
supported_languages:
  - c-plus-plus
github_link: 'https://github.com/amplitude/Amplitude-Unreal'
releases_url: 'https://github.com/amplitude/Amplitude-Unreal/releases'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718672680
source: 'https://www.docs.developers.amplitude.com/data/sdks/unreal/'
---
## Install the SDK

Install the Unreal Engine SDK by downloading the latest version of `AmplitudeUnreal.zip` found on the [GitHub releases](https://github.com/amplitude/Amplitude-Unreal/releases/latest) page.
 Unzip it into a folder inside your Unreal project's `Plugins` directory.

```bash
mkdir -p Plugins/AmplitudeUnreal
unzip AmplitudeUnreal.zip -d Plugins/AmplitudeUnreal
```

### Enable the SDK plugin in the editor

Open your project in the UE4 editor. Navigate to **Settings > Plugins > Project > Analytics** and make sure to enable `AmplitudeUnreal`.

### Enable Amplitude as the analytics provider

Navigate to **Settings -> Project Settings -> Analytics -> Amplitude** and fill in the fields with your API key.

### Include the required analytics modules

In any file that involves instrumentation, you should include the necessary Unreal Engine analytics headers.

```cpp
#include "Runtime/Analytics/Analytics/Public/Analytics.h"
#include "Runtime/Analytics/Analytics/Public/Interfaces/IAnalyticsProvider.h"
```

## Use and examples

The API of Amplitude Unreal follows the [analytics provider interface](https://docs.unrealengine.com/en-US/API/Runtime/Analytics/Interfaces/IAnalyticsProvider/index.html) defined by the Unreal Engine.

### Log basic events

Events represent how users interact with your app. For example, "Game Started" may be an action you want to note.

```cpp
FAnalytics::Get().GetDefaultConfiguredProvider()->StartSession();
FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game started"));
FAnalytics::Get().GetDefaultConfiguredProvider()->EndSession();
```

### Log events with properties

Events can contain properties. Properties give context about the event taken.

```cpp
TArray<FAnalyticsEventAttribute> AppendedAttributes;
AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
```

### Set user properties

User properties help you understand your users at the time they performed some action within your app.

The generic Unreal Engine [`IAnalyticsProvider`](https://docs.unrealengine.com/en-US/API/Runtime/Analytics/Interfaces/IAnalyticsProvider/index.html) supports a limited number of user properties.

```cpp
FAnalytics::Get().GetDefaultConfiguredProvider()->SetLocation(TEXT("Test location"));
FAnalytics::Get().GetDefaultConfiguredProvider()->SetGender(TEXT("Test gender"));
FAnalytics::Get().GetDefaultConfiguredProvider()->SetAge(TEXT(27));
```

### Set custom user IDs

If your app has its login system that you want to track users with, use `SetUserId` to set a custom user ID.

```cpp
FAnalytics::Get().GetDefaultConfiguredProvider()->SetUserID(TEXT("test123@test.com"));
```