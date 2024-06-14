---
id: bf50fd49-4c89-40fb-895b-8ee9096bc3ba
blueprint: japanese_translation
title: FAQ：イベントがFirefoxユーザーを取り込むのに失敗するのはなぜですか？
title_en: 'FAQ: Why does an event fail to ingest Firefox users?'
source: 'https://help.amplitude.com/hc/ja/articles/4403261888781'
---
Firefoxでは、**トラッキング保護**機能が標準モードで自動的に有効になります。ただし、Amplitudeはこの機能が「厳格に」切り替わる場合、またはプライベートブラウザウィンドウが使用されている場合には、イベントを記録することはできません。この機能は、クロスサイトトラッキングのトラッカーをブロックします。主な目的は、Webをブラウズするときにユーザーのプライバシーを保護することです。

「トラッキング保護と何であるか、トラッキングにどのように影響するか」については、[Mozillaのドキュメント](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop#w_what-enhanced-tracking-protection-blocks)をご覧ください。

この機能は、クロスサイトトラッキングを防止するように設計されているため、**Amplitude SDKをブロック**します。Firefoxはネットワークリクエストをブロックし、イベントが取り込まれないという結果になります。

Firefoxブラウザでトラッキング保護が有効になっている場合、次のエラーが表示されます。

POSTリクエストに失敗しました：

![image1.png](/docs/output/img/jp/image1-png.png)

Amplitudeのエンジニアリングチームによると、最良のソリューションは、プロキシサーバーを構築し、JS SDKポイントを作成することです。[プロキシを作成する方法については、ドキュメント](https://developers.amplitude.com/docs/domain-proxies)を参照してください。
