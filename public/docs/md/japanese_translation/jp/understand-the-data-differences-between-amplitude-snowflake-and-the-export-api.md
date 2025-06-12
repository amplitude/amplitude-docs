---
id: 31013466-89ae-4116-96b7-ee292d167510
blueprint: japanese_translation
title: 'Amplitude、Snowflake、Export APIの間のデータ違いを理解する'
title_en: 'Understand the data differences between Amplitude, Snowflake, and the Export API'
source: 'https://help.amplitude.com/hc/ja/articles/360043976571'
---
場合によっては、AmplitudeのデータとSnowflakeとRedshiftの両方のデータ、エクスポートAPIを使用してエクスポートされたデータの違いに気づくことがあります。多くの場合、各プラットフォームで使用する[イベント時間](/docs/analytics/user-data-lookup)に関連しています。[Snowflake](/docs/analytics/charts/other-charts/other-charts-amplitude-sql)では、[エクスポートAPI](https://developers.amplitude.com/docs/export-api)を使用してエクスポートされたデータと同様に、イベント時間はUTCタイムゾーンで指定されます。Amplitudeチャートに表示されるデータは、プロジェクトの[タイムゾーン設定](https://help.amplitude.com/hc/en-us/articles/360035522372#h_52731f6f-5c45-4c28-b1e1-5c0074f83ee5)によって異なります。

## AmplitudeとSnowflakeの違い

Amplitudeプロジェクトのタイムゾーン設定がUTCと異なる場合、Snowflakeのデータと比較して、Amplitudeチャートに表示されるデータに違いが見られる可能性があります。

データを比較する場合、同じクエリを比較する必要があります。例えば、Snowflakeでイベント合計のデータをクエリする場合は、イベントセグメンテーションチャートでイベント合計タブを確認する必要があります。詳細は、[AmplitudeのSQL](https://help.amplitude.com/hc/en-us/sections/360008683932-SQL-in-Amplitude)のヘルプセンターの記事を参照してください。

## AmplitudeとエクスポートAPIの違い

エクスポートクエリの指定された日付範囲は、イベントデータがAmplitudeサーバーにアップロードされた時刻です（`server_upload_time`の定義を参照してください）。

そのため、エクスポートAPIのデータと比較した場合、Amplitudeチャートに表示されるデータに違いを期待することができます。
