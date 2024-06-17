---
id: cd98c345-63c3-4dee-af61-3f0a07d1f9e3
blueprint: japanese_translation
title: プロパティのデータ型を設定または変更する
title_en: 'Set or change the data type of a property'
source: 'https://help.amplitude.com/hc/ja/articles/17050314884635'
---
イベント値とユーザープロパティ値のタイプチェックを使用するため、Amplitudeは、受信したイベントデータが指定されたデータ型と一致しない場合に検出できます。イベントまたはユーザープロパティのデータ型を設定・編集できます（例：文字列から論理型）。これは、データと分析が時間とともに変化および拡張するときに役立ちます。

ユーザープロパティのデータ型を編集するには、次のステップに従ってください：

1. プロパティ名をクリックして、詳細パネルを開きます。
2. *[Type]*（データ型）ドロップダウンからプロパティの新しいデータ型を選択します。オプションは次のとおりです：

* * `String`（文字列）：文字列値
	* `Number`（数値）：数値（例：12345）
	* `Boolean`（論理型）：真偽を表す値（"true"/ "false", "yes" / "no", "0" / "1"）
	* `Array`（配列）
	* `Enum`（列挙型）：可能な値のセットの1つ。（例：プロパティ「果物」は、[りんご, バナナ, いちご]のいずれか1つ）
	* `Const`（定数）：定数として設定されます。
	* `Any`：すべての値