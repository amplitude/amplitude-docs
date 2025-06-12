---
id: 2b92c7bb-4d91-4eeb-993f-fe4eb373153c
blueprint: japanese_translation
title: 'FAQ:履歴データを変更または削除する'
title_en: 'FAQ: Modify or delete historical data'
source: 'https://help.amplitude.com/hc/ja/articles/360052385792'
---
この記事では、履歴データを変更または削除する方法についてのよくある質問について説明します。

一般的に、Amplitudeアーキテクチャは、ユーザーとイベントの時間、日、週、月による事前集計セットを基礎としています。これでプラットフォームがスケールできますが、反面、データがイミュータブルになるという問題もあります。

## よくある質問

* [Amplitudeによって既に取り込まれているイベントを変更するには、どうすればよいですか？](#h_01EQKNGMMZBBSC53FD36GT7FBK)
* [私はIdentify APIを使用してユーザープロパティを更新しました。なぜチャートに「none」値がまだ残っているのでしょうか？](#h_01EQKNGTPRGRH7YRESP11J7FYC)
* [間違ってユーザーにイベントを送信してしまいました。この特定のユーザーの特定のイベントを削除するには、どうすればよいですか？](#h_01EQKNH065ERATD62YBA1EZVG0)
* [履歴データをAmplitudeにバックフィルする方法を教えてください。](#h_01EQKNH56QSBY9JWM3QFX21V28)

## 回答

### Amplitudeによって既に取り込まれているイベントを変更するには、どうすればよいですか？

既に取り込まれているイベントを変更することはできません。ただし、次のような可能な回避策はあります:

1. [エクスポートAPI](https://developers.amplitude.com/docs/export-api)を使用してすべてのプロジェクトデータをエクスポートする
2. データをクリーニングする（例えば、データに必要な変更を加えるなど）
3. [Batch API](https://developers.amplitude.com/docs/batch-event-upload-api)を使用して、クリーニングしたデータを**新しいプロジェクト**にアップロードする

### 私はIdentify APIを使用してユーザープロパティを更新しました。なぜチャートに「none」値がまだ残っているのでしょうか？

Identify APIは、将来のイベントのユーザープロパティ値のみを更新するものです。Amplitudeが既に取り込んだデータは変更できません。Amplitudeが、更新したプロパティ値を適用するには、ユーザーは、別のイベントを発行する必要があります。ユーザープロパティの更新方法についての詳細は、[こちら](/docs/data/user-properties-and-events)を参照してください。

### 間違ってユーザーにイベントを送信してしまいました。この特定のユーザーの特定のイベントを削除するには、どうすればよいですか？

それはできません。取り込まれたデータは**イミュータブルです。**ただし、その問題について次のプロセスを試すことができます:

1. イベントを[削除またはブロック](https://help.amplitude.com/hc/en-us/articles/360047138392#block-and-unblock-events-and-event-properties)する:
	* これにより、イベントがすべてのユーザーのAmplitudeに入り込むのを防ぐことができます。
	* イベントはユーザーイベントストリームに表示されますが、クエリでは使用できません。
2. それがうまくいかない場合は、[上記](#h_01EQKNGMMZBBSC53FD36GT7FBK)の質問1で説明した回避策を試してみてください。

### 履歴データをAmplitudeにバックフィルする方法を教えてください。

この[セルフデータバックフィルガイド](https://developers.amplitude.com/docs/self-data-backfill-guide)を参照してください。
