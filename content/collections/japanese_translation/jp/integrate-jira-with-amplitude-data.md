---
id: 1ecbcd9e-d657-40c8-817e-2380485ad6d3
blueprint: japanese_translation
title: 'JiraとAmplitude Dataを統合する'
title_en: 'Integrate Jira with Amplitude Data'
source: 'https://help.amplitude.com/hc/ja/articles/6816905540251'
---
Amplitude Dataでは、Jiraと統合することで、機能ブランチに変更を公開する度に新しいJira問題をすばやく作成できます。機能ブランチ内からのみ問題を作成でき、公開された変更だけをJiraチケットで関連付けることができます。

## 統合を設定する

統合を設定し、使用するには、次のステップに従ってください：

1. Amplitude Dataで、*設定 > 統合*に移動し、Atlassian Jiraパネルを見つけます。追加をクリックし、表示されるモーダルで、認証をクリックして、認証フローを開始します。*![image5.png](/docs/output/img/jp/image5-png.png)*

2. 別のモーダルが表示されます。ここでは、サイトのJiraアクセスを許可するように求められます。モーダルのドロップダウンから、承認するサイトを選択します。次に、*承認*  
をクリックします。

![image1.png](/docs/output/img/jp/image1-png.png)

## Amplitude DataでJira問題を作成する

Amplitude Dataから新しいJiraチケットを作成するには、次のステップに従ってください：

1. まず、機能ブランチを作成し、変更を公開します。 この統合は機能ブランチ内からのみ、また公開された変更でのみ使用できます。
2. 変更は、ホームページ下のソースでグループ化されます。 Jiraと正常に統合すると、Amplitude Data内で各ソースのJira問題を作成できます。  
![image4.png](/docs/output/img/jp/image4-png.png)
3. + Jiraを*クリックして*、新しい問題を作成するか、既存の問題を現在の変更にリンクさせます。  
![image6.png](/docs/output/img/jp/image6-png.png)
4. 機能ブランチから問題をリンク解除するには、問題タグにカーソルを合わせ、Jiraのリンクを解除をクリックします。表示されるモーダルで、*リンクを解除*をクリックして、リンク解除アクションを確認します。

![image3.png](/docs/output/img/jp/image3-png.png)

問題がソースにリンクされると、その後公開された変更は、Jira問題に自動的にコメントを残します。 
