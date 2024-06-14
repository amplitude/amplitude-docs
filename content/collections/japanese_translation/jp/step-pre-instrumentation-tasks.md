---
id: 3dcb1c1b-f678-4f42-93a8-f7da8aa446e0
blueprint: japanese_translation
title: ステップ：インストルメンテーション前の作業
title_en: 'Step: Pre-Instrumentation Tasks'
source: 'https://help.amplitude.com/hc/ja/articles/206404618'
---
「Amplitudeシリーズを開始する」のステップ1へようこそ。このシリーズは、Amplitudeのデータ構造を順を追って解説し、貴社のプロダクトがAmplitudeに送信する必要があるデータを特定できるようにして、最速かつ最適な方法によるAmplitudeのセットアップを支援することを目的としています。特に、本シリーズで取り扱うテーマは以下の通りです。

0. [イントロダクション＆はじめに](https://help.amplitude.com/hc/en-us/articles/207108137-Introduction-Getting-Started)
1. [インストルメンテーションの事前作業](/docs/get-started/instrumentation-prework)：送信するデータを決定する前に考慮すべきこと
2. [ユーザーの特定](/docs/get-started/identify-users)：プロダクトのユニークユーザーを適切にトラッキングするための要件
3. [イベントデータ](https://help.amplitude.com/hc/en-us/articles/206404698)：トラッキングすべきイベントやユーザーのアクションを特定する方法
4. [ユーザープロパティおよびイベントプロパティ](https://help.amplitude.com/hc/en-us/articles/207108327)：分析の質の向上のために送信すべき属性
5. [プラットフォーム](/docs/get-started/cross-platform-vs-separate-platform)：両者の違いと、どちらの方法を選ぶべきかの説明
6. [AmplitudeとSnowflakeで実際に強力なリソースを体験：](https://help.amplitude.com/hc/en-us/articles/206404718)SnowflakeとAmplitudeを併用し、SQLを介して重要な質問に回答

（Amplitudeのインストルメンテーションを担当される開発者やプロダクトマネージャーの方は、[開発者向けスタートガイド](https://help.amplitude.com/hc/en-us/articles/115000959052-For-Developers-Getting-Started)も合わせてお読みください。）

インストルメンテーションプロセスに進む前に、いくつか行う必要があることがあります。

## インストルメンテーションを始める前に

Amplitudeの使用体験のほとんどは、インストルメンテーションプロセス中に行う決定によって決まります。インストルメンテーションプロセスに直接進む前に数分間、インストルメンテーションを成功させるための基礎について学びましょう。

### ビジネス目標を定義する

これはAmplitudeを最大限に活用するために重要です。ビジネス目標についてより詳しく知るほど（そしてそれらをより良い形で統合するほど）、Amplitudeをそれらの達成に役立てることができます。

そのため、ビジネス目標をできるだけ具体的に特定することから始めましょう。プロダクトのどの側面についてより詳しく理解したいでしょうか。またはどの側面を改善したいでしょうか。例えば、今四半期の目標がユーザーの獲得、ユーザーの維持、有料ユーザーのコンバージョンを改善する可能性を秘めているかも知れません。目標を特定したら、それらの達成のためにどのようなデータまたはイベントが必要かを考えましょう。

### Amplitudeでユーザーがどう特定およびトラックされるかを理解する

ユーザーを適切にトラックしていなければ、必要なものをAmplitudeから得ることはできません。それは単純明快です。インストルメンテーションを始める前に、[Amplitudeが固有ユーザーを特定およびトラックする方法](/docs/cdp/sources/instrument-track-unique-users)に関するヘルプセンターの記事を**お読みください**。

### イベントと関連するプロパティを整理する

各イベントとそれに関連するプロパティを一覧を入力したスプレッドシートを作成します。スプレッドシートの例は次の通りです：  
  
![Screen_Shot_2017-03-20_at_9.34.15_AM.png](/docs/output/img/jp/screen-shot-2017-03-20-at-9-34-15-am-png.png)  
 **イベント名は明確で直感的なものにします**。社内に標準的な命名規則がない場合、次のシンタックスで命名することを推奨します：  
  
動詞 + 名詞（`clicked signup` ）または 名詞 + 動詞（`signup clicked` ）。  
  
イベントのタクソノミーに関するベストプラクティスは[データタクソノミープレイブック](/docs/data/data-planning-playbook)をご覧ください。上のテンプレートを[Excel](https://drive.google.com/file/d/1dIiJrLJXdVNBh6VQ4bcII0THNyEkaooO/view)または[Google Sheets](https://docs.google.com/spreadsheets/d/1-6rXRomzq05YDQ9A6QG9A2i-jez72amPw-Johhd-heQ/view)のスプレッドシートとしてダウンロードします。  

### すべてを急いでトラックしたいという衝動は、実行しないでください

Amplitudeの新規ユーザーによくあることは、できるだけ多くのデータをトラックすれば、より多くのインサイトがより速く生成されると思うことです。しかし、多くの場合はそれと逆のことが当てはまります：データが**多すぎる**ことはデータが**少なすぎる**場合のように、求める回答が不明確になってしまう原因になります。  
  
その代わりに、前のセクションで定義したビジネス目標への回答に不可欠なイベントのみをトラックします。担当チームは、Amplitudeが送信するデータをより容易に理解して使用することができます。顧客からよく聞く話では、新規採用者に教えることが最も難しいことは、Amplitudeプラットフォームそのものではなく、イベントデータが意味することとそれがどのように生成されるか、であるそうです。  
  
当社では1つのイベントに含めるプロパティは20以下にするよう推奨しています。（これはユーザープロパティにも当てはまります。）最終的に必要であると思う場合は、後でいつでもイベントまたはプロパティを追加することができます。

### プラットフォーム横断型のプロジェクトをインストルメント化する

プロダクトが複数のプラットフォーム間で類似し、タクソノミーが一貫している場合は、ウェブとモバイルのデータを同じプロジェクトに組み合わせることをお勧めします。これにより、異なるプラットフォーム間でユーザーがどのように移動しているかを分析できます。タクソノミーが明確に区別される異なるプロダクトは別のプロジェクトにインストルメント化する方が望ましいといえます。[AndroidとiOSのデータまたは複数のアプリを同じAmplitudeプロジェクトに組み合わせることの利点と欠点を評価します](/docs/get-started/cross-platform-vs-separate-platform)。 

## データはAmplitudeのどのように取得されるのか？

Amplitudeにデータを送る方法についての具体的な情報は、こちらをご覧ください。

1. Amplitude SDK：[こちら](https://help.amplitude.com/hc/en-us/articles/205406607-SDKs)のリストをご覧ください。
2. Amplitude [HTTP API](https://help.amplitude.com/hc/articles/204771828)：AmplitudeのHTTP APIを使用して、サーバー側にイベントデータを送信します。
3. Segment.io：詳細については、[Amplitudeとセグメントの統合](https://help.amplitude.com/hc/en-us/articles/217934128-Segment-Amplitude-Integration)に関するヘルプセンターの記事をご覧ください。
4. mParticle：詳細については、[AmplitudeとmParticleの統合](https://help.amplitude.com/hc/en-us/articles/235242107-mParticle-Amplitude-Integration)に関するヘルプセンターの記事をご覧ください。
5. Shopify：詳細については、[AmplitudeのShopifyアプリの開発者ドキュメント](https://developers.amplitude.com/docs/shopify-plugin)を参照してください。

## 次のステップ

次のステップに進む準備ができたら、このリンクをクリックして、[次のステップ：「ユーザーIDの割り当てとユーザーの特定」](/docs/get-started/identify-users)にお進みください。
