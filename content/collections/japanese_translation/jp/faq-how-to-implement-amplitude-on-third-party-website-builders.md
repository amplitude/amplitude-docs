---
id: 3c4aabcc-56bd-4183-981e-d79bf41043d0
blueprint: japanese_translation
title: FAQ：AmplitudeをサードパーティのWebサイトビルダーに実装する方法
title_en: 'FAQ: How to Implement Amplitude on Third-Party Website Builders'
source: 'https://help.amplitude.com/hc/ja/articles/360044374851'
---
たとえWebサイトがネイティブに構築されておらず、Wix、Squarespace、ShopifyなどのようなサードパーティのWebサイトビルダーに構築されている場合でも、そのWebサイトのヘッダーや基礎となるソースコードにアクセスできる限り、AmplitudeのJavascript SDKを実装化してイベントをトラックすることが可能です。それ以外の場合は、AmplitudeのHTTP APIを活用して、Webhookを使用することでサーバーサイドにデータを送ることができるはずです。

この記事では、サードパーティのWebサイトビルダー、特にこれまでのところ最も一般的なプラットフォームであるWixとSquarespaceでAmplitudeをインストルメント化する際のベストプラクティスをご紹介します。

ネイティブに構築されたWebサイトと同様に、ほとんどのサードパーティのWebサイトビルダーは、利用可能な基礎となるコードベースを用意しています。ネイティブに構築されたWebサイトにSDKを追加するように、AmplitudeのJavascript SDKをそのスペースに追加します。多くの場合、JS SDKスニペットをヘッダーに、残りのJS SDKコードをボディに追加する必要があります。

また、プロバイダーが[Webhook](https://en.wikipedia.org/wiki/Webhook)を用意しているかどうかも確認することができます。もし用意されている場合は、Amplitudeのサーバー側エンドポイントであるHTTP v2へのHTTPターゲットとイベントや自動化を組み合わせるために使用することができます。

**注：**これらの説明は、ここで例として挙げられているサードパーティプラットフォームの変更やアップグレードに伴い、陳腐化する可能性があります。Amplitudeのサポートチームは、この記事に含まれる手順とプロセスのみをサポートしており、ここに含まれていないご提案をすることはできません。

## Wix

Wixにはトラッキングツールとアナリティクス機能があり、AmplitudeのJS SDKスニペットとコードをサイトに埋め込むことができます。

そのためには、次のステップに従ってください。

1. サイトのダッシュボードにある[*設定*](https://www.wix.com/my-account/site-selector/?buttonText=Manage%20Settings&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https://www.wix.com/dashboard/%7B%7BmetaSiteId%7D%7D/manage-website)に移動します。
2. *詳細設定*の下にある*トラッキングとアナリティクス*タブをクリックします。
3. *+ 新規ツール*をクリックし、*カスタム*を選択してください。
4. カスタムコードの設定
	1. カスタムコードを入力します。
	2. 該当するドメインを選択してください。このオプションは複数のドメインが設定されている場合にのみ表示されます。
	3. カスタムコードの名称を入力します。
	4. ページにコードを追加します：コードを追加するページを選択します。
		* すべてのページ：ドロップダウンをクリックし、*コードを一度読み込む*、または[*新しいページごとにコードを読み込む*](https://support.wix.com/en/article/custom-code-loading-options)のいずれかを選択します。
		* 特定のページの選択：該当するページ名を入力します。次に、該当するページの横にあるチェックボックスをクリックします。
	5. コードの配置：コードスニペットをサイトのコードのどこに配置するかを選択します。
		* ヘッド：アナリティクスをトラッキングしたいすべてのページで、[JS SDKインストールのスニペット](https://developers.amplitude.com/docs/javascript#installing-the-snippet)を配置する場所になります。
		* ボディ：他のすべてのコール - [ログイベント](https://developers.amplitude.com/docs/tracking-events)、[ユーザープロパティ](https://developers.amplitude.com/docs/setting-user-properties) - はここに配置してください。
5. *適用*をクリックします。

Wixでは、ヘッダースクリプトを追加することはできますが、ヘッダースクリプトから関数を呼び出すことはできないというお客様もおられます。回避策の1つとして、必要なスクリプトをパブリックフォルダに置くことをご提案します。

### Wixに関する詳細情報

<https://support.wix.com/en/article/about-tracking-tools-analytics><https://support.wix.com/en/article/embedding-custom-code-to-your-site>

## Squarespace

Squarespaceのコードインジェクションとコードブロック機能を使用することで、AmplitudeのJS SDKスニペットとコードをサイトに埋め込むことができます。

**注：**これらの機能は、ビジネスとコマースプランでのみ利用可能なプレミアム機能である場合があります。

### コードインジェクション

コードインジェクションを使用して、AmplitudeのJS SDKインストールスニペットや、注文確認ページのようなサイトの特定箇所を強化するその他のスクリプトを追加します。

JavaScriptをコードインジェクションフィールドに追加するには、コードを <script></script> タグで囲んでください。サイト全体のコードインジェクションとページごとのコードインジェクションの選択肢があります。ページごとのコードインジェクションオプションについては、こちらのページを参照してください。コードインジェクションにコードを追加する場合、Squarespaceは、[サイトの編集中はコードを無効にする](https://support.squarespace.com/hc/articles/205815908#toc-disable-scripts-in-preview)ように求めてくることがあります。

次に、以下の手順に従ってコードインジェクションにJS SDKインストールスニペットを追加します。

1. コードインジェクションを開きます。*ホーム*メニューから、*設定**> 詳細 >**コードインジェクション*に移動してください。
2. ヘッダー、フッター、ロックページ、注文確認ページの適切なコードインジェクションフィールドにJS SDKコードを追加します。
	* ヘッダー：ここに追加されたコードは、サイト内のすべてのページの <head> タグに織り込まれます。**ここにAmplitude JS SDKインストールスニペットが配置されます。**
	* その他の3つの選択肢については、[こちら](https://support.squarespace.com/hc/en-us/articles/205815908)をご覧ください。
3. コードを追加したら、*保存*をクリックします。

### コードブロック

コードブロックを使用して、logEvent、ユーザープロパティなどの呼び出し設定を行います。JavaScriptをコードブロックフィールドに追加するには、コードを <script></script> タグで囲んでください。

コードブロックを追加するには、次のステップに従ってください。

1. ページまたは投稿を編集し、挿入ポイントをクリックして、メニューからコードを選択します。詳しくは、[ブロックを使ったコンテンツの追加](https://support.squarespace.com/hc/articles/206543757)をご覧ください。
2. テキストフィールドに[コードを追加してください](https://support.squarespace.com/hc/en-us/articles/206543167#toc-add-code)。イベントとプロパティの呼び出しについては、[SDKの使用方法](https://developers.amplitude.com/docs/tracking-events)に関するドキュメントを参照してください。
3. コードブロックを使って[コードスニペット](https://support.squarespace.com/hc/en-us/articles/206543167#toc-display-source)を表示する場合は、*ソースを表示*にチェックを入れます。
4. *適用*をクリックして、変更を保存してください。
