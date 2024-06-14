---
id: e90ac168-ec70-4384-8b94-fdaff102d722
blueprint: japanese_translation
title: Auth0を使用してAmplitudeのシングルサインオン（SSO）を設定する
title_en: 'Use Auth0 to set up Amplitude single sign-on (SSO)'
source: 'https://help.amplitude.com/hc/ja/articles/360002548591'
---
Amplitudeは、スカラシップ、グロース、エンタープライズの各プランのお客様に、Auth0とのシングルサインオン統合を提供します。

## 開始する前に

SSOの一般的な情報については、[AmplitudeのSSOに関するヘルプセンターの記事](/docs/admin/single-sign-on/sso)を参照してください。

SSOを設定するには、組織におけるAmplitudeの組織アドミンである必要があります。組織のAuth0を構成する権限も持つ必要があります。

## Auth0を使用してAmplitudeのSSOを設定する

Auth0を使用してAmplitudeのSSOを構成するには、次のステップに従ってください：

1. Auth0で、*[クライアント](https://manage.auth0.com/#/clients)*ページに移動します。
2. *[+ クライアントを作成]*をクリックして、Amplitudeの新しいクライアントを作成します。 クライアントタイプの指定の心配はありません：Amplitudeが、SAMLを介してAuth0と通信します。

![an_auth0_1clients.png](/docs/output/img/jp/an-auth0-1clients-png.png)
3. *[アドオン]*タブに移動し、SAML2プラグイントグルを「有効」に切り替えます。

![an_auth0_2_addons.png](/docs/output/img/jp/an-auth0-2-addons-png.png)
4. 表示されるモーダルの適切なフィールドに、アプリケーションコールバックURLを入力します。

![an_auth0_3_saml2.png](/docs/output/img/jp/an-auth0-3-saml2-png.png)
5. Amplitude SSO設定で、エンティティIDとアサーションコンシューマサービスURLを確認できます。Amplitudeを開き、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[組織を設定] > [アクセスとSSO設定]*に移動します。

![SSO](/docs/output/img/jp/sso.png)
6. URLを入力し、SAML2設定を保存した後、*[使用状況]*タブを開き、IDプロバイダ証明書メタデータファイルをダウンロードします。
7. Amplitudeのメタデータファイルを![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[組織を設定] > [アクセスとSSO設定]*にアップロードします*。*

![SSO](/docs/output/img/jp/sso.png)
8. 変更を保存して、SSOを有効にします。