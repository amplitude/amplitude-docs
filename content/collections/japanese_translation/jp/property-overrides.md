---
id: d91bf9d5-73e1-4f6a-8a7a-94fa6fe83ca2
blueprint: japanese_translation
title: プロパティのオーバーライド
title_en: 'Property Overrides'
source: 'https://help.amplitude.com/hc/ja/articles/10831335547035'
---
#### この記事のテーマ：

* プロパティのオーバーライドの利点を理解する
* プロパティをオーバーライドする方法を知る

プロパティの詳細のオーバーライドは、特定のイベントのプロパティやプロパティグループをカスタマイズしたいときに便利です。**元の**バージョンを更新したり、完全に新しいイベントプロパティを作成したりすることなく、必要な部分に変更を加えることができます。

プロパティテーブルの各プロパティは、元のバージョンを表し、複数のイベントやプロパティグループで共有できます。Amplitude Dataは、プロパティの詳細に加えられた変更を、同じ詳細を使用している**すべてのイベントとプロパティグループ**に適用します。特定のイベントまたはプロパティグループでプロパティをオーバーライドした場合は、そのイベントまたはプロパティグループに**のみ**プロパティの変更が適用されます。

## プロパティのオーバーライド

特定のイベントのプロパティをオーバーライドするには、次のステップに従ってください。

1. *Events*（イベント）テーブルに移動し、イベントの名前をクリックします。
2. 開いたイベント詳細パネルで、*[Details]（詳細） > [Properties]（プロパティ）*に移動します。次に、オーバーライドするプロパティをクリックします。
3. 開いたイベントプロパティの詳細パネルで、*[Override]*（オーバーライド）をクリックします。プロパティの変更がそのイベントにのみ適用されることを確認するメッセージが表示されます。

プロパティグループのプロパティをオーバーライドするには、次のステップに従ってください。

1. *[Properties]*（プロパティ）から*[Event Properties]*（イベントプロパティ）タブを開き、イベントプロパティテーブルを表示します。
2. *[Property Groups]*（プロパティグループ）をクリックして、プロパティグループテーブル表示に切り替えます。次に、プロパティグループ名をクリックします。
3. 開いたプロパティの詳細パネルで、*[Details]（詳細） > [Properties]（プロパティ）*に移動し、オーバーライドするプロパティをクリックします。
4. 開いたイベントプロパティの詳細パネルで、*[Override]*（オーバーライド）をクリックします。

**注：**プロパティグループでオーバーライドされたプロパティの変更は、そのプロパティグループを使用するすべてのイベントに適用されます。

オーバーライドが必要なくなったときはいつでも、[オーバーライドされたプロパティを元に戻す](/docs/data/override-property)ことができます。