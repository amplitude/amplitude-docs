---
id: fd9e7a1b-67a2-4bcd-ab8c-092c386417e6
blueprint: japanese_translation
title: 検索：チャート、ダッシュボード、コホート、ノートブックを検索する
title_en: 'Search: Search charts, dashboards, cohorts, and notebooks'
source: 'https://help.amplitude.com/hc/ja/articles/236051328'
---
#### この記事のテーマ：

* 組織内の他のユーザーによって作成されたチャート、ダッシュボード、ノートブック、コホートを検索する
* 検索結果にフィルターをかける
* 検出できないアイテムを表示する

Amplitudeの検索機能は、組織の他のメンバーによって作成されたチャート、ダッシュボード、コホートを検索する便利で簡単な方法です。 Amplitudeは、検索パラメータを変更すると、リアルタイムで結果を生成します。

**注：**オーナーが検出できないように設定したアイテムは、マネージャーまたは管理者でない限り、検索結果に表示されません。

## チャート、ダッシュボード、コホート、ノートブックを検索する

1. トップナビゲーションバーで、検索アイコンをクリックします。
2. ドロップダウンメニューの上の*検索*フィールドで、検索する単語またはフレーズを入力します。 または、必要なアイテムの事前入力されたリストをスクロールします。 アイテムは、直近の編集の順にリストアップされます。
3. 結果を最後に編集された日付またはビューの総数でソートするには、*アドバンストサーチ*をクリックします。 結果リストの上部にあるドロップダウンメニューからプリファランスを選択します。
4. フィルタを追加するには、検索ボックス内の*高度な検索*またはフィルタアイコンをクリックします。 この*Filter By*セクションで、この検索に含めるフィルターを設定します。 オプションには、次のものがあります：

* * * * 検索を**アーカイブされた**アイテムのみに限定する
				* 検索を**公式コンテンツ**のみに限定する
				* 検索を**テンプレート**のみに限定する
				* アイテムが属する**スペース**
				* アイテムの**タイプ**（チャート、コホート、ダッシュボード、実験、フラグ、ノートブック）
				* アイテムの**エディター**、または作成者
				* アイテムが属する**プロジェクト**
				* アイテムが**最後に編集**された**最新の編集日**（先週、先月、昨年、または任意の時刻）

![Screenshot_2023-05-24_at_9.27.26_PM.png](/docs/output/img/jp/screenshot-2023-05-24-at-9-27-26-pm-png.png)

5. 結果のリストのアイテムをクリックして、開きます。

**注：**公式コンテンツ機能を介して「公式」としてマークされたダッシュボードとコホートは、以下と共に表示されます：![blue_checkmark.png](/docs/output/img/jp/blue-checkmark-png.png)

## 隠しアイテムを表示する（管理者またはマネージャーのみ）

管理者とマネージャーは、検索を通じて検出できないようにオーナーによって設定されたアイテムを検索できます。これを行うには、検索ボックスに`is:unlisted`と入力します。組織全体のすべてのリストされていないアイテムを表示できます。

[Amplitudeのユーザー権限](/docs/admin/account-management/user-roles-permissions)に関する記事で、詳細を確認してください。