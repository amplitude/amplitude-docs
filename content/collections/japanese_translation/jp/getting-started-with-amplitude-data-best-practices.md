---
id: d53cffb3-acf8-4721-ad9f-cf80893d7e81
blueprint: japanese_translation
title: 'Amplitude Dataを始める：ベストプラクティス'
title_en: 'Getting Started with Amplitude Data: Best Practices'
source: 'https://help.amplitude.com/hc/ja/articles/5078704508571'
---
#### この記事のテーマ：

* Amplitude Dataを初めて使用する場合の一般的な障害と問題を回避する

Amplitude Dataを最大限に活用するには、一定の時間をかけて、適切な基礎を築くことが重要です。以下のベストプラクティスを推奨します。

## 目標と指標から始める

最初に目標と指標から始めると、どのイベントとプロパティを収集すべきか、計測のためにどう優先順位をつけるかを決定するのに役立ちます。このプロセスの詳細については、Amplitude Dataで [トラッキングプランを作成するヘルプセンターの記事をご覧ください](/docs/data/create-tracking-plan)。

## シンプルで一貫性のあるものに保つ

イベントとプロパティ名は、シンプルでわかりやすいものであるべきです。コードを書くときと同じように、最初から一連の規約を設定することで、全員がデータを理解しやすくなります。これには、イベントとプロパティの命名規則が含まれ、アカウントタクソノミーで設定できます。

## ユーザーを正しく識別する

ユーザーを識別するときは、Eメールを別個のIDとして使用しない。Eメールアドレスは時間の経過とともに変化し、その際に分析が正確ではなくなり、信頼性が低下します。代わりに、データベースで使用する同じUUIDを使用します。そして、ユーザーがプロダクトにログインしたら、エイリアスを与え、以前の匿名イベントを確実に関連付けます。

## イベントをどこで収集するかを決定する

サーバーなのか、クライアントなのか、イベントを収集する場所を選ぶ必要があります。サーバーでイベントを収集する方がより信頼性は高くなりますが、IPやユーザーエージェント、リファラー、UTMパラメータなどユーザーに関する情報へのアクセスは減ります。また、クライアント側でイベントをトラッキングすると、広告ブロッカーのようなものに脆弱になる可能性があります。主要イベントをトラッキングするにはサーバー上で行うことを推奨し、イベントを取り巻くコンテキストを理解する必要がある場合にのみ、クライアント上でイベントを収集することを勧めます。

## イベントプロパティとユーザープロパティを追加する

イベントまたはユーザーと関連付けられたすべての詳細を明確にするため、プロパティを使用します。プロパティは、データのコンテキストを説明し、アナリストがグループ化、フィルタリング、コホートを作成することを可能にします。プロパティは、2つに分類されます。イベント別（購入イベントと連動した収益など）とユーザー別（ユーザーに関する人口統計情報など）です。ほとんどのイベントとユーザーは、複数のプロパティが関連付けられていますが、シンプルさを保ちます。

## 開発環境と本番環境を分離する

開発環境からイベントを送信して、データを劣化さないでください。Amplitudeの[デスティネーション]で設定する、個別のアクセストークンを確実に使用してください。

## CI/CDのQA分析

ソースをリントするため、[Ampli](/docs/data/use-ampli)ステータスを実行して、実装が仕様と一致するかを検証します。分析のバグを修正したり、手動でQA分析を行う必要はありません。

## オーナーを指名する

最後に、チームの誰かを指名して、トラッキングプランのオーナーシップを取得します。オーナーがいなければ、トラッキングプランが期限切れになるリスクが高まり、分析の質が低下します。
