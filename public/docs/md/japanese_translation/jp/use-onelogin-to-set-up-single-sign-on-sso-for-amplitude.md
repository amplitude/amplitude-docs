---
id: a6e98288-f1cd-413c-b3b6-902ca405c150
blueprint: japanese_translation
title: OneLoginを使用してAmplitudeのシングルサインオン（SSO）を設定する
title_en: 'Use OneLogin to set up single sign-on (SSO) for Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/360002583351'
---
Amplitudeは、スカラシップ、グロース、エンタープライズの各プランのお客様に、OneLoginとのシングルサインオン統合を提供します。

## 開始する前に

SSOの一般的な情報については、[AmplitudeのSSOに関するヘルプセンターの記事](/docs/admin/single-sign-on/sso)を参照してください。

SSOを設定するには、組織におけるAmplitudeの組織アドミンである必要があります。OneLoginで組織を構成できるようにする必要があります。

## OneLoginを使用してAmplitudeのSSOを設定する

OneLoginを使用してAmplitudeのSSOを構成するには、次の設定ステップに従ってください：

1. OneLoginで、*[アプリ]*ドロップダウンメニューから、*[アプリを追加]*をクリックします。

![an_onelogin_1_add_app.png](/docs/output/img/jp/an-onelogin-1-add-app-png.png)
2. 検索ボックスに「Amplitude」と入力します。 結果のリストからSAML2.0アプリを選択します。

![an_onelogin_2_find_amp.png](/docs/output/img/jp/an-onelogin-2-find-amp-png.png)
3. *[表示名]*テキストボックスにアプリの名前を入力します。 [保存]をクリックします。

![an_onelogin_3_save.png](/docs/output/img/jp/an-onelogin-3-save-png.png)
4. 新しいアプリの*[設定]*タブを開きます。次に、Amplitudeの組織IDを入力し、*[保存]*をクリックします。

![an_onelogin_4_org.png](/docs/output/img/jp/an-onelogin-4-org-png.png)

組織IDは、AmplitudeのSSO設定で確認できます。それはACS URLの最後に表示されます。

![an_amp_sp_settings.png](/docs/output/img/jp/an-amp-sp-settings-png.png)  
  
5. *[その他のアクション]*メニューから、*[SAMLメタデータ]*をクリックして、メタデータファイルをダウンロードします。

![an_onelogin_5_download_metadata.png](/docs/output/img/jp/an-onelogin-5-download-metadata-png.png)
6. Amplitudeで、![settings.png](/docs/output/img/jp/settings-png.png)*[アクセスとSSO設定]*に移動し、*[メタデータファイルをアップロード]*をクリックして、SAMLメタデータファイルをアップロードします。 必ず*[IDプロバイダ]*として「OneLogin」を選択してください。
7. 変更を保存して、SSOを有効にします。