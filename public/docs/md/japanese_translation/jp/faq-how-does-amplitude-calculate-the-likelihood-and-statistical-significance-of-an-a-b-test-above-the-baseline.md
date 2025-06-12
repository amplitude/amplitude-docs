---
id: 188b5a30-dcf3-4909-acc5-628572677dc8
blueprint: japanese_translation
title: FAQ：AmplitudeはA/Bテストにおいて、ベースラインを上回る可能性と統計的有意性をどのように計算するのか？
title_en: 'FAQ: How does Amplitude calculate the likelihood and statistical significance of an A/B test above the baseline?'
source: 'https://help.amplitude.com/hc/ja/articles/360053484751'
---
AmplitudeのA/Bテスト機能は、標準的な統計的手法を利用して、ベースラインを上回る可能性と統計的有意性を判断します。この記事では、これらの計算について説明します。

## ベースラインを上回る可能性

ベースラインを上回る可能性は、平均ベースライン（B）に対する平均バリアント（A）の割合です![FAQ_AB_1.png](/docs/output/img/jp/faq-ab-1-png.png)。

![FAQ_AB_2.png](/docs/output/img/jp/faq-ab-2-png.png)

## 上回る可能性

Amplitudeはベイズ法を使用して、バリアント（A）がベースライン（B）を上回る可能性を計算します。この確率は、差B - Aの分布に基づいています。BとAの個々の分布が正規分布であると仮定すると、差B - Aも平均が![FAQ_AB_3.png](/docs/output/img/jp/faq-ab-3-png.png)、分散が![FAQ_AB_4.png](/docs/output/img/jp/faq-ab-4-png.png)の正規分布（ガウス分布）になります。

![FAQ_AB_5.png](/docs/output/img/jp/faq-ab-5-png.png)

![FAQ_AB_6.png](/docs/output/img/jp/faq-ab-6-png.png)

AがBを上回る可能性を見つけるために、Amplitudeはゼロより右にくる曲線の下の面積を判定します。

![FAQ_AB_7.png](/docs/output/img/jp/faq-ab-7-png.png)

曲線より下の面積または累積分布は、平均がμ、分散がσの誤差関数*erf*で表現できます。

*Erf*は数値近似で計算でき、Amplitudeも同じアプローチで上回る可能性を計算します：

![FAQ_AB_8.png](/docs/output/img/jp/faq-ab-8-png.png)

*erf*が決定したら、BがAを上回っている可能性を計算する最後の数式は、次のようになります：

![chance_better.png](/docs/output/img/jp/chance-better-png.png)

*（出典：O'Connell, Aaron. [“The Math of Split Testing Part 2: Chance of Being Better”](http://204nocontent.me/the-math-of-split-testing-part-2-chance-of-being-better)（「分割テストの数学パート2：上回る可能性」））*

## 統計的意義

A/Bテストビューは、チャートの左上隅で統計的意義が達成されたかどうかを示します。Amplitudeは、両側t検定を使用し、判定結果に対する偽陽性率5%で、最もパフォーマンスの良いバリアントのみを調べます。

Amplitudeは5％の偽陽性率を使用しているため、有意性のしきい値は（1-p値）>95％です。[Amplitude Experiment](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper)（実験結果）で異なる偽陽性率を設定できます。

Amplitudeでは誤検出を減らすために、重要性を宣言する前に最小サンプルサイズを設定します。現在、この最小値は各バリアントについて、サンプル数30、コンバージョン5、コンバージョンなし5に設定されています。これらの最小値を満たさないテストは、自動的に統計的有意性がないとみなされます。

テストが統計的有意性を有している場合、この緑色のテキストが表示されます：

![FAQ_AB_9.png](/docs/output/img/jp/faq-ab-9-png.png)

そうでない場合、次の赤色のテキストが表示されます：

![FAQ_AB_10.png](/docs/output/img/jp/faq-ab-10-png.png)
