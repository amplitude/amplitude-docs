---
id: 336ce03f-8fbb-4201-a85d-2f92ffe12e60
blueprint: japanese_translation
title: 'よくある質問：Amplitude Experimentで相互排反グループを使用する'
title_en: 'FAQ: Using Mutual Exclusion Groups in Amplitude Experiments'
source: 'https://help.amplitude.com/hc/ja/articles/14753159500827'
---
Amplitude Experimentでは、実験を[相互排反](/docs/feature-experiment/advanced-techniques/mutually-exclusive-experiments)として設定できます。これは、ユーザーが同時に複数の実験を行うことができないことを意味します。例えば、実験Aが表示されたユーザーには実験Bが表示されず、その逆も同じです。

**注**：ローカル評価による実験は、ローカル評価による相互排反グループにのみ追加できます。

## 実験を開始する前に、相互排反グループを作成するのが良いですか？

はい。一般に、実験が開始された後にターゲットに影響する設定を変更することは避けるべきです。相互排反グループにアクティブな実験を追加すると、Amplitude Experimentがユーザーの割り当てを**再決定する**可能性があります。

## 
*[スロット％]*割り当てはユーザーターゲットにどのように影響しますか？

相互排反グループを作成する場合、**割り当ての割合を設定できます**。これは、ユーザーが実験に割り当てられる確率を指定します。例えば、割り当ての割合が25％であれば、ユーザーが実験に割り当てられる確率が25％であることを意味します。割合が均等に割り当てられ、合計が100％になることを確認します（この例では、4つの実験が同時に必要であり、それぞれが25％の割り当て割合となります）。

## Amplitude Experimentが相互排反を適用するのはいつですか？

Amplitude Experimentは、ユーザーを実験に割り当てると、次の特定の操作順序に従います。

`個々のユーザー資格→相互排反→スティッキーバケット→ターゲットセグメント`

Amplitude Experimentは、相互排反グループの**前に**個々のユーザー資格を考慮するため、同じ相互排反グループに属していても、`[個々のユーザー]`としてターゲットとされるユーザーに、複数の実験が表示される可能性があります。

**注：**詳細については、[Amplitude開発者センター](https://www.docs.developers.amplitude.com/experiment/general/evaluation/implementation/)をご覧ください。
