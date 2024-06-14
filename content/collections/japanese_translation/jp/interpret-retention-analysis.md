---
id: f505671d-d69f-46fa-9431-8e1903256837
blueprint: japanese_translation
title: リテンション分析を解釈する
title_en: 'Interpret retention analysis'
source: 'https://help.amplitude.com/hc/ja/articles/360050153551'
---
#### この記事のテーマ：

* リテンション分析について**読む**
* リテンション分析チャートの**リテンションビュー**を理解する
* **リテンションを測定**するさまざまな方法を理解する

Amplitudeの**リテンション分析**チャートは、プロダクトの採用を促進するのに役立ちます。これは最初のイベントをトリガーした後に、ユーザーがどのくらいの頻度でプロダクトに戻るかを示すことによって実行されます。 この記事では、リテンション分析チャートの下位モジュールがどのように機能するか、また、それが含むデータをどのように解釈するべきかを説明します。

リテンション分析データを分析する機能は、チャート領域で行われます。 そこでは次のことができます：

* Amplitudeがリテンションを測定するために使用する方法（リターンオンまたはアフター、リターンオン、またはリターンオン（カスタム））を指定します
* リテンションまたは掲示変化についてデータを表示する
* Amplitudeがリテンションを計算する日数を定義する（24時間の時間枠または厳密なカレンダー日付）
* タイムゾーンを指定し、日付ピッカーを使用して分析の時間枠を設定する

## 始める前に

ユーザーが[Amplitudeのリテンション分析チャート](/docs/analytics/charts/retention-analysis/retention-analysis-build)、始める前にそれらを必ずお読みください。

この記事の時間の参照について分かりづらい場合、このヘルプセンターの記事では[リテンション分析で時間がどのように機能するか](/docs/analytics/charts/retention-analysis/retention-analysis-time)を説明していますので、お読みください。

## リテンション分析チャートを解釈する：リテンションビュー

リテンション分析チャートを解釈するのは、見た目よりもずっと簡単です。パラメーターを文章のように読むことができるからです。例えば、以下のチャートは、(1) 戻ってきて (2) イベントを、(4) 過去45日間のリテンション分析の (3) 日またはその後にトリガーをした新しいユーザーを表示します：

これらのすべてのパラメーターは、簡単に変更でき、分析のニーズを反映することができます。

このセクションでは、リテンションの測定方法、すべてのパラメータが意味するところ、それらを使用して必要なデータを生成する方法について説明します。

## リテンションを測定するさまざまな方法

リテンション分析チャートでは、ユーザーが[リターンイベント](https://help.amplitude.com/hc/en-us/articles/230543327)をトリガーしたタイミングに基づいて、リテンションを測定するためのいくつかのオプションを提供しています：

* **特定の日かその後に**リターンイベントをトリガーしたユーザーの人数を把握するには、[**リターンオンまたはアフター**](#h_01GXB4EFQ2VXSYEZ0CRMF09AJS)リテンションを使用します。
* 開始イベントを実行した**特定の日にのみ**リターンイベントをトリガーするために戻ってきたユーザーの割合を知るには、[**リターンオン**](#h_01GXB4F62TJEH50T03FGGH0HY4)リテンションを使用します。
* リテンションブラケットとして事前に定義された時間単位（週や日など）を使用する代わりに、リターンオンリテンション用のカスタムブラケットを作成する場合は、[**リターンオン（カスタム）**](#h_01GXB4G5DKK9F46NHPXCP7QAXM)リテンションを使用します。

あらゆるケースで、ユーザーがイベントの開始をトリガーする日付は**コホートエントリー日**であり、[リテンションがAmplitude Analyticsで計算される方法](/docs/analytics/charts/retention-analysis/retention-analysis-calculation)を理解しようとする場合に、重要な概念となります。

### リターンオンまたはアフター（以前はUnboundedとして知られていました）

**リターンオンまたはアフターリテンション**は、開始イベントをトリガーした特定の日またはその後に何人のユーザーがリターンイベントをトリガーしたかを示します。 リターンオンまたはアフターを使用する場合、7日目のリテンション値は、最初の使用から7日以上経過した後に返ったユーザーの割合を示します。

![](/docs/output/img/jp/G0je2VZ6bC5-8FgVpR447ORVYTh6K5oioQYWUeGAf4jBgUxbrY73AS90DYAZoGBSJnRC_LGBkcmU5-Nr25uOqnhcAHiQF39zTzsI9OzLLyE61aBwstzxdVReyBmeB4aSZ2AFNUslFYrnnF1T3c1QMpA)

リテンション分析チャートを最初に開くときに、リターンオンまたはアフターリテンショングラフは、イベントを返した新しいユーザーのリテンションをデフォルトで表示します。 関心のある日のデータポイントにカーソルを合わせ、正確なパーセンテージを表示し、クリックして、そのインターバルでユーザーを調べます（詳細については、[Amplitudeの](/docs/analytics/microscope)機能のヘルプセンターの記事を参照してください）。

このデータを棒チャートとして表示するには、*折れ線チャート*ドロップダウンをクリックします。 [マイクロスコープ](/docs/analytics/microscope)を使用して、保持されなかったユーザーの詳細を取得することもできます。

![](/docs/output/img/jp/gth-d_Zj_Z5fVEFTF9pLi-jpzxMMeuxzFJGGGFEG95hKNuWZ5U3VN5vTAsYAzE6HAe491gGmyLTD7eRg42LzdF48B18vIPW69mR4436Ynvt9EfpXx2IFm7LAPDp-TPKfQnZTpZIRynys-xsodwwPMN0)

**注：**棒グラフ形式では、X軸にはデフォルトで最も一般的な時間の単位（日、週、月）が含まれます。 

また、Amplitudeは、各ユーザーコホートによって分類され、個々のデイバケットに分類される詳細なテーブルを表示します。

![](/docs/output/img/jp/3KUJ9cZEpmZSzFT4nW3EnJx3bI0_RjsTA-2_P0xLxGEX0pBCgfBBf4-4ENWWCg7NKm1NMR78zWuI7b-SH04HDTaGOM0oJFc2OwFEU0rbDRJljqhxBskurC9I3aFRGZrtUPBygOV-ajmfQcT-_Yq4ZAU)

Amplitudeがリターンオンまたはアフターリテンションを計算するメソッドは、すべてのユーザーのリテンションを見ているのか、セグメントの特定のコホートエントリー日付を見ているのかによって異なります。 チャートとその下の内訳表の最初の行の両方に、デフォルトで全体的なリテンションが表示されます。

![](/docs/output/img/jp/KgKmhbVAqbTfY3xL01ZIXXwEAvoOhEgTo1gDO0r7wt2Jo-SCaI0vUlg826rnXWCB51t9yEWx7nq971tHC3p87norNkE9TgrpYVYl8eNIpEzqfYTiFt2-322WOuffmIhCXhU86lq_2NdkFc5FuTDDfOs)

[リテンション分析チャートがどのようにリテンションを計算するかについては、詳細をご覧ください](/docs/analytics/charts/retention-analysis/retention-analysis-calculation)。

### リターンオン（以前はNデイとして知られていました）

リターンオンリテンションは、開始イベントをトリガーした後、**特定の日**にリターンイベントをトリガーするために戻ってきたユーザーの割合を示します。例えば、7日目のリテンション値は、最初の使用から7日目に戻ったユーザーの割合を示します。

すべてのユーザーのリテンションを見ているのか、特定のコホートエントリー日付を見ているのかに関係なく、Amplitudeはリターンオンリテンションを計算するために1つのメソッドのみを使用します（[リターンオンまたはアフター](#h_01GXB4EFQ2VXSYEZ0CRMF09AJS)とは異なります）。チャートとその下の内訳表の最初の行の両方に、デフォルトで全体的なリテンションが表示されます。

![](/docs/output/img/jp/bRG3OPRhMIRWdC_WcGmL-UrlhHJHoR42SWDFwmzirvTGgdI-p0g4HjFTpa0UtiBoDUhDlIhC6RD4jtv-M3ZkecC11Z-5FCHc8TBGQjwdZ5KydLB_KkuWS_4yH3mbWCNa9fU4uQi5Hj2SXjC5Ug-tvLU)

[リテンション分析チャートがどのようにリテンションを計算するかについては、詳細をご覧ください](/docs/analytics/charts/retention-analysis/retention-analysis-calculation)。

### リターンオン（カスタム）（以前はカスタムとして知られていました）

デフォルトでは、Amplitudeは、リテンション分析のリテンションブラケットとして、日、週、月など、事前に定義された時間の単位を使用することを前提としています。しかし、リターンオン（カスタム）を使用してこれを変更し、代わりにリターンオンリテンション用のカスタムブラケットを作成できます。

![](/docs/output/img/jp/kkaC2HwoVknNxGVNU9ea2FQasGOvWv0kjjL4xp4RShlvm5hvX8yUyiz3L3eX8LkYt88u7A6fL4fOIGUQvT3pQ6sepIOMY64uKvqDMjiUPz5vb6Rmp7izDWC7ARxdgGRYIp3ONrPwKxGG1fLsemX-_Nk)

カスタムブラケット機能は、リターンオンリテンションと同じロジックを使用しているため、関連する時間の単位を定義しながら、リターンオンリテンションチャートと同等のリターンオンリテンションチャートを生成するために使用できます。

上の画像では、4つのカスタムブラケットを定義します：

* 最初のブラケット：1日間（0日目）
* 2番目のブラケット：3日間（1～3日目）
* 3番目のブラケット：3日間（4～6日目）
* 4番目のブラケット：5日間（7～11日目）

このライングラフは、選択された時間枠内のユーザーコホートからのすべてのブラケットリテンション数の加重平均を示しています。

![](/docs/output/img/jp/xPk8bYZIWfjtWTgFlyAkh6AZEtjwNrmmjHwNO-2Qy5JJZeBSwo-VYz_jwxqcEJ9_Hvs8s85nwK-_WIjLZga2ZEaWrftx9Sj3tdyI-8aVGxvCDPYW_dRLmAGMn6Szv0Rk_S4b59ifcE6kG5BWayuSt0s)

下の表では、1月4日に3,172人の新規ユーザーが存在しました：

![interpret_retention_table_0.png](/docs/output/img/jp/interpret-retention-table-0-png.png)

1日目から3日目のリテンションは75.1%であり、3,172人のうち2,382人のユーザーが、開始イベントから1日目から3日目の間にリターンイベントをトリガーしたことを意味します。

4日目から6日目のリテンションは99.7%であり、3,172人のうち3,164人のユーザーが、開始イベントの4日目から6日目後にリターンイベントをトリガーしました。

各チャートは、最大100個のカスタムブラケットが許可されます。データが不完全な日の結果は、アスタリスクになります。

## リテンションと時間の経過による変化

特定の日のリテンション率について簡単ビューだけではなく、複雑なものが必要になる場合もあります。新規リリースがプロダクト1日目のリテンション率にどのような影響を与えたか、または新規トレーニングプログラムが14日目のリテンション率に影響を与えたかどうかなどを知りたいと思うときがあるでしょう。そうしたケースでは、*ドロップダウンとして*表示から*経時変化*を選択することにより、時間経過とともにリテンションデータを表示することができます。

![](/docs/output/img/jp/wppKdelVUz71mcpUDdpDnRsoWwnF0JOZqfSBUlwp_YjfNlga71UAoGiXKe8Nj4TlyGg1sxGmu2BmSk3q-uwe9AKbD3d7XGCPquZzzdmOEBoZAA3NDFGza3u9mYQfvE9Os4JVYu7cmj7wkkRq-niT9nY)

このチャートでは、1月1日に新規登録したすべてのユーザーを調べています。100%のユーザーが1日目にはリターンイベントをトリガーし、72.1%が7日目にはリターンイベントをトリガーしました。

![](/docs/output/img/jp/bie2TdPnLluRZk2yMW2X2n7aKX09-koowjpWrDsbWRca8RW-4hhLyJYHIP0sO1TdBBdbpk-_Q9d0kEjSPppMa2iqcO4QpccuQV6sKC_GEoYaFemoA8uDAvFzZH5T_sxJCMWpwQs0XpYKjBdnuCNlQdM)

Amplitudeは、1) 各リテンション日にリターンイベントをトリガーした新規ユーザーコホートからのユーザー数を、2) 選択された日に新規だったユーザー数で割ることで、このパーセントを計算します。

**注**：リターンオン変更データテーブルは、リターンオンリテンションデータテーブルと同じデータを表示しますが、X軸とY軸が切り替えられます。

## さらに読む

リテンションビューは、リテンション分析チャートを操作する1つの方法にすぎません。[使用インターバル](/docs/analytics/charts/retention-analysis/retention-analysis-interpret-usage)ビューを使用して、指定された日次、週次、月次の中央値で選択したイベントをトリガーしたアクティブユーザーの割合を表示することもできます。

[リテンション分析で時間がどのように機能するか](/docs/analytics/charts/retention-analysis/retention-analysis-time)を理解することは、結果を正しく解釈するために重要です。

[リテンション分析チャートがどのようにリテンションを計算するか](/docs/analytics/charts/retention-analysis/retention-analysis-calculation)についても、さらに詳細が必要になる場合もあります。
