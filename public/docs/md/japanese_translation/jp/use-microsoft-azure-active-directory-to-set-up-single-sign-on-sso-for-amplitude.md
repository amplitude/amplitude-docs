---
id: 66b14bc9-84a2-4ec4-b125-960444b606ea
blueprint: japanese_translation
title: 'Microsoft Azure Active Directoryを使用してAmplitudeのシングルサインオン（SSO）を設定する'
title_en: 'Use Microsoft Azure Active Directory to set up single sign-on (SSO) for Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/360002581311'
---
Amplitudeは、スカラシップ、グロース、エンタープライズの各プランのお客様に、Microsoft Azure Active Directoryとのシングルサインオン統合を提供します。

## 開始する前に

SSOの一般的な情報については、[AmplitudeのSSOに関するヘルプセンターの記事](/docs/admin/single-sign-on/sso)を参照してください。

SSOを設定するには、組織におけるAmplitudeの組織アドミンである必要があります。Microsoft Azureで組織にAzure Active Directoryを構成することもできます。

## Microsoft Azure Active Directoryを使用してAmplitudeのSSOを設定する

Azure Active Directoryを使用してAmplitudeのSSOを構成するには、次のステップに従ってください：

1. Azure[ポータル](https://portal.azure.com)から、Azure Active Directoryセクションに移動します。

![an_azure_1_aad.png](/docs/output/img/jp/an-azure-1-aad-png.png)
2. *エンタープライズアプリケーション*サブセクションを開きます。

![an_azure_2_enterprise_apps.png](/docs/output/img/jp/an-azure-2-enterprise-apps-png.png)
3. *[+ 新しいアプリケーション]*をクリックして、新しいアプリケーションを追加します。

![an_azure_3_new_app.png](/docs/output/img/jp/an-azure-3-new-app-png.png)
4. アプリギャラリーでAmplitudeを検索します。 結果リストからAmplitudeを選択し、アプリサマリーの右下にある*[追加]*をクリックします。

![an_azure_4_gallery.png](/docs/output/img/jp/an-azure-4-gallery-png.png)
5. *[シングルサインオン]*をクリックし、SSOアプリ設定を開きます。 次に、適切なテキストフィールドに識別子と返信URLを入力します。

![an_azure_6_settings.png](/docs/output/img/jp/an-azure-6-settings-png.png)

これらは、AmplitudeのSSO設定の*エンティティID*と*アサーションコンシューマーサービスURL*の下にそれぞれ見つけることができます。

![スクリーン](/docs/output/img/jp/sukurin.png)  
  
6. *ユーザー識別子*フィールドで、ドロップダウンリストから*user.mail*を選択します。

![an_azure_7_user_identifier.png](/docs/output/img/jp/an-azure-7-user-identifier-png.png)
7. 変更を保存します。 次に、メタデータ*XML*をクリックして、メタデータファイルをダウンロードします。

![an_azure_8_download_metadata.png](/docs/output/img/jp/an-azure-8-download-metadata-png.png)

8. Amplitudeで、![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)*[組織を設定] > [アクセスとSSD設定]に*移動し、メタデータファイルをアップロードします。 *IDプロバイダ*として「Microsoft Azure Active Directory」を選択するようにしてください。
9. 変更を保存して、SSOを有効にします。