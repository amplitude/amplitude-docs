---
id: b4da41d5-f15c-4411-bc76-9747e3ce37d7
blueprint: japanese_translation
title: Amplitudeでチャートを作成：セグメンテーションモジュールの高度な機能
title_en: 'Create charts with Amplitude: Advanced features of the segmentation module'
source: 'https://help.amplitude.com/hc/ja/articles/360035354552'
---
#### この記事のテーマ：

* セグメンテーションモジュール内で、より複雑なユーザーセグメントを構築し、管理する
* セグメンテーションモジュール内から行動別コホートを作成する

この記事は、Amplitudeのチャートに[イベントやユーザーセグメントを追加する](/docs/analytics/charts/build-charts-add-events)方法についてのヘルプセンターの記事で説明しているセグメンテーションモジュールに関する内容の補足です。

## 開始する前に

何はともあれ、計装が完了しなければ、イベントはAmplitudeのどのチャートにも表示されません。初めに必ず計装を完了させてください。Amplitudeでチャートを作成の記事をまだ読んでいない場合は、この記事の前提となる基礎を説明していますので、そちらからお読みください。A[mplitudeの便利な用語集や](/docs/get-started/helpful-definitions)行動別コホートについても読んでおきましょう。

## プロパティ値のリストを追加

ドロップダウンメニューから選択する代わりに、プロパティ値のカスタムリストを追加できます。分析にたくさんのプロパティ値を追加したり、除外したりするときに便利です。プロパティ値のリストを追加するには、コンマ区切りの値のリストをクリップボードにコピーし、S*earch or enter a value*（値を検索または入力）のボックスにペーストします。そこで*すべて選択をクリックし、*次に*適用*をクリックします。

例えば、メールアドレスをユーザープロパティとして実装している場合は、それぞれの値を1つずつ選択する代わりに、以下の文字列をペーストできます。

```
abe@datamonster.com,bebe@datamonster.com,cece@datamonster.com,didi@datamonster.com
```

![advanced_segmenttion_1.gif](/docs/output/img/jp/advanced-segmenttion-1-gif.gif)

**注**：ペーストした後にfreeform（自由書式）の値を選択しないようご注意ください。Select All（すべてを選択） をクリックしてください。

## セグメントの名前を変更

Amplitudeはデフォルトで選択した各プロパティの値をセグメントの名前の後に追加します。複雑または細かく定義されたセグメントの場合、わかりづらくなってしまう場合があります。

例えば、以下のチャートには2つのセグメントがあり、それぞれを4つの異なるプロパティで定義しているため、デフォルトの名前が読みづらくなってしまっています。

デフォルトの名前にカーソルを合わせてクリックすると、名前を変更することができます。セグメントの名前を変更すると、チャートのラベルも変更されます。

S*aved（保存済み） --> Save Segment（セグメントを保存）*の順にクリックすれば、今後また使うときのためにセグメントを保存できます。 

## インラインで行動別コホートを作成

セグメンテーションモジュール内から直接、インラインで簡単な行動別コホートを作成できるため、[行動別コホートのタブ](/docs/analytics/behavioral-cohorts)に移動する必要がありません。

行動別集団を作成するには、セグメントにユーザープロパティを追加する前に*+ Performed*をクリックします。 例えば、次のチャートを使えば、過去30日間に記事を閲覧し、1日に少なくとも3回検索機能を使用したユーザー数を確認できるようになります。

![seg_module_advanced_features_-_rename_a_segment.png](/docs/output/img/jp/seg-module-advanced-features-rename-a-segment-png.png)

コホートを作成する際にドロップダウンメニューから選択できる条件の詳細については、[Amplitudeの行動別コホートの記事](/docs/analytics/behavioral-cohorts)をご覧ください。

## リピート回数

リピート回数機能は、イベントセグメンテーションチャート内のすべてのイベントに適用されます。詳細については、[リピ](/docs/analytics/historical-count-1)ート回数についての記事をお読みください。
