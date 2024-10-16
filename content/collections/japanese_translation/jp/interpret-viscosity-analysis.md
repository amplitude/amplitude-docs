---
id: 8d9eec3c-8a58-44ab-94b7-b4a186f58bed
blueprint: japanese_translation
title: 粘性分析を解釈する
title_en: 'Interpret viscosity analysis'
source: 'https://help.amplitude.com/hc/ja/articles/360053681271'
---
#### この記事のテーマ：

* 粘性チャートからユーザー行動についての結論を出す
* Amplitudeがどのように粘性を計算するかを理解する
* 粘性分析から行動コーホートを設定する

粘性は、ユーザーベース全体のエンゲージメントの詳細を掘り下げるのに役立ちます。特に、何人のユーザーが製品の使用習慣を形成したかについて探ります。

この記事では、粘性チャートの指標モジュールについて説明します。これはまた、粘性分析を解釈するのに役立ちます。

## 開始する前に

A[mplitudeで粘性チャートを構築する](/docs/analytics/charts/stickiness/stickiness-identify-features)の記事をまだ読んでいない場合は、必ずお読みください。

## 粘性チャートを解釈する

Amplitudeでは、粘性は、2つの方法の1つで測定できます:累積または非累積です。この設定は、分析中にいつでも、指標モジュールの上部で変更できます。

### stickiness_cumulative_option.png

### 非累積粘性

非累積粘性チャートは、X軸に記載された**正確な日数**で、少なくとも1回イベントを発行したユーザーの割合を示します。例えば、2日間のバケットのユーザーは、分析の期間内の1週（または月）のうち*で、正確に2日間*でイベントを発行しましたが、**3日間の**バケットのユーザーは、1週間の*うちで、正確に3日間*でイベントを発行しています。

![stickiness_2.png](/docs/output/img/jp/stickiness-2-png.png)

この例では、過去12週間で友達を追加したユーザーの70%以上は、分析の時間枠の特定の週における1日でそうしました。約24%が正確に2日間で行いましたが、時間枠の任意の週のすべての7日間でそうだったわけではありません。

見た目には、ユーザーは、非累積粘性分析の1つのバケットにのみ表示されるように映ります。ですが、そうではありません。単一のユーザーには、分析で、各週（または月）に、異なる粘性があります。例えば、ユーザーは、1週目の1日にイベントを発行し、2週目に3回発行する場合もあります。このユーザーは、非累積粘性チャートの*1日*と*3日*のバケットに含まれます。

### 累積粘性

累積粘性チャートは、X軸に記載された**日数で少なくとも1回**以上のイベントを発行したユーザーの割合を示します。例えば、2日間のバケットのユーザーは、分析の時間枠で、1週（または月）に*2日以上*でイベントを発行しましたが、**3日間の**バケットのユーザーは、1週間で*3日以上*でイベントを発行しました。

![stickiness_cumulative.png](/docs/output/img/jp/stickiness-cumulative-png.png)

特定の週に1日以上に友達を追加したユーザーの割合は100%です。これは常に、累積粘性分析で同じになります。それは、分析には、実際にイベントを発行したユーザーのみが含まれるためです。定義では、選択した時間枠内で**、少**なくとも1日で発行されており、すべてが*1日間の*バケットに含まれています。

また、特定のデータポイントをクリックして、そのポイントに含まれるユーザーを検査できます。詳細は[、マイクロスコープ](/docs/analytics/microscope)についてのヘルプセンターの記事を参照してください。

### 内訳データテーブル

テーブルは、各ユーザーコーホートによるデータと、より詳細な1日当たりバケットによるデータの詳しい内訳を示しています。この例では、10月17日に始まる週に、290,149人のユーザーがいました。*2日間*で粘性は76.8%です。つまり、290,149人のユーザーのうち222,834人がその週に2日以上でイベントを発行したことを意味します。不完全なデータがある日は、アスタリスクになります。

![](/docs/output/img/jp/16019387484059)

## 時間の経過に沿った粘性の変更履歴

また、*...として表示の*ドロップダウンメニューから*時間の経過に沿った変更*を選択して、時間の経過に沿って、最もエンゲージメントが多かったユーザーの粘性がどのように変動するかを見ることができます。

![change_over_time.png](/docs/output/img/jp/change-over-time-png.png)

この例では、2日、3日、5日、7日間の粘性が、各週の新規のコーホートでどのように変動したかがわかります。もっともわかりやすいのは、10月12日から10月25日までの間にあった顕著な変動です。プロダクトマネージャーは、なぜこれが起こったのかを調査したいと思うはずです。

## 粘性チャートからコーホートを作成する

スカラーシップ、グロース、エンタープライズのプランのユーザーは、マイクロスコープを介して、特定のデータポイントを構成するユーザーのコ[ーホ](/docs/analytics/behavioral-cohorts)ートを作成できます。

![cohort_from_stickiness.png](/docs/output/img/jp/cohort-from-stickiness-png.png)
