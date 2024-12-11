---
id: ced17401-c4a3-46fe-acf9-1538c0969d2d
blueprint: event-segmentation
title: イベントセグメンテーション分析を構築する
origin: 61370d33-6a3c-41a3-ba21-85ccaf8e861b
this_article_will_help_you:
  - '이벤트 및 속성을 사용하여 이벤트 세분화 분석 만들기'
  - イベントとプロパティを使用してイベントセグメンテーション分析を作成する
translated_on: 1733874866
---
ほとんどのユーザーにとって、イベントセグメンテーションはAmplitudeの基本的なチャートです。このチャートでは、ユーザーが製品内で何を行っているかが表示されます。イベントセグメンテーションチャートを使用すると、以下のような分析を構築できます。
* 選択した期間に最も多く発生したイベントを測定
* 選択した期間に最も多く発生したイベントを測定
* イベントがどのくらいの頻度でトリガーされているかを分析
* 貴社製品でイベントをトリガーするユニークユーザーの数を特定
* 特定のイベントをトリガーする傾向にあるユーザーを明らかにする
ほとんどの Amplitude チャートと同様に、イベントセグメンテーションチャートは、イベントとイベントプロパティをユーザーセグメントと組み合わせることで作成されます。 これらは、例えば特定のイベントを発生させたユーザー数をカウントするといった単純なものから、複雑なイベントの数式までさまざまです。
ほとんどの Amplitude チャートと同様に、イベントセグメンテーションチャートは、イベントとイベントプロパティをユーザーセグメントと組み合わせることで作成されます。 これらは、例えば特定のイベントを発生させたユーザー数をカウントするといった単純なものから、複雑なイベントの計算式までさまざまです。 

この記事では、Amplitudeでセグメンテーション分析を構築するために必要な手順の概要を説明します。
### 機能の可用性
機能の可用性
この機能は、**すべてのAmplitudeプラン**のユーザーがご利用いただけます。詳細は、当社の[pricing page](https://amplitude.com/pricing)をご覧ください。
この機能は、**すべての Amplitude プラン**のユーザーがご利用いただけます。詳細は、当社の[pricing page](https://amplitude.com/pricing)をご覧ください。
## 作業を開始する前に
## 作業を開始する前に

まだ[building charts in Amplitude](/docs/analytics/charts/build-charts-add-events)の基本を読んでいない場合は、先に進む前に読んでください。
この記事を参照して、[selecting the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement) についてお読みください。
[selecting the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement) についてはこちらの記事をご覧ください。
## イベントセグメンテーション分析の設定
## イベントセグメンテーション分析の設定
イベントセグメンテーション分析は、ユーザーの異なるグループが製品内で何を行っているかを示します。Amplitudeに、どのイベントに興味があり、どのユーザーを分析に含めるべきかを伝える必要があります。
イベントセグメンテーション分析では、ユーザーの異なるグループが製品内で何を行っているかが示されます。Amplitudeに、どのイベントに興味があり、どのユーザーを分析に含めるべきかを伝える必要があります。

{{partial:admonition type='note'}}
アクティブなイベントと非アクティブなイベントの両方をセグメント分析に含めることができますが、ほとんどのお客様はアクティブなイベントに焦点を当てた方が、Amplitudeのチャートがより洞察力に富んだものになると感じています。
{{/partial:admonition}}
イベントセグメンテーションチャートを作成するには、以下の手順に従います。
イベントセグメンテーションチャートを作成するには、以下の手順に従います。
1. イベントモジュールで開始イベントまたはメトリクスを選択します。 Amplitudeで計測された特定のイベントを選択することも、*Anyを選択して、任意のイベントを開始イベントとしてこの分析に含めるようAmplitudeに指示することもできます。
1. イベントモジュールで、開始イベントまたはメトリクスを選択します。 Amplitudeで計測された特定のイベントを選択することもできますし、利用可能なイベントのリストから「*Any Event*」を選択して、任意のイベントをこの分析の開始イベントとして考慮するようにAmplitudeに指示することもできます。 
 
    必要であれば、この時点で[create an in-line custom event](/docs/analytics/charts/event-segmentation/event-segmentation-in-line-events)または[create a new metric](/docs/analytics/charts/data-tables/data-tables-create-metric)することもできます。
2. 必要に応じて、開始イベントにプロパティを追加するには、「*+ Filter by*」をクリックし、プロパティ名を選択し、必要なプロパティ値を指定します。
2. 必要に応じて、開始イベントにプロパティを追加するには、「*+ Filter by*」をクリックし、プロパティ名を選択し、必要なプロパティ値を指定します。

    {{partial:admonition type='note'}}
    プロパティ値のリストには、過去30日間にプロジェクトに取り込まれたものも含まれています。
    {{/partial:admonition}}
 
3. 次に、必要に応じて、含める別のイベントを選択します。最大10個まで選択でき、これらのイベントにもプロパティを追加できます。
4. 「測定方法」モジュールで、結果をどのように測定するかを指定します。ユニークユーザー数とイベントの合計は最も一般的に使用されていますが、他にもいくつかのオプションから選択できます。詳細は
5. 「測定方法」モジュールで、結果をどのように測定するかを指定します。ユニークユーザー数とイベント総数は最も一般的に使用されていますが、他にもいくつかのオプションから選択できます。詳細は、下記[Choose the right measurement section](#h_01GVGPDKW7VFAVB62CNXJ8BVEC)を参照してください。
6. セグメントモジュールで、この分析に含めたいユーザーセグメントを特定します。 「保存済み」をクリックし、リストから必要なセグメントを選択することで、以前に保存したセグメントをインポートできます。 それ以外の場合は、Amplitudeが開始します。
7. セグメントモジュールで、この分析に含めるユーザーセグメントを特定します。 「*Saved*」をクリックして、リストから必要なセグメントを選択することで、以前に保存したセグメントをインポートできます。 そうでない場合は、Amplitudeは分析がすべてのユーザーを対象としているという前提から開始します。 
 
{{partial:admonition type='note'}}
選択したユーザーセグメントは、選択したすべてのイベントに適用されます。
{{/partial:admonition}}
6. 以前に保存したユーザーセグメントをインポートしたくない場合は、プロパティを追加して独自のセグメントを作成することができます。 これを行うには、*+ Filter by*をクリックし、追加するプロパティを選択し、プロパティ値を指定します。
6. 以前に保存したユーザーセグメントをインポートしたくない場合は、プロパティを追加して独自のセグメントを作成することができます。 これを行うには、*+ Filter by*をクリックし、追加したいプロパティを選択し、関心のあるプロパティ値を指定します。

7. Amplitudeに、特定のアクションをすでに実行したユーザーのみを含めたいと伝えることで、さらに絞り込みを行うことができます。これを行うには、*+ 実行*をクリックし、興味のあるイベントを選択します。

8. 必要に応じて、*+ Add Segment*をクリックし、ステップ6と7を繰り返して、別のユーザーセグメントを追加します。

{{partial:admonition type='note'}}
必要に応じて、セグメンテーションモジュールで「セグメントをグループ化」をクリックして、開始イベントをユーザープロパティ別に分割することができます。例えば、開始イベントをトリガーした際のユーザーの所在地（都市）別にユーザーをグループ化したい場合は、プロパティリストから「都市」を選択します。すると、Amplitudeが都市ごとにセグメンテーション分析を分割します。
{{/partial:admonition}}
チャートエリアに、イベントセグメンテーションチャートと結果の表形式ビューが表示されます。 
チャートエリアに、イベントセグメンテーションチャートと結果の表形式ビューが表示されます。 
[Read this article to find out how to choose the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement)。
[Read this article to find out how to choose the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement)。

[interpret your event segmentation analysis](/docs/analytics/charts/event-segmentation/event-segmentation-interpret-1)の使用方法については、このヘルプセンターの記事をご覧ください。