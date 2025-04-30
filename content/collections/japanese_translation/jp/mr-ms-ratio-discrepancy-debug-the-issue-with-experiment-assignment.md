---
id: 33b8ff24-c796-4774-b598-1cc5f9983e19
blueprint: japanese_translation
title: サンプル比率の不一致：実験割り当てで問題をデバッグする
title_en: 'Mr./Ms. ratio discrepancy: Debug the issue with experiment assignment'
source: 'https://help.amplitude.com/hc/ja/articles/8043418569371'
---
#### この記事のテーマ：

* サンプル比の不一致が何であるか、なぜそれが問題なのかを理解する
* 問題の根本原因を診断する

Amplitude Experimentでは、バリアントの**観測された**割り当てが、**指定された**割り当てと**大きく異なる**場合にサンプル比率不一致（SRM）が発生します。

例えば、実験のトラフィック割り当てを、コントロールと処置バリアントで均等に分割するように設定したが、コントロールが実験のトラフィックの55％を受け取るような場合です。

SRMがデータのバイアスを示し、解決されなければ、予期しない結果につながる可能性があります。一般的に、SRMの影響を受ける実験結果に注意してください。

SRMの潜在的な原因には、次のものがあります。

* インストルメンテーションエラー
* 実験の途中でトラフィック割り当てを変更する
* 実験の途中でバリアントを追加または削除する
* 実験の途中でスティッキーバケットをオンまたはオフにする

累計割り当てまたは露出チャートは、SRMの原因をトラッキングするのに役立ちます。コントロールと処置の時系列が乖離するタイムスタンプを探します。多くの場合、そこに原因があります。

場合によっては、SRMは**[バリアントジャンプ](https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/variant-jumping/)によって引き起こされます。**これは、同じユーザーに2つ以上のバリアントを表示するときであり、認証パターンが発生し、ユーザーにバリアントを割り当てられているかどうかを判断するのが困難になる場合があります。例としては、次のものがあります。

* 短期間セッションのアプリケーション
* 匿名ユーザーが多いアプリケーション

実際の実験期間よりも短い期間を分析すると、SRM警告が表示されることもあります。完全な実験ウィンドウで分析が同様の警告をトリガーしない限り、通常これらの警告は無視できます。

ユーザーは、*[分析]*タブのデータ品質ガイドでSRMの問題を確認できます。*[実装とインストルメンテーション]*をクリックして、検出されたSRM問題の数を表示します。

![sample-ratio_mismatch_detected.png](/docs/output/img/jp/sample-ratio-mismatch-detected-png.png)

Amplitude Experimentでサンプル比率の不一致をデバッグする方法の詳細については、Amplitude[開発者ドキュメント](https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/sample-ratio-mismatch/ "https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/sample-ratio-mismatch/")を参照してください。
