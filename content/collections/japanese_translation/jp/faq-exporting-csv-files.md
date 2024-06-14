---
id: 7920e34e-867d-4a65-9896-30277e76cb3d
blueprint: japanese_translation
title: FAQ：CSVファイルのエクスポート
title_en: 'FAQ: Exporting CSV files'
source: 'https://help.amplitude.com/hc/ja/articles/360052836411'
---
この記事では、AmplitudeによるCSVファイルのエクスポートに関するよくある質問について説明します。

## よくある質問

* [Event Segmentation（イベントセグメンテーション）チャートからのCSV形式のエクスポートは、どのように決定されますか？](#h_01EQKN1QWHVDYP3YH7YX5TRXAS)
* [CSVファイルに、ユーザー／イベントプロパティの可能性のある値が必ずしも表示されません。なぜですか？](#h_01EQKN1Z5ZV9VYT9MJBKJ1QRFQ)
* [ユーザープロパティの値が、チャートとCSVエクスポートで異なるのはなぜですか？](#h_01EQKN26GEHJ1JA83TYV8S16SJ)
* [CSVのダウンロード時にチャートには「なし」と表示されるのに、ユーザーのプロパティが表示されるのはなぜですか？](#h_01EQKN2DRBE14ER7TGSTTQDZZB)
* [エクスポートされたCSVファイルの先頭に、スペース（タブ）があるのはなぜですか？](#h_01H44CKAX0VNZZAP834RW6AXYW)

## 回答

### Amplitudeは、Event SegmentationチャートからCSVファイルをエクスポートするときに、その構造をどのように決定しますか？

Amplitudeは、エクスポートするCSVファイルを作成する際に、内訳データテーブルをガイドとして使用します。テーブルの形式と構造がCSVに反映されます。

### CSVファイルに、ユーザー／イベントプロパティの可能性のある値が必ずしも表示されません。なぜですか？

CSVファイルに表示される値の量には、上限があります。これはチャートによって異なります。これらの制限について詳しくは、[こちら](https://help.amplitude.com/hc/en-us/articles/115002923888#h_23368329-5147-4369-9d91-6a1d552eab36)をご覧ください。

### ユーザープロパティの値が、チャートとCSVエクスポートで異なるのはなぜですか？

Microscope経由でチャートからユーザーをダウンロードする場合、CSVにはユーザーの最新のプロパティ値が含まれます。チャートは、*イベント時の*プロパティ値を返します。

### CSVには、チャートに「なし」としてリストされている特定のプロパティ値が入力されることがあります。なぜですか？

前の回答をご覧ください。

### エクスポートされたCSVファイルの先頭に、スペース（タブ）があるのはなぜですか？

デフォルトで、エクスポートされたCSVファイルのセルの先頭にスペースが入る可能性があります。このデフォルト設定を変更するには、次の操作を行ってください。

1. *[Personal settings]*（個人設定）、
2. 次に*[Profile]*（プロフィール）に移動し、
3. *[Site Settings]*（サイト設定）の下の*[Always Remove Leading Spaces from Export]*（エクスポートの際、常に先頭のスペースを削除）トグルを有効にします：

![siteSettings.png](/docs/output/img/jp/sitesettings-png.png)

詳しくは、[設定の管理](/docs/admin/account-management/account-settings)方法をご覧ください。
