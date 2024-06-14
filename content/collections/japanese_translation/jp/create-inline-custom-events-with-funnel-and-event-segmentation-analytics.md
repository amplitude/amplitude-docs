---
id: 2f5014ce-5202-43de-8b88-941d4b80369a
blueprint: japanese_translation
title: ファネルとイベントセグメンテーション分析でインラインカスタムイベントを作成する
title_en: 'Create inline custom events with funnel and event segmentation analytics'
source: 'https://help.amplitude.com/hc/ja/articles/13321766657947'
---
#### この記事のテーマ：

* イベントセグメンテーションまたはファネルチャートから、複数の既存のイベントをカスタムイベントに結合する

分析では、複数のイベントを結合する要求がありますが、必要なイベントがわからない場合があります。 恒久的なカスタムイベントを作成して保存することなく、チャートコントロールでイベントの組み合わせを直接探索できます。 Amplitudeは、ファネルとイベントセグメンテーションチャートでイベントを結合するインラインORロジックを提供しています。

**注：**この機能はクローズドベータ版です。アクセス権を得るには、カスタマーサクセスマネージャーに連絡してください。

次のステップに従って、カスタムイベントを追加します。

1. ![](/docs/output/img/jp/MRXBP5ODtzqgEnLlw4KApeJtYs3yI4j_xqEglHuDTfone2Kke4CmuakZCtOC5zQ50CVxeA1qtZrrTR09CzLlukIBIM6_urw6YsnX-AmYIPEJKBh3vaK0K8Rz1IHLfHYPbiUe3DZfnHnKN_xBqbVcUTA)イベントサイドコントロールで をクリックし、イベントインラインを結合を選択します。

![](/docs/output/img/jp/-4kwHCRJq_nvW0E9oN9Y_JbirBp57tTdA5TE09o5UHb3XWt3Vx_rWP6A0e4C87r9LLOIk14GvHYr5554HS8HD1HPjYk0D9-O_qWjTZaswL24ICTPq5ti88C6sOXme80Qcj4Y77J8AyoPQZqsLrCA-uc)

2. 次に*イベントインラインを追加*をクリックして、カスタムイベントを追加します。 任意の数のカスタムイベントを追加します。

![](/docs/output/img/jp/rFM_7I88rsHivl7dYUFlLxirvXBSxjBv0yilzSTzFeznNiL4mVchXd5brDg0Xay_nsnlJx6jjm8arG1yu5g_FQUVjr6clxac2oNyh1Z32iSoncl0PHk3PzcvK8AixQXFA7qRX_iFmjMv8zU9aBrXK28)

**注**：作成するインラインイベントは、特定のチャートにのみ関連するため、カスタムイベントとして保存されない限り、他の場所ではアクセスできません。 

3. 必要に応じて、イベントにカーソルを合わせ、![](/docs/output/img/jp/ZwbrE-aEYlNqwYXo3JmP5_-5DxQL7U75usTphRdU88ISaZs3XpcGiillwYwDsVL8sk8LJgtVKgOSgs64thjZ2WAz4ApvW-ozbU18UsWNgUOxq7grcGo3lfQF29dOdXoA3My37_Q0cDZ8ljqN_VKKZ4M)をクリックしてイベントプロパティを追加します。各インラインイベントに必要な数のフィルタプロパティを追加します。

![](/docs/output/img/jp/2qGAw9uAmao0tp6ZE4c0Hyo3VXKt6VApaZNJE0LKdXPKLt2i-yeaFyfSM_vn_d0EtYOiVS2SxFmBNLPZy1cAFuTN5WNp_Aj6dQfWT1sMG63QJfh4i44oHfaHYs4KTzOZLN93vEmKMepdCZHkLT23e_w)

4. インラインイベントを[カスタムイベント](/docs/analytics/charts/group-events)として保存して、他のチャートで使用します。 ![](/docs/output/img/jp/MRXBP5ODtzqgEnLlw4KApeJtYs3yI4j_xqEglHuDTfone2Kke4CmuakZCtOC5zQ50CVxeA1qtZrrTR09CzLlukIBIM6_urw6YsnX-AmYIPEJKBh3vaK0K8Rz1IHLfHYPbiUe3DZfnHnKN_xBqbVcUTA)をクリックして、*[カスタムイベントを保存]*を選択します。

![inline_to_custom.png](/docs/output/img/jp/inline-to-custom-png.png)

5. 必要に応じて、![](/docs/output/img/jp/Y9JDZisQFX0iReFXznMOtqJUVcppUd7l5RxXZKvH2Bshtt4XYcAHArPKENBiWRR4rcMYsTArdZjZf-3qqAEtBz6_9r0UcJBAc2743WYljDtWt3iimrD-lBzl5W4QjmrtDMVqoRF7FGmzXMOFvyXvn10) をクリックし、プロパティとインラインイベントを削除します。

カスタムイベントには、他のカスタムイベントを含めることはできません。 また、*[ユーザージャーニーを表示]*、*[コンバージョンドライバーの検索]*、および*[ユーザーパスを表示]*は、マイクロスコープを介してのファネルのインラインイベントステップでは使用できません。
