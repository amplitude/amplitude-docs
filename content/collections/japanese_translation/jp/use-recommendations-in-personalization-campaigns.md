---
id: 3391b093-0bfa-4f65-ac09-81cf2035ff39
blueprint: japanese_translation
title: パーソナライゼーションキャンペーンで推奨を使用する
title_en: 'Use recommendations in personalization campaigns'
source: 'https://help.amplitude.com/hc/ja/articles/360059626072'
---
|  |
| --- |
| **この記事のテーマ：*** プロファイルAPIを使用して、推奨をデプロイする
* 結果を理解し分析する
 |

新しい推奨を作成したら、パーソナライゼーションキャンペーンに統合する必要があります。この記事では、プロファイルAPIを使用して、プロセスについて説明します。

## 推奨をデプロイする

推奨をデプロイする主要なデータは、Amplitudeの[**プロファイルAPI**](https://developers.amplitude.com/docs/user-profile-api)です。これは、リアルタイムAPIです。リアルタイムAPIは、ユーザーIDまたはデバイスIDで呼び出すことができます。また、Amplitudeは、ユーザーに関する情報の配列を1秒未満で返します。

*同期*タブに移動し、推奨の宛先として[プロファイルAPI]を選択することで、プロファイルAPIへの推奨アクセスを付与することができます。

### API

プロファイルAPIは、RESTエンドポイントであり、ユーザーIDまたはデバイスIDでクエリ可能です。また、ユーザーごとのJSONレスポンスを提供します：

|  |
| --- |
| `https://profile-api.amplitude.com/v1/userprofile` |

APIを使用する認証を行うには、Amplitudeのプロジェクト設定から**シークレットキー**を使用します（*[設定]→[プロジェクトを選択]→一般*）。

クエリパラメーターは、ユーザーIDと推奨を指定するように設定されています。結果は、JSONレスポンスボディとして返されます。

次の例は、特定のユーザーと推奨の結果を返すことを要求するものです。特定の推奨のIDは、推奨ページの*[詳細]*セクションにあります。

|  |
| --- |
|  `curl -H "Authorization: Api-Key Secret-Key" 'https://profile-api.amplitude.com/v1/userprofile?user_id=myuser&rec_id=s234ssg'` |

このクエリのサンプルレスポンスは次のとおりです：

|  |
| --- |
| {
`"userData": {`
 `"recommendations": [` 
 `{` 
 `"rec_id": "s234ssg",` 
 `"is_control": true,` 
 `"items": ["investing-101", "mortgage-rates-primer", "retirement-goals", "what-is-a-cd", "setting-up-direct-deposit"],` 
 `"recommendation_source": "recommendations_model_v2",` 
 `"last_updated":1.61419226E9` 
 `},` 
 `...` 
        ],
 `"user_id":"myuser",` 
 `"device_id":"bef34a71-62cd-5b2e-af2f-58cd2eabb4d9",` 
 `"amp_props":null`
`}`
} |

このレスポンスには、3つの重要な情報が含まれています：

* `rec_id`：推奨の一意の識別子
* `Is_control`：真/偽の結果。ユーザーが推奨のコントロールまたは処理の状態にあるかどうかを示すもの
* `items`：文字列の配列。このアイテムは、結果を最適化する予測可能性によって命令され、最初の確率が最も高くなります。

また、APIはユーザープロパティ、予測、コーホートメンバーシップを取得するのに使用することができます。次の例は、推奨、すべてのユーザープロパティ、予測、コーホートメンバーシップを取得するリクエストを送信します：

|  |
| --- |
| `curl -H "Authorization: Api-Key Secret-Key" 'https://profile-api.amplitude.com/v1/userprofile?user_id=myuser&rec_id=s234ssg&get_amp_props=true&prediction_id=t456tth&get_cohorts=true'`  |

このクエリのサンプルレスポンスは次のとおりです：

|  |
| --- |
| `{`
`"userData": {`
 `"user_id": "myuser",` 
 `"device_id":"bef34a71-62cd-5b2e-af2f-58cd2eabb4d9",` 
 `"amp_props": {` 
 `"country": "United States",` 
 `"city":"Springfield",` 
 `"first_used":"2019-04-30",` 
 `"language":"English",` 
 `"carrier":"Verizon",` 
 `"last_used":"2021-02-25"` 
 `"plan_type": "starter",` 
 `"device":"samsung samsung SM-N976V",` 
 `"os": "android 30",` 
 `"app_version":"6.1.0",` 
 `"gp:membership_points": "1752",` 
 `"gp:initial_utm_campaign": "abcd",` 
 `"gp:email":"user@example.com",` 
`},`
 `"recommendations": [` 
 `{` 
 `"rec_id": "s234ssg",` 
 `"is_control": true,` 
 `"items": ["investing-101", "mortgage-rates-primer", "retirement-goals", "what-is-a-cd", "setting-up-direct-deposit"],` 
 `"is_control": false,` 
 `"recommendation_source": "recommendations_model_v2",` 
 `"last_updated":1.61419226E9` 
 `},` 
 `...` 
`],`
 `"predictions": [` 
 `{` 
 `"name": "Likelihood to Convert",` 
 `"percentile": 97.5,` 
 `"pred_id": "t456tth",` 
 `"probability": 0.734` 
 `},` 
 `...` 
`],`
 `"cohort_memberships": [` 
 `"u567uui",` 
 `...` 
`]`
`}`
`}` |

### APIを統合する

プロファイルAPIは、顧客のデジタルワークフローに埋め込まれている推奨の拡張性を非常に高めます。そのためには、次のステップに従ってください。

1. APIを呼び出す：
	* * * * * ユーザーIDまたはデバイスIDをパスして、ユーザープロファイルを取得します。
					* ユーザーセッション中にリアルタイムでコールが実行される可能性があります。この場合、返されたユーザープロファイルは、コールが発生した瞬間に最新のものになります。
					* アプリケーション起動時にコールが実行され、ユーザーセッション全体でキャッシュされた場合、コールは適切なときに使用されます。プロファイルAPIは、遅延が少なく、リーズナブルなトラフィックを処理するように設計されていますが、このような場合のキャッシュは、レイテンシーの変動性をさらに低減します。このトレードオフは、結果が最新でない場合があります。ほとんどの場合、キャッシュされた結果は数時間以上有効なままです。そのため、特にレスポンシブンスの最重要課題の場合は通常、これが実行可能なオプションとなります。
					* アプリケーションレベルのシークレットキーは通常、クライアント側のアプリまたはウェブソースコードには**公開されません**。そのため、ユーザーIDと転送リクエストをAmplitudeのAPIに有効化するために、バックエンドまたはプロキシが必要になる場合があります。
2. レスポンスが返された場合、`is_control`の値をチェックして、どの推奨エクスペリエンスを実行するかを決定します：
	* * * * * `false`の場合、推奨ペイロードで`アイテム`を使用します。
					* `true`の場合、ベースラインのプロダクトエクスペリエンスにデフォルトを使用します。`アイテム`は、ランダムに選択したものに投入されます。これはベースラインに適した選択である場合もありますが、そうでない場合もあります。
					* `推奨`ブロックが`null`の場合、またはAPIがエラーを返した場合、ベースラインのプロダクトエクスペリエンスにデフォルトを使用します。これは、ユーザーがAmplitudeにまだ知られていないこと、またはこのユーザーに推奨を提供するのに十分なユーザー履歴がないことのいずれかを意味します。
3. ペイロードから返されたアイテムを社内のCMSまたは機能フラグのシステムにマッチさせ、ユーザーにサービスする項目を示します。
4. APIをデリバリーシステムに統合します。
	* * * * * 社内システムを使用してユーザーにサービスを提供する場合は、通常の配信方法に従ってください。
					* Braze接続のコンテンツでエクスペリエンスを提供する場合、[次の指示に従ってください](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/connected_content/making_an_api_call/#using-basic-authentication)。
					* Movable Inkを介してエクスペリエンスを提供する場合は、[次の指示に従ってください](https://github.com/movableink/Developer-Docs)。

## 結果を分析する

プロファイルAPIが顧客のアプリ、Webサイト、または電子メールチャネルにデプロイすると、Amplitude Audiencesは推奨のパフォーマンスを測定できます。これは、プロファイルAPIがその特定の推奨に呼び出されるたびに、Amplitudeイベント（`[Recs]推奨イベント`）をログすることで実行されます。

**注意：**これはイベントボリュームに対して**カウントされません**

推奨のパフォーマンスを表示するには、関心のある推奨を開き、*[パフォーマンス]*タブをクリックしてください。

ファネルコンバージョンチャートからサマリー統計が表示されます。

* ベースラインに対するリフト
* 推奨コンバージョン率
* コンバージョン率を制御する
* 有意性

Amplitudeは、`1-*p*`の値として「有意性」を定義します。*p*は両側*t*検定で決定されます。 （場合によっては、過去に保存された特定のチャートは、過去の結果の一貫性を維持するために、パフォーマンスを発揮する可能性を示す場合があります。）

このファネルは、**コントロール**セグメントと**処理**セグメントの2つのセグメントを比較します。コントロールセグメントの場合、`recommendations.commendation_control = True`です。処理セグメントの場合は、`recommendations.commendation_control = False`です。

デフォルトファネルは、エクスポージャーイベントと結果イベントの2つのステップで構成されています。必要に応じて、手動で更新できます。これには、時間とともに2つのセグメントの比較が表示されます。

「有意性」列の値をチェックすることにより、コントロールと処理の各セグメントの違いが統計的に有意かどうかを確認できます。

この情報では、各推奨がボトムラインに行った具体的な影響を定量化する必要があります。
