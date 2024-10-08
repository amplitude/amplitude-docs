---
id: 6766e87d-0e5d-4217-8c10-c7c7c842c2a3
blueprint: japanese_translation
title: 'FAQ:ペルソナチャートはどのようにクラスターを計算するのですか？'
title_en: 'FAQ: How does a persona chart calculate clusters?'
source: 'https://help.amplitude.com/hc/ja/articles/360053937572'
---
以前、Amplitudeは[、K平均](https://en.wikipedia.org/wiki/K-means_clustering)アルゴリズムに依存して、ペルソナチャートのクラスターを生成していました。ただし、このアプローチには、2つの重要な制限があります:

1. これは異常値をうまく処理しないため、大きな頻度範囲の行動は、異常なエンゲージメントパターンを表す方向にクラスターがゆがめられる可能性があります。副産物として、クラスターは、より典型的な行動率内でニュアンスをキャプチャできない可能性もあります。
2. 「高次元」のデータがうまく処理されないため、顧客が多くの異なるイベントタイプを持っている場合、クラスターは、行動において似ていたユーザーのグループを表すことができない場合もあります。

このような理由から、私たちは、お客様がデータの中から意味のあるユーザー行動のパターンを特定するために、クラスタリングをより効果的に活用する方法を模索し始めました。その作業を通じて、最終的に、K-Meansを[非負のマトリックスファクトリックス](https://en.wikipedia.org/wiki/Non-negative_matrix_factorization)（NMF）に置き換えることにしました。

### 非マイクロマトリックスファクトリ化

データセットを考えると、クラスタリングアルゴリズムは、各パーティション内の類似性が最大になるようなパーティションの方法を探します。また、異なるパーティション間の同様性を同時に最小化するよう、セットをパーティション化する方法を探します。

元の「イベントスペース」で高次元の問題を避けるために、NMFは、より理解可能な「行動スペース」に到達するために、数学的次元減少を明示的に実行します。さらに、この方法は、頻度に基づいてイベントを計量し、各ユーザーのイベントカウントを正規化することで、異常値が出る確率を減少させます。よりシンプルな行動スペースに投影された場合、特定の行動次元に沿って類似のユーザーは、簡単にクラスター/グループ化されます。

注意:行動スペースの寸法の数は、指定されたクラスターの数です;この組み込みの接続のため、NMFクラスターは非常に階層的な傾向になります。

NMFの機能についての詳細は[、この記事](https://arxiv.org/pdf/1507.03194.pdf)を参照してください。
