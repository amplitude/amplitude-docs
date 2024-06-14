---
id: e0b8a3e0-7ed7-4ee8-9b1b-4c110b40602c
blueprint: japanese_translation
title: アカウントレベルレポートを設定する
title_en: 'Set up account-level reporting'
source: 'https://help.amplitude.com/hc/ja/articles/5332668738331'
---
[アカウントレベルレポート](/docs/analytics/account-level-reporting)を使用する前に、インストルメント化する必要があります。プロセスに関連する特定のステップは、Amplitudeにデータを送信する方法によって異なります。

グループをインストルメント化すると、新しいドロップダウンは、特定のチャートのチャートコントロールパネルの右側モジュールに表示されます。 次に、アカウントレベルレポートを実行し、ユーザーまたはグループによってトリガーされたイベントを表示するかどうかを指定できます。

**注：**Amplitudeには、プロジェクトごとに5つのグループタイプに制限があります。

## SDK

AmplitudeのSDKでアカウントレベルレポートを設定するには、使用しているSDKに応じて、次の特定の指示に従ってください。

* [Android SDK](https://help.amplitude.com/hc/en-us/articles/115002935588#setting-user-groups)
* [iOS SDK](https://help.amplitude.com/hc/en-us/articles/115002278527#setting-user-groups)
* [JavaScript SDK](https://help.amplitude.com/hc/en-us/articles/115001361248#setting-user-groups)

### APIを識別する

Amplitudeサーバーサイドにデータを送信する場合は、識別オブジェクトで`グループ`キーを使用します。 これは、特定のグループの特定のユーザーを関連付けます。 AmplitudeのIdentify APIを介してグループをインストルメント化する方法の詳細については、[APIドキュメントを識別する](https://help.amplitude.com/hc/en-us/articles/205406617-Identify-API-Modify-User-Properties#keys-for-the-identification-argument)を参照してください。

### HTTP API

Amplitudeサーバーサイドにデータを送信する場合は、イベントオブジェクトで`グループ`キーを使用します。 これは、イベントレベルグループ（その特定のイベントにのみ固執するグループ）を追加します。 AmplitudeのHTTP APIを介してグループをインストルメント化する方法の詳細については、[HTTP API](https://help.amplitude.com/hc/en-us/articles/360032842391-HTTP-API-V2)ドキュメントを参照してください。

## セグメント

**注：**Segment<> Amplitudeクラウド（セグメントの[サーバーサイドソース](https://segment.com/docs/sources/#server)または[バンドルされていないクライアントサイド統合](https://help.amplitude.com/hc/en-us/articles/217934128#pros-and-cons)のいずれか）とデバイスモード統合（バンドルされたSegment-Amplitude統合）は、セグメントの[`グループ`コールを通じて、グループタイプとグループプロパティの両方を設定できるようになりました](https://segment.com/docs/spec/group/)。 詳細については、[セグメントドキュメントを参照してください](https://segment.com/docs/connections/destinations/catalog/amplitude/#group)。

セグメントを介してAmplitudeでグループタイプを設定するには、次のAmplitude先設定を有効にし、適切な値を提供する必要があります。

* **グループタイプトレイト：**これは、セグメント`グループ`コールで、目的のグループタイプを含むトレイトを指定します。
* **グループ値トレイ：**これは、セグメント`グループ`コールで、目的のグループ値を含むトレイトを指定します。

例えば、次のコードがある場合：

```
analytics.group("placeholder", {  
    groupType: "org name", // Segment trait "groupType"     groupValue: "Amplitude", // Segment trait "groupValue"    employees: "120" // group property});
```

そして、これは、セグメントのAmplitude先設定で：

![Screen_Shot_2018-06-27_at_3.48.15_PM.png](/docs/output/img/jp/screen-shot-2018-06-27-at-3-48-15-pm-png.png)

次に、統合は、Amplitudeでグループタイプとして組織名を作成し、`org name` = `Amplitude`で現在のユーザーを関連付けます。

**注：**この値はAmplitudeの側で何もマッピングされていないため、グループコールで`groupID`（上記のコードで、`「プレースホルダー」`）として渡す内容は、重要ではありません。

インストルメンテーションコードを介してグループプロパティを設定するには、Segment <> Amplitudeクラウドモード統合（Segmentの[サーバーライブラリ](https://segment.com/docs/sources/#server)と[バンドルされていないクライアントサイド統合](https://help.amplitude.com/hc/en-us/articles/217934128-Segment-Amplitude-Integration#pros-cons-of-client-side-bundled-integration)）を使用して、Segmentで少なくとも1つのソースが必要です。 ユーザープロパティ `[Amplitude] Library = segment`を有するAmplitudeのデータは、クラウドモードインテグレーションを介して送信されます。 このユーザープロパティを使用して、Amplitudeにインストールした統合のタイプを、それぞれのセグメントソースで検証できます。 あるいは、Amplitude SDKの関数を呼び出して、グループプロパティを設定することもできます。

```
analytics.ready(function() {     var groupIdentify = new amplitude.Identify().set('employees', 100);    amplitude.getInstance().groupIdentify('orgId', '1234', groupIdentify);  
});
```

`グループ`コールに渡す追加のトレイトは、Amplitudeにグループプロパティとして表示されます。 例えば、上記のコードから、`従業員`は、Amplitudeでグループプロパティとして設定されます。

![Screen_Shot_2018-06-27_at_3.58.52_PM.png](/docs/output/img/jp/screen-shot-2018-06-27-at-3-58-52-pm-png.png)

セグメントの[`グループ`メソッド](https://segment.com/docs/connections/destinations/catalog/amplitude/#group)を使用して、グループとグループプロパティを設定できます。 このメソッドを介して、すべてのユーザーイベントには、グループが含まれることに注意してください。 つまり、このコールは、イベントレベルグループよりも、ユーザーレベルグループ（`CompanyID`など）を設定する方が適切であることを意味します。

セグメントの[`トラック`コール](https://segment.com/docs/connections/destinations/catalog/amplitude/#setting-event-level-groups-using-track-calls)でグループを設定する場合は、イベントをグループにアサインできますが、コール内でグループプロパティを設定して更新することはできません。グループプロパティを送信するには、セグメント統合の外で、Amplitude [グループ識別API](https://www.docs.developers.amplitude.com/analytics/apis/group-identify-api/ "https://www.docs.developers.amplitude.com/analytics/apis/group-identify-api/")を直接コールします。

セグメントの`トラック`コールを介してグループをアサインするには、セグメント先設定内の*マッピング*タブに移動し、そこでアサインします。

![segment_destination.png](/docs/output/img/jp/segment-destination-png.png)

## グループ識別APIを使用してグループを作成する

グループ識別APIを使用して、すべての期待されるグループプロパティで紐付けられた新しいグループを作成するか、既存のグループのグループプロパティを更新できます。サンプルリクエストでは、パラメータとキーは*イタリック化*されています。下線値は、特に関心のあるパラメータで置き換える必要があるものです。

さらに、グループプロパティ操作（`$set`、`$setOnce`、`$add`、`$append`、`$unset`）は、このグループ識別APIでサポートされています。

**リクエストフォーマット**

**以下二つのリクエストパラメーターと共に、リクエストをPOSTまたはGETを`https://api.amplitude.com/groupidentify`に送信します：**

| パラメータ | **説明** |
| --- | --- |
| api\_key **(必須)** | プロジェクトの[設定ページ](https://help.amplitude.com/hc/en-us/articles/235649848#project-general-settings)からのAPIキー。
"040062a5d38552315b98302ba4f2f" |
| 識別**（必須）** | 単一のJSON識別オブジェクト（フィールドについては、下記を参照してください）。 |

**リクエスト例（単独）**

```
curl --data '*api\_key*=040062a5d38552315b98302ba4f2f'--data '*identification*={"*group\_properties*":{"org csc":"Lucas","org plan":"Enterprise","org owner":"Luis"},"*group\_value*":"1234","*group\_type*":"org id"}' https://api.amplitude.com/groupidentify
```

**リクエスト例（バッチ）**

```
curl --data '*api\_key*=040062a5d38552315b98302ba4f2f'--data '*identification*=[{"*group\_propert*ies":{"org csc":"Lucas","org plan":"Enterprise","org owner":"Luis"},"group_*v*alue":"success","group_t*ype*":"org id"},{"g*roup\_propert*ies":"org csc":"Sarah","org plan":"Growth","org owner":"Sandy"},"g*rou*p_*value*":"1234","group_type":"org id"}]' https://api.amplitude.com/groupidentify
```

**注：**[ここに](https://help.amplitude.com/hc/en-us/articles/204771828-HTTP-API#important-notes)リストされているアップロード制限は、これらのリクエストに適用されます。

**`識別`パラメータのキー**

**次のキーは、JSON識別オブジェクト内で送信できます。`group_type`と`group_value`の両方が必須であることに注意してください。**

| **キー** | **説明** |
| --- | --- |
| group\_type **(必須)**
*文字列* | グループタイプ（例。アカウントまたは会社など）
`org name`, `org id` |
| group\_value **(必須)**
*文字列* | 上記のグループタイプの1つの特定の値。
"group\_type": "org id", "group\_value": "12345678" or "group\_type": "account name", "group\_value": "Acme Corp" |
| group\_properties (オプション)
*辞書* | グループに紐付けられた追加データを表すキーと値ペアの辞書。 各異なる値は、Amplitudeダッシュボードにグループセグメントとして表示されます。
プロパティ値を配列に格納できます。日付値は、文字列値に変換されます。さらに、グループプロパティ操作（`$set`、`$setOnce`、`$add`、`$append`、`$unset`）は、このグループ識別APIでサポートされています。
{"arr": "10000", "cs": ["Justin", "Ben"], "renewal\_date": “01/01/2018" } |

## 
