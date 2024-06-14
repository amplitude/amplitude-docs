---
id: 7bc09333-0ecf-407e-9536-0d00b523761e
blueprint: japanese_translation
title: SegmentとAmplitudeの統合のトラブルシューティング
title_en: 'Troubleshooting the Segment and Amplitude integration'
source: 'https://help.amplitude.com/hc/ja/articles/360044886071'
---
この記事では、Amplitudeで新規イベントタイプまたはプロパティが表示されない場合のトラブルシューティング方法について説明します。これは、多くの場合、次の問題のいずれかが原因となって起こります。

* プロジェクトが[計測上限](https://help.amplitude.com/hc/en-us/articles/115002923888-Limits#h_8d90ca72-bf91-4161-88b2-01b5448b0859)に達した。
* そのイベントタイプまたはプロパティが、Amplitudeプロジェクトでブロックまたは削除された。
* Amplitudeのリクエストに対して、ステータスコード200が返されなかった。

## Segmentが送信したイベントをAmplitudeで検証する

Segmentは、次の2つの方法でAmplitudeにデータを送信します。

* クラウドモード（サーバー側の統合）
* デバイスモード（バンドル、AmplitudeのSDKを使用）

### クラウドモード

クラウドモードを使用してデータが送信されると、すべてのデータがサーバー側からSegmentを介して送信されます（Segmentは[HTTP API](https://developers.amplitude.com/docs/http-api-v2)を使用してAmplitudeにデータを送信します）。

![Screen_Shot_2020-06-16_at_19.58.46.png](/docs/output/img/jp/screen-shot-2020-06-16-at-19-58-46-png.png)

イベントがAmplitudeに表示されるためには、Segmentでも使用可能で、Amplitudeのレスポンスコードがステータスコード200である必要があります。

イベントデータが期待どおりに処理されるかを確認するには、

1. アプリで、[イベントをトリガーするテストユーザー](/docs/analytics/charts/event-explorer)を設定します
2. [Segment Debugger](https://segment.com/docs/connections/sources/debugger/)を使用して、Segment内のイベントをチェックします
3. Segmentにステータスコード200がある場合は、[このデータをAmplitudeで検証できます](https://help.amplitude.com/hc/en-us/articles/115001574688-How-to-Validate-Your-Event-Data-in-Amplitude)

### デバイスモード

ただし、デバイスモードを使用してデータを送信すると、クライアント側からSegmentとAmplitudeの両方にデータが送信されます。

![Screen_Shot_2020-06-16_at_20.04.07.png](/docs/output/img/jp/screen-shot-2020-06-16-at-20-04-07-png.png)

イベントデータが期待どおりに処理されるかどうかを確認するには、次の手順に従います。

1. アプリで、[イベントをトリガーするテストユーザー](/docs/analytics/charts/event-explorer)を設定します
2. [Segment Debugger](https://segment.com/docs/connections/sources/debugger/)を使用して、Segment内のイベントをチェックします
3. Webアプリケーションの場合は、ブラウザのネットワークアクティビティをチェックして、該当するリクエストのステータスコード200を見つけます。Chromeで利用可能な[Amplitude Instrumentation Debugger](/docs/data/chrome-extension-debug)拡張機能を使用することもできます。

イベントがバッチ処理され、イベントアップロードのしきい値が高すぎるか、または長すぎる場合は、クライアント側のイベントが失われる可能性があります。この場合は、イベントが遅延してAmplitudeに送信される可能性があります。
