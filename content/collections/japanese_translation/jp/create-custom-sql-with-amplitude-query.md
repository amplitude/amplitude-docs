---
id: 5b180819-47e3-49b8-b0d8-2ac0110a76d2
blueprint: japanese_translation
title: 'Amplitude QueryでカスタムSQLを作成する'
title_en: 'Create custom SQL with Amplitude Query'
source: 'https://help.amplitude.com/hc/ja/articles/115001902492'
---
#### この記事のテーマ：

* カスタムSQLを使用してSnowflakeデータベースを検索する

Amplitude Queryプロダクトアドオンを使用すると、Amplitudeが管理する[Snowflake](https://www.snowflake.net/)データベースを介して生データを検索できます。データは、30分ごとにSnowflakeに読み込まれます。Queryには、Amplitude SQLと呼ばれる新しい強力なチャートタイプも含まれています。この機能により、Amplitude Platform内でAmplitudeデータに対して直接カスタムSQLを作成することができます。

**注**：Queryプロダクトアドオンを購入したエンタープライズプランおよびグロースプランユーザーのみがご利用いただける機能です。

## Queryを使ってみる

Amplitude SQLへは、他のチャートタイプと同様に、*[Create New]（新規作成） > [Chart]（チャート） > [All chart types]（すべてのチャートタイプ）*からアクセスできます。このチャートタイプの使用方法について詳しくは、以下の[Amplitude SQLセクション](#h_e5e302b5-46ed-460b-9bff-41e725f4c25e)を参照してください。

または、SQL Workbenchなどのターミナルまたはサードパーティアプリケーションを介してSnowflakeデータベースに直接接続することもできます。Snowflakeも、[ここで](https://docs.snowflake.net/manuals/user-guide/python-connector.html)Pythonのコネクタを提供しています。Snowflakeの資格情報については、[こちら](https://help.amplitude.com/hc/en-us/requests/new)からお問い合わせいただくか、サクセスマネージャーにお問い合わせください。

**注：**この機能は、Queryアドオンを購入したエンタープライズおよびグロースユーザーのみがご利用いただけます。

## Queryスキーマの説明

### テーブルの命名法

Queryパッケージは、SnowflakeとAmplitude SQL用の簡略化されたテーブルスキーマを使用します。Amplitude SQLは、特定プロジェクトの省略形`$events`を使用して参照できる単一のテーブルスキーマを使用します。他のテーブルにアクセスする場合は、*Show Schema*（スキーマを表示）をチェックすると表示されるフルネームを使用します。

`$events`テーブルは、[統合されたユーザー](/docs/cdp/sources/instrument-track-unique-users)のマッピングを自動的に処理しますが、統合されたユーザーテーブルのスキーマは、`$events`のスキーマの下でも利用可能になります。これは、1つに統合されたユーザー数を表示したい場合に役立ちます。

![Screen_Shot_2019-10-30_at_09.59.54.png](/docs/output/img/jp/screen-shot-2019-10-30-at-09-59-54-png.png)

Queryの主な利点の1つは、テーブル列を無制限に作成できることです。カスタムユーザープロパティとイベントプロパティは、[バリアント](https://docs.snowflake.net/manuals/sql-reference/data-types-semistructured.html#variant)として保存され、個々の列として検索できます。カスタムユーザープロパティは、接頭辞`user_properties:`が付きます。イベントプロパティは、すべてに接頭辞`event_properties:`が付きます。

**注**：ユーザーまたはイベントプロパティにピリオドまたはスペースが含まれている場合は、プロパティの名前を引用符で囲む必要があります（例：`user_properties:"first name"`）。

特定の値を検索する場合は、一重引用符でプロパティの値を囲む必要があります（例：`user_properties:"plan type"='enterprise'`）。

### 列スキーマ

**`$events`テーブル**

| **列** | **説明** |
| --- | --- |
| $amplitude\_id*番号(38、0)* | ユーザーの元のAmplitude ID。このフィールドを使用して、マージされたユーザーを自動的に処理します。
2234540891 |
| adid*VARCHAR(16777216)* | （Android）Google Playサービス広告ID（広告ID）。これは通常、取り込み後に消去されるため、空白になります
"AEBE52E7-03EE-455A-B3C4-E57283966239"  |
| amplitude\_attribution\_ids | 内部目的のために保存される広告IDの匿名化されたハッシュ。ユーザーにとっては一切有用なものではありませんが、広告IDが送信された場合はこれが表示されます。そのため、現在削除されていても、adid/idfvが存在したことがわかります。 |
| amplitude\_event\_type*VARCHAR(16777216)* | Amplitudeが生成するイベントに基づくAmplitudeの特定の識別子。これはレガシーフィールドであるため、event\_typeはすべてのクエリで十分でなければなりません。 |
| amplitude\_id*番号(38、0)* | ユニークユーザー数をカウントするために使用される内部ID。1234567890 |
| app*番号(38、0)* | プロジェクトの[設定ページ](https://help.amplitude.com/hc/en-us/articles/235649848#projects)に表示されるプロジェクトID。123456 |
| city*VARCHAR* | 市。
"San Francisco" |
| client\_event\_time*タイムスタンプ* | デバイスがイベントを記録した時刻を示すローカルタイムスタンプ（UTC）。2015-08-10T12:00:00.000000 |
| client\_upload\_time*タイムスタンプ* | デバイスがイベントをアップロードした時刻を示すローカルタイムスタンプ（UTC）。2015-08-10T12:00:00.000000 |
| country*VARCHAR* | 国。"United States"  |
| データ*VARIANT* | first\_eventとmerged\_amplitude\_idなどの特定のフィールドが保存されている辞書。 |
| device\_brand*VARCHAR(16777216)* | デバイスのブランド名。"Apple" |
| device\_carrier*VARCHAR(16777216)* | デバイスキャリア。「Verizon」 |
| device\_family*VARCHAR(16777216)* | デバイスファミリー。"Apple iPhone" |
| device\_id*VARCHAR(16777216)* | デバイス固有の識別子。「C8F9E604-F01A-4BD9-95C6-8E5357DF265D」 |
| device\_manufacturer*VARCHAR(16777216)* | デバイスメーカー。"Apple" |
| device\_model*VARCHAR(16777216)* | デバイスモデル。"iPad Mini" |
| device\_type*VARCHAR(16777216)* | デバイスタイプ。"Apple iPhone 5s" |
| dma
*VARCHAR(16777216)* | 指定マーケティングエリア（DMA）。「サンフランシスコ - オークランド - サンノゼ、CA」 |
| event\_id*番号(38、0)* | イベントを区別するカウンタ。1 |
| event\_time*タイムスタンプ* | Amplitudeタイムスタンプ(UTC)は、server\_received\_timeとclient\_upload\_timeの違いによって調整されたclient\_event\_timeで、特に次のようなものです:
event\_time = client\_event\_time + (server\_received\_time - client\_upload\_time)
2015-08-10T12:00:00.000000
このタイムスタンプを使用して、Amplitudeチャートでイベントを整理します。
*注意: server\_received\_timeとclient\_upload\_timeの差が60秒未満の場合、event\_timeは調整されず、client\_event\_timeと同等になります。* |
| event\_type*VARCHAR(16777216)* | 割り当てられたイベントのタイプ。"Add Friend" |
| followed\_an\_identify*BOOLEAN* | この現在のSDKイベントと前回のSDKイベントの間に`識別`イベントがあった場合は、真になります。 |
| groups*VARIANT* | グループタイプ。詳細は、[Accountsのドキュメント](https://help.amplitude.com/hc/en-us/articles/115001765532#account-level-reporting)を参照してください。 |
| idfa*VARCHAR(16777216)* | (iOS)広告主の管理番号。これは通常、取り込み後に消去されるため、空白になります"AEBE52E7-03EE-455A-B3C4-E57283966239" |
| ip\_address*VARCHAR(16777216)* | IPアドレス。"123.11.111.11" |
| location\_lat*FLOAT* | 緯度。12.3456789  |
| location\_lng*FLOAT* | 経度。-123.4567890 |
| os\_name*VARCHAR(16777216)* | OS名。"ios" |
| os\_version*VARCHAR(16777216)* | OSバージョン。"1.0" |
| paying*VARCHAR* | ユーザーが収益を記録した場合は真、そうでない場合は「(none)」になります。プロパティ値は、[Identify API](https://help.amplitude.com/hc/articles/205406617-Identify-API)経由で変更することができます。
true |
| region*VARCHAR* | 地域。「カリフォルニア」 |
| server\_upload\_time*タイムスタンプ* | 当社サーバーがイベントを受け取った時刻を示すAmplitudeタイムスタンプ（UTC）。2015-08-10T12:00:00.000000 |
| session\_id*番号(38、0)* | エポック（紀元）からの経過ミリ秒数で表示されるセッション開始時刻。1396381378123 |
| start\_version*VARCHAR* | ユーザーが最初に追跡されたアプリバージョン。「1.0.0」 |
| user\_creation\_time*タイムスタンプ* | ユーザーの最初のイベントのEvent\_time (UTC)。
2015-08-10T12:00:00.000000 |
| user\_id*VARCHAR(16777216)* | ユーザーによって指定された読みやすいID。"datamonster@gmail.com" |
| uuid*VARCHAR(16777216)* | 行ごとの一意の識別子(送信済みイベント)。
bf0b9b2a-304d-11e6-934f-22000b56058f |
| version\_name*VARCHAR(16777216)* | アプリバージョン。「1.0.0」 |

**統合されたユーザーテーブル**

Amplitudeによるユニークユーザーの追跡方法については、[こちら](https://help.amplitude.com/hc/en-us/articles/115003135607)の記事をご覧ください。

| **列** | **説明** |
| --- | --- |
| amplitude\_id*番号(38、0)* | ユーザーの元のAmplitude IDに統合されているAmplitude ID。 |
| merge\_event\_time*タイムスタンプ* | ユーザーの新しいAmplitude IDが元のAmplitude IDと関連付けられたイベントの時間 |
| merge\_server\_time*タイムスタンプ* | ユーザーの新しいAmplitude IDが元のAmplitude IDと関連付けられたイベントのサーバー時間。 |
| merged\_amplitude\_id*番号(38、0)* | ユーザーが最初に作成されたとき、最初に割り当てられたAmplitude ID。 |

## Amplitude SQLチャートタイプ

Amplitude SQL分析は、他のチャートと同様に、保存、共有、ダッシュボードに追加できます。このチャートタイプでは、独自のAmplitudeデータに対してカスタムSQLクエリを作成できます。

**注：**この機能は現在、[Portfolio Views](/docs/admin/account-management/portfolio)のデータのキューイングをサポートしていません。

### チャート設定

デフォルトでは、日付、ユニークユーザー、過去30日間に実行された総イベント数を返すシンプルなSQLクエリが表示されます。SQL構文がハイライト表示され、SQLコマンドをクエリの他の部分と区別しやすくなっています。

![Screen_Shot_2019-10-30_at_10.01.20.png](/docs/output/img/jp/screen-shot-2019-10-30-at-10-01-20-png.png)

さらに、Amplitude SQLは、テーブル内の列のオートコンプリートをサポートしています。入力中にクエリエディタが列を推奨するため、すばやく入力できます。

![Screen_Shot_2019-10-30_at_10.02.27.png](/docs/output/img/jp/screen-shot-2019-10-30-at-10-02-27-png.png)

### 特殊フィールド

Amplitude SQLは、Amplitudeチャートエクスペリエンスに直接組み込まれているため、日付ピッカーのチャート保存など、多くの使い慣れたユーザーインターフェイスを活用できます。Amplitude SQLの特殊フィールドを強力なショートカットとして利用することで、これを行うことができます。

* **`$date`：**このショートカットを使用する場合、日付ピッカーによって選択された時間範囲が自動的に適用され、時間とともにクエリが更新されます。イベントのイベント時間を参照し、プロジェクトが設定されたタイムゾーンを適用します。それ以外の場合は、Amplitude SQLはUTCでデータを返します。
	* 注：**`$events`**と組み合わせて使用する必要があります。
* **`$events`：**現在のプロジェクトのテーブルを参照するために使用される省略形。このテーブルを使用する場合、[統合されたユーザー](/docs/cdp/sources/instrument-track-unique-users)は自動的に処理されます。
	* 注：**`$date`**と組み合わせて使用する必要があります。
* **`$amplitude_id`：**ユーザーの元のAmplitude ID。このフィールドを使用して、マージされたユーザーを自動的に処理します。

### 検索結果

検索を実行するには、*[Compute]*をクリックします。検索の実行が完了すると、下のデータテーブルに結果が表示されます。データテーブルとCSVエクスポートの結果は、1,000行までに制限されます。さらに、返されたデータを視覚化して、表の下のチャートに表示します。このときに表示できるのは、時系列のみです。

![Screen_Shot_2019-10-30_at_10.03.11.png](/docs/output/img/jp/screen-shot-2019-10-30-at-10-03-11-png.png)

視覚化されたチャートをカスタマイズしたい場合は、クエリエディタの下のコントローラを使用できます。視覚化コントローラで調整できるオプションは、SQLの`SELECT`文で返すフィールドと同じです。例えば、上記のクエリでは、視覚化できる3つのフィールドは、「DATE」、「UNIQUES」、「TOTALS」です。

* **X軸列：**X軸にプロットするものを選択します。現在は、時系列のみがサポートされています。
* **指標列：**SQL `SELECT`文で返されるフィールドを選択すると、Y軸にプロットされます。

![Screen_Shot_2019-10-30_at_10.03.55.png](/docs/output/img/jp/screen-shot-2019-10-30-at-10-03-55-png.png)

### group-bysの適用

列でチャートをグループ化するには、[Label columns]（ラベル列）フィールドに列の名前を入力します。次に、*[Compute]*をクリックします。

![Screen_Shot_2019-05-24_at_4.13.18_PM.png](/docs/output/img/jp/screen-shot-2019-05-24-at-4-13-18-pm-png.png)

### クエリの共有と保存

他のAmplitudeチャートと同様に、*[More]（詳細） > [Export]（エクスポート）*に移動して、結果をPNG、PDF、またはCSVファイルとしてエクスポートできます。さらに、分析を保存してチームと共有したり、作成した視覚化資料をAmplitudeのダッシュボードに追加したりできます。

![Screen_Shot_2019-10-30_at_10.04.39.png](/docs/output/img/jp/screen-shot-2019-10-30-at-10-04-39-png.png)

## Snowflake ETL

Queryアドオンに加えて、有料ユーザーは、[セルフサービスUIにアクセスして、AmplitudeデータをSnowflakeアカウントにエクスポートすることができます。](https://help.amplitude.com/hc/en-us/articles/360059057052-Export-Amplitude-data-to-Snowflake)この機能は、すべての有料Amplitudeプランに含まれ、すべての地域でサポートされています。この機能によって、Amplitudeエンジニアリングのサポートがなくても、データウェアハウスの所有権とプライバシーを維持し、メンテナンス、管理、カスタマイズ作業を自分で行うことができます。

Amplitudeの以前のデータ共有サービスであるSnowflake ETLは、まもなくサービスが終了になります。現在Snowflake ETLを使用している場合は、サクセスマネージャーに連絡して、セルフサービスエクスポートへの移行に関するガイダンスをお聞きください。

この表に、セルフサービスSnowflakeエクスポートの利点をまとめています。

|  |  |
| --- | --- |
| **機能** | 顧客が所有し管理するSnowflakeインスタンスにデータをエクスポートする
データとアクセスに関する完全な制御および編集権限 |
| **アカウント** | snowflakeのリレーションシップとウェアハウスが必要です。 |
| **次のようなお客様に最適です。** | Snowflakeを、他のデータセットの書き込み機能や、編集・アクセス制御とともに、主要なデータウェアハウスとして使用したいお客様。 |
