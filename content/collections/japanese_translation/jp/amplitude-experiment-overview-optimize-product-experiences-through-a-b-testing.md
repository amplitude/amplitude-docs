---
id: 307d7887-08f3-4864-9dae-efa431be89f8
blueprint: japanese_translation
title: 'Amplitude Experimentの概要：A/Bテストを通じてプロダクトエクスペリエンスを最適化する'
title_en: 'Amplitude Experiment Overview: Optimize Product Experiences through A/B Testing'
source: 'https://help.amplitude.com/hc/ja/articles/360061270232'
---
#### この記事のテーマ：

* 一般の実験の値と、Amplitude Experimentが御社のより良い意思決定とより良い製品の構築にどのように役立つかを理解する
* Amplitude Experimentで実験または機能フラグの作成に関連するコンセプトとプロセスに慣れる

プロダクトチームは何十年もの間、プロダクト調整の優先順位付けと実行の方法として、実験に依存してきました。しかし、それは決して簡単ではありませんでした。そのため、実験は多くの場合、プロダクトエクスペリエンス全体を最適化する全体像の変更を推進するのではなく、マージンに関する周辺の問題を微調整しているだけになっています。

Amplitude Experimentは、ワークフロー主導の行動実験プラットフォームであり、実際に**ロードマップを加速し**、お客様がより良い意思決定とより良い製品の構築に集中できるようにします。

Experimentでは、**固有オーディエンスに対する**プロダクトエクスペリエンスを、以下を通じて簡単に変更および構成できます。

* **プロダクト実験**：実験とA/Bテストを実行することで、**新しいユーザーのオンボード、チェックアウトエクスペリエンスの摩擦を軽減、新しい機能のロールアウトなどを行い**、主要なKPIを改善します。
* **プログレッシブ機能デリバリー**：ベータテスター、一定の割合のユーザー、または特定のターゲットオーディエンスのための新しい機能の**事前計画と**ステージングです。
* **ダイナミックなインプロダクトエクスペリエンス：**カスタムエクスペリエンスを**大規模に**展開および適応させます。

Amplitude Experimentは、フラグを通じて、**これらすべてを有効にします**。これは、コードを変更することなく、プロダクトのエクスペリエンスを変更できる簡単なセットアップスイッチです。それを使用して、製品で実験を設定したり、新しい機能をユーザーに直接ステージングしたり、またロールアウトしたりできます。コードは、Amplitude Experiment SDKまたはREST APIを使用して、Amplitude Experimentと通信します。

**注：**Amplitude Experimentは、すべての実験でデフォルトの[**逐次検定**](https://en.wikipedia.org/wiki/Sequential_analysis)統計モデルですが、代わりにT検定を選択できます。

この記事では、Amplitude Experimentワークフローのおおまかな概要について説明します。まず、**実験を作成**するワークフローから始めて、それに続いて、**機能フラグを作成**するワークフローについて説明します。

## 実験の作成：概要

多くの実験プログラムは、プロセスの最初のステップで失敗します。そして誰も、実験が解決するはずの問題を明らかにすることができません。実験を行っている理由を、単純明快な言葉で説明できないのなら、なぜ実験を行っているのでしょうか。そこから何か有益なことを学ぶことは現実的に期待できません。

他のことをする前に、時間を取って実験についての強力なミッションステートメントを考えてみてください。少なくとも、これらの2つの質問に答えてください：問題は何であって、そして実験を行うことで、その問題がどのように解決しますか？この段階で注いだ労力は、のちに大きな成功となってかえってきます。

ここまで終われば、実験を構成する準備が整います。これは、実験の新しい環境を作成（または以前に作成したものを選択）して、これから使用するSDKをインストールするという意味です。

### 仮説を作成する

次に、実験のミッションステートメントに戻ります。これは、実験の仮説の基礎となります。仮説とは何でしょうか？それは、実験がどのように結果として出てくるかを予測することです。それで実験が成功するか、または失敗するかを知ることができます。

しかし、この**問題**ステートメントは、仮説の最初の部分に過ぎません。他にも2点：提案された**ソリューション**、そして予測された**結果**があります。前者は基本的に、問題を解決する変更の説明です。例えば、2つのオンボーディングプロセスのステップを1つに統合するなどです。後者は、結果として何を期待するかです。つまり、「オンボーディングチャーンの20%低減」などです。

以下は仮説ステートメントの例です

「当社のオンボーディングファネルにおけるユーザーチャーンは、業界平均よりも大幅に高いです。プロダクトデータは、ファネルがわかりにくい可能性があると示しており、ファネルで2、3のステップを連結すれば、これを修正できると思います。この変更の結果、オンボーディングチャーンは20%減少すると予想されます。」

使用する仮説ステートメントは、特に問題定義の段階で人によって異なるでしょう。たとえば、あなたの質問は、性質上もっと調査を要するもの、つまり「なぜ多くのユーザーが当社のオンボーディングファネルから脱落するのか？」であったり、既にわかっている問題の異なるソリューションをテストすることに、より関心があるのかもしれません（「既知のユーザーの、なかなか解決しない問題を修正するために、いくつかの潜在的なUIの変更を思いつきましたが、どれが最も有効でしょうか?」など）。それでも、この基本テンプレートは、特に実験が初めての場合には、従うべきものです。

### 指標を選ぶ

その仮説ステートメントの最後の文を見てください。気づいたことは何かありますか？一つには、オンボーディングチャーンが20%減少する、のようにユーザーの行動の変化を期待する特定の測定値が含まれています。これは、実験が成功するかどうかを決定するものです：つまり、この数字になるか、ならないかということです。

ですが、どうやって知るのでしょうか？チャーンが減少することを測定する方法が必要です。そうするには、**指標**が必要になります。Amplitude Experimentでは、Amplitude Analyticsにログインしたイベントは、どれも実験の指標として使うことができます。上記の実験例では、指標としてファネルのドロップオフを追跡するために、お手持ちの製品が使用するイベントを使います。

### バリアントを作成する

この時点で、新しいオンボーディングプロセスをすべてのユーザーにロールアウトするだけで、何が起こるかを確認することができます。しかし、そうする場合、オンボーディングチャーン率が改善しても、そのプロダクト変更が原因だったのかどうかまではわかりません。さらに、新しいファネルをロールアウトした後に、そのレートが*悪化*した場合はどうなるでしょうか？それは、デザインの選択の失敗、偶然の可能性、または考慮していない外部要因があったからかもしれませんが、理由を知ることはできません。

ですから、実験用に**少なくとも1つの**バリアントを作成する必要があります。バリアントとは、簡単に言うと、一定の割合のユーザーに表示される別のユーザーエクスペリエンスです。使用例に従うと、ここでのバリアントは、オンボーディングプロセスの新しく合理化されたバージョンです。それがわかるユーザーもいますが、他のユーザーは代わりに現在のプロセス（別名：**コントロール**）を目にすることになります。これは、実験の成功を決定する各バリアントにユーザーがどのように応答するかの違いです。

バリアントを考え出すときは、各々の変化の数を低く保つとよいでしょう（数を1まで減らすことができれば、それに越したことはありません）。また、バリアントがそれぞれ違うことを確認できるようにするのもよいでしょう。このようにして、各バリアントセグメントのユーザーが互いにさまざまな方向から製品を経験していることを確認することができます。また、変化がセグメント間での行動に違いをもたらすことも確認できます。

### バリアントを誰が見るのかを決定する

次に、バケット単位、つまり、同じバリアントをどのグループの人が見るかの決定要因を解読できるようになります。最も一般的なバケット単位は「ユーザー」です。 ただし、B2Bビジネスである場合、またはコラボレーション機能を使用している場合は、「組織」またはcompany\_idなどのバケット単位を使用する場合があります。このことは、同じ組織内のすべてのユーザーが同じバリアントを表示することを意味します。 これにより、同僚の隣に座っている場合に、異なるユーザーインターフェースによって引き起こされるプロダクト関連の混乱を軽減するのに役立ちます。 company\_idでバケットを行うもう1つの理由は、カスタマーサポートチームの負荷の軽減です。カスタマーサポートチームは、どのアカウントでどの機能が有効になっているかを把握しやすくなります。いずれにせよ、アサーションを確実にするためには、選択したパケット単位に対して、安定単位処理値アサーション（[SUTVA](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)）が確実に適用されていることを確認する必要があります。

**注**：組織がAccountsアドオンを[購入している場合は](/docs/analytics/account-level-reporting)、ユーザーではなくグループでバケットと分析を実行できます。

### ユーザーを割り当てる

バリアントが完了しました。次に、それらを見るユーザーの数を決定する必要があります。実験をユーザーベース全体にロールアウトするか、またはその一部だけにロールアウトできます。実験で何人のユーザーがコントロールを見るか、そして何人がバリアントを見るかを指定します。実験に含める、または除外する特定のユーザーセグメントを定義できます。また、個々のユーザー、あるいはデバイスIDに向けた特定のエクスペリエンスを選択することもできます。

### 実験を有効にする

この時点で、実験をユーザーにロールアウトする準備が整います。トグルスイッチを*[有効]*にするだけで、実験が有効になります。以上です！

### 結果を分析する

実験が完了したら、いつでも結果を生成および表示することができます。実験は、**統計的有意**に達したときにそのことを通知します。また、結果を分析および解釈するのに必要なデータが得られるので、そこから学習したものを今後のプロダクトエクスペリエンスに適用します。

実験の設計、ロールアウト、学習についての詳細は、[実験のワークフローに関するヘルプセンターの記事](/docs/experiment/workflow/create)を参照してください。

## 機能フラグの作成：概要

一方、フェーズド機能のロールアウトを計画する場合、ワークフローはさらにシンプルになります。プロダクトでユーザー行動について質問していないため、仮説の作成、指標の選択、結果の分析などを心配する必要はありません。機能フラグを**作成するだけです**。

**注意：**舞台裏では、実験とフラグは非常に似ていますが、基本的な違いは以下のようになります:実験は、ビジネスに適したものを構築しているかを確認するのに役立ちます。機能フラグでは、シームレスな機能をリリースおよびロールバックできます。両方で同様のアプローチができますが、それについては別々に考える必要があります。また、おそらくワークフローにもそうしたことを反映させるべきでしょう。

環境を構成したら、バリアントの作成に進みます。基本的な考えは変わりません。つまり、一部のユーザーには見えるが、その他のユーザーには見えない、新しい、異なるプロダクトエクスペリエンスです。しかし、異なるユーザーセグメントが異なるユーザーエクスペリエンスにどのように反応するかを探るのではなく、最初に新しい機能にアクセスできるユーザーを選択します。機能フラグを処理する場合、このバリアントは、ユーザーベース全体にまだリリースされていない新しい機能のコードを表します。

実験を行っている場合と同様、まだ希望のバリアントにユーザーを割り当てられます。フラグを有効にするのは、実験を切り替えるのと同じくシンプルです。

[機能フラグとそれがAmplitude Experimentでどのように動作するかについての詳細](/docs/experiment/workflow/feature-flag-rollouts)は、ヘルプセンターの記事を参照してください。

## 古い実験とフラグを削除する

もはや必要のなくなった実験と機能フラグを削除するのは簡単です。*[有効]*トグルスイッチの横にあるドロップダウンメニューから*[アーカイブ]*を選択します。

![experiment_delete.gif](/docs/output/img/jp/experiment-delete-gif.gif)