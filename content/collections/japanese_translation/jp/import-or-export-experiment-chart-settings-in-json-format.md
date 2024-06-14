---
id: e161c8b2-98f5-4408-86ad-8c982fd64002
blueprint: japanese_translation
title: 実験チャート設定をJSON形式でインポートまたはエクスポートする
title_en: 'Import or export experiment chart settings in JSON format'
source: 'https://help.amplitude.com/hc/ja/articles/12347964006555'
---
|  |
| --- |
| **この記事のテーマ：*** 実験チャート設定をJSON形式でクリップボードに保存する
* アナリティクスの実験結果にチャート設定をJSON形式でインポートする
 |

Amplitude ExperimentとAnalyticsの*両方で*実験結果を分析すると、設定を調整したチャートを作成するのは困難で、時間がかかる場合があります。この問題に対処するために、ユーザーはチャート設定のデータをJSON形式でインポートまたはエクスポートできます。

次のステップに従って、ExperimentからAnalyticsにJSON形式で設定をコピーすることができます。

1. Experimentのいずれかのタブで*[More]*（詳細）ドロップダウンをクリックし、*[Copy flag as JSON]*（フラグをJSON形式でコピー）を選択して、チャート設定をクリップボードにコピーします。

![experiment_e2e.png](/docs/output/img/jp/experiment-e2e-png.png)

2. Analyticsで*[Import]*（インポート）をクリックします。

![Experiment（実験）](/docs/output/img/jp/experiment-shi-yan.png)

3. *[Import from JSON]*（JSONからインポート）ウィンドウにコピーした設定を貼り付け、*[Apply]*（適用）をクリックして実験の設定と正確に一致させます。

![import_from_JSON.png](/docs/output/img/jp/import-from-json-png.png)

**注**：この機能は、AnalyticsでExperimentチャートを開く機能に直接関係しています。[Experiment：Analyticsでチャートを開く](https://amplitude.atlassian.net/wiki/spaces/MTH/pages/1878392833)どちらの機能も、E2E実験にマッチしたExperiment Resultsチャートの最終状態が得られます。

### JSONスキーマ

クリップボードにコピーされたJSONには、Experiment Resultsチャートへの入力を完全に記述した、一連のフィールドが含まれています。フィールドは、実験または機能フラグのバージョン履歴に表示されるものとわずかに異なります。

* variants - 次のキーを持つオブジェクトの配列：

	* name - バリアントに設定されたカスタム名
	* userPropertyValue - バリアントをチャートのセグメントに変換する際に、セグメント条件を構築するために使用されるバリアント値。
* bucketingGroupType - 分析の単位。詳細は、[Experiment：アカウントレベルの分析](https://amplitude.atlassian.net/wiki/spaces/MTH/pages/1811480577)を参照してください。
* userProperty - 各処置に露出するユーザーを識別するAmplitudeのユーザープロパティ。バリアントをチャートのセグメントに変換する際に、セグメント条件を構築するために使用されます。詳細は、[露出トラッキング - Amplitude開発者センター](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/)をご覧ください。
* 指標 - 検定方向、MDE、イベント、分析タイプを含む指標オブジェクトの配列。
* experimentStartDate - 実験の開始日。
* experimentEndDate - 日付ピッカーの終了日、または実験がまだ実行中の場合は今日の日付。
* exposureEvent - 露出イベントと実験のフィルタ。実験がデフォルトのAmplitude露出イベントを使用するように設定されている場合、イベントタイプは必ず*「[Experiment]露出」*になります。露出イベントの詳細は、[露出トラッキング - Amplitude開発者センター](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/#exposure-event)を参照してください。
