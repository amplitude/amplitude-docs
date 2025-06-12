---
id: 607a4250-16fb-4b17-9782-3355b5a40426
blueprint: japanese_translation
title: Amplitudeへのシングルサインオン（SSO）
title_en: 'Single sign-on (SSO) to Amplitude'
source: 'https://help.amplitude.com/hc/ja/articles/360002534392'
---
**シングルサインオン**（SSO）は、ユーザーが単一のIDとパスワードの組み合わせを使用して、複数のプラットフォーム、サービス、またはシステムにログインできるようにする認証スキームです。 AmplitudeはSSOをサポートし、以下のSAML 2.0準拠SSOプロバイダーと互換性があります：

* [Auth0](/docs/admin/single-sign-on/auth-0)
* [G Suite](/docs/admin/single-sign-on/g-suite)
* [Microsoft Azure Active Directory](/docs/admin/single-sign-on/azure-active-directory)
* [Okta](/docs/admin/single-sign-on/okta)
* [OneLogin](/docs/admin/single-sign-on/one-login)

クリックするだけで、これらの各サービスでのSSOのセットアップと構成に関する詳細な情報を参照できます。

**注：**SSOは現在、[スカラシップ](https://help.amplitude.com/hc/en-us/articles/360053028152)、[グロース、エンタープライズ](https://amplitude.com/pricing)の各プランでのみご利用いただけます。

注意すべきいくつかのこと：

* SSOにサインインするように、組織のメンバーに**要求**できます。 これを行うと、ユーザーは電子メールとパスワードを使用してサインインできなくなります。そのため、AmplitudeでSSOシステムをオンにする前に、SSOシステムが動作していて、適切に設定がされているかを確認してください。
* ジャストインタイムプロビジョニングを介して、新しいユーザーに組織へのアクセス権を**自動的に**付与することもできます。Amplitudeでは、新しいユーザの場合にのみ、IDプロバイダで正常認証する必要があります。認証を受け付けた上で、Amplitudeはユーザーを組織に追加します。その後、各新しいユーザのニーズや組織のニーズを反映するように、ロールを設定できます。プロジェクトの[権限](/docs/admin/account-management/user-roles-permissions)にアクセスする  
  
エンタープライズのお客様であれば、JITプロビジョニングユーザーがアクセスできるデフォルトプロジェクトを選択することもできます。
* ユーザーがSSOを使用してサインインしようとすると、Amplitudeは、SAMLアサーションで電子メールアドレスを使用してユーザーを識別します。 Amplitudeは、次の順序でこれらの場所を見て、ユーザーのメールアドレスを見つけることを試みます：

1. アサーションの課題
2. メールクレーム属性（`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`）
3. 「emailaddress」属性（大文字小文字を区別しない）
4. 「メール」属性（大文字小文字を区別しない）

有効なメールアドレスが見つからない場合、ユーザーはAmplitudeにログインできません。
