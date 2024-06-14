---
id: a7e8e20c-65b6-4d08-855f-5945c731eb62
blueprint: japanese_translation
title: 統計設定で実験結果を修正する
title_en: 'Modifying experiment results in statistics settings'
source: 'https://help.amplitude.com/hc/ja/articles/13448368364187'
---
 
|  |
| --- |
| この記事のテーマ：* 実験結果のデフォルトの統計設定を理解する
* デフォルト設定をいつ変更するかを理解する
 |

Amplitude Experimentは、実験結果を分析する際にデフォルトの統計設定を使用します。

* *CUPED*トグル：オフ
* *Bonferroni Correction*（ボンフェローニ補正）トグル：オン
* *Custom Exposure Settings*（カスタム露出設定）トグル：オフ
* *Test Type*（テストタイプ）：Sequential（シーケンシャル）
* *Confidence Level*（信頼度レベル）：95％

結果を確認して、デフォルト設定を1つ以上変更することが実験にメリットをもたらしそうな場合は、*[Plan]*（計画）タブで、*[Statistical Settings]*（統計設定）を表示してデフォルト設定を変更します。

**注**：この記事は、ヘルプセンターの記事[「Learning from your experiment」](https://help.amplitude.com/hc/en-us/articles/360061687631)（実験から得られる知見）の続きです。まだお読みになっていない場合は、そちらの記事からお読みください。

## CUPED

CUPED（Controlled-experiment using pre-existing data）は、Amplitude Experimentで分散削減のために使用されるオプションの統計手法です。CUPEDのトグルをオンにすると、さまざまな処理によって異なるユーザーセグメントに起こり得る影響をAmplitude Experimentで確認できます。テストで新規ユーザーのみをターゲットにする場合など、CUPEDが実験にとって最良の選択ではない状況もあります。

CUPEDと、実験結果にどのように影響する可能性があるかについては、こちらの[ブログ](https://amplitude.com/blog/amplitude-experiment-cuped)をご覧ください。

## ボンフェローニ補正

Amplitude Experimentは、[多重仮説検定](https://help.amplitude.com/hc/en-us/articles/8807757689499-Multiple-hypothesis-testing-in-Amplitude-Experiment#bonferroni-correction)の潜在的な問題に対処するためにボンフェローニ補正を使用します。信頼できる統計手法ですが、実験結果を分析する方法として適当でない場合もあります。実験結果を、ボンフェローニ法に対応していない内部システムによって生成された結果と比較したい場合などです。この場合、偽陽性率が高くなってもよければ、*ボンフェローニ補正*のトグルをオフにします。

## カスタム露出設定

指標イベントに時間枠またはウィンドウを割り当て、真のコンバージョンイベントとして検討することができます。ウィンドウは、秒、分、時間、または日単位で設定できます。

## テストタイプ

実験を分析する際に、[逐次検定とT検定のどちらかを選択](https://amplitude.com/blog/sequential-test-vs-t-test)できます。逐次検定を選択した方がよい場合が多いですが、必ずしもそうではありません。例えば、逐次検定を行うにはサンプルサイズが小さすぎる場合があります。

[Amplitude ExperimentのT検定](https://help.amplitude.com/hc/en-us/articles/12587885686299-Analyze-your-experiment-data-with-the-T-test)で、使用方法の詳細をご覧ください

## 信頼度

信頼度は、実験を何度も繰り返しロールアウトしたときに、同じ実験結果が出る確度を評価したものです。デフォルトの信頼度95％は、5％の確率で、統計的に有意であると誤って解釈する可能性があることを意味します。実験の信頼度を下げると、実験が統計的有意性に達する可能性が高くなりますが、偽陽性の可能性も高くなります。80％未満にすると、実験結果が信頼できなくなる可能性があるため、80％未満にすべきではありません。

## バリアントごとに必要なサンプル数

*[Test Type]*（検定の種類）をT検定に変更する場合は、*[Samples Per Variant Needed]*（バリアントごとに必要なサンプル数）を入力する必要があります。この数は、統計的有意性に達するために推奨されるサンプルサイズです*。*T検定は、特定の偽陽性率と偽陰性率を制御する前に、まず必要なサンプルサイズを計算することで機能します。

![exp_stat_settings.png](/docs/output/img/jp/exp-stat-settings-png.png)

*[Samples Per Variant Needed]*（バリアントごとに必要なサンプル数）に入力するサンプルサイズが分からない場合は、Amplitudeの期間推定ツールを使用します。詳細は、ヘルプセンターの記事[「期間推定ツールを使用して実験を計画する」](https://help.amplitude.com/hc/en-us/articles/11502996649371-Plan-experiments-with-help-from-the-sample-size-calculator)をご覧ください。
