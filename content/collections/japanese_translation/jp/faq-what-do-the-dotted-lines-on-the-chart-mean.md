---
id: 5faf7125-55f0-4a43-af16-cc9033f8f83a
blueprint: japanese_translation
title: FAQ：チャートの点線は何を意味しますか？
title_en: 'FAQ: What do the dotted lines on the chart mean?'
source: 'https://help.amplitude.com/hc/ja/articles/360043977571'
---
Amplitudeチャートに点線が表示されている場合は、Amplitudeがその日またはデータポイントのイベントを受信中であることを意味します。関連するデータがすべて収集されると、点線が実線になります。

例えば、新規ユーザーが3月13日午後7時に最初のイベントを行ったとします。3月15日の午前9時にリテンションチャートを確認すると以下のように表示されます：

![dotted_line_in_chart.png](/docs/output/img/jp/dotted-line-in-chart-png.png)

3月13日のデータポイントまで伸びる点線は、その日にまだ未解決のイベントがある可能性を示しています。この事象は、[経時変化率](/docs/analytics/charts/retention-analysis/retention-analysis-build-Retention-Analysis#Change-Over-Time)が**24時間単位で**計算されるために発生します。3月15日午前9時の時点では、まだ当該ユーザーの1日目のリテンション期間内です。

* **0日**目のリテンションは、**3月13日午後7時**から**3月14日午後7時**までとなります。
* **1日目の**リテンションは、**3月14日午後7時**から**3月15日午後7時**までです。
* **7日**目のリテンションは、**3月19日午後7時**から**3月20日午後7時**までとなります。

3月15日午前9時時点では、このユーザーは1日目がまだ終了していません。つまり、このデータポイントはまだ変更される可能性があるということになります。
