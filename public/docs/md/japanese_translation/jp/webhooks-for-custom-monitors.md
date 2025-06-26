---
id: 56e06391-c9af-46be-8184-49cfd913e942
blueprint: japanese_translation
title: カスタムモニターのためのWebhooks
title_en: 'Webhooks for Custom Monitors'
source: 'https://help.amplitude.com/hc/ja/articles/360055808391'
---
#### この記事のテーマ：

* Webhookを設定し、カスタムモニターを割り当てます。
* モニターをSlackのチャンネルに直接投稿します。

Webhookは、何かが起こったときにアプリケーションが送信する自動化されたメッセージです。それらはメッセージ（または**ペイロード**）を含み、ユニークなエンドポイントに送信されます。これらは、APIがデータを投票するのを待つ必要なく、1つのアプリケーションが他のアプリケーションにリアルタイム情報を伝達する効率的な方法です。

[カスタムアラート](/docs/analytics/insights)は、重要なKPIに意味のある変化があったときに通知します。

**カスタムモニター用のWebhook**では、KPIに影響を与える形でユーザーの行動が変更されるたびに、Webhookを使用して、トリガーされたモニターを多くのアプリケーションのエンドポイントに送信することができます。

**注意**：この機能は、エンタープライズプランのお客様とInsightsパッケージのお客様のみ使用できます。

## Webhookを作成および構成する

Webhookを作成し、構成するには、次のステップに従ってください。

1. ![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png) *> [Organizational settings]（組織設定） > [Projects]（プロジェクト）に移動します。*
2. 通知を受け取りたいプロジェクトの名前をクリックします。
3. *[Webhooks]*タブをクリックします。これはWebhookの他、自動およびカスタムモニターを管理する場所です。Webhookのオーナー、マネージャー、アドミンは、Webhookを編集または削除できます。
4. 新規Webhookを作成するには*[+**Create]*（+作成）をクリックします。
5. Webhookに名前を付け、メッセージを送信するエンドポイントのURLを貼り付けます。
6. 下の部分で、構成したエンドポイントに送信するカスタムモニターを選択します。

カスタムモニターを選択したら、*[Send a test message]*（テストメッセージを送信）をクリックしてテストし、エンドポイントでメッセージの表示結果を確認できます。

## モニターをSlackに送信する

Webhookとカスタムモニターの最も一般的なアプリケーションの1つは、トリガーされたモニターをSlackチャンネルに送信することです。

モニターをSlackのワークスペースに投稿するには、Slackのアプリが作成する必要があります。Slackアプリを持っていない場合は、Slackが手順の概要を[こちら](https://api.slack.com/messaging/webhooks#getting_started__1.-create-a-slack-app-if-you-dont-have-one-already)に掲載していますので参照してください。

既存のSlackアプリがある場合は、次のステップに従ってください：

1. Slackで、アプリ[管理ページに移動します。](https://api.slack.com/apps)
2. 自分のアプリをクリックして、[設定]ページにアクセスします。
3. サイドバーの*Incoming Webhooks*をクリックし、*Incoming Webhooks*スイッチをオンに切り替えます。
4. Incoming Webhooksが有効になると、設定ページがリフレッシュされ、追加オプションが表示されます。*ワークスペースに新規Webhookを追加*をクリックします。
5. モニターが投稿するSlackチャンネルを選択し、クリックしてアプリを承認します。アプリの設定ページに戻ります。これで、ワークスペースのWebhook URLセクションの下に新しいエントリが表示されます。Webhook URLは次のようになります:

`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`

6. 生成されたURLをコピーし、AmplitudeのWebhookフローから*URL*フィールドに貼り付けます。

そこにフォームすると、Slackチャンネルに投稿するモニターを選択してURLをテストすることができます。これで、選択したモニターはトリガーされたときにSlackチャンネルにも投稿されます。
