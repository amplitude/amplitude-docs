---
id: 6a422218-b877-4b9e-9df8-c7f40a800474
blueprint: japanese_translation
title: ユーザープロパティの定義
title_en: 'Defining User Properties'
source: 'https://help.amplitude.com/hc/ja/articles/215562387'
---
デフォルトで、Amplitudeは[SDK](https://www.docs.developers.amplitude.com/data/sources/)を介して、以下の表に一覧されたユーザープロパティを自動的に追跡します。これらのプロパティすべてには、Amplitudeでそれらに遭遇するたびに![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)、接頭辞が付きます。（必要に応じて、AmplitudeのSDKを構成して、これらのプロパティの[自動トラッキングを無効にする](https://developers.amplitude.com/docs/javascript#disable-tracking)ことができます。）

Amplitudeは、収集されたIPアドレスを使用し、[MaxMind](https://www.maxmind.com/en/home)データベースを使用してユーザーの位置プロパティ（`都市`、`国`、`地域`、`DMA`）を判断します。MaxMindは、最も信頼性の高いデジタルマッピングソースとして広く受け入れられています。

Amplitudeチャートで、デバイスID、イベントID、緯度、経度、サーバーアップロード時間、セッションID、ユーザーID、またはIDでセグメントを選択する場合、自分が探している正確な値を入力する必要があります。さらに、イベントID、緯度、経度、サーバーアップロード時間、またはIDごとにグループ化することはできません。

**注意：**SDKを使用する代わりにデータサーバー側で送信する場合、Amplitudeはこれのユーザープロパティを自動的にトラックできません。代わりに、これらのプロパティを明示的に設定する必要があります。

| **プロパティ** | **値の定義** |
| --- | --- |
| コホート | [行動コホート](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts) 名。「コホート名」 |
| 国 | イベントの国。これは、GeoIPを使用してプルされます。「アメリカ合衆国」 |
| 市区町村 | イベントの街。これは、GeoIPを使用してプルされます。「サンフランシスコ」 |
| 地域 | イベントの地域（例：州、州、郡）。これは、GeoIPを使用してプルされます。「カリフォルニア」 |
| dma | イベントの指定されたマーケットエリア（DMA）。これは、GeoIPを使用してプルされます。「サンフランシスコ - オークランド - サンノゼ、CA」 |
| 言語 | デバイス言語。「英語」 |
| 支払い | デフォルトでは、すべてのユーザーに対して支払いはNULLに設定されています。ユーザーの最初の収益イベント（または[検証](https://help.amplitude.com/hc/en-us/articles/115003116888-Revenue-Technical-#verification)がオンの場合、最初に検証された収益イベント）の時点で、プロパティバリューは「true」に変わります。
プロパティが「true」に設定されると、それは変更されません。Amplitudeの[Identify API](https://help.amplitude.com/hc/articles/205406617)を介して、このバリューを手動で変更できます。
「true」、null/none |
| プラットフォーム | プロダクトのプラットフォーム。「iOS」、「Android」、また「Web」 |
| OS | `OS` = `os_name` + `os_version`
`os_name`は、ユーザーのモバイルオペレーティングシステムまたはブラウザの名前です。
`os_version`は、ユーザーのモバイルオペレーティングシステムまたはブラウザのバージョンです。
「ios 9.1」、「Chrome 46」 |
| デバイスファミリー | デバイスのファミリー。「Apple iPhone」、「Samsung Galaxy Tablet」、「Windows」 |
| デバイスの種類 | デバイスの特定のタイプ。「Apple iPhone 6」、「Samsung Galaxy Note4」、「Windows」
Amplitudeの[Javascript SDK](https://developers.amplitude.com/docs/javascript)によって追跡されたイベントは、「Apple iPhone」など、デバイスファミリの値を表示します。このSDKは、特定のタイプのデバイスをトラックしません。 |
| 通信事業者 | デバイスのキャリア。「Verizon」 |
| 開始バージョン | ユーザーの識別されたアプリケーションの最初のバージョンです。ユーザーがアプリを再インストールすると、これは変わる可能性があることに注意してください。「1.0.0」 |
| バージョン | ユーザーの識別されたアプリケーションの現在のバージョンです。「1.0.0」 |
| ライブラリ | イベントを送信するために使用されるライブラリです。「amplitude-ios/3.2.1」、「http/1.0」 |
| IPアドレス | ユーザーのIPアドレスです。「127.0.0.1」 |
| デバイスID | ユーザーのデバイスIDです。「C8F9E604-F01A-4BD9-95C6-8E5357DF265D」 |
| 緯度 | ユーザーの緯度です。「42.3296」 |
| 経度 | ユーザーの経度です。「-88.9995」 |
| ユーザーID | ユーザーのユーザーIDです。これは、ユーザーの一意のユーザー識別子である必要があります、同じユーザーに対して変更しないでください。例えば、ユーザーのユーザー名のハッシュ文字列です。これは、カスタマーが明示的に設定します。ですから、Amplitudeは、このフィールドを自動入力しません。「abc123」 |
| ID | ユーザーのAmplitudeIDです。「16342233234」 |
