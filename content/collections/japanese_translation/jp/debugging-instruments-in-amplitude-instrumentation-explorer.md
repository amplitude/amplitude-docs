---
id: 5a062a9e-5b6c-48b9-b428-da36468c983d
blueprint: japanese_translation
title: 'Amplitude Instrumentation Explorerで計測をデバッグする'
title_en: 'Debugging Instruments in Amplitude Instrumentation Explorer'
source: 'https://help.amplitude.com/hc/ja/articles/360003032451'
---
Amplitudeインストルメンテーションエクスプローラは、Google Chromeウェブストアの拡張であり、プロダクトとやり取りするだけで、Amplitude JS SDKインストルメンテーションを検査してデバッグするのに役立ちます。 トリガーしたAmplitudeイベントをキャプチャし、拡張ポップアップに表示します。 [ここからダウンロードします。](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

**注**：インストルメンテーションエクスプローラでは、異なる表示名がある場合でも、`event_type`を表示します。  

## トリガーされたイベントを表示する

インストルメンテーションエクスプローラでは、*イベント*タブは、**あなたが**ウェブサイト上でトリガーする各イベントのパラメータに関する詳細なインサイトを見つける場所です。これには、`user_id`、`device_id`、`event_properties`、`user_properties`が含まれます。

![スクリーンショット](/docs/output/img/jp/sukurinsiyotuto.png)

イベントを受信しているさまざまなAmplitudeプロジェクトを切り替えるには、プロジェクトドロップダウンから選択します。各Amplitudeプロジェクトは、短縮されたAPIキーで区別されます：

![スクリーンショット](/docs/output/img/jp/sukurinsiyotuto.png)

ポップアップからすべてのイベントをクリアするには、*イベントをクリア*をクリックします：

![スクリーンショット](/docs/output/img/jp/sukurinsiyotuto.png)

特定のイベントタイプを非表示にするには、「見えない」アイコンをクリックします：

![hide_events.png](/docs/output/img/jp/hide-events-png.png)

イベントのイベントとユーザープロパティパラメータをコピーするには、[コピー]アイコンをクリックします：

![スクリーンショット](/docs/output/img/jp/sukurinsiyotuto.png)

## 構成オプションを表示する

各プロジェクトのSDKに設定した[構成オプション](https://help.amplitude.com/hc/en-us/articles/115001361248-JavaScript-SDK-Installation#settings-configuration-options)を表示するには、*APIオプション*タブをクリックします：

![スクリーンショット](/docs/output/img/jp/sukurinsiyotuto.png)

## 隠しイベントを表示する

隠しイベントのリストを表示するか、トリガーされたときにWebページにイベントを表示するには、[*設定]*タブをクリックします。

![スクリーンショット](/docs/output/img/jp/sukurinsiyotuto.png)
