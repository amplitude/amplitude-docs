---
id: cd2ce74a-03b0-4556-be0c-832f5c2b4b31
blueprint: japanese_translation
title: トラックセッション
title_en: 'Track Sessions'
source: 'https://help.amplitude.com/hc/ja/articles/115002323627'
---
"#### この記事のテーマ：

* Amplitudeのユーザーセッションの定義方法と追跡方法を理解する
* セッションを分析に組み込む最適な方法を学ぶ

Amplitudeでは、セッションはプロダクトへのユーザーのエンゲージメントの頻度と時間を把握するために便利なメトリックです。セッションベースの分析を作成する最も直接的な方法は[ユーザーセッションチャート](/docs/data/user-properties-and-events)を使用して他の分析タイプにセッションを統合することができます。

**注：**こちらにユーザーセッションの[動画](https://academy.amplitude.com/how-long-do-users-spend-in-my-product/1091393)もございます。

## Amplitudeによる「セッション」の定義

通常、セッションはユーザーがアプリを前面に置いているか、またはウェブサイトを開いている時間のことです。モバイルとウェブのアプリケーションは次のように細部でやや違いがあります。

* **モバイル**では、セッションはアプリが前面に置かれたときに開始し、アプリが背後に置かれて5分以上イベントが発動しなかった場合に終了します。セッション間で5分以内に送信されたすべてのイベントは現在のセッションとしてカウントされます。 set[MinTimeBetweenSessionsMillis(timeout) を](https://developers.amplitude.com/docs/android#user-sessions%20)呼び出して、セッションの有効時間を定義できます。タイムアウトにはミリ秒単位の値を入力します。
* **ブラウザ**では、セッションはウェブサイトを開いて、SKDが初期化されたときに開始し、最後のイベントがトリガーしたときに終了します。デフォルトで、ウェブセッションは30分後にタイムアウトになります。30分以内に発動したすべてのイベントは同じセッションの一部としてカウントされます。このタイムアウトウィンドウは、[Browser SDK設定オプション](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/)でカスタマイズできます。

Amplitudeは新規セッションにセッションIDを自動的に生成します。このIDは**epoch**（[Unixタイムスタンプ](https://en.wikipedia.org/wiki/Unix_time)としても知られる）を起点とするミリ秒単位のセッションの開始時間です。同じセッション内のすべてのイベント間で同じセッションIDが共有されます。AmplitudeのSDKを使用している場合、共有は自動的に実行されます。一方、HTTP APIを使用してAmplitudeにデータを送信する場合、セッションをトラックするために[session ID](https://help.amplitude.com/hc/en-us/articles/360032842391#http-api-v2-events)フィールドを明示的に設定する必要があります。

## Amplitudeによりセッションをトラックする

Amplitudeのセッションプロパテのデフォルト設定は`session ID`です。同じセッションIDと同じユーザーIDを持つすべてのイベントは同じセッションにグループ化されます。セッションIDは複数のユーザー間で固有である必要は**ありません**。セッションをグループ化するのに使用する[プロパティを変更](#h_d6df9d70-48fa-44cb-8907-7c3c652b007f)することもできます。

上記の通り、Amplitude SDK経由で送信されるイベントのセッションIDは自動的に生成および管理されます。一方、[HTTP API](https://help.amplitude.com/hc/en-us/articles/360032842391)経由で送信されるイベントでは、AmplitudeのデフォルトのセッションIDは`-1`になります。 つまり、イベントはすべてのセッション指標から除外されます。

**注意：**これは、SegmentからAmplitudeにクラウドモード接続経由でデータを送信するときによく発生します。HTTP API経由でデータを送信する場合と同様に、セッションをトラックするためにはセッションIDを明示的に設定する必要があります。

![SessionId.png](/docs/output/img/jp/sessionid-png.png)

同じセッションに含まれるイベントは、上図のように青線で連結されます。

### Start SessionイベントとEnd Sessionイベント

Amplitudeは、デフォルトではセッションIDの各セッションの開始時刻と終了時刻を使用して、[Start Session]（開始セッション）イベントと[End Session]（終了セッション）イベントを追跡します。また、AmplitudeはセッションIDを使用して、[セッションの長さ](#h_408dc7ad-4919-4fa1-a506-c43174f68096)を計算します。セッションIDを使用する場合、Amplitudeは月次イベント数の制限に追加イベントを追加しません。

ただし、セッションの長さを超えて`Start Session`イベントと`End Session`イベントのトラッキングが分析に重要とされる場合は、SDKを初期化する前にこのコード行を追加してこれらのイベントのトラッキングを簡単に有効にすることができます。

Androidの場合:

```
Amplitude amplitude = new Amplitude(new Configuration(  apiKey = AMPLITUDE\_API\_KEY,  context = applicationContext,  trackingSessionEvents = true, ));
```

iOSの場合：

```
[Amplitude instance].trackingSessionEvents = YES;
```

ブラウザの場合：

```
amplitude.init(API\_KEY, OPTIONAL\_USER\_ID, {  defaultTracking: {  sessions: true,  }, });
```

**重要な注意：**

* これは、Amplitudeの**Android**[、](https://developers.amplitude.com/docs/android#user-sessions)**iOS**、**Browser** SDKにのみ適用されます。SDK関連の文書については、Amplitudeの[開発者センター](https://www.docs.developers.amplitude.com/data/sdks/)をご覧ください。
* Start/End Sessionイベントは月次[イベント数の制限](https://help.amplitude.com/hc/en-us/articles/115002923888#h_5d6b52ca-cb1e-4497-82a3-81b86b2f30ff)にカウントされます。
* `End Session`イベントはユーザーの次のセッションの開始時に送信されます。
* Start SessionイベントとEnd Sessionイベントに追加イベントプロパティを追加することはできません。Start/End Sessionイベントにイベントプロパティを送信したい場合、`Open App`および`Close App`カスタムイベントの実装をお試しください。

### Out-of-sessionイベント

セッションIDを`-1`に設定して、イベントをセッション外として記録することもできます。 Out-of-sessionイベントは現在のセッションの一部とみなされません。現在のセッションを延長しないため、プッシュ通知によりトリガーされたイベントを記録する場合に便利です。

Out-of-sessionイベントは通常はAmplitudeが受け取るサーバー側のイベントです（詳しくは、[HTTP API](https://help.amplitude.com/hc/en-us/articles/360032842391)の記事をご覧ください）。これらのイベントは、ユーザーのイベントストリームに切り離された緑色の正方形として表示されます。

![SessionId_neg1_.png](/docs/output/img/jp/sessionid-neg1-png.png)

### カスタムセッションプロパティ

デフォルトでは、AmplitudeはセッションIDに基づいてイベントをセッションに分類します。また、一定のプロパティ、カスタムタイムアウトウィンドウ、またはグループセッションに開始と終了するイベントを設定するだけで、実装なしのセッションを定義することもできます。

セッション定義を編集するには、管理者またはマネージャーの権限が必要です。

**注：**カスタムセッション定義は、ユーザーセッションとパスファインダーチャート、ユーザーのタイムラインでのみ利用できます。セッションにはアクティブイベントのみが含まれます。

カスタムセッション定義を設定するには、次のステップに従ってください:

1. 左側のサイドバーから、*[設定]>プロジェクト*に移動します。
2. 作業するプロジェクトをクリックします。
3. *セッション定義*をクリックします。セッション定義モーダルが表示されます。

![Screen_Shot_2021-11-29_at_11.01.19_AM.png](/docs/output/img/jp/screen-shot-2021-11-29-at-11-01-19-am-png.png)

セッション定義モーダル内では、プロジェクトでセッションを定義する3つの条件のいずれかに仕様を設定することができます。1つの条件または複数の条件を定義できますが、Amplitudeがセッションをカウントするために指定する**すべて**の条件を満たす必要があります。

これらの条件のいずれかを定義しない場合は、Amplitudeはセッション定義プロパティとしてデフォルトがセッションIDにされます。

条件は次のとおりです:

* * * * * *セッションプロパティ*。セッションをグループ化するのに使用するプロパティを選択します。デフォルトはセッションIDですが、イベントまたはユーザープロパティでグループ化することを選択できます。
				* *セッションタイムアウト*。デフォルトタイムアウトインターバルを入力します。Amplitudeは1つのセッションの一部として指定するインターバルに先立ち、同じユーザーからのすべてのイベントをカウントします。デフォルト30分を推奨します。
				* *開始と終了するセッションイベント*。セッションの開始と終了を意味するイベントを指定します。タイムアウトインターバルが経過する前に発生する場合、終了イベントのトリガーはセッションを終了します。

4. 最後に、確認フレーズを入力し、*[保存]*をクリックします。

**注：**セッション定義を変更すると、プロジェクトの**すべてのユーザーセッションとパスファインダーチャート、およびユーザーのタイムラインに適用されます**。カスタムセッション定義を設定または変更する前に、インパクトが何であるかを理解する必要があります。

Amplitudeは条件の組み合わせを論理ANDとして扱います。例えば、セッションのすべてのイベントが同じソースからであることを保証する場合は、タンデムで*constantプロパティ*と*タイムアウトウィンドウ*を使用することによってこれを達成することができます:

* 定数プロパティ=`デバイスID`
* セッションタイムアウト= `30 min`

または、アプリ内使用に基づいてセッションを定義するには、*開始イベント*と*タイムアウトウィンドウ*を使用することができます:

* 開始イベント=アプリオープン
* セッションタイムアウト= `30 min`

## Amplitudeによりセッションの長さを計算する

[session ID](#h_e9e9580e-5748-49ed-8ec4-8583c700ddd7)をセッションプロパティとして使用する場合、Amplitudeは次の式を使用してセッションの長さを計算します：

```
*max(client\_event\_time) - min(client\_event\_time)*
```

ここでは：

* `client_event_time`はデバイスがイベントを記録した現地時間のタイムスタンプ（UTC）です。
* `max(client_event_time)`はデバイスにより記録された最後のイベントの現地時間のタイムスタンプ（UTC）です。

また、[hidden](https://help.amplitude.com/hc/en-us/articles/360047138392#change-visibility-status-for-an-event-or-property)、[inactive](https://help.amplitude.com/hc/en-us/articles/360047138392#change-activity-status-for-an-event)および[deleted](https://help.amplitude.com/hc/en-us/articles/360047138392-Manage-events-and-properties#delete-and-undelete-events-and-event-properties)の各イベントはセッションの長さの計算に**含まれません**。例えば、次の一連のイベントがあるとします:

イベントA --> イベントB --> イベントC --> イベントD

イベントCとイベントDが[Govern](https://help.amplitude.com/hc/en-us/articles/360043750992)（データ管理）で非表示、非アクティブまたは削除となっている場合、`max(client_event_time)`はイベントDではなくイベントBから取得されます。

"