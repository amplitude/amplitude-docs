---
id: 53a823fe-2224-4238-80f0-9271b9097573
blueprint: japanese_translation
title: 内訳表でチャートデータを確認する
title_en: 'Check the chart data in the breakdown table'
source: 'https://help.amplitude.com/hc/ja/articles/14911842524827'
---
#### この記事のテーマ：

* チャートに付随する内訳表を理解する
* 分析を進めるために、内訳表を変更してエクスポートする

チャートでデータを視覚化するだけでは十分ではない分析もあります。Amplitude Analyticsのチャートを構成するデータを確認、操作、エクスポートするには、**チャートの下にある内訳表**を使用します。

![breakdownTable_location.png](/docs/output/img/jp/breakdowntable-location-png.png)

**注**：[データ表]、[ペルソナ]、[パスファインダーユーザー]、[コンパス]、[実験結果]チャートには、内訳表がありません。

## 表のフィールドを並べ替える

内訳表の列またはフィールドは、以下のような複数の要因によって変わりります。

* 分析に使用しているチャートのタイプ、
* イベントの種類と数、
* 測定の種類、
* セグメントまたはグループ化プロパティを使用しているかどうか。

内訳表の列の一部は**固定されます**。固定列は、左端に青でハイライトされ、分析に応じて自動的に追加、または部分的に追加されます。たとえば、イベントやセグメント、セグメントのグループ化を追加すると、新しい固定列が作成されますが、イベントにグループ化を追加するだけだと、イベントの固定列のみに追加されます。列間の区切り線を右または左にドラッグし、固定列の幅を変更できます。

内訳表の列名をクリックし、列を降順または昇順に並べ替えできます。

![breakdownTable.gif](/docs/output/img/jp/breakdowntable-gif.gif)

**注：**固定列の値は、文字列として並べ替えられます。

## サマリー列を変更する

[セグメンテーション]チャートや[ユーザーセッション]チャートなど、一部のチャートには**サマリー列があります**。ドロップダウンメニューで**行集計**を選択し、サマリー列を変更できます。平均値、中央値、変更（最初の行から最後の行を引いた値）、または合計（イベントの合計、プロパティ、数式でのみ利用可能）から選択できます。

![row_Aggregates.png](/docs/output/img/jp/row-aggregates-png.png)

## 表示する系列の数を設定する

各内訳表は、自動的にチャートに反映され、その逆も自動で行われます。行名でチェックボックスをクリックするなど、内訳表を変更すると、![check.jpeg](/docs/output/img/jp/check-jpeg.jpeg)クリックされていない系列が削除され、チャートが変更されます。チェックボックス![check.jpeg](/docs/output/img/jp/check-jpeg.jpeg)![select.jpeg](/docs/output/img/jp/select-jpeg.jpeg)または ![check.jpeg](/docs/output/img/jp/check-jpeg.jpeg)左端フィールド名付近をクリックすると、すべての行を選択する、または選択を解除し、すべてのデータを追加する、または削除して、チャートを変更します。

**注**：内訳表の何を選択するか、選択しないかにかかわらず、エクスポートされたCSVには、**すべての**行と値が含まれます。

![select_unselect_values.png](/docs/output/img/jp/select-unselect-values-png.png)

## 以下の方法で内訳を変更する

内訳表に表示する系列数または行数の選択。*[内訳]を*クリックし、ドロップダウンからデフォルトを選択するか、1～30の数値を入力します。保存されていれば、*[内訳]の選択は、*並べ替えや更新後も、チャートを含むダッシュボードでも維持されます。Amplitudeが新しいデータを受信すると、トップ値またはイベントが自動的に更新されます。

![breakdownBy.png](/docs/output/img/jp/breakdownby-png.png)

*[内訳]の選択をオフにするには、*維持する値とイベントのみをチェックします。![check.jpeg](/docs/output/img/jp/check-jpeg.jpeg)[内訳]表に、特定の番号のみが選択されていることが表示されます。オンに戻すには、*トップに[リセット]...*ハイパーリンクをクリックします。

![reset_to_top.png](/docs/output/img/jp/reset-to-top-png.png)

## CSVにエクスポートする

内訳表を以下のファイルとして![export_to_CSV.png](/docs/output/img/jp/export-to-csv-png.png)エクスポートするためにクリックします。.CSVファイル[使用するチャートとグループ化の種類によって](https://help.amplitude.com/hc/en-us/articles/115002923888#h_23368329-5147-4369-9d91-6a1d552eab36)、CSVダウンロードには制限があります。

## 値の検索

検索バーを使用して、内訳表の値を検索します。検索は、値を入力すると自動的に開始され、値が変更または削除されると更新されます。検索結果は、チャートやエクスポートできるデータには影響しません。

![searchField.png](/docs/output/img/jp/searchfield-png.png)
