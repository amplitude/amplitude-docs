---
id: 9dd191d9-71a4-4d34-8453-d7436a715316
blueprint: japanese_translation
title: 'Amplitude Experimentでのパフォーマンスとスケーリング'
title_en: 'Performance and Scaling in Amplitude Experiments'
source: 'https://help.amplitude.com/hc/ja/articles/360061687371'
---
強力で、インサイトを生成する実験プログラムを実行するには、次の3つのことが必要です。

* 堅牢なIDデータ検証/照合システム
* ユーザーメタデータストアへのアクセス
* 行動コホートへのアクセス

企業で実験プログラムを起動する場合、**Amplitude Experimentにはこの3つがすべて含まれています**。

これらの機能を最大限に活用するには、各ユーザーのAmplitude Experimentのエンドポイントにリクエストしてください。

## 実装の推奨

ユーザーに最高のエクスペリエンスを提供するために、当社は次のことを推奨します。

* **ローカルデフォルトを使用します**。すべてのAmplitude SDKは、実験のローカルデフォルトをサポートしています。Amplitudeのシステムがダウンする可能性が稀にありますが、これに対処するには、すべての実験でローカルデフォルトを使用することをお勧めします。
* **クライアントSDKでローカルストレージ（キャッシュ）を使用します**。Amplitudeのクライアント側のSDKは、ローカルストレージにユーザーバリアントを保存します。これは、クライアントから来るネットワーク呼び出し数の削減に役立ちます。パフォーマンスとキャッシュの詳細については、[こちら](https://www.docs.developers.amplitude.com/experiment/general/performance-and-caching/)をご覧ください。

## アーキテクチャ

Amplitude Experimentアーキテクチャは、2つのコンポーネントに基づいて構築されています。

* **Fastly CDN**。 Amplitudeサーバーに対するすべてのリクエストは、最適なCDNの1つであるFastlyを介してルーティングされます。
* **信頼性の高いホストAWSサービス**。Amplitudeは、アプリケーションロードバランサー、リレーショナルデータベース、およびDynamoDBを使用します。これで可用性が保証されます。

![image1.png](/docs/output/img/jp/image1-png.png)
