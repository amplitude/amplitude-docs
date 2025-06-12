---
id: 227b32b8-45b3-442b-a68e-584364d7b831
blueprint: japanese_translation
title: 設定ページ
title_en: 'Settings page'
source: 'https://help.amplitude.com/hc/ja/articles/235649848'
---
![settings_icon.png](/docs/output/img/jp/settings-icon-png.png) アイコンをクリックすると、設定ページにアクセスできます。ページにはあなたの組織内の全ユーザーがアクセスできますが、設定を変更できるのは組織のアドミンとマネージャーのみです。設定ページ内では、組織単位の設定、あなたのAmplitudeの個人設定などが確認できます。

設定ページからは、以下の作業が行えます。

* [組織やプロジェクトの作成](/docs/admin/account-management/manage-orgs-projects)
* [ユーザーの管理](/docs/admin/account-management/manage-users)と権限の付与
* [利用レポート](/docs/admin/billing-use/usage-reports)ダッシュボードの確認
* 受信するメールやSlack[通知](#h_7f25f4ca-7b76-4a0b-98e1-913d99a89252)を管理します。
* [ユーザープライバシーに関する通知](/docs/admin/account-management/manage-notifications)の設定（アドミンの場合）
* [アイデンティティプロバイダ、SSO、プロビジョニング](/docs/admin/single-sign-on/sso)設定の管理（アドミンの場合）
* あなたの組織がAmplitudeで生成する[コンテンツへのアクセス制御](/docs/analytics/share-external)（アドミンの場合）

それぞれのタスクの詳細については、関連するヘルプセンターの記事へのリンクをクリックしてください。

この記事では、一般ページと*個人設定*セクションで利用できる機能や情報についてご説明します。

## 一般設定の情報

一般ページにはあなたの組織の名称、組織ID、組織URL、プランの種別が表示されます。

グロースとエンタープライズのお客様は、契約開始日と終了日、イベントの制限（イベントボリューム上限）、今月見られたイベント、先月見られたイベントなどの追加情報も表示されます。これによって、Amplitude内からイベントボリュームの使用量をトラックしやすくなります。

イベント上限のアラートはアドミンのみが確認できます。イベントボリュームがイベント上限の80%、90%、100%、110%に達した時に、メールでアラートが届きます。

![settings_1.png](/docs/output/img/jp/settings-1-png.png)

## プロファイル

プロファイルページには、固有の情報が表示されます。また、Slackとのインテグレーションを設定管理したり、特定の設定を行うこともできます。

プロフィールパネルにはAmplitudeアカウントに紐づけられている組織、役割、メールアドレス、名前、パスワードが表示されます。表示名の変更、またはパスワードを更新する場合はクリック![pencil.png](/docs/output/img/jp/pencil-png.png)してください。

![Settings_2.png](/docs/output/img/jp/settings-2-png.png)

サイト設定パネルには、Amplitudeエクスペリエンスをカスタマイズするために使用できる一連のトグルがあります。ほぼ説明なしでも簡単にお使いいただけるかと思います。

![Settings_3.png](/docs/output/img/jp/settings-3-png.png)

「エクスポートの際、常に先行空白スペースを削除」オプションは、Amplitudeにエクスポートするセルの先頭の空白スペースを削除するように指示します。CSV。デフォルトの設定では、これらのスペースはそのままにされるため、データが乱れたり、より重大なデータエラーが発生する可能性もあります。この設定は正の値には機能しますが、`＝`、`＋`、`ー`、または`＠`で始まる値には機能しません。

このオプションを無効のままにする場合は、後からExcelやGoogle Sheetsのテキストを列へ変換する機能を使用して、これらのスペースを削除する必要があります。

詳細は[AmplitudeにおけるSlackインテグレーション管理方法](/docs/analytics/integrate-slack)に関するヘルプセンターの記事をご参照ください。

## 通知

通知エリアでは、Amplitudeの[コラボレーション機能](/docs/analytics/charts/chart-basics)に関するSlackやメールの通知設定を変更することができます。ここでは、あなた、組織、またはスペースに関する通知を有効または無効に設定することができます。

![new_notifications.png](/docs/output/img/jp/new-notifications-png.png)

## 年間レビュー

年間レビューでは、選択した年の活動記録のまとめが表示されます。使用した日数、実行したクエリの数、作成したチャートやダッシュボードの数で仕事の概要を示します。あなたのコンテンツの主なフォロワーやあなたがフォローしたコンテンツの主な作成者の簡単なまとめも含まれます。

![settings_4.png](/docs/output/img/jp/settings-4-png.png)

[トップに戻る](/docs/admin/account-management/account-settings)
