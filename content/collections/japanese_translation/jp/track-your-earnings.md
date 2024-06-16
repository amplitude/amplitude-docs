---
id: 58f67191-030c-4019-ad93-45ad7c41c824
blueprint: japanese_translation
title: 収益を追跡する
title_en: 'Track your earnings'
source: 'https://help.amplitude.com/hc/ja/articles/115003116888'
---
Amplitudeに収益イベントの送信を始める際は、いくつかの異なる構成オプションから選択できます。

**注：**Amplitudeは、現在**通貨コンバージョンをサポートしていません**。すべての収益データは、Amplitudeに送信される**前**に、選択した通貨に一致させる必要があります。

[収益プロパティ](/docs/analytics/charts/revenue-ltv/revenue-ltv-track-new-user-monetization)チャートに表示されます（検証済みイベントと未検証イベントの両方を含む）。収益イベントを送信する方法の詳細については、次のドキュメントを参照してください。

* [iOS SDK](https://help.amplitude.com/hc/en-us/articles/115002278527#tracking-revenue)
* [Android SDK](https://help.amplitude.com/hc/en-us/articles/115002935588#tracking-revenue)
* [Javascript SDK](https://help.amplitude.com/hc/en-us/articles/115001361248#tracking-revenue)
* [HTTP API](/docs/apis/analytics/http-v2)（`価格`、`数量`、`収益`フィールドを設定して、イベントを収益イベントとして記録する）
* [Amplitude Developer](https://developers.amplitude.com/#tracking-revenue)

Amplitudeは、送信したイベントとのみをカウントし、そのイベントはAmplitude取り込みシステムを介して処理されます。計算されたイベントは、**別途カウントされることはありません。**したがって、収益イベントに付属する追加のイベント（例：検証済み/未検証）は、制限対象として**カウントされません**。

## 収益プロパティ

Amplitudeで収益を追跡するには、以下の特定の情報が必要です。

* 直接アクセスできる`$revenue`プロパティ、**または**
* `$price`プロパティ。Amplitudeは`$price * $quantity`の数式を使用して収益を計算するため、`$quantity`プロパティも含めることがほとんどです。`$quantity`が存在しない場合、Amplitudeは、デフォルト値の1を使用します。

| **名称** | **種別** | **説明** | **デフォルト** |
| --- | --- | --- | --- |
| $revenue | 小数 | ユーザーの購入による総収益（マイナスになる場合があります）。収益LTVチャートに収益イベントを表示させたい場合は**必須**です。 | null |
| $price | 小数 | 購入されたプロダクトの価格（マイナスになる場合があります）。 | null |
| $productId | 文字列 | プロダクトの識別子。 | null |
| $quantity | 整数 | 購入したプロダクトの数量。 指定されない場合はデフォルトで1になります。 | 1 |
| $revenueType | 文字列 | 収益の種類（税、返金、所得など）。 | null |
| eventProperties | オブジェクト | 収益イベントに含めるイベントプロパティのオブジェクト。これらのプロパティをセグメント化できるのは、[イベントセグメンテーション](https://help.amplitude.com/hc/en-us/articles/230290208-Amplitude-2-0-Event-Segmentation)チャートのみです。 | null |

これらのプロパティは、収益イベントを記録する際に、AmplitudeのSDKまたはサーバーサイドを介して**ユーザーが**明示的に送信する必要があります。

## アプリ外の購入を追跡する

アプリ内購入**以外**の購入については、Amplitudeに収益データを送信する3つの方法があります。

* Amplitudeの[SDK](https://help.amplitude.com/hc/articles/205406607-SDKs)を使用して、`logRevenueV2`関数（`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益`イベントを生成）を呼び出す
* Amplitudeの[SDK](https://help.amplitude.com/hc/articles/205406607-SDKs)を使用して、`logEvent`関数を呼び出す（`$revenue`プロパティを含む場合）
* Amplitudeの[HTTP API](/docs/apis/analytics/http-v2)を使用する（`価格`、`数量`、または`収益`フィールドを設定することで、独自のイベント名を追加する必要があります。例：「購入完了」）。

**注：**検証済みの収益チェックは、アプリ内購入に対してのみ実行されます。

## アプリ内購入（in-app purchases、IAP）を追跡する

IAPを追跡するには、AmplitudeのSDKで`logRevenueV2`または`logEvent`（`$revenue`プロパティを含む）を使用して、通常の収益イベントを送信するのと同じ方法で収益イベントを送信します。違いは、収益イベントで領収書データを提出することで、IAPを実証できる点です。

### 収益検証を有効化する

収益検証を有効にするには、iTunes Connect Inアプリ購入共有シークレットまたはGoogle Playライセンス公開キーをAmplitudeのプロジェクトの[Data Sources](https://help.amplitude.com/hc/en-us/articles/360044835531)（データソース）セクションにコピーします。収益検証が必要な各Amplitudeプロジェクトにキーを含める必要があります。Amplitudeが収益イベントを検証するために、領収書データを提出する必要があります。詳細は、各SDKの検証ドキュメントを参照してください。

* [JavaScript SDK](https://help.amplitude.com/hc/en-us/articles/115001361248#tracking-revenue)
* [Android SDK](https://help.amplitude.com/hc/en-us/articles/115002935588#tracking-revenue)
* [iOS SDK](https://help.amplitude.com/hc/en-us/articles/115002278527#tracking-revenue)

Amplitudeには、SDK内の`logRevenue`コールに対応する3つの異なるタイプの収益イベントがあります。これらは、[HTTP API](/docs/apis/analytics/http-v2)を介してサーバーサイドに送信される収益イベントとは分離されています。

1. **![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益：**このイベントは、収益検証がオンになっているかどうかにかかわらず、常に収益イベントを記録します。ただし、このイベントは「$revenue」プロパティを入力することはありません。`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（検証済み/未検証）`イベントが行います。イベントを収益LTVチャートに表示させたい場合は、収益検証をオンにする必要があります。収益検証がオンになっており、対応する`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（検証/未検証）`イベントがないユーザーアクティビティストリームに`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益`イベントのみが表示される場合は、収益の検証に失敗したことを意味します。
2. **![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（検証済み）：**この検証済みイベントは、正当なトランザクションがあるたびに記録されます。結果として、`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益`と`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（検証済み）`の差は、行われた違法アプリ購入数になります。デフォルトでは、SDKに記録された収益イベントは、Amplitudeダッシュボードに未検証の収益イベントとして表示されます。`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（検証済み）`イベントを表示するには、収益検証を有効にする必要があります。
3. **![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（未検証）：**収益イベントが未検証だとしても、**検証に失敗したわけではありません**。HTTP API、Javascript SDKを介して提供されたか、またはプロジェクトに収益検証キーが含まれていなかったため、Amplitudeが検証を試みなかったことを意味します。検証がオンになっていない場合、このイベントは、すべての収益イベントで記録されます。

**注：**検証は、モバイルでのみオン・オフを切り替えることができます。ウェブは、常に`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益`と`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（未検証）`を追跡します。

Amplitudeは、検証に失敗した収益以外を表示します。つまり、例えば、SDKを介してモバイルとWeb両方の収益イベントを送信している場合、`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（検証済み）`と`![amplitude_logo.png](/docs/output/img/jp/amplitude-logo-png.png)収益（未検証）`の両方が表示されます。

### レシートの検証

Amplitudeは、[Apple](https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html#//apple_ref/doc/uid/TP40010573-CH104-SW1)または[Google](https://developer.android.com/google/play/billing/billing_integrate.html#Purchase)からの領収書に基づいて検証します。

### 差異

アプリストアとAmplitudeのレポート間の差異は、タイムゾーンの違い、イベント生成バグ、さらには海賊版などの要因に起因する可能性があります。

差異が軽微で、日常的に一貫している場合、最も可能性の高い原因は、アプリストアとAmplitudeのタイムゾーンレポートの違いです。AmplitudeはUTCを使用しているため、アプリストアが異なるタイムゾーンを使用している場合は、Amplitudeに従って特定の日にアップロードされた購入イベントが、アプリストアによって異なる日に発生していると報告される場合があります。データが失われることはありません。

大きな不一致がある場合、クライアントサイドのエラーの結果である可能性があります。例えば、1回の購入で店舗購入コールバックが複数回呼び出されるなどです。この現象への良い対処方法としては、店舗購入完了が返ってきた時のみ、これらのイベントを呼び出すことなどがあります。イベントプロパティと収益金額を追跡するコールの例を以下に示します。

```
AmplitudeClient.getInstance().logEvent('IAP', {type='Sale Special'})

```

```
AmplitudeClient.getInstance().logRevenueV2("com.company.productid", 1, 2.99)

```

大きな差異のもう1つの原因は、海賊行為です。ユーザーは、アプリストアを迂回し、アプリストアレポートに表示されない購入を行うことができます。海賊行為による収益イベントがデータに表示されないようにするために、Amplitudeの収益検証方法を使用して、収益イベントを追跡することをお勧めします。海賊行為によりデータが大きく歪んでいると思われる場合は、[こちら](https://help.amplitude.com/hc/en-us/requests/new)までご連絡ください。

### 開発者のための考慮事項

収益イベントの追跡に関しては、考慮すべき点がいくつかあります。詳細は、[Amplitude開発者](https://developers.amplitude.com/#tracking-revenue)センターでご確認ください。

* **下位互換性：**既存の`logRevenue`メソッドは引き続き機能しますが、非推奨です。古いメソッドで記録されたイベントからは、`revenueType`などのフィールドがなくなるため、これらの収益イベントをセグメント化する機能が、Amplitudeプラットフォームでは制限されます。
* **ユーザーを記録からオプトアウトする**：`setOptOut`を呼び出すことで、特定のユーザーの記録をオフにできます。

```
amplitude.getInstance().setOptOut(true);
```

これが有効になっている間は、イベントの保存またはサーバーへの送信は実行されません。オプトアウト設定は、ページの読み込み全体にわたって保持されます。以下を呼び出すことで、記録を再び有効化できます。

```
amplitude.getInstance().setOptOut(false);
```