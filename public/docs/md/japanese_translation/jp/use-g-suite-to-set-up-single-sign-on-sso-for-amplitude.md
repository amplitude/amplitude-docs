---
id: bcf74473-a67f-44b5-94e0-499ba0830b78
blueprint: japanese_translation
title: 'G Suiteを使用してAmplitudeのシングルサインオン（SSO）を設定する'
title_en: 'Use G Suite to set up single sign-on (SSO) for Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/360002564052'
---
Amplitudeは、スカラシップ、グロース、エンタープライズの各プランのお客様に、G Suiteとのシングルサインオン統合を提供します。

## 開始する前に

SSOの一般的な情報については、[AmplitudeのSSOに関するヘルプセンターの記事](/docs/admin/single-sign-on/sso)を参照してください。

SSOを設定するには、組織におけるAmplitudeの組織アドミンである必要があります。G Suite組織のアドミンでもある必要があります。また、組織にログインするときに適用される要件であるSSO設定を構成する必要があります。

## G Suiteを使用してAmplitudeのSSOを設定する

G Suiteを使用してAmplitudeのSSOを構成するには、次のステップに従ってください：

1. G Suite[アドミンコンソール](https://admin.google.com/)で、*アプリ*に移動し、*SAMLアプリ*カードをクリックします。

![an_gsuite_1_apps.png](/docs/output/img/jp/an-gsuite-1-apps-png.png)
2. ***[+]***ボタン（左下隅）をクリックして、SAMLアプリを追加します。

![an_gsuite_2_add_app.png](/docs/output/img/jp/an-gsuite-2-add-app-png.png)
3. モーダルで、*[自分のカスタムアプリを設定する]*をクリックします。

![an_gsuite_3_custom_app.png](/docs/output/img/jp/an-gsuite-3-custom-app-png.png)
4. 「オプション2」で、*[ダウンロード]*をクリックして、IDPメタデータをダウンロードします。

![an_gsuite_4_download_metadata.png](/docs/output/img/jp/an-gsuite-4-download-metadata-png.png)
5. Amplitudeのメタデータファイルを、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[組織を設定] > [アクセスとSSO設定]*にアップロードし、変更を保存します。

![SSO](/docs/output/img/jp/sso.png)
6. G Suiteに戻り、アプリ作成プロセスを続行します。 名前と説明を入力し、必要に応じて、簡単に認識できるようにロゴをアップロードします。

![an_gsuite_6_name.png](/docs/output/img/jp/an-gsuite-6-name-png.png)
7. 次に、「ACS URL」と「Entity ID」のプロンプトが表示されます。  
  
![an_gsuite_7_sp_details.png](/docs/output/img/jp/an-gsuite-7-sp-details-png.png)

Amplitude SSO設定で、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[組織を設定] > [アクセスとSSO設定]*に移動するだけで、Entity IDとアサーションコンシューマーサービスURLを確認できます。

![SSO](/docs/output/img/jp/sso.png)
8. 最後に、Google Adminで、*[完了]*をクリックしてアプリを保存し、SSOを有効にします。

![an_gsuite_8_attributes.png](/docs/output/img/jp/an-gsuite-8-attributes-png.png)

**注**：G Suite管理のジャストインタイム（JIT）プロビジョニング設定に関する情報は[こちら](cloud.google.com/identity/solutions/automate-user-provisioning)で確認できます。設定をセットアップして検証するときに、短い「設定期間」がある場合があります。 ユーザー側で403エラーが発生している場合は、1日待ってからもう一度、JITを試してください。 
