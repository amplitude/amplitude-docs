---
id: d33c5ddf-2af2-4239-9e6d-8e9352d5d7f2
blueprint: japanese_translation
title: SlackとAmplitudeを統合する
title_en: 'Integrate Slack with Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/227613388'
---
この記事のテーマ：

* SlackとAmplitudeのアカウントを連動させ、Slackでアップデートを受け取る
* Amplitude Dataプロジェクトを設定し、特定のSlackチャネルにアップデートを送信する

Amplitudeの[Slack](https://slack.com/)アプリでは、Amplitudeで新しいコメントをアップデートできたり、チャートやダッシュボード、コホートのリンクを展開し、詳細なプレビューを見たりすることができます。会話しながら、ダッシュボードにチャートを追加したり、サイドバーにダッシュボードをピン止めしたりできます。または、Amplitude Team Spacesと特定のSlackチャネルを連動し、チームが新しい分析を作成したときにいつでも通知を受け取ることができます。

AmplitudeとSlackを連動するには、以下のステップに従うか、SlackアプリストアでAmplitude統合を使用できます。

[![Slackに追加](/docs/output/img/jp/slacknizhui-jia.png)](https://amplitude.slack.com/apps/A02PDFHC1NX-amplitude)

**注：**AmplitudeのEUデータセンターを使用している会社の場合、EUの顧客向けに設計された別のSlackアプリがあります。アプリは、Slackアプリディレクトリの「[Amplitude - EU](https://amplitude.slack.com/apps/A042J2XCRS9-amplitude-eu).」にあります。この[リンクをクリックするか](https://links.amplitude.com/ZFSte8rMWtuwkP5jE/l/0POygAjvJypciVq4d?messageId=6nK7UeyixFZbdLPAQ&rn=&re=gIt92YuUGZ1RXasBXbhB0cul2akVnauYmZlpmI&sc=false)、以下の手順に従ってインストールします。

## Slackと連動する

AmplitudeとSlackを初めて統合する場合、またはSlackエクスペリエンスのために現在のAmplitudeのSlackアプリをアップデートする場合、次のステップに従ってください。

AmplitudeアカウントをSlackに連動するには、次のステップに従ってください：

1. ![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)をクリックします。
2. *[個人設定]*で、*[プロファイル]*をクリックし、*[Slackと連動]をクリックします*。

![integrate_slack_with_amplitude.png](/docs/output/img/jp/integrate-slack-with-amplitude-png.png)

3. 新しく開いたブラウザタブで、 *[許可]*をクリックして、SlackアカウントにAmplitudeへのアクセスを付与します。

![slack_connection.png](/docs/output/img/jp/slack-connection-png.png)

すぐにAmplitudeからSlackメッセージが届きます。これには、統合の使用方法の簡単な説明へのリンクが含まれています。

このプロセスが認証されると、SlackはSlackチャネルとダイレクトメッセージ**（DM）**の両方で、Amplitudeチャート、ノートブック、ダッシュボードへのリンクを自動的に**展開**（またはプレビュー）します。(DMs).

![unfurled_chart_in_Slack.png](/docs/output/img/jp/unfurled-chart-in-slack-png.png)

**注：**Slackでは、[パスファインダー]、[コンパス]、[ペルソナ]チャートを展開しません。

### Amplitude DataプロジェクトとSlackを連動する

また、Slackチャネルをサブスクライブして、Amplitude Dataプロジェクトのトラッキングプラン内で発生したすべてのブランチの変更や、更新の公開をリアルタイム通知できます。以下が含まれます：

* [ブランチの作成]/[削除]/[統合]/[承認]
* [公開バージョン]

これらの通知を受け取るには、更新を受け取りたいAmplitude Dataプロジェクト用にAmplitudeのSlackアプリを設定する必要があります。そのためには、次のステップに従ってください:

1. Amplitude Dataで、*[設定]>[統合]に移動します*。
2. それまでに[Amplitude Slackアプリ](/docs/analytics/integrate-slack)を有効にしていない場合は、SlackワークスペースでAmplitudeの権限を与えるプロンプトが表示されます。このプロジェクトに関する通知を送信するチャネルを指定します。  
  
![slack_for_data.png](/docs/output/img/jp/slack-for-data-png.png)
3. *[追加]*をクリックして、プロセスを完了します。

### リンクプレビューをオンにする

Slackに投稿しても共有可能なリンクが展開されない場合、Slackの設定でリンクプレビューを有効にしていない可能性があります。これを行うには、[Slackのドキュメント](https://get.slack.help/hc/en-us/articles/204399343-Sharing-links-in-Slack)を参照してください。

## SlackでAmplitudeのコメントを直接受け取る

SlackアカウントとAmplitudeを連動すると、Amplitudeのコメントで、あなた宛ての@メンションがある場合、または所有するコンテンツにコメントが残された場合に、Slack通知を受け取ります。

この統合を使用して、分析に関する質問にすばやく回答したり、インサイトを共有したり、メモを自分に残したりすることができます。

![Screenshot_2019-08-05_17.37.06.png](/docs/output/img/jp/screenshot-2019-08-05-17-37-06-png.png)

Slackメッセージ内のコンテンツリンクを使用して、参照されているAmplitudeチャート、ダッシュボード、ノートブックにすばやくアクセスできます。

![Screenshot_2019-08-05_17.36.57.png](/docs/output/img/jp/screenshot-2019-08-05-17-36-57-png.png)

この統合を使用して、リマインダーやメモを自分に残すこともできます。自分のAmplitudeアカウント宛に@メンションするだけで、Slack通知が届きます。

![Screenshot_2019-08-05_17.36.05.png](/docs/output/img/jp/screenshot-2019-08-05-17-36-05-png.png)

## チームスペースと連動する

Amplitudeチームスペースと特定のSlackチャネルを連動し、チームが新しい分析を作成したとき、いつでも通知を受け取ることができます。新しいコンテンツが、そのチームスペースに追加されると、自動的にSlackチャネルに表示されます。チームスペース内で*[Slackと連動]*をクリックして、設定します。

![slack_team_space.gif](/docs/output/img/jp/slack-team-space-gif.gif)

チームスペースとSlackの連動を切断するには、*[チームスペース名に接続中]*と表示される同じボタンをクリックし、*[Slackを切断]を選択します。*
