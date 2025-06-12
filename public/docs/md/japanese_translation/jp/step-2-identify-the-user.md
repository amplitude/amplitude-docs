---
id: f0eb2174-20f6-42fc-9cb5-844a86d4e700
blueprint: japanese_translation
title: ステップ2：ユーザーの特定
title_en: 'Step 2: Identify the user'
source: 'https://help.amplitude.com/hc/ja/articles/206404628'
---
「Amplitudeシリーズを開始する」のステップ2へようこそ。このシリーズは、Amplitudeのデータ構造を順を追って解説し、貴社のプロダクトがAmplitudeに送信する必要があるデータを特定できるようにして、最速かつ最適な方法によるAmplitudeのセットアップを支援することを目的としています。特に、本シリーズで取り扱うテーマは以下の通りです。

0. [イントロダクション＆はじめに](https://help.amplitude.com/hc/en-us/articles/207108137-Introduction-Getting-Started)
1. [インストルメンテーションの事前作業](/docs/get-started/instrumentation-prework)：送信するデータを決定する前に考慮すべきこと
2. [ユーザーの特定](/docs/get-started/identify-users)：プロダクトのユニークユーザーを適切にトラッキングするための要件
3. [イベントデータ](https://help.amplitude.com/hc/en-us/articles/206404698)：トラッキングすべきイベントやユーザーのアクションを特定する方法
4. [ユーザープロパティおよびイベントプロパティ](https://help.amplitude.com/hc/en-us/articles/207108327)：分析の質の向上のために送信すべき属性
5. [プラットフォーム](/docs/get-started/cross-platform-vs-separate-platform)：両者の違いと、どちらの方法を選ぶべきかの説明
6. [AmplitudeとSnowflakeで実際に強力なリソースを体験：](https://help.amplitude.com/hc/en-us/articles/206404718)SnowflakeとAmplitudeを併用し、SQLを介して重要な質問に回答

（Amplitudeのインストルメンテーションを担当される開発者やプロダクトマネージャーの方は、[開発者向けスタートガイド](https://help.amplitude.com/hc/en-us/articles/115000959052-For-Developers-Getting-Started)も合わせてお読みください。）

Amplitudeはユーザーの特定に、デバイスID、Amplitude IDおよび**ユーザーID**の3つを組わせて使用します。デバイスIDはユーザーのデバイスから直接取得されます。Amplitude IDはAmplitudeが固有ユーザーの特定に十分な情報を集めた場合に自動的に作成されるIDです。ユーザーIDはセットアップする必要があるIDです。

Amplitudeでは、ユーザーIDは個々のユーザーに割り当てられる固有の識別子です。 ユーザーIDの使用は任意ではありますが、推奨されます。プロダクトユーザーがアカウントを作成やログインをするか、またはプロダクト内で特定された場合に、ユーザーIDを設定する必要があります。

AmplitudeはユーザIDを使用して、同じユーザーID配下の複数のデバイス間のイベントを照合できます。また、ユーザーIDを割り当て前のすべての匿名イベントが正しいユーザーに接続されるように、ユーザーのイベントデータがバックエンドでマージされます。この理由から、プロダクトにとって有効であれば、ユーザーIDの割り当てを待機することが賢明です。反対に、匿名ユーザーにユーザーIDを割り当てる**べきでない**のもこの理由によります。

Amplitudeで設定したユーザーIDは**変更できません**。

プロダクトが現時点でユーザIDを割り当てていない場合は、このセクションは飛ばしてください。

次のステップに進む前に、[Amplitudeが固有ユーザーを特定する方法に関するこちらの記事](/docs/data/sources/instrument-track-unique-users)をお読みください。必要なすべての情報がこの記事に記載されています。

## ユーザーIDを設定する際のベストプラクティス

* **ユーザーIDがない場合はユーザーIDを設定しない。** 例えば、複数のユーザーに`None` という文字列を設定する場合、Amplitudeはこれらのユーザーを個々のユーザーとして認識しません。その代わり、これらすべてのユーザーが**同じ**ユーザーであると仮定し、これらのユーザーのすべてのイベントをその`None` というユーザーIDの下にグループ化します。 既に述べたように、ユーザーIDは後にいつでも設定できます。
* **変更する可能性があるユーザーIDを割り当てない。** ユーザーIDは永久に固定されるため、例えば、今後変更される可能性があるユーザーのメールアドレスをユーザーIDに設定しないようにします。
* **ユーザーIDは大文字と小文字が区別される。** ユーザーIDを異なるケース（大文字または小文字）に設定した場合、Amplitudeは同じユーザーについて2つの異なるプロフィールをトラックします。
* **サーバー側でのユーザーIDの割り当ては複雑である場合があります。** ユーザーIDの割り当てに関する問題は、[当社までお問い合わせください](https://help.amplitude.com/hc/en-us/requests/new)。

## 次のステップ

次のステップに進むには、このリンクをクリックして[次のステップ：「イベントのトラックとユーザーのアクションの理解」に進んでください。](https://help.amplitude.com/hc/articles/206404698)
