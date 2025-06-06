---
id: 269afe44-764c-416e-93cd-68c9411b07b5
blueprint: japanese_translation
title: 'Amplitude Dataでのクロスプロジェクト分析'
title_en: 'Cross-Project Analysis with Amplitude Data'
source: 'https://help.amplitude.com/hc/ja/articles/14909802992283'
---
Amplitude Dataの**ポートフォリオ**機能では、複数のソースプロジェクトを1つのビューに結合することで、クロスプロダクト分析を作成できます。 

ポートフォリオアドオンでは、アナリティクスでポートフォリオを作成し、ポートフォリオのすべてのソースプロジェクト全体で集計されたデータを使用してチャートを構築できます。 詳細については、ヘルプセンターの記事[「Amplitude Analyticsでクロスプロジェクト分析を実施する」](/docs/admin/account-management/portfolio)をご覧ください。

Amplitude Dataで管理されるポートフォリオの行動は、Amplitude AnalyticsのGovernセクションで管理されるレガシーポートフォリオとは異なります。 その一例としては、従来のポートフォリオでは、デフォルトでユーザーがソースプロジェクトを優先したり、ポートフォリオ内のソースプロジェクトからイベントまたはプロパティメタデータを表示したりするようになっていなかったことが挙げられます。

この記事では、Amplitude Dataプロダクト内からのみ編集可能なポートフォリオについて説明します*。* Amplitude AnalyticsとAmplitude Dataが管理するポートフォリオの両方が、チャートを介してクエリされると同じ集計データを返します。

## ポートフォリオを作成する

Amplitude Dataでポートフォリオを作成するには、次のステップに従ってください。

1. Amplitude Dataのプロジェクトセレクターから、*[新しいPortfolioを作成]*をクリックします。  
  
![作成](/docs/output/img/jp/zuo-cheng.png)
2. 表示されるモーダルで、ポートフォリオに名前を付け、Amplitude Analyticsでプロジェクトを選択します。 完了したら、*[次へ]*  
  
![portfolio_in_amplitude_data_2.png](/docs/output/img/jp/portfolio-in-amplitude-data-2-png.png)  
  
をクリックします。
3. 次に、含めたソースプロジェクトの**スキーマに優先順位**を付けなければなりません。 これは、Amplitude Dataがスキーマで競合または相違に出会った場合に必要です。 それらを優先する順序は、Amplitude Dataが「真実のソース」とみなすスキーマを決定します。イベントまたはプロパティ名が複数のソースプロジェクトに存在する場合、Amplitude Dataはこのポートフォリオで優先されたプロジェクトからのメタデータを使用して表示します。  
  
スキーマに優先順位を付けるには、プロジェクト名を優先順位付け順序にドラッグするだけです。  
  
**注：**ソースプロジェクトからのイベントまたはプロパティのメタデータ（説明、カテゴリー、表示名、アクティビティ、可視性）は、デフォルトでAmplitude Dataが管理するポートフォリオに表示されます。
4. *[Portfolioを作成]*をクリックして、作成プロセスを完了します。

ポートフォリオでイベントとプロパティメタデータをカスタマイズする  

[オーバーライド](/docs/data/override-property)。

## 既存のポートフォリオをAmplitude Dataにインポートする

既存のAnalytics管理ポートフォリオをAmplitude Dataにインポートできます。 これを行うには、プロジェクトセレクターをクリックして、検索するか、「プロジェクト（アナリティクスで管理）」の下で検索して、インポートするポートフォリオを見つけます。

ポートフォリオがインポートされると、イベントとプロパティの既存の集計リストを表示できます。

**注：**Amplitude Dataは、**すべての**イベントとプロパティのインポートされたポートフォリオにオーバーライドを作成します。これにより、アナリティクス管理ポートフォリオのユーザーの既存のスキーマが維持されます。
