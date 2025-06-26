---
id: 99119a98-7ab1-4c20-a479-b2a610d5a1e4
blueprint: japanese_translation
title: Amplitudeでユーザープライバシー通知を管理する
title_en: 'Manage user privacy notices with Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/360031965572'
---
#### この記事のテーマ：

* ユーザーデータ削除リクエストのメール通知を設定する

GDPRやその他のユーザープライバシー規制を遵守するために、Amplitudeは、ユーザーデータ削除リクエストを受信したときにメールを送信し処理します。 ユーザーのプライバシー通知を管理することで、各ユーザーが受信するメールの種類を制御できます。

この機能は**プロジェクトレベルで適用**され、使用するにはアドミン権限が必要です。 アドミンは、次の通知タイプを制御できます。

* **ジョブ作成**：リクエスト時の確認メール
* **ジョブ完了**：リクエストが完了したときの確認メール
* **unset違反**：SDKのunsetが完了していないときに送信されるメール
* **すべての通知**：上記のすべて

通知ごとに少なくとも1人の受信者がいる必要があります。

## ユーザーのプライバシー通知を有効にする

特定のユーザーが通知を受信できるようにするには：

1. 1. 管理するプロジェクトに確実にいることを確認し、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[ユーザープライバシー通知]*に移動します。
	2. 現在通知を受信するように設定されているチームメンバーが一覧表示されている表で、通知タイプと頻度を適切なドロップダウンメニューから選択して変更します。
	3. 新しいチームメンバーを通知リストに追加するには、テキストボックスに名前またはメールアドレスを入力し、*[チームメンバーを追加]*をクリックします。
	4. 必要に応じて、組織内の各プロジェクトでこのプロセスを繰り返します。

![manage_user_privacy_notifications.png](/docs/output/img/jp/manage-user-privacy-notifications-png.png)

ユーザープライバシーAPIの詳細情報については、[ユーザープライバシーAPIヘルプセンターの記事](https://help.amplitude.com/hc/en-us/articles/360000398191-User-Privacy-API)と[ユーザープライバシーAPI開発者ドキュメント](https://developers.amplitude.com/#!User-Privacy-API)を参照してください。
