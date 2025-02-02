---
id: aa2bda50-c633-423a-945d-b3f90c711cf5
blueprint: japanese_translation
title: 実験結果で数式指標を使用する
title_en: 'Use formula metrics in experimental results'
source: 'https://help.amplitude.com/hc/ja/articles/13885412065179'
---
#### この記事のテーマ：

* 実験結果チャートでサポートされているさまざまな種類の数式指標を理解する
* Amplitudeが数式指標の統計的有意性を計算する方法を理解する

実験結果チャートでは、**数式指標**を使用すると、分析を実行する際に柔軟性が向上します。 数式指標は、次のものからなる指標です。

* 少なくとも2つのイベント、および
* イベントが相互作用する数学的演算。

[イベントセグメンテーションのカスタム数式に精通している場合](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas)、これは慣れ親しんでいるはずです。 そうでない場合は、続行する前に、その記事に戻って内容をお読みください。

数式指標を作成する  

実験結果チャートに数式指標を追加するには、次のステップに従ってください：

1. プライマリ指標モジュールで、*+ Add Metric*をクリックし、*数式*ドロップダウンオプションから数式を選択します。   
![select_formula.png](/docs/output/img/jp/select-formula-png.png)
2. *+ Define single-use metric*をクリックし、表示されるモーダルで、*指標タイプ*ドロップダウンから*数式*を選択します。  
![define_metric.png](/docs/output/img/jp/define-metric-png.png)  

	* *イベント...を選択*をクリックして、数式指標に含めるイベントの選択を開始する。 すべてのイベントが含まれるまで、このステップを繰り返します。
	* *数式*ボックスで、数式指標を計算する数式を入力します。 [実験結果でサポートされている数式のリストについては、ここをクリックするか](#h_01GYB55B59PZ793RCSC6B32KJ7)、[数式構文の説明](#h_01GYB56QRGWM2BZHNV2VSG53TW)については、ここをクリックしてください。
	* この新しい数式指標に名前を追加します。 完了したら、*適用*をクリックします。 指標は、実験結果チャートに追加されます。

[オブジェクト管理センター](/docs/data/object-management)でこの指標を表示することもできます。

## サポートされている数式関数

次の数式関数は、実験結果でサポートされています。

**UNIQUES:**

**構文**：UNIQUES（イベント）

* **イベント：**関心のあるイベントを参照します。 これは、イベントモジュールのイベントに対応する文字でなければなりません。

イベントをトリガーしたユニークユーザーの数を返します。

**TOTALS：**

**構文**：TOTALS（イベント）

* **イベント：**関心のあるイベントを参照します。 これは、イベントモジュールのイベントに対応する文字でなければなりません。

イベントがトリガーされた時間の合計数を返します。

**PROPSUM：**

**構文**：PROPSUM（イベント）

* **イベント：**関心のあるイベントを参照します。 これは、イベントモジュールのイベントに対応する文字でなければなりません。

この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。複数のプロパティでグループ化する場合、数式は、最初のグループバイクローズで計算を実行します。

指定されたイベントをグループ化しているプロパティ値の合計を返します。

**PROPAVG：**

**構文**：PROPAVG（イベント）

* **イベント：**関心のあるイベントを参照します。 これは、イベントモジュールのイベントに対応する文字でなければなりません。

この関数は、イベントの数値プロパティでグループ化されている場合のみ機能します。複数のプロパティでグループ化する場合、数式は、最初のグループバイクローズで計算を実行します。

グループ化しているプロパティ値の平均を返します。 この関数は、`PROPSUM（イベント）/ TOTALS（イベント）`と同じです。 [この記事では、AmplitudeがPROPAVGとPROPSUMをどのように計算するかについて、さらに詳しく学んでください](/docs/feature-experiment/under-the-hood/experiment-analysis-chart-calculation)

## 数式構文

数式で、イベントモジュールで対応する文字で選択したイベントを参照します。 関数とパラメータは大文字小文字を区別しません。 次の算術演算を実行することもできます。

* 括弧（）
* 追加（+）
* 減算（-）
* 乗算（\*）
* 除算（/）

## Amplitudeが数式指標の実験データを計算する方法

数式指標で実験データが計算される方法を理解する前に、[実験分析ビュー](/docs/feature-experiment/analysis-view)全体を理解することが重要です。  

数式指標では、Amplitudeは、各関数の結果を独立して計算し、各関数の平均と分散を示します。 算術演算子は、これらの個々の関数の結果に適用されます。   

数式指標を`TOTALS（A）+ TOTALS（B）`として定義したと仮定します。 Amplitudeは、この指標の両方のコンポーネント、および共分散の分散と平均を計算します。

XをTOTALS（A）に、YをTOTALS（B）に等しいに設定すると、これに続くステートメントは次のとおりです。

* `V[X]` =Xの分散
* `E[X]` = Xの平均
* `V[Y]` = Yの分散
* `E[Y]` = Yの平均
* `Cov[X、Y]` = XとYの共分散、すべての数学演算でゼロに仮定します。

* **加算：**分散：V[X + Y] =nV[X] + nV[Y]  
Mean：E[X + Y] =E[X] + E[Y]
* **減算：**`分散：V[X -Y] = nV[X] + nV[Y]Mean：E[X - Y] =  
 E[X] - E[Y]`
* **乗算：**`分散：V[X \*Y] = n^3 mu\_y^2 sigma\_x^2 + n^3 sigma\_y^2 mu\_x^2 + n^2 sigma\_x^2 sigma\_y^2Mean：E[X \* Y] =  
 E[X] \* E[Y]`
* **除算：**`分散：平均：E[X/ Y] =**![](/docs/output/img/jp/tbgmtKNhsfKgbfoHYYnWTI9Ib6GuGFwmXbRV1VHqr61oqN1PKYTufOTu5IQrTA9UwaC1U1P2Dvxf99ByeYe1EX9Ev0DlhpbwE-rCAzfUiPuksitYBYjB-kYr79VPfYT3_aYa66DYQdG4gMwg74h339w)** E[X] / E[Y]`

全体的な数式指標の平均と分散が得られたら、信頼区間チャートとp値を計算できます。

`数式/指標：TOTALS（A）/ TOTALS（B）`
