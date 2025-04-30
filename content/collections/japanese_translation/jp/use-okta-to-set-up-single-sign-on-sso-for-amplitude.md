---
id: e28e233b-08b3-4ece-aeb7-ecdc6ea43410
blueprint: japanese_translation
title: Oktaを使用してAmplitudeのシングルサインオン（SSO）を設定する
title_en: 'Use Okta to set up single sign-on (SSO) for Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/360002583131'
---
Amplitudeは、スカラシップ、グロース、エンタープライズの各プランのお客様に、Oktaとのシングルサインオン統合を提供します。

## 開始する前に

SSOの一般的な情報については、[AmplitudeのSSOに関するヘルプセンターの記事](/docs/admin/single-sign-on/sso)を参照してください。

SSOを設定するには、組織におけるAmplitudeの組織アドミンである必要があります。また、Oktaで組織を構成できるようにする必要があります。

## Oktaを使用してAmplitudeのSSOを設定する

Oktaを使用してAmplitudeのSSOを構成するには、次のステップに従ってください：

1. Oktaで、アドミンダッシュボードに移動し、[アプリケーション]をクリックします。
2. [アプリケーション]ページで、[アプリ統合を作成]をクリックします。  
![image4.png](/docs/output/img/jp/image4-png.png)
3. 表示されたモーダルで、*SAML 2.0*ラジオボタンを選択し、*[次へ]*をクリックします。
4. アプリの名前を入力します。見やすくするために、ロゴをアップロードして表示することもできます。次に、*[次へ]*をクリックします。
5. 次に、SAML設定を構成します。適切なスペースに、シングルサインオンURL（ACS URL）とオーディエンスURL（エンティティID）を入力します。次に、*[アプリケーションユーザー名]*ドロップダウンから、*[メール]*を選択します。

AmplitudeのエンティティIDとアサーションコンシューマーサービスは、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[アクセスとSSO設定] > [シングルサインオン設定]*で確認できます。

![SSO](/docs/output/img/jp/sso.png)

6. アプリが作成されると、識別プロバイダ（**IdP**）メタデータ（Oktaの*[サインオン]*タブにあります）を表示します。

7. メタデータをクリックして、XMLを表示します。 これを.xmlファイルとして保存します（多くのブラウザでは、アクティブページをファイルとして保存でき、.xmlサフィックスを使用できます）。  
  
![image2.png](/docs/output/img/jp/image2-png.png)

8. Amplitudeで、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[組織を設定] > [アクセスとSSD設定]*に移動し、メタデータファイルをアップロードします。
9. 変更を保存して、SSOを有効にします。