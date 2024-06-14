---
id: d8177276-5096-4df0-863c-9c1c971ae0f8
blueprint: japanese_translation
title: 'Amplitude Experimentでランダム化がどのように機能するか'
title_en: 'How randomization works in the Amplitude Experiment'
source: 'https://help.amplitude.com/hc/ja/articles/360061687351'
---
|  |
| --- |
| この記事のテーマ：* 実験バリアントにランダムにユーザーを割り当てるために、Amplitude Experimentが使用するプロセスを理解する
 |

Amplitude Experimentは多様な**決定的ランダム化**を使用します。このランダム化では、Experiment IDが使用されます。これは、Experimentが各ユーザー(デバイスIDとユーザーIDに基づく)、およびフラグのバケティングソルトに割り当てるものです。

このランダム化モデルは2次元です: Amplitude Experimentは、`「bucketingSalt/amplitude_id」`のmurmur3ハッシュを実行します。また、そのハッシュを使用して、特定のユーザーがバリアントを割り当てるかどうかをまず決定し、2番目に、ユーザーにどのバリアントが割り当てられるかを決定します。

最初のステージ(つまり、初期割り当て)では、Experimentは、`mod(murmur3_x86_32("bucketingSalt/id", 100)`の値に基づいて、ユーザーを100バケットに分割します。返されたバケットがロールアウト率**未満**の場合、ユーザーは実験にバケットされます。この場合、ユーザーはバリアントを割り当てられます。ユーザーが実験に**バケットをかけていない**場合は、フォールバックバリアントが表示されます。

第2ステージ(バリエーション割り当て)では、Experimentは、実験にバケットされたすべてのユーザーを取り上げ、`floor(murmur3_x86_32("bucketingSalt/id"), 100)`の値に従って、各バリアントを割り当てます。

バリアントは、**ウェイト**に基づいて、0から42949672の値に関連付けられます。たとえば、2バリアント実験では、Variant Aにウェイト1があり、Variant Bにウェイト1がある状態で(つまり、各バリアントは実験のトラフィックの50%を受け取る)、ハッシュ値が0から21474835の場合、ユーザーはバリアントAに割り当てられます。その値が21474836から42949672の場合は、ユーザーはバリアントBに割り当てられます。
