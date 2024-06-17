---
id: 57cb58db-4120-49aa-ab58-1b11a9777fc6
blueprint: japanese_translation
title: 行動別コホート：類似する行動をとるユーザーを特定する
title_en: 'Behavioral cohorts: Identify users with similar behaviors'
source: 'https://help.amplitude.com/hc/ja/articles/231881448'
---
#### この記事のテーマ：

* コホートタブまたは[マイクロスコープ](/docs/analytics/microscope)機能を使ってAmplitudeで行動別コホートを作成する
* ファイルからコホートをインポートする
* コホート同士を比較する
* 当社のアカデミーの[コホートに関するこのコース](https://academy.amplitude.com/create-user-groups-with-behavioral-cohorts)が役に立つことが分かります。

Amplitudeにおいて**コホート**とは、共通の特徴があるユーザーのグループです。コホートには、[予測型コホート](/docs/cdp/audiences/predictions)と**行動別コホート**の2種類があります。この記事では、行動別コホートの仕組みや構築方法、Amplitudeの分析に組み込む方法についてご説明します。

行動別コホートは特定の期間内にユーザーが実行した行動で定義されます。あなたのプロダクト内でどのイベントを実行したかに基づいて、様々なユーザーをグループ分けできます。コホートの作成後は、様々なAmplitudeチャートにセグメントとして追加できます。

例えば、行動別コホートには以下のようなものがあります。

* 動画ストリーミングサービスへの加入初日に、テレビ番組の連続したエピソードを3本視聴するユーザー
* オンボーディングの過程でプッシュ通知をオンにするユーザー
* 直近1ヶ月以内にECサイトで購入を中断したAndroidユーザー

こうした行動データは最終的に、維持、コンバージョン、収益など、あなたが着目するビジネス成果にプロダクトとのエンゲージメントが与える影響を明らかにします。

**注：**この機能はエンタープライズ、グロースおよびスカラーシッププランのお客様にのみご利用いただけます。

コホートはAmplitudeプラットフォーム全体でとても便利に活用できます。コホート別にデータをセグメント化するには、[[セグメンテーションモジュール]](/docs/analytics/charts/build-charts-add-events)で![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)*[コホート]*を選択し、ドロップダウンメニューのリストから関心のあるコホートを選びます。

**注意：**コホートでセグメントされる各チャートやクエリでは、チャートを生成するたびにセグメント化されたコホートが自動的に再計算されます。![](/docs/output/img/jp/Screen_Shot_2016-11-01_at_5.38.07_PM.png)...のアイコンをクリックすると、いつでもコホートを手動で再計算できます。

[アカウントアドオン](/docs/analytics/account-level-reporting)を導入している場合、ユーザーのコホートの代わりにグループ単位のコホートを適用できます。特定のグループタイプを選択すると、そのタイプに含まれるコホートのみがイコール記号の右側のドロップダウンメニューに表示されます。

![behavioral_cohorts_1.png](/docs/output/img/jp/behavioral-cohorts-1-png.png)

コホートページから直接、コホートを使ったチャートを作成することもできます。

![behavioral_cohort_2.png](/docs/output/img/jp/behavioral-cohort-2-png.png)

ただし、これらの作業をする前に、新規コホートの定義が必要です。

## 新規コホートの定義

新規のコホートを定義するには、以下のステップに従ってください。

1. *[新規作成] > [コホート]*をクリックします。 新規コホートのページが表示され、新規コホートのパラメーターを設定したり、新規コホートにユーザーのCSVをアップロードしたり、[予測型コホート用の予測を作成](/docs/cdp/audiences/predictions)したりできます。
2. リストに表示される条件（イベントを実行した、アクティブだった、新規だった、プロパティがあった、傾向があった）のいずれかをクリックして、コホートの定義を開始します。ただし、これは行動別コホートなので、*[イベントを実行した]*をクリックしましょう。後でコホートの定義に他の条件を追加することもできます。
3. *[イベントを選択]*をクリックし、関心のあるイベント選択します。
4. 行動コホートを定義するパラメータを設定し、開始します。

![behavioral_cohorts_define_new.png](/docs/output/img/jp/behavioral-cohorts-define-new-png.png)  
まず、Amplitudeに、どのようにイベントをカウントするかを指定します。 6つの選択肢があり、**with**のドロップダウンメニューから選択できます。

* * * **回数**。コホートはイベントが実行された回数をベースにします。例えば、直近30日間に`お気に入りの曲か動画`を5回以上再生した全ユーザーです。[行動コホートFAQ](https://help.amplitude.com/hc/en-us/articles/360033562312 "https://help.amplitude.com/hc/en-us/articles/360033562312")を参照して、ユーザープロパティがない、またはイベントを実行しなかったユーザーのコホートを作成する方法を学習してください。
		* **相対回数。**Amplitudeが2つのイベントの頻度を比較します。例えば、直近30日間に`曲や動画を再生`を`お気に入りの曲や動画`よりも頻繁に実行した全ユーザーなどです。比較するイベントの両方について、「where」節を追加できます。
		* **プロパティ合計**。指定したイベントまたはユーザープロパティの合計でイベントを実行したユーザーをフィルタリングします。条件とするイベントまたはユーザープロパティには数で表される値が必要です。例えば、直近30日間で、`長さ`の値の合計が60秒を超える`曲を再生または検索`を実行した全ユーザーなどです。
		* **特定のプロパティの値。**分析対象とする特定の値または一連の値に基づき、イベントまたはユーザープロパティでフィルタリングします。例えば、2台以上のデバイスで曲または動画をお気に入りに追加したユーザーのみ、などです。
		* **リピート回数。**イベントを1回から5回までの特定の回数だけ実行したユーザーがコホートに含まれます。詳細は、[Amplitudeのヒストリカルカウントについて](/docs/analytics/historical-count-1)のヘルプセンターの記事をご覧ください。
		* **間隔でカウントします**。 特定の間隔内の**個別の日数**ごとに**少なくとも1回**イベントをトリガーしたユーザーをフィルタリングします。 これにより、定義された期間内の個別の日数の間に発生した行動を特定できます。 たとえば、特定の間隔内の個別の日数（数を定義する）ごとに少なくとも1回イベントをトリガーしたユーザーをフィルタリングできます。 これは、日次、週次、月次行動とは異なります。すなわち、行動が異なる日に発生している必要ありません。  
		  
		[Amplitudeでスティッキネス分析がどのように機能するか](/docs/analytics/charts/stickiness/stickiness-interpret)については、ヘルプセンターの記事を参照してください。

4. パラメーターの**演算子**（等しい、超える、未満など）と**値**（回数）を設定します。
5. 次に、**いつ**実行されたイベントを対象とするかを指定します。ここでもいくつかの選択肢があり、**日時**のドロップダウンメニューから選べます。

* * * * **期間中。**日付ピッカ―で選択する期間中に実行されたすべてのイベントを対象とします。2つの特定の日付の間の期間にも、*直近30日間*のように動的な設定にもできます。後者の場合は、対象期間が毎日更新され、X日以内にイベントを実行していないユーザーはコホートから除外されます。
				* **以降。**日付ピッカ―で選択する**暦日**以降に実行されたすべてのイベントを対象とします。
				* **以内。**コホートの各メンバーによる初回の利用からX日以内に実行されたイベントを対象とします。新しくユーザーになってからX日以内に特定のイベントを実行したユーザーのグループについて知りたい場合に便利です。

6. 次に、*Or*句を追加するか、別のイベント、プロパティ、傾向、コホート、新しいユーザーを追加できます。 Or句のオプションを表示するには、これまでに構築したコホート定義にカーソルを合わせます。 コホート定義に追加するオプションを表示するには、現在のコホート定義の下の*[+ 追加]*をクリックします。

![behavioral_cohort_add_more.png](/docs/output/img/jp/behavioral-cohort-add-more-png.png)

または（*Or*）節を使って条件を追加すると、Amplitudeはそれらの条件の**いずれかを**満たすユーザーを対象とします。*+ Add*を介してコホート定義に追加すると、Amplitudeは、それを*And*句として扱います。ユーザーをコホートに含めるには、**両方**の条件が満たされている必要があります。

*+ Add*を使用してコホートに新しいコンポーネントを追加すると、**含める**または**除外する**のいずれかに指定できます。これを行うには、イベント、ユーザープロパティ、傾向に対して*[なし]*を選択します（コホートに*属さない*、新規ユーザー向け*ではない*）。

![behavioral_cohorts_exclude.png](/docs/output/img/jp/behavioral-cohorts-exclude-png.png)

除外条件を満たすアイテムは、指定された他のすべての条件を満たしている**場合でも**、コホートから除外されます。

この例では、コホートは、4月1日から4月30日までの間に、`「曲を再生または検索」`イベントを8回以上再生し、**かつ**`「お気に入りの曲または動画」`イベントを4回以上再生した、米国からのユーザーとして定義されます。

![behavioral_cohort_example.png](/docs/output/img/jp/behavioral-cohort-example-png.png)

**注：**最も正確な結果を表示するには、加味するすべてのユーザープロパティに関して日付の範囲を設定してください。

### ユーザープロパティ節

以下のユーザープロパティ条件をコホートに含める場合、イベントではなくユーザープロパティを見ることになります。つまり、特定のユーザープロパティについて、ある時点で特定の値を有していたすべてのユーザーをコホートに含めるように、Amplitudeに指示しています。プロパティとイベントは異なるものです。そのため、以下のユーザープロパティ条件で利用できる選択肢も異なります。

![behavioral_cohort_user_property_clauses.png](/docs/output/img/jp/behavioral-cohort-user-property-clauses-png.png)

* **直近のみ：**対象とするユーザープロパティの**直近の値**があなたが指定した値とマッチするユーザーのみを選択します。この値は、ユーザーの直近のアクティブイベントから求められます。頻繁に値が変わるユーザープロパティについて、直近の値のみを対象とするコホートを作成する場合に便利です。例えば、新規ユーザー（加入後30日以内のユーザー）の多くが初めはプッシュ通知をオフにしているので、プッシュ通知をオンにしているユーザーのみを対象とすることなどが考えられます。  
  
**注：**プロパティの値が数値の場合、値がないときは0と解釈されます。
* **全期間：****選択した期間のいずれかの時点において**、対象とするユーザープロパティが指定した値だったことのあるユーザーを選択します。例えば、直近30日以内に`Country`のプロパティが米国だったことのあるユーザーなどです。米国外に引っ越したユーザーがいても（つまり直近の`Country`のプロパティの値は違っていても）、このコホートの定義では対象に含まれます。

### グループ単位のコホート

グループタイプを計装している場合、コホートの詳細ページ（コホートの定義やアップロードを行うページ）からグループコホートを作成できます。グループコホートを作成するには、コホートを定義する際に、定義の左側にあるグループの名称を選択します。以下の例では、グループの名称は「Playlist」です。

![behavioral_cohorts_group_level.png](/docs/output/img/jp/behavioral-cohorts-group-level-png.png)

グループコホートをチャートに適用する場合、*[+ Filter by]* > [コホート]の順にクリックしてグループを追加します。 次に、リストからグループ名を選択します。

![behavioral_cohort_adding_group_cohort_to_chart.png](/docs/output/img/jp/behavioral-cohort-adding-group-cohort-to-chart-png.png)

グループコホートは、ペルソナとコンパスを除く全種類のAmplitudeチャートに対応しています。

## マイクロスコープでコホートを作成

[マイクロスコープ](/docs/analytics/microscope)の*[コホートを作成]*オプションでは、選択したデータポイントで捉えたすべてのユーザーを含むコホートを作成できます。作成されるのは通常、静的なコホートとなります。しかし、一部のチャート（ベーシックリテンションやファネル分析など）では、編集できないフィールドもあるものの、行動別コホートを作成することもできます。静的なフィールドはグレーで表示されます。

マイクロスコープでは、グループを適用したデータポイントからグループコホートを作成することもできます。

![Screen_Shot_2019-11-26_at_13.58.05.png](/docs/output/img/jp/screen-shot-2019-11-26-at-13-58-05-png.png)

以下の場合、マイクロスコープ内から作成したコホートは静的なコホートとなります。

* クロスプロパティ値のある
* 返されるイベントが複数あるリテンション
* リテンションの利用インターバルビュー
* 例外イベントがあるファネル
* プロパティ定数を保持するファネル
* イベントインラインを結合するファネル
* ステップでイベントを比較するファネル
* ファネルの分布表示（コンバートまでの時間+頻度）
* プロパティのイベントセグメンテーション（PropSum + PropAvg）
* 異なるコホートに基づくすべてのチャート

## ファイルからコホートをインポートする

...をアップロードすることで、ユーザーまたはグループの静的コホートを作成できます。[ユーザーID](/docs/get-started/identify-users)またはAmplitude IDのCSVまたはテキストファイルです。 [アカウント](/docs/analytics/account-level-reporting)アドオンがある場合は、グループのコホートを作成することもできます。 1行につき1つのIDで、その他のテキストや不要なスペースを一切含むことが**できない****ファイル**が必要です。ファイルサイズは50MB未満でなければなりません。

ユーザーIDがAmplitude内に存在しない場合は、そのユーザーはスキップされ、コホートには含まれません。Amplitude IDをアップロードする場合は、すべてのAmplitude IDが有効でなければなりません。

ファイルは、次のようになります：

![image3.png](/docs/output/img/jp/image3-png.png)

適切にフォーマットされたファイルには、ヘッダー行がなく左端の列にのみ値が含まれ、余分なスペースや文字は含まれません。 次に示すのは、**不適切に**フォーマットされたファイルの例です。

![image1.png](/docs/output/img/jp/image1-png.png)

ファイルを選択したら、ファイルにAmplitudeID、ユーザーID、グループが含まれるかどうかを指定します。

![Behavioral_Cohorts_15_Import_Cohort_from_File.png](/docs/output/img/jp/behavioral-cohorts-15-import-cohort-from-file-png.png)

### ファイルからコホートを再インポート

手動でアップロードしたコホートは、再インポートすることができます。この機能では設定済みのコホートを更新でき、すべてのチャートを新しいコホートに設定しなおす必要がありません。

## インラインの行動別コホートとインターバルコホート

コンパスを除く全種類のAmplitudeチャートでは、セグメンテーションモジュール内で簡単な行動別コホートを直接作成できます。これによって、チャートから[行動別コホートタブ](/docs/analytics/behavioral-cohorts)に移動することなく、特定のチャートのコンテキストで行動別コホートを作成できます。

これを行うには、*[+ Performed]*をクリックします。

![behavioral_cohorts_inline.png](/docs/output/img/jp/behavioral-cohorts-inline-png.png)

特定のイベントをトリガーしたユーザーのチャートをフィルタリングするために、これを使用します。

インラインのコホートと行動別コホートタブで作成したコホートの違いは、*「in each」*節があるかどうかです。「in each」節を使うと、指定の期間内に選択されたイベントを特定の回数だけ実行したユーザーをフィルタリングして、**インターバルコホート**を作成できます。

例えばこのコホートでは、この[イベントセグメンテーション](https://help.amplitude.com/hc/en-us/articles/230290208)チャート内で直近4週間でいずれかの週に3回以上`曲または動画をダウンロード`を実行したユーザーをフィルタリングします。

![behavioral_cohort_interval_cohort.png](/docs/output/img/jp/behavioral-cohort-interval-cohort-png.png)

これらのユーザーのうち、143,793人が、1月9日の週に曲または動画を3回以上ダウンロードし、`曲または動画を購入`のイベントをトリガーしています。

時間の経過に沿ってコホートの人数を測定するには、インラインコホートを使いましょう。例えば、あなたのプロダクトにおける重要なマイルストーンが、それぞれの長さが3分を超える曲を1日で5曲以上再生することだとします。これがあなたの**エンゲージメントの高い**コホートです。

そこから、さらに*where* フィルターを追加し、イベントプロパティやユーザープロパティの条件を指定できます。各インターバルにおける行動を見ることで、エンゲージメントの高いコホートの人数がどう変化しているかを測定できます。

## コホート同士の比較

コホート比較機能では、新規のコホートと直近30日間のすべてのアクティブユーザーを自動的に比較します。また、比較対象とする既存のコホートを選択したり、2つのコホート同士の共通点を見つけたり、並列に比較するユーザープロパティの選択、アクティブやリテンション、平均イベントなどの比較ができます。

比較分析を開くには、行動別コホートタブからコホートのタイトルをクリックします。

## コホートの管理

自分のコホートは、**閲覧可能**または**非公開**に設定できます。閲覧可能なコホートは、あなたの組織内のどのユーザーでも見られるようになります。非公開のコホートは、あなた自身と管理者、マネジャー、そしてコホートへのダイレクトリンクを持っている人しか見られません。閲覧可能なコホートには緑色の地球のアイコンが表示され、非公開のコホートにはグレーのトグルがつきます。

### コホートのアーカイブ

*その他 —> アーカイブ*をクリックしてコホートをアーカイブできます。間違えてコホートをアーカイブしてしまった場合は、*その他*をクリックすると*アーカイブ解除*の選択肢が表示されます。

### コホートの削除

コホートのアーカイブや削除ができるのは、そのコホートのオーナーだけです。

コホートを削除するには、初めにアーカイブする必要があります。コホートをアーカイブしたら、Amplitudeがコホートを削除する前に、永久に削除するかどうか確認のメッセージが表示されます。

### コホートのオーナー権を移管

所有しているコホートの所有権を、組織内の他のユーザーに譲渡できます。 あるいは、コホートのオーナーをさらに追加することもできます。管理者やマネージャーは、他の人のコホートのオーナー権を移管したり、各コホートにオーナーを追加したりできます。

管理者やマネジャーは、行動別コホートをクリックして、*共有*をクリックすると、コホートのオーナー権を移管できます。

## コホートを同期またはエクスポート

[Amplitude Audiences](https://help.amplitude.com/hc/en-us/articles/360028552471)のお客様は、行動コホートをパートナー[統合](https://help.amplitude.com/hc/en-us/sections/201147128-Integrations)と同期させることができます。 エクスポートされるコホートのユーザー数は最大で100万人です。

コホートをCSVファイルとしてエクスポートするには、*CSVをエクスポート*クリックします。...をダウンロードするリンクをメールで送信します。コホート内のすべてユーザーとその最新ユーザーのプロパティを含むCSVファイルです。

**注：**現在、ポートフォリオプロジェクトのコホートエクスポートは、「反復可能」、「インターコム」、「セグメント」のみをサポートしています。 「反復可能」と「インターコム」の宛先では、Amplitude User Propertyを選択すると、`device_id`と`user_id`のみが利用できます。

## コホートの更新

画面上部のナビゲーションバーにあるコホートの詳細画面から、コホートを手動で更新できます。コホートの直近のユーザー数が更新されます。

コホートでセグメントされるチャートやクエリについては、チャートを生成するたびにセグメント化されたコホートが自動的に再計算されます。どのチャートにも含まれていないコホートは、手動で再計算しない限り再計算されません。