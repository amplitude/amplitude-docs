---
id: 86b4aed1-4130-4a1b-b8a1-5f6b9802164b
blueprint: japanese_translation
title: 派生プロパティ
title_en: 'Derived Properties'
source: 'https://help.amplitude.com/hc/ja/articles/5874857623707'
---
#### この記事のテーマ：

* 派生プロパティが分析にどのように役立つかを理解する
* 派生プロパティを作成する際に使用できる関数と演算子を確認します。

あるケースでは、Amplitudeに送信されなかったプロパティに基づいて分析を実行することがありますが、それは既存のプロパティから派生させることができます。Amplitude Dataの**派生プロパティ**を使用して、新規イベントとユーザープロパティを遡及的に作成できます。複数の既存プロパティにまたがって適用できる関数と演算子を使用します。これらは、生データに影響を与えず、その場で計算されます。

例えば、ショッピングカートに追加されたアイテムが割引対象かどうかでグループ化するチャートを作成することができます。その場合、価格が一定額を超えるかどうかに基づいて、値がブール値である派生プロパティを作成することができます。

![Screen_Shot_2021-08-03_at_2.35.25_PM.png](/docs/output/img/jp/screen-shot-2021-08-03-at-2-35-25-pm-png.png)

## 派生プロパティを作成する

**注：**派生プロパティの作成は、プロジェクトの`メイン`ブランチで行う必要があります。

派生プロパティを作成するには、次のステップに従ってください：

1. Amplitude Dataで、*[Properties]*（プロパティ）に移動し、*[Derived]*（派生）タブをクリックします。
2. *[+ Add Derived Property]*（+派生プロパティを追加）をクリックします。
3. *[新しいプロパティを派生する]*モーダルで、新しいプロパティ名（必須）と説明（オプション）を入力します。
4. 数式を入力します。有効な関数と演算子のリストについては、下記を参照してください。
5. *[Save]*（保存）をクリックします。

## 結果をプレビューする

入力した数式が有効である限り、数式エディタの下のスペースで結果をプレビューすることができます。そうするには、数式で使用するプロパティの既存の値を選択するか、または自由形式の値をテストしてください。*[Create/Edit]*（作成/編集）モーダル、または、保存された派生プロパティのサイドパネルから実行できます。

![Screen_Shot_2021-08-03_at_12.46.09_PM.png](/docs/output/img/jp/screen-shot-2021-08-03-at-12-46-09-pm-png.png)

## 派生プロパティの使用例

以前の参照URLの例では、次のような文字列演算子を使用して数式を書くことができました：

`SPLIT(referrer_url, "/", 2)`

この式は、例えば、値「<https://www.google.com/search?q=amplitude>」を、値「[www.google.com](http://www.google.com)」に変換します。" しかし、これをさらに簡素化して、単に「google」だけにしたらどうなるでしょうか？これは、別のSPLIT関数内でSPLIT関数の結果をラップすることによって、実行できます。結果として出てくる数式は次のようになります:

`SPLIT(SPLIT(referrer_url, "/", 2), ".", 1)`

Amplitudeは、数学演算子もサポートしています。たとえば、小計とTipプロパティを含むイベントがあり、合計額に基づいていくつかの分析を実行したいとしましょう。次のように実行できます：

`SUM(subtotal, tip)`

合計注文サイズが$50を超えた場合、割引注文がいくつあるかを知りたいと思うようになるかもしれません。この数式には、特定の注文が割引を受け取るかどうかが表示されます：

`IF(SUM(subtotal, tip) >= 50, true)`

**注意：** 派生プロパティを使用するクエリは、数式の複雑さに応じて、クエリ時間が長い場合があります。派生プロパティごとに、最大10のプロパティ参照の制限もあります。

## 関数と演算子

### 文字列関数

| **関数** | **説明** | **例** | **結果** |
| --- | --- | --- | --- |
| REGEXEXTRACT (text\_property, regular\_expression) | regular\_expressionに一致する文字列を抽出する | REGEXEXTRACT("shirt-150", "[0-9]+") | "150" |
| REGEXREPLACE (text\_property, regular\_expression, replacement\_text) | replacement\_expressionと一致するテキストであるプロパティの値を、replacement\_textと一致するテキストのそれで置き換えます。 | REGEXREPLACE("en-US", "-.\*", "") | "en" |
| CONTACT(property1, property2) | 別のプロパティまたはテキスト値で、プロパティを連結します。 | CONTACT("firstName", "lastName") | "firstName lastName" |
| LOWERCASE (text\_property) | プロパティの値のすべての文字を小文字にする | LOWERCASE("John") | "john" |
| UPPERCASE (text\_property) | プロパティの値のすべての文字を大文字にする | UPPERCASE("John") | "JOHN" |
| SPLIT (property, separator, [index]) | 区切り文字に基づいてプロパティを割り出し、分割要素の配列を返します。その索引の要素を返すオプションの索引を取ります。 | SPLIT("a\_b\_c", "\_")
 
SPLIT("john@example.com", "@", 0)  | ["a", "b", "c"]
 
"john" |
| REMOVE (property, text) | プロパティのテキストのすべての発生を削除する | REMOVE("en-US", "en-") |   |
| EXTRACT\_FROM\_DICT (property, text) | 特定のキーに基づいて、辞書文字列から値を抽出する | EXTRACT\_FROM\_DICT("{'id': 1, 'name': 'John', 'country': 'US'}", "name") | "John" |

### 数学関数

| **関数** | **説明** | **例** | **結果** |
| --- | --- | --- | --- |
| SUM(num\_property1, num\_property2) or ADDITION( | 他のプロパティまたは数字を持つプロパティを加算します。`+`演算子と同等 | SUM(subtotal, tip) >>>  SUM(10, 2) | 12 |
| MINUS(num\_property1, num\_property2)または減算( | 他のプロパティまたは数字を持つプロパティを減算します。`-`演算子と同等。 | MINUS(total, tip) >>> MINUS(12, 2) | 10 |
| MULTIPLY (num\_property1, num\_property2) | 他のプロパティおよび/または数字を持つプロパティを掛算します。`\*`演算子と同等。 | MULTIPLY(price, quantity) >>> MULTIPLY(2.50, 4) | 10 |
| DIVIDE(numerator, denominator) | 別のプロパティまたは数で、プロパティを割算します。`/`演算子と同等。 | DIVIDE(calorie\_intake, calorie\_goal) >>> DIVID(1000, 2000) | 0.5 |
| POWER(num\_property, exponent) | 指数累乗にプロパティ値を取ります。 | POWER(property, 3) >>> POWER(2, 3) | 8 |
| MIN(num\_property1、num\_property\_2) | 2つの数字間の最小値を返します。 | MIN(5、10) | 5 |
| (num\_property1、num\_property\_2) | 2つの数字間の最大値を返します。 | MAX(5、10) | 10 |
| CEIL(num\_property) | 最も近い整数に切り上げます。 | CEIL(3.8) | 4.0 |
| FLOOR(num\_property) | 最も近い整数に切り下げます。 | FLOOR(3.8) | 3.0 |

### オブジェクト関数

| **関数** | **説明** | **例** | **結果** |
| --- | --- | --- | --- |
| EXTRACT\_FROM\_DICT (property, text) | 特定のキーに基づいて、辞書文字列から値を抽出する | EXTRACT\_FROM\_DICT("{'id': 1, 'name': 'John', 'country': 'US'}", "name") | "John" |

### 日付/時間関数

**注：**Amplitudeでは、すべてのUnixタイムスタンプをミリ秒単位で表現する必要があります。

| **関数** | **説明** | **例** | **結果** |
| --- | --- | --- | --- |
| DATE\_TO\_LONG (date\_property) | 日付をUNIXタイムスタンプに変換する | DATE\_TO\_LONG("2020-12-01") | 1606780800000 |
| TIME\_TO\_LONG (time\_property) | 日付時間（YY-MM-dd[T]HH:mm:ss）をUNIXタイムスタンプに変換する | TIME\_TO\_LONG("2020-12-01 12:00:00") | 1606780800000 |
| LONG\_TO\_TIME (number\_property) | UNIXタイムスタンプを日付・時間に変換する | LONG\_TO\_TIME (1606780800000) | "2020-12-01 12:00:00" |
| LONG\_TO\_DATE (number\_property) | UNIXタイムスタンプを日付に変換する | LONG\_TO\_DATE (1606780800000) | "2020-12-01" |
| DATE\_TIME\_FORMATTER (datetime\_property, old\_format, new\_format) | 日付プロパティのフォーマットを新しいフォーマットに変換します。
詳細については、[Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html)を参照してください。 | DATE\_TIME\_FORMATTER ("05.01.2021 12:00:00:000", "MM.dd.yyyy hh:mm:ss:SSS", "yyyy/MM/dd") | "2021/05/01" |
| 今日() | 現在の日は、UTCのエポック時間でロングとして表されます。 | 今日() - start\_date\_in\_ms >>> 1609459200000 - 1577836800000  | 31622400000 |
| EVENT\_HOUR\_OF\_DAY() | イベントのタイムスタンプから時を取得します。(0-23) | EVENT\_HOUR\_OF\_DAY()  | 10 |
| EVENT\_DAY\_OF\_WEEK() | イベントのタイムスタンプから曜日を文字列として取得します。例：月曜日 | EVENT\_DAY\_OF\_WEEK() | Monday |

### 配列関数

配列プロパティから作成された派生プロパティで計算を行う場合、Amplitudeは、最初の子だけを配列プロパティとみなし、他の子は配列プロパティであっても最初の値のみを考慮します。

以下に例示します。

```
Example 1  
 propA = [1,2,3], propB = [a,b,c]  
 CONCAT(propA, propB) = [1a, 2a, 3a]  
Example 2  
 propA = [1, 2, 3], propB = [a]  
 CONCAT(propA, propB) = [1a, 2a, 3a]  
Example 3  
 propA = [1], propB = [a, b, c]  
 CONCAT(propA, propB) = [1a]
```

| **関数** | **説明** | **例** | **結果** |
| --- | --- | --- | --- |
| ITEM\_COUNT (property) | 配列プロパティの長さ。配列プロパティ以外はデフォルトで1になります | ITEM\_COUNT(products\*)
 
*\*products is an array property (e.g. ['apple', 'orange', 'banana'])* | 3 |
| GREATEST(property) | 配列の最大値を取得します | GREATEST(prices\*)
 
*\*pricesは配列プロパティです（例：[3.5, 10, 2])* | 10 |
| LEAST(property) | 配列の最小値を取得します | LEAST(prices\*)
 
*\*pricesは配列プロパティです（例：[3.5, 10, 2]）*
  | 2 |
| COALESCE(property) | 配列の最初の非null値を取得します | COALESCE(locations\*)
 
*\*locationsは配列プロパティです（例：[null, 'California', 'New York']）*
  | 'California' |

### 条件演算

| **演算** | **説明** | **例** |
| --- | --- | --- |
| IF(logical\_expression, value\_if\_true, value\_if\_false) | logical\_expressionが真の場合は、value\_if\_trueを返します。そうでない場合は、value\_if\_falseを返します | IF(price == 0, "true", "false")
IF(property == "(none)", "Property was not set", "Property was set")
IF(OR(region == "California", region == "New York"), "USA", "Other") |
| AND(logical\_expression\_1, logical\_expression\_2) | 返り 両方の論理式が真の場合、Trueを返し、そうでない場合はfalseを返します | AND(is\_subscribed == "true", has\_valid\_promo == "true") |
| OR(logical\_expression\_1, logical\_expression\_2) | 理論式が真の場合は、Trueを返します。そうでない場合は、falseを返します | OR(has\_email == "true", has\_phone == "true") |
| SWITCH(expression, case\_1, value\_1, [case\_2, value\_2 ...], [default]) | 式を評価し、定義されたケースに基づいて値を返します。定義された場合、ケースが満たされない場合、デフォルト値を返します。そうでない場合は、nullを返します。 | SWITCH(tier, "gold", 2, "silver", 2, "bronze", 1, 0) |

### String/numerical operators

| **演算** | **例** |
| --- | --- |
| == | action == “purchase” |
| != | item\_count != 0 |
| contains | email contains “@gmail.com” |
| does not contain | title does not contain “officer” |
| <, <=, >, >= | duration >= 60 |
| glob match | url glob match “https://www.google.\*/\*” |
| glob does not match | query glob does not match “\*/query=\*“ |
| has prefix | title has prefix “sir” |

### 演算子を設定する

*セットリテラル（例：("apple", "orange")）は演算子の右側に表示する必要があります*

| **演算** | **例** |
| --- | --- |
| == | IF(product == (“apple”,“orange”), "true", "false")
*product = “apple”は"true"を返します* |
| != | IF(product != (“apple”,“orange”), "true", "false")
*product = “banana”は"true"を返します* |
