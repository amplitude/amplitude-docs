---
id: c5b4ee47-fb78-4b53-a271-e8561b2e4438
blueprint: japanese_translation
title: カスタム数式：構文と定義
title_en: 'Custom Formulas: Syntax and Definitions'
source: 'https://help.amplitude.com/hc/ja/articles/115001163231'
---
[イベントセグメンテーション](/docs/analytics/charts/data-tables/data-tables-multi-dimensional-analysis)チャートでは、[Measured As Module]（モジュールとして測定）の*[アドバンスト]*ドロップダウンの[数式]オプションを利用することで、さらに柔軟な分析を実行できます。カスタム数式は、同じチャートでさまざまな分析を比較する際にも便利です。

20以上のカスタム数式から選択して、必要なメトリクス（指標）をチャートに表示します。セミコロンで区切ることで、同じチャートに最大6つの数式の結果をプロットできます。

この記事では、カスタム数式の仕組みを、今すぐ使用できる数式を例にとって説明します。

**注：**Experiment Results（実験結果）チャートも数式メトリクスを使用しますが、Event Segmentation（イベントセグメンテーション）チャートやData Table（データテーブル）チャートとは異なる方法で使用しています。これらの違いについて、詳しくはAmplitudeの実験結果チャートでの数式メトリクスの使用に関する、[こちらのヘルプセンターの記事を参照してください](/docs/analytics/charts/experiment-results/experiment-results-use-formula-metrics)。

## 利用可能な数式のリスト

|  |  |  |
| --- | --- | --- |
| [ACTIVE](#h_c0b1583d-5d23-4939-9d1c-959b4f0c4e5c) | [LOG10](#h_9c95e81c-88e5-475a-8ce7-2919b30e9996) | [PROPSUM](#h_84424076-72de-46be-adfc-aa4d4de41280) |
| [ARPAU](#h_3f7b4efa-e92a-4c24-9ec5-81d7d2646823) | [PERCENTILE](#h_f05805de-3eb9-4b55-9593-491e8f25b580) | [REVENUETOTAL](#h_8c46e531-68c0-4eab-adcd-289360eadd15) |
| [AVG](#h_154d2c92-e6ee-404a-bdc3-bdfdc1e2c45c) | [POWER](#h_890e355b-8c18-4cd5-af02-33699f96ccc9) | [ROLLAVG](#h_4f055e00-af3d-44f7-9590-fd343c6b47f3) |
| [CUMSUM](#h_2062cebe-68bd-41c9-80cd-fe3fe61dc80d) | [PROPAVG](#h_18fd2c82-db5a-4277-8b3c-321783f4197c) | [ROLLWIN](#h_59f55dde-4b2e-44ce-afbd-1b193fa00571) |
| [EXP](#h_27812fb5-de39-4d3a-9600-4e68e264a417) | [PROPCOUNT](#h_46d7c586-591a-4454-989e-74deab6a732f) | [SQRT](#h_5ddba3ba-20b0-4d2a-bc6f-66db51273014) |
| [FREQPERCENTILE](#h_e3cb30c3-b6ac-4c07-8302-944317c4a61c) | [PROPCOUNTAVG](#h_5205dc30-43ce-4400-b5f8-63fbc802ba7d) | [TOTALS](#h_e5298e4d-7d77-49e4-8c5d-41b218a8eb7a) |
| [HIST](#h_460cc934-b591-4209-833d-afc32dabcf77) | [PROPHIST](#h_cf5261e9-b67a-4943-a6fd-65737816068c) | [TRENDLINE](#h_f5706204-8df6-4e2b-8c2f-0318b1388493) |
| [LN](#h_d30a318b-7090-459d-ad4c-696610abf571) | [PROPMAX](#h_01G9ZJTM8WKGRTT2T8ZN9KHGWK) | [UNIQUES](#h_8314eb05-7627-43b8-95c8-0978ba48ffd4) |
| [LOG](#h_f47f1e61-df78-499f-b3ac-45aa0b64e16e) | [PROPMIN](#h_01G9ZJTYE8VZQAG3WGCYWKNMFT) |  |

## 数式構文

数式で、イベントモジュールで対応する文字で選択したイベントを参照します。関数とパラメータは大文字小文字を区別しません。次の算術演算を実行することもできます。

* 括弧（）
* 追加（+）
* 減算（-）
* 乗算（\*）
* 除算（/）

例えば、以下の数式`UNIQUES(A)`の文字Aは、イベント`View Item Details`（アイテムの詳細を表示する）を参照し、数式`UNIQUES(B)`の文字Bは、イベント`Add Item to Cart`（カートにアイテムを追加する）を参照しています。このセットアップは、アイテムの詳細を見たユーザーとアイテムをカートに入れたユーザーの比率を表示します。

![custom_formulas_1.png](/docs/output/img/jp/custom-formulas-1-png.png)

各イベントを1つまたは複数のプロパティでグループ化して、複数のイベントで構成される数式を作成することもできます。ただし、数式が有効であるためには、区分しているすべてのイベントにわたって、プロパティの値が一致している必要があります。

例えば、`Page Name`というイベントがある場合、次のプロパティ値は**一致しません**。

* `Tutorial`と`TUTORIAL`（マッチングは大文字小文字を区別します）
* `1`と`1.0`（文字の不一致）

項目でプロパティをグループ化する順序も同様です。両方のイベントで、*grouped by*（グループ化する項目）の値の順序が同じでないと、イベントのgrouped by値が一致しないという警告が表示されます。

![custom_formulas_group_by_error.png](/docs/output/img/jp/custom-formulas-group-by-error-png.png)

カスタム数式を使用して、1つのコホートのユーザーが、別のコホートのユーザーよりも何回多く特定のイベントをトリガーしているかを特定することもできます。

2つの異なるコホートまたはユーザーセグメント間のメトリクスを比較するには、`UNIQUES(A1)/UNIQUES(A2)`のように、イベントを指定する文字にセグメントの番号を追加します。これにより、同じイベントでの2つのコホートのパフォーマンス比率が、グラフ上にプロットされた1本の線として表示されます。

![custom_forumlas_2.png](/docs/output/img/jp/custom-forumlas-2-png.png)

数式に次の接頭辞を追加することで、パーセンテージまたはドルでメトリクスを表示することもできます。

* パーセンテージ（%:）
* ドル（$:）

## メトリクス式

メトリクス式では、関心のある特定のイベントのメトリクスについてクエリできます。これらの数式は、緑で色分けされます。各メトリクス式は、パラメータとして、関心のあるイベントに対応する文字を必要とします。

### ACTIVE

**構文：**ACTIVE(イベント（に対応する文字）)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。

`ACTIVE`数式は、イベントをトリガーしたアクティブユーザーの割合を返します。これは、Measured（測定済み）カードの[`Active %`メトリクス](https://help.amplitude.com/hc/en-us/articles/230290208#metrics-bottom-module)と同じですが、ここでは小数点数形式で表示されます。以下のセットアップは、`View Item Details`（アイテム詳細の表示）イベントをトリガーしたアクティブユーザーの割合を表示します。

![custom_formulas_active.png](/docs/output/img/jp/custom-formulas-active-png.png)

### AVG

**構文：**AVG(イベント)

* **イベント：**関心のあるイベントを参照します。これは、チャートコントロールパネルの左側のモジュールのイベントに対応する文字でなければなりません。

イベントがトリガーされた回数の平均を返します。この関数は、`TOTALS（イベント）/UNIQUES（イベント）`と同じ値になります。以下に示すセットアップは、`View Item Details`（アイテム詳細の表示）がトリガーされた回数と`Add Item to Cart`（アイテムをカートに追加）がトリガーされた回数の比率、`View Item Details`（アイテム詳細の表示）がトリガーされた平均回数、`Add Item to Cart`（アイテムをカートに追加）がトリガーされた平均回数を表示します。

![custom_formulas_avg.png](/docs/output/img/jp/custom-formulas-avg-png.png)

### TOTALS

**構文：**TOTALS(イベント)

* **イベント：**関心のあるイベントを参照します。これは、チャートコントロールパネルの左側のモジュールのイベントに対応する文字でなければなりません。

イベントがトリガーされた合計数を返します。以下のセットアップは、アイテムの詳細が閲覧された合計回数と、アイテムがカートに追加された合計回数を表示します。

![custom_events_totals.png](/docs/output/img/jp/custom-events-totals-png.png)

### ユニーク数

**構文：**UNIQUES(イベント)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。

イベントをトリガーしたユニークユーザー数を返します。例えば、次のセットアップは、アイテムの詳細を見たユーザーとカートにアイテムを追加したユーザーの比率を示しています。

![custom_formulas_uniques.png](/docs/output/img/jp/custom-formulas-uniques-png.png)

### HIST

**構文：**HIST(イベント)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。

選択した期間のユニークユーザーあたりのイベント頻度の分布を返します。次のセットアップは、`Complete Purchase`（購入完了）イベントのイベント頻度の分布を表示します。

![custom_formulas_hist.png](/docs/output/img/jp/custom-formulas-hist-png.png)

過去30日間に、22,075人のユーザーが5回購入を完了したことがわかります。

### FREQPERCENTILE

**構文：**FREQPERCENTILE(イベント, パーセンテージ)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* **パーセンテージ**関心のあるパーセンタイル値を参照します。これは、1以下の値でなければなりません。

全ユーザーのイベント頻度について、入力された[パーセンタイル](https://en.wikipedia.org/wiki/Percentile)の値を返します。パーセンタイルは、所与のパーセンテージの測定対象が、その値未満になることを示すメトリクスです。例えば、次の数式は、`View Item Details`（アイテム詳細の表示）イベントをトリガーしたユーザーの90パーセンタイルを表示します。

![c_f_freqpercentile.png](/docs/output/img/jp/c-f-freqpercentile-png.png)

次に、この情報使ってパワーユーザーの[行動コホート](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts)を作成し、それをさらに分析することによって、このコホートに入らないユーザーとの違いを確認することができます。

### PERCENTILE

**構文：**PERCENTILE（イベント, パーセンテージ）

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* **パーセンテージ：**関心のあるパーセンタイルの値を参照します。これは、1以下の値でなければなりません。

**注：**この関数は、イベントを数値プロパティのみでグループ化している場合のみ機能します。

グループ化しているプロパティについての、入力された[パーセンタイル](https://en.wikipedia.org/wiki/Percentile)の値を返します。例えば、次の数式は、すべての`Complete Purchase`（購入完了）イベントの収益の90パーセンタイルを返します。

![c_f_percentile.png](/docs/output/img/jp/c-f-percentile-png.png)

PERCENTILE数式は、読み込み時間をトラッキングしていて、一定の割合の読み込み時間が特定のしきい値未満であることを保証しようとしている場合などにも有用です。

### PROPSUM

**構文：**PROPSUM(イベント)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字である必要があります。イベントは、合計するプロパティでグループ化する必要があります。
* この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。複数のプロパティでグループ化する場合、数式は、最初のGROUP BY（グループ化）句で計算を実行します。

指定されたイベントをグループ化しているプロパティ値の合計を返します。例えば、このビジュアライゼーションは、`Complete Purchase`（購入完了）イベントから得られた総収益を示しています。

![c_f_propsum.png](/docs/output/img/jp/c-f-propsum-png.png)

### PROPAVG

**構文：**PROPAVG(イベント)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。複数のプロパティでグループ化する場合、数式は、最初のGROUP BY（グループ化）句で計算を実行します。

グループ化しているプロパティ値の平均を返します。この関数は、`PROPSUM(イベント)/TOTALS(イベント)`と同じ値になります。次のセットアップは、特定の日の購入完了から得られた収益の平均を表示します。

![propavg_sidecontrols.png](/docs/output/img/jp/propavg-sidecontrols-png.png)

### PROPHIST

**構文：**PROPHIST(イベント)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。複数のプロパティでグループ化する場合、数式は、最初のグループ化句で計算を実行します。

選択した期間のグループ化しているプロパティ値の分布を返します。次のセットアップは、過去30日間の収益の分布を表示します。

![prophist_sidecontrols.png](/docs/output/img/jp/prophist-sidecontrols-png.png)

### PROPCOUNT

**構文：**PROPCOUNT（イベント）

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字である必要があります。複数のプロパティでグループ化する場合、数式は最初のGROUP BY（グループ化）句で計算を実行します。

イベントがグループ化されているプロパティの異なるプロパティ値の数を返します。以下の例では、数式は、詳細が閲覧されたすべてのアイテムに対応する異なる部門の数を取得します。

![propcount_sidecontrols.png](/docs/output/img/jp/propcount-sidecontrols-png.png)

`PROPCOUNT`は、異なるプロパティ値の**推定値**であることに注意してください。この推定は、[HyperLogLogアルゴリズム](https://en.wikipedia.org/wiki/HyperLogLog%201)によって生成され、精度は、処理するデータの量によって異なります。プロパティのカーディナリティに応じて、12,000未満のユニーク値では0.1％の範囲の相対誤差、12,000を超えるユニークなプロパティ値では、最大0.5％の範囲で相対誤差が想定されます。

### PROPCOUNTAVG

**構文：**PROPCOUNTAVG(イベント)

* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字である必要があります。複数のプロパティでグループ化する場合、数式は、最初のGROUP BY（グループ化）句で計算を実行します。

指定されたプロパティで、各ユーザーが持っている異なる値の平均数を返します。

例えば、音楽アプリ加入者が聞く楽曲ジャンルの平均数に関心があるとしましょう。曲が再生されるたびに、`Play Song or Video`（曲または動画を再生）イベントがトリガーされます。再生された各曲は、`Genre_Type`（ジャンル\_タイプ）イベントプロパティもキャプチャします。`Genre_Type`でグループ化された`Play Song or Video`で`PROPCOUNTAVG`を実行すると、`Play Song or Video`を再生するユーザーのユニークな`Genre_Type`値の平均数がわかります。

### PROPMAX

**構文**：PROPMAX(イベント)

* **イベント：**指定されたイベントをグループ化しているプロパティの最大値を返します。プロパティは、数値である必要があります。複数のプロパティでグループ化する場合、計算は、最初のGROUP BY（グループ化）句を使用して実行されます。

### PROPMIN

**構文**：PROPMIN(イベント)

* **イベント：**指定されたイベントをグループ化しているプロパティの最小値を返します。プロパティは、数値である必要があります。複数のプロパティでグループ化する場合、計算は、最初のGROUP BY（グループ化）句を使用して実行されます。

### REVENUETOTAL

**構文：**$:REVENUETOTAL(イベント)

* **イベント：**収益イベントを参照します。これは、Events（イベント）カードのイベントに対応する文字である必要があります。
* この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。また、

通貨形式でプロパティの合計を返します。これは、`PROPSUM(イベント)`と同じ値になります。例えば、次のセットアップは、購入から得られた日ごとの総収益を示しています。

![revtotal_sidecontrols.png](/docs/output/img/jp/revtotal-sidecontrols-png.png)

上記のスクリーンショットでわかるように、`$:`接頭辞はオプションです。これによって、必ず通貨形式で出力されます。

### ARPAU

**構文：**$:ARPAU(イベント)

* **イベント：**収益イベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。

通貨形式の収益イベントプロパティの合計を、同じ期間のユニークアクティブユーザー数で割った値を返します。これは、`PROPSUM(イベント) / UNIQUES(任意のアクティブイベント)`と同じ値になります。

例えば、次のセットアップは、一般的なeコマース企業のアクティブユーザーあたりの平均収益を示しています。

![ARPAU_sidecontrols.png](/docs/output/img/jp/arpau-sidecontrols-png.png)

上記のスクリーンショットでわかるように、`$:`接頭辞はオプションです。これによって、必ず通貨形式で出力されます。

## 集計数式

集計数式では、関心のあるメトリクスとイベントの**ローリング平均またはローリングウィンドウ**でクエリできます。これらの数式は、紫で色分けされます。各集計数式には、集計しているメトリクス、関心のあるイベント、集計する間隔の**3**つのコンポーネントが必要です。

### ROLLAVG

**構文：**ROLLAVG（メトリクス、イベント、間隔数）

* **メトリクス：**集計するメトリクス。これは、上記の[メトリクス式](https://help.amplitude.com/hc/en-us/articles/115001163231#metrics-formulas)の1つです。
* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* **間隔数：**ローリング平均に含める5分間隔、時間、日、週、または月の数。例えば、日次チャートでは、日間隔のローリング平均のみを許可します。ローリング平均の最大範囲は、5分間隔×36（合計3時間）、72時間、90日、12週間、または12ヶ月です。

選択されたイベントのメトリクスを選択した間隔で[ローリング平均](https://help.amplitude.com/hc/en-us/articles/360035355132#advanced-features-averages-windows-and-cumulative-totals)で返します。例えば、次のチャートは、週次ローリング平均を、日次アクティブユーザーの上に重ねて表示しています。

![rollavg_sidecontrols.png](/docs/output/img/jp/rollavg-sidecontrols-png.png)

下の青い線は日次アクティブユーザーを示し、緑の線は週次ローリング平均を示しています。これは、日次アクティブユーザー数がローリング平均よりも高いか低いかを確認するのに便利です。

![rollavg_linechart.png](/docs/output/img/jp/rollavg-linechart-png.png)

### ROLLWIN

**構文：**ROLLWIN（メトリクス、イベント、5分間隔数/時間/日/週/月）

* **メトリクス：**集計するメトリクス。これは、上記の[メトリクス式](https://help.amplitude.com/hc/en-us/articles/115001163231#metrics-formulas)の1つです。
* **イベント：**関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* **間隔数：**ローリング平均に含める5分間隔、時間、日、週、または月の数。例えば、日次チャートでは、日間隔のローリング平均のみを許可します。ローリング平均の最大範囲は、5分間隔×36（合計3時間）、72時間、90日、12週間、または12ヶ月です。

入力された日/週/月数の[ローリングウィンドウ](https://help.amplitude.com/hc/en-us/articles/360035355132#h_d48f96e2-797c-45d9-bf87-6e5a5ac8ad28)で、選択されたイベントのメトリクスを返します。コホートフィルタを使用している場合、コホートフィルタの後にローリングウィンドウ集計が適用されます。

例えば、このチャートは、最初に月次アクティブユーザー数を計算してから、各データポイントで新規ユーザー数のみを記入します。

![rollwin_sidecontrols.png](/docs/output/img/jp/rollwin-sidecontrols-png.png)

### ROLLWINBEFORE

**構文**：ROLLWINBEFORE（メトリクス、イベント、5分間隔数/時間/日/週/月）

* **メトリクス**：集計するメトリクス。これは、上記の[メトリクス式](https://help.amplitude.com/hc/en-us/articles/115001163231#metrics-formulas)の1つです。
* **イベント**：関心のあるイベントを参照します。これは、Events（イベント）カードのイベントに対応する文字でなければなりません。
* **間隔数**：ローリング平均に含める5分間隔、時間、日、週、または月の数。例えば、日次チャートでは、日間隔のローリング平均のみを許可します。ローリング平均の最大範囲は、5分間隔×36（合計3時間）、72時間、90日、12週間、または12ヶ月です。

入力された日/週/月数のローリングウィンドウで、選択されたイベントのメトリクスを返します。コホートフィルタを使用している場合、コホートフィルタの後にローリングウィンドウ集計が適用されます。

例えば、このチャートは、最初に新規ユーザーを分離し、次に、過去1ヶ月間にアクティブだった数を計算します。

![rollwinbefore_sidecontrols.png](/docs/output/img/jp/rollwinbefore-sidecontrols-png.png)

### CUMSUM

**構文：**CUMSUM（メトリクス、イベント）

* **メトリクス：**集計するメトリクス。これは、上記の[メトリクス式](https://help.amplitude.com/hc/en-us/articles/115001163231#metrics-formulas)の1つです。

選択されたイベントのメトリクスを、チャート期間の日/週/月の現在合計高で返します。

例えば、下のチャートは、過去30日間の`Complete Purchase`（購入完了）イベントによる収益の[日次累計](https://help.amplitude.com/hc/en-us/articles/230290208#cumulative-sum)を示しています。2月22日のデータポイントは、2月20日、21日、22日に発生した収益の合計です。

![CUMSUM_sidecontrols.png](/docs/output/img/jp/cumsum-sidecontrols-png.png)

`CUMSUM(UNIQUES,A)`は、各データポイントの重複したユニークユーザー数を返します。

## 関数式

関数式では、関心のある特定のイベントとメトリクスについて数学的関数でクエリできます。これらの数式は、青で色分けされます。各関数式には、定数またはイベントを含む別の数式のいずれかの値が必要です。

### TRENDLINE

**構文：**TRENDLINE（値）

* **値：**値は、定数または別の関数である可能性があります（例えば、入力する値はイベントの`UNIQUES`である可能性があります）。

値のトレンドラインを返します。これは、[通常の最小二乗線形回帰で計算されます](https://en.wikipedia.org/wiki/Ordinary_least_squares)。このカスタム数式と一緒に別のカスタム数式をプロットして、比較できるようにすることを強くお勧めします。そうでない場合、`TRENDLINE`関数がチャートに描くのは、コンテキストのない直線になります。

例えば、この関数を使用して、曲またはビデオを購入するユーザー数のトレンドラインを表示し、ユニークユーザー数と比較します。

![trendline_sidecontrols.png](/docs/output/img/jp/trendline-sidecontrols-png.png)

### EXP

**構文：**EXP(値)

* **値：**値は、定数または別の関数である可能性があります（例えば、入力する値はイベントの`UNIQUES`である可能性があります）。受け入れられる最大値は700です。

[e](https://en.wikipedia.org/wiki/E_(mathematical_constant))を指定した値で累乗した値を返します。例えば、ここでは、eをユーザーがチケットを購入する平均回数累乗しています。

![expavg_sidecontrols.png](/docs/output/img/jp/expavg-sidecontrols-png.png)

### LOG

**構文：**LOG(値, 底)

* **値：**値：値は、定数または別の関数である可能性があります（例えば、入力する値はイベントの`TOTALS`である可能性があります）。
* **底：**定数。底は、定数である必要があり、別の関数を含めることはできません。

底に対する値の[対数](https://en.wikipedia.org/wiki/Logarithm)を戻します。例えば、次の数式は、底3にに対し、ユニークアクティブユーザー数の対数を返します。

![log_sidecontrols.png](/docs/output/img/jp/log-sidecontrols-png.png)

### LOG10

**構文：**LOG10(値)

* **値：**値は、定数または別の関数である可能性があります（例えば、入力する値はイベントの`AVG`である可能性があります）。

底10に対する、値の[対数](https://en.wikipedia.org/wiki/Common_logarithm)を返します。例えば、次の数式は底10に対する、`Complete Purchase`（購入完了）がトリガーされた平均回数の対数を返します。

![log10_sidecontrols.png](/docs/output/img/jp/log10-sidecontrols-png.png)

### LN

**構文：LN**(値)

* **値：**値は、定数または別の関数である可能性があります（例えば、入力する値はイベントの`UNIQUES`である可能性があります）。

値の[自然対数](https://en.wikipedia.org/wiki/Natural_logarithm)を返します。これは、数学的定数[e](https://en.wikipedia.org/wiki/E_(mathematical_constant))の底に対する対数です。例えば、`LN(UNIQUES(A))`は、イベントAをトリガーしたユニークユーザー数の自然対数を計算します。

### POWER

**構文：**POWER(値, 指数)

* **値：**値：値は、定数または別の関数である可能性があります（例えば、入力する値はイベントの`TOTALS`である可能性があります）。
* **指数：**定数。指数は、定数である必要があり、別の関数を含めることはできません。

入力された値を指定された指数で累乗した値を返します。例えば、`POWER(UNIQUES(A), 2)`は、イベントAをトリガーしたユニークユーザー数を返します。

### SQRT

**構文：SQRT(値)**

* **値：**値は、定数または別の関数である可能性があります（例えば、入力する値はイベントのAVGである可能性があります）。

値の[平方根](https://en.wikipedia.org/wiki/Square_root)を返します。例えば、`SQRT(TOTALS(A))`は、ユーザーがイベントAをトリガーした総数の平方根を返します。

---
