---
id: 0fdebba9-4eac-447d-afa4-b5fc7a2921ca
blueprint: japanese_translation
title: 実験デザインフェーズ：新しい実験を作成する
title_en: 'Experiment Design Phase: Create a New Experiment'
source: 'https://help.amplitude.com/hc/ja/articles/360061687551'
---
|  |
| --- |
| この記事のテーマ：* 新しい実験を作成して初期化する
* 他のステークホルダーが理解できるように実験の説明にコンテキストを追加する
 |

**デザイン**フェーズでの決定は、実験の成功のためのステージを設定します。開始する前に、実験の目的と目標を深く考えることで、役に立つ実用的なインサイトを多く収集できるようになります。

新しい実験を作成するには、最初に[デプロイメントを作成し、SDKをインストールします](https://help.amplitude.com/hc/en-us/articles/360061270372)。次に、以下のステップに従ってください。

1. Amplitude Experimentを開いて、*[+新規]*をクリックします。*[新規作成]*フライアウトパネルで、*[実験]*を選択します。
2. [*実験を作成*]モーダルで、*[プロジェクト]*ドロップダウンメニューから、この実験を保存するプロジェクトを選択します。
3. 該当するフィールドに実験の名前と説明を入力します。  
  
**注：**Amplitude Experimentは、**フラグ**を使用して、プロダクト内に実験を含めることができます。これで、選択した名前から実験のフラグキーを自動的に生成します。このキーは、コードベースで使用されるフラグの識別子として機能します。
4. [実験の評価](https://www.docs.developers.amplitude.com/experiment/general/evaluation/local-evaluation/)モードは、*[リモート]*（Amplitudeサーバーで評価される）または*[ローカル]*のいずれかを指定します。次に、**この実験に使用するバケットユニットを**指定します。  
  
**ヒント：**適切なバケットユニットは通常、ユーザーです。ただし、一部のB2Bユースケースでは、バケットユニットとして会社のIDまたは都市を使用する場合があります。例えば、会社のIDでバケットを行うことで、特定の企業内のすべてのユーザーが同じユーザーエクスペリエンスを持つことが確実になります。どのユニットを選択しても、[処置に対する効果の安定性条件](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)が保たれていることを確認してください。
5. 完了したら、*[作成]*をクリックします。Amplitude Experimentが、実験用の空白のテンプレートを開きます。

この時点で、Amplitude Experimentが実験の[プラン]タブに移動します。実験目標パネルのバケットユニットと同様に、実験を作成する際に提供した情報が詳細パネルに記入されています。これらをダブルチェックして、正しいことを確認してから、次のフェーズである[実験目標の定義](https://help.amplitude.com/hc/en-us/articles/4405839607579-The-experiment-design-phase-Define-your-experiment-s-goals)に進みます。
