---
id: 2d0718df-6de6-4481-8d7e-2b1abc7a1c7d
blueprint: japanese_translation
title: グループ化：Amplitudeはどのようにチャート結果を選定し、並べるか
title_en: 'Grouping: How Amplitude selects and arranges chart results'
source: 'https://help.amplitude.com/hc/ja/articles/360031259831'
---
#### この記事のテーマ：

* Amplitude Analyticsが、グループ化のクエリ結果をいつ、なぜ切り捨てるのかを理解する
* Amplitude Analyticsがグループ化の結果をどのように優先するのかを理解する

基本的な形として、Amplitudeの**グループ化**機能は、集計のためにイベントを分類するツールです。

![group_by.png](/docs/output/img/jp/group-by-png.png)

たとえば、国別のイベント数をカウントする場合にグループ化を使用します。

![group_by_2.png](/docs/output/img/jp/group-by-2-png.png)  

Amplitudeの [[イベント分類]チャートのグループ化表示の詳細については、ヘルプセンターの記事をご覧ください](/docs/analytics/charts/build-charts-add-events)。

## グループ化の結果の選定

パフォーマンス維持のため、Amplitudeは、クエリ結果を返すことができるグループ数の上限を設定します。この上限を超えると、上位グループは維持され、残りはクエリの結果から削除されます。上位グループは、下の表に従って決定されます。

[イベント分類]チャートの1つのグループ化の場合、結果は100のグループ化に制限される場合があります。2つのグループ化の場合、結果は500のグループ化に制限され、各グループ化の値のペアが1つの結果としてカウントされます。

## グループ順序

この表は、Amplitudeが[内訳表]を表示するためにグループ化をどのように優先するのかを示しています。

|  |  |
| --- | --- |
| **メトリクス** | **順序** |
| ユニーク数 | ユニークユーザー数 |
| 合計 | イベント総数 |
| %アクティブ | ユニークユーザー数 |
| 平均実行回数 | イベント総数 |
| 実行回数分布 | ユニークユーザー数 |
| プロパティ値の分配 | イベント総数 |
| プロパティ値の合計 | プロパティ値の合計 |
| プロパティ値の平均 | プロパティ値の合計 |
| ユーザーごとのプロパティ値区別 | （ユーザー、プロパティ値）ペア総数 |
| 数式：パーセンタイル | イベント総数 |
| 数式：頻度パーセンタイル | イベント総数 |
| 数式：プロパティカウント | ユニークプロパティ数 |
| 数式：プロパティカウント平均 | （ユーザー、プロパティ）ペア総数 |
| 数式：デフォルト | ユニークユーザー数 |

## グループ順序の数式

グループ化*のない*数式では、数式内のすべての指標が同じ順序を使用している場合にのみ、上記の順序が使用されます。そうでなければ、Amplitudeはデフォルトの数式順序を使用します。

グループ化の*数式*では、Amplitudeは、1つの式に含まれるすべての数式を合計した*グループごとの*最大の総合値によりグループをランク付けします。

**注**：複数の数式項目と演算子の組み合わせでグループ化の選定が発生した場合、Amplitudeはすべての数式項目が同じグループにクエリされるように追加のクエリを発行するため、数式の読み込みに時間がかかる場合があります。
