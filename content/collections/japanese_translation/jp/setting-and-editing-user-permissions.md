---
id: deaded80-b418-426b-982d-41c2691c3a4a
blueprint: japanese_translation
title: ユーザー権限の設定と編集
title_en: 'Setting and Editing User Permissions'
source: 'https://help.amplitude.com/hc/ja/articles/229672228'
---
|  |
| --- |
| この記事のテーマ：* 組織への迅速なユーザー追加及びユーザー権限の編集
* Amplitudeのユーザーの役割に関連した様々な権限に対する理解を深めます。
* また、Amplitudeの管理については[こちらのコース](https://academy.amplitude.com/amplitude-analytics-admin-essentials)も参考になるでしょう。
 |

ユーザー権限は、組織内のユーザーが持つAmplitudeへのアクセスレベルを定義します。通常、権限はユーザーの役割に基づきますが、[プロジェクトレベルの権限](#h_47d85a7e-f1b9-432c-bcc0-c2bc2549bc6d)と権限グループは、より高度なセキュリティレベルを必要とするエンタープライズレベルのお客様向けとなっています。

ユーザー権限はアドミンにより設定されます。アドミンは、Amplitude組織の最初のユーザーであり、各組織には少なくとも1人のアドミンが必要です。（アドミンは、他のユーザーをアドミンとして指定することもできます）。新しいユーザーが組織に最初に招待された際には、デフォルトで**ビューアー**の役割が割り当てられます。

Amplitudeでは、**組織**レベルでユーザー権限が存在します。一度権限レベルが割り当てられると、そのユーザーは、その組織内の*すべての*プロジェクトに対して同じレベルの権限を持ちます。

[組織を作成方法と管理方法の詳細については、こちらをご覧ください](https://help.amplitude.com/hc/en-us/articles/360058073772)。

## Amplitudeにおけるユーザーの役割と権限

| **役割** | **権限** |
| --- | --- |
| **ビューアー**
サードパーティに、組織の他のメンバーが見ることができるコンテンツを作成させたくない場合に、割り当てる役割として推奨します。 | * 検出不可能なダッシュボード、チャート、行動コホートを作成、編集、削除します。ビューアーがコンテンツの編集や削除を行う場合、そのコンテンツの所有者である必要があります。
* 別のユーザーが作成した検出不可能なコンテンツを共有します。
* [プロジェクト設定](/docs/admin/account-management/manage-orgs-projects)を表示
* [Govern](https://help.amplitude.com/hc/en-us/articles/360043750992)を表示（イベント、プロパティ、カテゴリ、説明を参照。計画されたイベントと計画外のイベントを表示。）
* データソースとデータ送信先を表示
* [Slack](/docs/analytics/integrate-slack)にユーザーアカウントを連携
* 自分のプロファイルを編集（名前、タイトル、チーム、パスワード）
* 自分の[購読メール](/docs/analytics/dashboard-create)を編集
* カスタム[モニター](/docs/analytics/insights)を設定し、それらを購読
* 作成したコンテンツを他のユーザーと共有

ビューアー向け注意事項：* 保存されたセグメントを含め、[検出可能な](/docs/analytics/charts/chart-basics)ものは作成*できません*
* 共有可能なリンクは作成*できません*
* サードパーティのインテグレーションパートナーにデータをエクスポート*することはできません。*
 |
| **メンバー**
組織内のAmplitudeユーザーの大半に推奨します。 | 全てのビューアー権限、プラス：* 検出可能なダッシュボード、チャート、行動コホート、保存されたセグメントを作成可能
* Governで[カスタムイベント](https://help.amplitude.com/hc/en-us/articles/360047138392#create-a-custom-event-from-existing-events)を作成
* [チームスペース](/docs/analytics/collaborate-with-spaces)の作成
* [リリース](/docs/analytics/releases)の編集

メンバー向け注意事項：* 検出不可能なコンテンツの検索は*できません*。
 |
| **マネージャー**
Amplitude内で作成されたすべてのコンテンツ（検出不可能なダッシュボードやチャートは含まれません）へのアクセスや、プロジェクト設定の変更が必要なユーザーにお勧めします。 | 全てのメンバー権限、プラス：* ユーザーの追加と削除
* ユーザーの役割（権限）の編集
* [注釈](/docs/analytics/microscope)の作成、編集、削除
* プロジェクト設定におけるAPIキーとシークレットキーの表示
* 保存されたセグメントの削除と編集
* 新規プロジェクトの作成
* プロジェクト設定の編集
* Governで編集：[変更、ブロック、削除、ドロップ](https://help.amplitude.com/hc/en-us/articles/360047138392)、[計画、承認・拒否、変換](https://help.amplitude.com/hc/en-us/articles/115001477311)、[採用](https://help.amplitude.com/hc/en-us/articles/360058731292)
* データソースとデータ送信先の追加と編集
* 所有していないコンテンツの所有権を移管
 |
| **アドミン**
組織内で設定可能な最上位の権限です。組織内のアドミンユーザー数を制限することをお勧めします。アドミンの役割は、既存のアドミンのみが付与または取り消すことが可能です。 | すべてのマネージャー権限、プラス：* 共有チャートとダッシュボードのリンクを削除
* コンテンツを「公式コンテンツ」としてマーク
* [サンプリング](/docs/admin/account-management/manage-event-volume)設定の変更
* [権限グループ](/docs/admin/account-management/manage-permission-groups)の作成
* 組織の削除、もしくは組織名とURLの変更（アドミンはこのリクエストをAmplitudeサポートチームに提出する必要があります）
* 組織アドミンの変更
 |
| **全ユーザー** | * 他のユーザーのフルネームの変更は*できません*
* 他のユーザーのパスワードを変更またはリセット*することはできません*
* 組織内での自分の役割を変更*することはできません*
* 組織から自分自身を削除*することはできません*。そのためには、アドミンまたはマネジャーにあなたを組織から外すようにリクエストしてください。
* 他のユーザーのコンテンツを完全に削除*することはできません*。アドミンはユーザーのコンテンツをアーカイブすることが可能ですが、アーカイブ後に所有者だけがコンテンツを削除できます。
 |

## 組織にユーザーを追加

組織にユーザーを追加し、ユーザーの役割を割り当てるには、次のステップに従ってください：

1. ナビゲート![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)＞*[メンバー](/docs/admin/account-management/manage-users)*。チームのメンバーページが開きます。
2. *新規ユーザーの招待*をクリックします。
3. 追加したいユーザーのメールアドレスを入力します。次に、Enterを押します。そのユーザーは、招待されるメンバーのリストに表示されます。
4. *役割*ドロップダウンメニューからその人に適切な役割を選択します。オプションで、そのユーザーのチームスペースを指定することもできます。
5. 追加したいユーザーがすべて表示されるまでステップ3と4を繰り返します。次に、*[次へ]*をクリックします。
6. *デフォルトプロジェクト*のドロップダウンから、ユーザーが最も作業する可能性の高いプロジェクトを選択します。次に、*[次へ]*をクリックします。
7. 作業内容を確認し、準備ができたら*、招待状*を送信をクリックします。

## ユーザーの役割に基づいてユーザー権限を変更

Amplitudeのユーザー権限を変更するには、次のステップに従ってください：

1. ナビゲート![gear_icon_for_settings.png](/docs/output/img/jp/gear-icon-for-settings-png.png)＞*[メンバー](/docs/admin/account-management/manage-users)*。チームのメンバーページが開きます。
2. 編集したい権限をもつユーザーの名前の横にあるボックスにチェックを入れます。一度に複数のユーザーを選択できます。
3. *プロジェクトアクセスの管理*をクリックします。
4. 表示されるモーダルで、権限を調整したいプロジェクトを特定し、その横のチェックボックスをオンにします。一度に複数のプロジェクトを選択することができます。
5. *役割*ドロップダウンから、ステップ4で選択した各プロジェクトごとに、ステップ2で選択したユーザーに割り当てる新しい権限レベルを選択します。  
  
**注：**組織内の唯一のアドミンの役割を変更することはできません。
6. ユーザーの権限を削除するには*削除*をクリックします。そうすることで、そのユーザーは組織から除外され、すべてのアクセス条項が削除されます。

## プロジェクトレベルの権限

プロジェクトレベルの権限では、ユーザーは組織内のプロジェクトごとに異なる役割を持つことができます。これにより、社内の複数のチームが自律的に活動し、それぞれのデータセットを独自に管理できるようになります。例えば、あるユーザーは1つのプロジェクトではマネジャーレベルの権限を持ち、別のプロジェクトではビューアーレベルの権限を持つ場合があります。プロジェクトにアクセスできないユーザーは、そのプロジェクトに属するコンテンツを見ることができません。

![mceclip2.png](/docs/output/img/jp/mceclip2-png.png)

**注：**プロジェクトレベルの権限は、エンタープライズプランの顧客のみが利用できます。

組織のすべてのメンバーを表示する場合、メンバーは*ユーザー*または*アドミン*として表示されます。組織内のプロジェクトのアドミンまたはマネジャーであれば、メンバーの名前の横にあるチェックボックスをクリックし、「プロジェクトアクセスの管理」を選択することで、プロジェクトごとに個々のメンバーの役割を表示および変更することができます。マネジャーは、自分がマネジャーであるプロジェクトのみ、ユーザーの役割を変更することができます。

プロジェクトレベルの権限は、デフォルトでは有効になっていないため、カスタマー・サクセス・マネジャーにご連絡頂き、有効にしてください。

## 権限グループ

また、エンタープライズプランのお客様だけが利用できる権限グループでは、Amplitudeのユーザー権限をダイナミックに管理できます。複数のユーザーをグループに追加し、それぞれのユーザーに権限セットをすばやく付与することで、Amplitude組織の権限付与と管理を簡単に行うことができます。

例えば、「マーケティングチーム」や「ペイメントチーム」のようなユーザーグループを作成し、チームに一括でプロジェクト権限を割り当てることができます。これにより、個々のユーザーの権限を管理するのではなく、グループ毎のユーザーをコントロールすることができるようになります。

[Amplitudeの権限グループの詳細についてはこちらをご覧ください](/docs/admin/account-management/manage-permission-groups)。プロジェクトレベルの権限を有効にするには、カスタマーサクセスマネージャーにお問い合わせください。
