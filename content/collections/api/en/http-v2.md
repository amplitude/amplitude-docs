---
id: 1a944881-9630-4422-9cb7-836651db6ec4
blueprint: api
title: 'HTTP V2 API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/'
auth_method: api_key
standard_endpoint: 'https://api2.amplitude.com/2/httpapi'
eu_endpoint: 'https://api.eu.amplitude.com/2/httpapi'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-6fc3a3e5-1c69-4ffc-ba78-09c217a14472?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: |-
  Use the HTTP V2 API to send data directly from your server to the HTTP V2 endpoint.

  The HTTP V2 API replaces the deprecated HTTP API.
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312330
api_status: ga
summary: 'Send data directly from your server to the HTTP V2 endpoint.'
---
## Considerations
Keep the following in mind as you use the HTTP V2 API.

### Upload limit

**For Starter plan customers:**

Limit your upload to 100 batches per second and 1000 events per second. You can batch events into an upload, but we recommend not sending more than 10 events per batch. Amplitude expects fewer than 100 batches per second, and the 1000 events per second limit still applies.

**For customers on Growth and Enterprise plans:**

Keep request sizes under 1 MB with fewer than 2000 events per request. When you exceed these size limits, you get a 413 error.

If you have high volume and concerned with scale, partition your work based on `device_id` or `user_id`. This ensures that throttling on a particular `device_id` (or `user_id`) doesn't impact all senders in your system. If you use a proxy service to send events to Amplitude, make sure that throttling forwards to your clients, instead of letting spammy clients slow down a partition of work in your system.

### Information for partner integrations

If you have an event ingestion integration with Amplitude, you need to send your integration's assigned partner ID in the event payload. 

For help finding your integration's partner ID and a payload example, see [Create an Event Ingestion Integration](/docs/partners/create-an-event-ingestion-integration#test-and-submit-the-integration).

### All-zero device IDs: Limit Ad Tracking enabled

As of iOS 10, Apple replaces the Identifier for Advertiser (IDFA) with all zeros if the user enables Limit Ad Tracking. 
Because all events require a device ID, Amplitude drops device IDs of all zeros and returns an error on the request.

If you are passing the IDFA as the device ID, first run a check on the IDFA value. If it's all zeros, pass a different value for the device ID, such as the Identifier for Vendor (IDFV).

### Windows OS

If you are using a Windows operating system, then you may have to replace all single quotes with escaped double quotes.

### String character limit

All string values, like `user_id`, event, or user property values, have a character limit of 1024 characters.

### Set date values

Amplitude compares dates as strings, so it's best to use the ISO 8601 format (`YYYY-MM-DDTHH:mm:ss`). This format lets you perform date comparisons, (for example: `'2016-01-31' > '2016-01-01'`). Comparison also works for datetime values in this format (for example: `'2017-08-07T10:09:08' > '2017-08-07T01:07:00'`).

### Set time values

You must send the `time` parameter in each event as millisecond since epoch. Any other format (such as ISO format) results in a 400 Bad Request response.

### Event deduplication

It's highly recommended that you send an `insert_id` for each event to prevent sending duplicate events to Amplitude. Amplitude ignores subsequent events sent with the same `insert_id` on the same `device_id` (if the event has a `device_id` value) in each app within the past 7 days.

### Device IDs and User IDs minimum length

Device IDs and User IDs must be strings with a length of 5 characters or more. This is to prevent potential instrumentation issues. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. 

Override the default minimum length of 5 characters by passing the `min_id_length` option with the request.

If the event doesn't have a `user_id` or `device_id` value, Amplitude can reject the with a 400 status. 

{{partial:collapse name="Invalid IDs that result in a 400 error"}}
* "anonymous"
* "nil"
* "none"
* "null"
* "n/a"
* "na"
* "undefined"
* "unknown"
* """"
* "00000000-0000-0000-0000-000000000000"
* "{}"
* "lmy47d"
* "0"
* "-1"
{{/partial:collapse}}


### Language field

If the `language` field in the request contains a tag, the tag changes to its human-friendly language name. For example, if a request contains `"language": "en-US"`, it changes to `"language": "English"` before Amplitude stores it.

The following table shows the list of mappings. Language tags are case-insensitive.

{{partial:collapse name="Language mappings"}}

| <div class="big-column">Language Tag</div>  | Language Value |
| --- | --- |
|`"aa"` | "Afar" |
|`"ab"` | "Abkhazian" |
|`"abkhazian"` | "Abkhazian" |
|`"ace"` | "Achinese" |
|`"ach"` | "Acoli" |
|`"achinese"` | "Achinese" |
|`"acoli"` | "Acoli" |
|`"ada"` | "Adangme" |
|`"adangme"` | "Adangme" |
|`"ady"` | "Adyghe" |
|`"adyghe"` | "Adyghe" |
|`"ae"` | "Avestan" |
|`"af"` | "Afrikaans" |
|`"afar"` | "Afar" |
|`"afh"` | "Afrihili" |
|`"afrihili"` | "Afrihili" |
|`"afrikaans"` | "Afrikaans" |
|`"aghem"` | "Aghem" |
|`"agq"` | "Aghem" |
|`"ain"` | "Ainu" |
|`"ainu"` | "Ainu" |
|`"ak"` | "Akan" |
|`"akan"` | "Akan" |
|`"akk"` | "Akkadian" |
|`"akkadian"` | "Akkadian" |
|`"akoose"` | "Akoose" |
|`"albanian"` | "Albanian" |
|`"albanian (albania)"` | "Sanskrit" |
|`"ale"` | "Aleut" |
|`"aleut"` | "Aleut" |
|`"alt"` | "Southern Altai" |
|`"am"` | "Amharic" |
|`"american english"` | "English" |
|`"amharic"` | "Amharic" |
|`"an"` | "Aragonese" |
|`"ancient egyptian"` | "Ancient Egyptian" |
|`"ancient greek"` | "Ancient Greek" |
|`"ang"` | "Old English" |
|`"angielski (stany zjednoczone)"` | "English" |
|`"angielski (wielka brytania)"` | "English" |
|`"angika"` | "Angika" |
|`"anglais (royaume-uni)"` | "English" |
|`"anglais (singapour)"` | "English" |
|`"anp"` | "Angika" |
|`"ar"` | "Arabic" |
|`"ar-001"` | "Arabic" |
|`"ar_eg"` | "Arabic" |
|`"arabe (arabie saoudite)"` | "Arabic" |
|`"arabia"` | "Arabic" |
|`"arabic"` | "Arabic" |
|`"arabic (egypt)"` | "Arabic" |
|`"arabic (iraq)"` | "Arabic" |
|`"arabic (jordan)"` | "Arabic" |
|`"arabic (kuwait)"` | "Arabic" |
|`"arabic (saudi arabia)"` | "Arabic" |
|`"arabic (yemen)"` | "Arabic" |
|`"aragonese"` | "Aragonese" |
|`"aramaic"` | "Aramaic" |
|`"arapaho"` | "Arapaho" |
|`"arawak"` | "Arawak" |
|`"arbic"` | "Arabic" |
|`"arc"` | "Aramaic" |
|`"armenian"` | "Armenian" |
|`"armenian (armenia)"` | "Armenian" |
|`"arn"` | "Mapuche" |
|`"aromanian"` | "Aromanian" |
|`"arp"` | "Arapaho" |
|`"arw"` | "Arawak" |
|`"as"` | "Assamese" |
|`"asa"` | "Asu" |
|`"assamese"` | "Assamese" |
|`"ast"` | "Asturian" |
|`"asturian"` | "Asturian" |
|`"asturianu"` | "Asturian" |
|`"asu"` | "Asu" |
|`"atsam"` | "Atsam" |
|`"australian english"` | "English" |
|`"austrian german"` | "German" |
|`"av"` | "Avaric" |
|`"avaric"` | "Avaric" |
|`"avestan"` | "Avestan" |
|`"awa"` | "Awadhi" |
|`"awadhi"` | "Awadhi" |
|`"ay"` | "Aymara" |
|`"aymara"` | "Aymara" |
|`"az"` | "Azerbaijani" |
|`"azerbaijani"` | "Azerbaijani" |
|`"azeri"` | "Azerbaijani" |
|`"azərbaycan"` | "Azerbaijani" |
|`"azərbaycanca"` | "Azerbaijani" |
|`"ba"` | "Bashkir" |
|`"bafia"` | "Bafia" |
|`"bafut"` | "Bafut" |
|`"bahasa indonesia"` | "Indonesian" |
|`"bahasa malaysia"` | "Malay" |
|`"bahasa melayu"` | "Malay" |
|`"bal"` | "Baluchi" |
|`"balinese"` | "Balinese" |
|`"baluchi"` | "Baluchi" |
|`"bamanakan"` | "Bambara" |
|`"bambara"` | "Bambara" |
|`"bamun"` | "Bamun" |
|`"ban"` | "Balinese" |
|`"bas"` | "Basaa" |
|`"basaa"` | "Basaa" |
|`"bashkir"` | "Bashkir" |
|`"basque"` | "Basque" |
|`"bax"` | "Bamun" |
|`"bbj"` | "Ghomala" |
|`"be"` | "Belarusian" |
|`"bej"` | "Beja" |
|`"beja"` | "Beja" |
|`"belarusian"` | "Belarusian" |
|`"bem"` | "Bemba" |
|`"bemba"` | "Bemba" |
|`"bena"` | "Bena" |
|`"bengali"` | "Bengali" |
|`"bengali (bangladesh)"` | "Bengali" |
|`"bez"` | "Bena" |
|`"bfd"` | "Bafut" |
|`"bg"` | "Bulgarian" |
|`"bho"` | "Bhojpuri" |
|`"bhojpuri"` | "Bhojpuri" |
|`"bi"` | "Bislama" |
|`"bik"` | "Bikol" |
|`"bikol"` | "Bikol" |
|`"bin"` | "Bini" |
|`"bini"` | "Bini" |
|`"bislama"` | "Bislama" |
|`"bkm"` | "Kom" |
|`"bla"` | "Siksika" |
|`"blin"` | "Blin" |
|`"blissymbols"` | "Blissymbols" |
|`"bm"` | "Bambara" |
|`"bn"` | "Bengali" |
|`"bo"` | "Tibetan" |
|`"bodo"` | "Bodo" |
|`"bosanski"` | "Bosnian" |
|`"bosnian"` | "Bosnian" |
|`"bosnian (latin, bosnia and herzegovina)"` | "Bosnian" |
|`"br"` | "Breton" |
|`"bra"` | "Braj" |
|`"braj"` | "Braj" |
|`"brazilian portuguese"` | "Portuguese" |
|`"breton"` | "Breton" |
|`"brezhoneg"` | "Breton" |
|`"british english"` | "English" |
|`"brx"` | "Bodo" |
|`"bs"` | "Bosnian" |
|`"bss"` | "Akoose" |
|`"bua"` | "Buriat" |
|`"bug"` | "Buginese" |
|`"buginese"` | "Buginese" |
|`"bulgarian"` | "Bulgarian" |
|`"bulgarian (bulgaria)"` | "Bulgarian" |
|`"bulu"` | "Bulu" |
|`"bum"` | "Bulu" |
|`"buriat"` | "Buriat" |
|`"burmese"` | "Burmese" |
|`"byn"` | "Blin" |
|`"byv"` | "Medumba" |
|`"ca"` | "Catalan" |
|`"ca_es"` | "Catalan" |
|`"cad"` | "Caddo" |
|`"caddo"` | "Caddo" |
|`"canadian english"` | "English" |
|`"canadian french"` | "French" |
|`"cantonese"` | "Cantonese" |
|`"car"` | "Carib" |
|`"carib"` | "Carib" |
|`"catalan"` | "Catalan" |
|`"català"` | "Catalan" |
|`"cay"` | "Cayuga" |
|`"cayuga"` | "Cayuga" |
|`"cch"` | "Atsam" |
|`"ce"` | "Chechen" |
|`"ceb"` | "Cebuano" |
|`"cebuano"` | "Cebuano" |
|`"central atlas tamazight"` | "Central Atlas Tamazight" |
|`"cgg"` | "Chiga" |
|`"ch"` | "Chamorro" |
|`"chadian arabic"` | "Chadian Arabic" |
|`"chagatai"` | "Chagatai" |
|`"chamorro"` | "Chamorro" |
|`"chb"` | "Chibcha" |
|`"chechen"` | "Chechen" |
|`"cherokee"` | "Cherokee" |
|`"cheyenne"` | "Cheyenne" |
|`"chg"` | "Chagatai" |
|`"chibcha"` | "Chibcha" |
|`"chiga"` | "Chiga" |
|`"chimakonde"` | "Makonde" |
|`"chinese"` | "Chinese" |
|`"chinese (hong kong s.a.r.)"` | "Chinese" |
|`"chinese (simplified, china)"` | "Chinese" |
|`"chinese (simplified, prc)"` | "Chinese" |
|`"chinese (simplified, singapore)"` | "Chinese" |
|`"chinese (taiwan)"` | "Chinese" |
|`"chinese (traditional, hong kong s.a.r.)"` | "Chinese" |
|`"chinese (traditional, hong kong sar)"` | "Chinese" |
|`"chinese (traditional, taiwan)"` | "Chinese" |
|`"chinesisch (vereinfacht, china)"` | "Chinese" |
|`"chinook jargon"` | "Chinook Jargon" |
|`"chipewyan"` | "Chipewyan" |
|`"chishona"` | "Shona" |
|`"chk"` | "Chuukese" |
|`"chm"` | "Mari" |
|`"chn"` | "Chinook Jargon" |
|`"cho"` | "Choctaw" |
|`"choctaw"` | "Choctaw" |
|`"chp"` | "Chipewyan" |
|`"chr"` | "Cherokee" |
|`"church slavic"` | "Church Slavic" |
|`"chuukese"` | "Chuukese" |
|`"chuvash"` | "Chuvash" |
|`"chy"` | "Cheyenne" |
|`"ckb"` | "Sorani Kurdish" |
|`"classical newari"` | "Classical Newari" |
|`"classical syriac"` | "Classical Syriac" |
|`"co"` | "Corsican" |
|`"colognian"` | "Colognian" |
|`"comorian"` | "Comorian" |
|`"congo swahili"` | "Congo Swahili" |
|`"cop"` | "Coptic" |
|`"coptic"` | "Coptic" |
|`"cornish"` | "Cornish" |
|`"corsican"` | "Corsican" |
|`"cr"` | "Cree" |
|`"cree"` | "Cree" |
|`"creek"` | "Creek" |
|`"crh"` | "Crimean Turkish" |
|`"crimean turkish"` | "Crimean Turkish" |
|`"croatian"` | "Croatian" |
|`"croatian (croatia)"` | "Croatian" |
|`"cs"` | "Czech" |
|`"csb"` | "Kashubian" |
|`"cu"` | "Church Slavic" |
|`"cv"` | "Chuvash" |
|`"cy"` | "Welsh" |
|`"cymraeg"` | "Welsh" |
|`"czech"` | "Czech" |
|`"czech (czech republic)"` | "Czech" |
|`"da"` | "Danish" |
|`"dak"` | "Dakota" |
|`"dakota"` | "Dakota" |
|`"danish"` | "Danish" |
|`"danish (denmark)"` | "Danish" |
|`"dansk"` | "Danish" |
|`"dansk (danmark)"` | "Danish" |
|`"dar"` | "Dargwa" |
|`"dargwa"` | "Dargwa" |
|`"dav"` | "Taita" |
|`"davvisámegiella"` | "Northern Sami" |
|`"dazaga"` | "Dazaga" |
|`"de"` | "German" |
|`"de-at"` | "German" |
|`"de-ch"` | "German" |
|`"de_de"` | "German" |
|`"del"` | "Delaware" |
|`"delaware"` | "Delaware" |
|`"den"` | "Slave" |
|`"deutsch"` | "German" |
|`"deutsch (deutschland)"` | "German" |
|`"deutsch (liechtenstein)"` | "German" |
|`"deutsch (schweiz)"` | "German" |
|`"dgr"` | "Dogrib" |
|`"dholuo"` | "Luo" |
|`"din"` | "Dinka" |
|`"dinka"` | "Dinka" |
|`"divehi"` | "Divehi" |
|`"dje"` | "Zarma" |
|`"dogri"` | "Dogri" |
|`"dogrib"` | "Dogrib" |
|`"doi"` | "Dogri" |
|`"dsb"` | "Lower Sorbian" |
|`"dua"` | "Duala" |
|`"duala"` | "Duala" |
|`"dum"` | "Middle Dutch" |
|`"dutch"` | "Dutch" |
|`"dutch (belgium)"` | "Flemish" |
|`"dutch (netherlands)"` | "Dutch" |
|`"duálá"` | "Duala" |
|`"dv"` | "Divehi" |
|`"dyo"` | "Jola-Fonyi" |
|`"dyu"` | "Dyula" |
|`"dyula"` | "Dyula" |
|`"dz"` | "Dzongkha" |
|`"dzg"` | "Dazaga" |
|`"dzongkha"` | "Dzongkha" |
|`"eastern frisian"` | "Eastern Frisian" |
|`"ebu"` | "Embu" |
|`"ee"` | "Ewe" |
|`"eesti"` | "Estonian" |
|`"eesti (eesti)"` | "Estonian" |
|`"efi"` | "Efik" |
|`"efik"` | "Efik" |
|`"egy"` | "Ancient Egyptian" |
|`"eka"` | "Ekajuk" |
|`"ekajuk"` | "Ekajuk" |
|`"ekegusii"` | "Gusii" |
|`"el"` | "Greek" |
|`"el_gr"` | "Greek" |
|`"elamite"` | "Elamite" |
|`"elx"` | "Elamite" |
|`"embu"` | "Embu" |
|`"en"` | "English" |
|`"en-au"` | "English" |
|`"en-ca"` | "English" |
|`"en-gb"` | "English" |
|`"en-us"` | "English" |
|`"en_gb"` | "English" |
|`"en_ie"` | "English" |
|`"en_us"` | "English" |
|`"engels (verenigde staten)"` | "English" |
|`"engelsk (usa)"` | "English" |
|`"engelska (storbritannien)"` | "English" |
|`"engelska (usa)"` | "English" |
|`"engleski (ujedinjeno kraljevstvo)"` | "English" |
|`"english"` | "English" |
|`"english (australia)"` | "English" |
|`"english (canada)"` | "English" |
|`"english (caribbean)"` | "English" |
|`"english (india)"` | "English" |
|`"english (ireland)"` | "English" |
|`"english (malaysia)"` | "English" |
|`"english (new zealand)"` | "English" |
|`"english (philippines)"` | "English" |
|`"english (republic of the philippines)"` | "English" |
|`"english (singapore)"` | "English" |
|`"english (south africa)"` | "English" |
|`"english (trinidad and tobago)"` | "English" |
|`"english (united kingdom)"` | "English" |
|`"english (united states)"` | "English" |
|`"english (zimbabwe)"` | "English" |
|`"enm"` | "Middle English" |
|`"eo"` | "Esperanto" |
|`"erzya"` | "Erzya" |
|`"es"` | "Spanish" |
|`"es-419"` | "Spanish" |
|`"es-es"` | "Spanish" |
|`"es-mx"` | "Spanish" |
|`"es_es"` | "Spanish" |
|`"español"` | "Spanish" |
|`"español de américa"` | "Spanish" |
|`"español de españa"` | "Spanish" |
|`"español de méxico"` | "Spanish" |
|`"esperanto"` | "Esperanto" |
|`"estonian"` | "Estonian" |
|`"estonian (estonia)"` | "Estonian" |
|`"et"` | "Estonian" |
|`"eu"` | "Basque" |
|`"european portuguese"` | "Portuguese" |
|`"european spanish"` | "Spanish" |
|`"euskara"` | "Basque" |
|`"euskera"` | "Basque" |
|`"ewe"` | "Ewe" |
|`"ewo"` | "Ewondo" |
|`"ewondo"` | "Ewondo" |
|`"eʋegbe"` | "Ewe" |
|`"fa"` | "Persian" |
|`"fa_ir"` | "Persian" |
|`"fan"` | "Fang" |
|`"fang"` | "Fang" |
|`"fanti"` | "Fanti" |
|`"farese"` | "Faroese" |
|`"faroese"` | "Faroese" |
|`"farsi"` | "Persian" |
|`"fasi"` | "Persian" |
|`"fat"` | "Fanti" |
|`"ff"` | "Fulah" |
|`"fi"` | "Finnish" |
|`"fijian"` | "Fijian" |
|`"fil"` | "Filipino" |
|`"filipino"` | "Filipino" |
|`"filipino (philippines)"` | "Filipino" |
|`"finnish"` | "Finnish" |
|`"finnish (finland)"` | "Finnish" |
|`"fj"` | "Fijian" |
|`"flemish"` | "Flemish" |
|`"fo"` | "Faroese" |
|`"fon"` | "Fon" |
|`"fr"` | "French" |
|`"fr-ca"` | "French" |
|`"fr-ch"` | "French" |
|`"fr_ca"` | "French" |
|`"fr_fr"` | "French" |
|`"francese (francia)"` | "French" |
|`"français"` | "French" |
|`"français canadien"` | "French" |
|`"français suisse"` | "French" |
|`"french"` | "French" |
|`"french (belgium)"` | "French" |
|`"french (canada)"` | "French" |
|`"french (france)"` | "French" |
|`"french (switzerland)"` | "French" |
|`"friulian"` | "Friulian" |
|`"frm"` | "Middle French" |
|`"fro"` | "Old French" |
|`"frr"` | "Northern Frisian" |
|`"frs"` | "Eastern Frisian" |
|`"fulah"` | "Fulah" |
|`"fur"` | "Friulian" |
|`"furlan"` | "Friulian" |
|`"fy"` | "Western Frisian" |
|`"fyrom"` | "Macedonian" |
|`"føroyskt"` | "Faroese" |
|`"ga"` | "Ga" |
|`"gaa"` | "Ga" |
|`"gaeilge"` | "Irish" |
|`"gaelg"` | "Manx" |
|`"galego"` | "Galician" |
|`"galician"` | "Galician" |
|`"ganda"` | "Ganda" |
|`"gay"` | "Gayo" |
|`"gayo"` | "Gayo" |
|`"gba"` | "Gbaya" |
|`"gbaya"` | "Gbaya" |
|`"gd"` | "Scottish Gaelic" |
|`"geez"` | "Geez" |
|`"georgian"` | "Georgian" |
|`"georgian (georgia)"` | "Georgian" |
|`"german"` | "German" |
|`"german (austria)"` | "German" |
|`"german (germany)"` | "German" |
|`"german (switzerland)"` | "Swiss German" |
|`"gez"` | "Geez" |
|`"ghomala"` | "Ghomala" |
|`"gikuyu"` | "Kikuyu" |
|`"gil"` | "Gilbertese" |
|`"gilbertese"` | "Gilbertese" |
|`"gl"` | "Galician" |
|`"gmh"` | "Middle High German" |
|`"gn"` | "Guarani" |
|`"goh"` | "Old High German" |
|`"gon"` | "Gondi" |
|`"gondi"` | "Gondi" |
|`"gor"` | "Gorontalo" |
|`"gorontalo"` | "Gorontalo" |
|`"got"` | "Gothic" |
|`"gothic"` | "Gothic" |
|`"grb"` | "Grebo" |
|`"grc"` | "Ancient Greek" |
|`"grebo"` | "Grebo" |
|`"greek"` | "Greek" |
|`"greek (greece)"` | "Greek" |
|`"gsw"` | "Swiss German" |
|`"gu"` | "Gujarati" |
|`"guarani"` | "Guarani" |
|`"gujarati"` | "Gujarati" |
|`"gusii"` | "Gusii" |
|`"guz"` | "Gusii" |
|`"gv"` | "Manx" |
|`"gwi"` | "Gwichʼin" |
|`"gwichʼin"` | "Gwichʼin" |
|`"gàidhlig"` | "Scottish Gaelic" |
|`"ha"` | "Hausa" |
|`"hai"` | "Haida" |
|`"haida"` | "Haida" |
|`"haitian"` | "Haitian" |
|`"hausa"` | "Hausa" |
|`"haw"` | "Hawaiian" |
|`"hawaiian"` | "Hawaiian" |
|`"he"` | "Hebrew" |
|`"hebreo"` | "Hebrew" |
|`"hebrew"` | "Hebrew" |
|`"hebrew (israel)"` | "Hebrew" |
|`"herero"` | "Herero" |
|`"hi"` | "Hindi" |
|`"hibena"` | "Bena" |
|`"hil"` | "Hiligaynon" |
|`"hiligaynon"` | "Hiligaynon" |
|`"hindi"` | "Hindi" |
|`"hindi (india)"` | "Hindi" |
|`"hiri motu"` | "Hiri Motu" |
|`"hit"` | "Hittite" |
|`"hittite"` | "Hittite" |
|`"hmn"` | "Hmong" |
|`"hmong"` | "Hmong" |
|`"ho"` | "Hiri Motu" |
|`"hr"` | "Croatian" |
|`"hrvatski"` | "Croatian" |
|`"hrvatski (hrvatska)"` | "Croatian" |
|`"hsb"` | "Upper Sorbian" |
|`"ht"` | "Haitian" |
|`"hu"` | "Hungarian" |
|`"hungarian"` | "Hungarian" |
|`"hungarian (hungary)"` | "Hungarian" |
|`"hup"` | "Hupa" |
|`"hupa"` | "Hupa" |
|`"hy"` | "Armenian" |
|`"hz"` | "Herero" |
|`"ia"` | "Interlingua" |
|`"iba"` | "Iban" |
|`"iban"` | "Iban" |
|`"ibb"` | "Ibibio" |
|`"ibibio"` | "Ibibio" |
|`"icelandic"` | "Icelandic" |
|`"icelandic (iceland)"` | "Icelandic" |
|`"ichibemba"` | "Bemba" |
|`"id"` | "Indonesian" |
|`"ido"` | "Ido" |
|`"ie"` | "Interlingue" |
|`"ig"` | "Igbo" |
|`"igbo"` | "Igbo" |
|`"ii"` | "Sichuan Yi" |
|`"ik"` | "Inupiaq" |
|`"ikirundi"` | "Rundi" |
|`"ilo"` | "Iloko" |
|`"iloko"` | "Iloko" |
|`"in_id"` | "Indonesian" |
|`"inari sami"` | "Inari Sami" |
|`"indonesia"` | "Indonesian" |
|`"indonesian"` | "Indonesian" |
|`"indonesian (indonesia)"` | "Indonesian" |
|`"ingilizce (amerikan)"` | "English" |
|`"inglese (canada)"` | "English" |
|`"inglese (regno unito)"` | "English" |
|`"inglese (singapore)"` | "English" |
|`"inglese (stati uniti)"` | "English" |
|`"ingush"` | "Ingush" |
|`"inh"` | "Ingush" |
|`"interlingua"` | "Interlingua" |
|`"interlingue"` | "Interlingue" |
|`"inuktitut"` | "Inuktitut" |
|`"inupiaq"` | "Inupiaq" |
|`"io"` | "Ido" |
|`"irish"` | "Irish" |
|`"is"` | "Icelandic" |
|`"ishisangu"` | "Sangu" |
|`"isindebele"` | "South Ndebele" |
|`"isixhosa"` | "Xhosa" |
|`"isizulu"` | "Zulu" |
|`"it"` | "Italian" |
|`"it_it"` | "Italian" |
|`"italian"` | "Italian" |
|`"italian (italy)"` | "Italian" |
|`"italian (switzerland)"` | "Italian" |
|`"italiano"` | "Italian" |
|`"italiano (italia)"` | "Italian" |
|`"italiano (svizzera)"` | "Italian" |
|`"iu"` | "Inuktitut" |
|`"iw_il"` | "Hebrew" |
|`"ja"` | "Japanese" |
|`"japanese"` | "Japanese" |
|`"japanese (japan)"` | "Japanese" |
|`"javanese"` | "Javanese" |
|`"jbo"` | "Lojban" |
|`"jgo"` | "Ngomba" |
|`"jju"` | "Jju" |
|`"jmc"` | "Machame" |
|`"jola-fonyi"` | "Jola-Fonyi" |
|`"joola"` | "Jola-Fonyi" |
|`"jpr"` | "Judeo-Persian" |
|`"jrb"` | "Judeo-Arabic" |
|`"judeo-arabic"` | "Judeo-Arabic" |
|`"judeo-persian"` | "Judeo-Persian" |
|`"jv"` | "Javanese" |
|`"ka"` | "Georgian" |
|`"kaa"` | "Kara-Kalpak" |
|`"kab"` | "Kabyle" |
|`"kabardian"` | "Kabardian" |
|`"kabuverdianu"` | "Kabuverdianu" |
|`"kabyle"` | "Kabyle" |
|`"kac"` | "Kachin" |
|`"kachin"` | "Kachin" |
|`"kaj"` | "Jju" |
|`"kako"` | "Kako" |
|`"kakɔ"` | "Kako" |
|`"kalaallisut"` | "Kalaallisut" |
|`"kalenjin"` | "Kalenjin" |
|`"kalmyk"` | "Kalmyk" |
|`"kam"` | "Kamba" |
|`"kamba"` | "Kamba" |
|`"kanembu"` | "Kanembu" |
|`"kannada"` | "Kannada" |
|`"kanuri"` | "Kanuri" |
|`"kara-kalpak"` | "Kara-Kalpak" |
|`"karachay-balkar"` | "Karachay-Balkar" |
|`"karelian"` | "Karelian" |
|`"kashmiri"` | "Kashmiri" |
|`"kashubian"` | "Kashubian" |
|`"kaw"` | "Kawi" |
|`"kawi"` | "Kawi" |
|`"kazakh"` | "Kazakh" |
|`"kbd"` | "Kabardian" |
|`"kbl"` | "Kanembu" |
|`"kcg"` | "Tyap" |
|`"kde"` | "Makonde" |
|`"kea"` | "Kabuverdianu" |
|`"kernewek"` | "Cornish" |
|`"kfo"` | "Koro" |
|`"kg"` | "Kongo" |
|`"kha"` | "Khasi" |
|`"khasi"` | "Khasi" |
|`"khmer"` | "Khmer" |
|`"kho"` | "Khotanese" |
|`"khoekhoegowab"` | "Nama" |
|`"khotanese"` | "Khotanese" |
|`"khq"` | "Koyra Chiini" |
|`"ki"` | "Kikuyu" |
|`"kihorombo"` | "Rombo" |
|`"kikamba"` | "Kamba" |
|`"kikuyu"` | "Kikuyu" |
|`"kimachame"` | "Machame" |
|`"kimbundu"` | "Kimbundu" |
|`"kinyarwanda"` | "Kinyarwanda" |
|`"kipare"` | "Asu" |
|`"kirghiz"` | "Kyrgyz" |
|`"kiruwa"` | "Rwa" |
|`"kisampur"` | "Samburu" |
|`"kishambaa"` | "Shambala" |
|`"kiswahili"` | "Swahili" |
|`"kiswahili ya kongo"` | "Congo Swahili" |
|`"kitaita"` | "Taita" |
|`"kiteso"` | "Teso" |
|`"kj"` | "Kuanyama" |
|`"kk"` | "Kazakh" |
|`"kkj"` | "Kako" |
|`"kl"` | "Kalaallisut" |
|`"klingon"` | "Klingon" |
|`"kln"` | "Kalenjin" |
|`"km"` | "Khmer" |
|`"kmb"` | "Kimbundu" |
|`"kn"` | "Kannada" |
|`"ko"` | "Korean" |
|`"kok"` | "Konkani" |
|`"kom"` | "Kom" |
|`"komi"` | "Komi" |
|`"kongo"` | "Kongo" |
|`"konkani"` | "Konkani" |
|`"korean"` | "Korean" |
|`"korean (korea)"` | "Korean" |
|`"koro"` | "Koro" |
|`"kos"` | "Kosraean" |
|`"kosraean"` | "Kosraean" |
|`"koyra chiini"` | "Koyra Chiini" |
|`"koyra ciini"` | "Koyra Chiini" |
|`"koyraboro senni"` | "Koyraboro Senni" |
|`"kpe"` | "Kpelle" |
|`"kpelle"` | "Kpelle" |
|`"kr"` | "Kanuri" |
|`"krc"` | "Karachay-Balkar" |
|`"kreol morisien"` | "Morisyen" |
|`"krl"` | "Karelian" |
|`"kru"` | "Kurukh" |
|`"ks"` | "Kashmiri" |
|`"ksb"` | "Shambala" |
|`"ksf"` | "Bafia" |
|`"ksh"` | "Colognian" |
|`"ku"` | "Kurdish" |
|`"kuanyama"` | "Kuanyama" |
|`"kum"` | "Kumyk" |
|`"kumyk"` | "Kumyk" |
|`"kurdish"` | "Kurdish" |
|`"kurukh"` | "Kurukh" |
|`"kut"` | "Kutenai" |
|`"kutenai"` | "Kutenai" |
|`"kv"` | "Komi" |
|`"kw"` | "Cornish" |
|`"kwasio"` | "Kwasio" |
|`"ky"` | "Kyrgyz" |
|`"kyivunjo"` | "Vunjo" |
|`"kyrgyz"` | "Kyrgyz" |
|`"kölsch"` | "Colognian" |
|`"kĩembu"` | "Embu" |
|`"kĩmĩrũ"` | "Meru" |
|`"kɨlaangi"` | "Langi" |
|`"la"` | "Latin" |
|`"lad"` | "Ladino" |
|`"ladino"` | "Ladino" |
|`"lag"` | "Langi" |
|`"lah"` | "Lahnda" |
|`"lahnda"` | "Lahnda" |
|`"lakota"` | "Lakota" |
|`"lakȟólʼiyapi"` | "Lakota" |
|`"lam"` | "Lamba" |
|`"lamba"` | "Lamba" |
|`"langi"` | "Langi" |
|`"lao"` | "Lao" |
|`"latin"` | "Latin" |
|`"latin american spanish"` | "Spanish" |
|`"latvian"` | "Latvian" |
|`"latvian (latvia)"` | "Latvian" |
|`"latviešu"` | "Latvian" |
|`"lb"` | "Luxembourgish" |
|`"lea fakatonga"` | "Tongan" |
|`"lez"` | "Lezghian" |
|`"lezghian"` | "Lezghian" |
|`"lg"` | "Ganda" |
|`"li"` | "Limburgish" |
|`"lietuvių"` | "Lithuanian" |
|`"limburgish"` | "Limburgish" |
|`"lingala"` | "Lingala" |
|`"lingála"` | "Lingala" |
|`"lithuanian"` | "Lithuanian" |
|`"lithuanian (lithuania)"` | "Lithuanian" |
|`"lkt"` | "Lakota" |
|`"ln"` | "Lingala" |
|`"lo"` | "Lao" |
|`"lojban"` | "Lojban" |
|`"lol"` | "Mongo" |
|`"low german"` | "Low German" |
|`"lower sorbian"` | "Lower Sorbian" |
|`"loz"` | "Lozi" |
|`"lozi"` | "Lozi" |
|`"lt"` | "Lithuanian" |
|`"lu"` | "Luba-Katanga" |
|`"lua"` | "Luba-Lulua" |
|`"luba-katanga"` | "Luba-Katanga" |
|`"luba-lulua"` | "Luba-Lulua" |
|`"luganda"` | "Ganda" |
|`"lui"` | "Luiseno" |
|`"luiseno"` | "Luiseno" |
|`"lule sami"` | "Lule Sami" |
|`"luluhia"` | "Luyia" |
|`"lun"` | "Lunda" |
|`"lunda"` | "Lunda" |
|`"luo"` | "Luo" |
|`"lus"` | "Mizo" |
|`"luxembourgish"` | "Luxembourgish" |
|`"luy"` | "Luyia" |
|`"luyia"` | "Luyia" |
|`"lv"` | "Latvian" |
|`"maa"` | "Masai" |
|`"maba"` | "Maba" |
|`"macedonian"` | "Macedonian" |
|`"macedonian (former yugoslav republic of macedonia)"` | "Macedonian" |
|`"machame"` | "Machame" |
|`"mad"` | "Madurese" |
|`"madurese"` | "Madurese" |
|`"maf"` | "Mafa" |
|`"mafa"` | "Mafa" |
|`"mag"` | "Magahi" |
|`"magahi"` | "Magahi" |
|`"magyar"` | "Hungarian" |
|`"mai"` | "Maithili" |
|`"maithili"` | "Maithili" |
|`"mak"` | "Makasar" |
|`"makasar"` | "Makasar" |
|`"makhuwa-meetto"` | "Makhuwa-Meetto" |
|`"makonde"` | "Makonde" |
|`"makua"` | "Makhuwa-Meetto" |
|`"malagasy"` | "Malagasy" |
|`"malay"` | "Malay" |
|`"malay (malaysia)"` | "Malay" |
|`"malayalam"` | "Malayalam" |
|`"maltese"` | "Maltese" |
|`"malti"` | "Maltese" |
|`"man"` | "Mandingo" |
|`"manchu"` | "Manchu" |
|`"mandar"` | "Mandar" |
|`"mandingo"` | "Mandingo" |
|`"manipuri"` | "Manipuri" |
|`"manx"` | "Manx" |
|`"maori"` | "Maori" |
|`"mapuche"` | "Mapuche" |
|`"marathi"` | "Marathi" |
|`"mari"` | "Mari" |
|`"marshallese"` | "Marshallese" |
|`"marwari"` | "Marwari" |
|`"mas"` | "Masai" |
|`"masai"` | "Masai" |
|`"mde"` | "Maba" |
|`"mdf"` | "Moksha" |
|`"mdr"` | "Mandar" |
|`"medumba"` | "Medumba" |
|`"men"` | "Mende" |
|`"mende"` | "Mende" |
|`"mer"` | "Meru" |
|`"meru"` | "Meru" |
|`"meta'"` | "Meta'" |
|`"metaʼ"` | "Meta'" |
|`"mexican spanish"` | "Spanish" |
|`"mfe"` | "Morisyen" |
|`"mg"` | "Malagasy" |
|`"mga"` | "Middle Irish" |
|`"mgh"` | "Makhuwa-Meetto" |
|`"mgo"` | "Meta'" |
|`"mh"` | "Marshallese" |
|`"mi"` | "Maori" |
|`"mic"` | "Micmac" |
|`"micmac"` | "Micmac" |
|`"middle dutch"` | "Middle Dutch" |
|`"middle english"` | "Middle English" |
|`"middle french"` | "Middle French" |
|`"middle high german"` | "Middle High German" |
|`"middle irish"` | "Middle Irish" |
|`"min"` | "Minangkabau" |
|`"minangkabau"` | "Minangkabau" |
|`"mirandese"` | "Mirandese" |
|`"mizo"` | "Mizo" |
|`"mk"` | "Macedonian" |
|`"ml"` | "Malayalam" |
|`"mn"` | "Mongolian" |
|`"mnc"` | "Manchu" |
|`"mni"` | "Manipuri" |
|`"modern standard arabic"` | "Arabic" |
|`"moh"` | "Mohawk" |
|`"mohawk"` | "Mohawk" |
|`"moksha"` | "Moksha" |
|`"moldavian"` | "Moldavian" |
|`"moldovenească"` | "Moldavian" |
|`"mongo"` | "Mongo" |
|`"mongolian"` | "Mongolian" |
|`"mongolian (cyrillic, mongolia)"` | "Mongolian" |
|`"morisyen"` | "Morisyen" |
|`"mos"` | "Mossi" |
|`"mossi"` | "Mossi" |
|`"mr"` | "Marathi" |
|`"ms"` | "Malay" |
|`"mt"` | "Maltese" |
|`"mua"` | "Mundang" |
|`"mundang"` | "Mundang" |
|`"mundaŋ"` | "Mundang" |
|`"mus"` | "Creek" |
|`"mwl"` | "Mirandese" |
|`"mwr"` | "Marwari" |
|`"my"` | "Burmese" |
|`"my-rmm"` | "Burmese" |
|`"myanmar"` | "Burmese" |
|`"myanmar (zawgyi)"` | "Burmese" |
|`"mye"` | "Myene" |
|`"myene"` | "Myene" |
|`"myv"` | "Erzya" |
|`"na"` | "Nauru" |
|`"nama"` | "Nama" |
|`"nap"` | "Neapolitan" |
|`"naq"` | "Nama" |
|`"nauru"` | "Nauru" |
|`"navajo"` | "Navajo" |
|`"nb"` | "Norwegian" |
|`"nd"` | "North Ndebele" |
|`"ndaꞌa"` | "Ngomba" |
|`"ndonga"` | "Ndonga" |
|`"nds"` | "Low German" |
|`"ne"` | "Nepali" |
|`"neapolitan"` | "Neapolitan" |
|`"nederlands"` | "Dutch" |
|`"nederlands (nederland)"` | "Dutch" |
|`"nepali"` | "Nepali" |
|`"new"` | "Newari" |
|`"newari"` | "Newari" |
|`"ng"` | "Ndonga" |
|`"ngambay"` | "Ngambay" |
|`"ngiemboon"` | "Ngiemboon" |
|`"ngomba"` | "Ngomba" |
|`"nia"` | "Nias" |
|`"nias"` | "Nias" |
|`"niu"` | "Niuean" |
|`"niuean"` | "Niuean" |
|`"nl"` | "Dutch" |
|`"nl-be"` | "Flemish" |
|`"nl_nl"` | "Dutch" |
|`"nmg"` | "Kwasio" |
|`"nn"` | "Norwegian" |
|`"nnh"` | "Ngiemboon" |
|`"no"` | "Norwegian" |
|`"nog"` | "Nogai" |
|`"nogai"` | "Nogai" |
|`"non"` | "Old Norse" |
|`"norsk"` | "Norwegian" |
|`"norsk bokmål"` | "Norwegian" |
|`"north ndebele"` | "North Ndebele" |
|`"northern frisian"` | "Northern Frisian" |
|`"northern sami"` | "Northern Sami" |
|`"northern sotho"` | "Northern Sotho" |
|`"norwegian"` | "Norwegian" |
|`"norwegian (bokmal)"` | "Norwegian" |
|`"norwegian bokmål"` | "Norwegian" |
|`"norwegian nynorsk"` | "Norwegian" |
|`"nqo"` | "N’Ko" |
|`"nr"` | "South Ndebele" |
|`"nso"` | "Northern Sotho" |
|`"nuasue"` | "Yangben" |
|`"nuer"` | "Nuer" |
|`"nus"` | "Nuer" |
|`"nv"` | "Navajo" |
|`"nwc"` | "Classical Newari" |
|`"ny"` | "Nyanja" |
|`"nyamwezi"` | "Nyamwezi" |
|`"nyanja"` | "Nyanja" |
|`"nyankole"` | "Nyankole" |
|`"nyasa tonga"` | "Nyasa Tonga" |
|`"nym"` | "Nyamwezi" |
|`"nyn"` | "Nyankole" |
|`"nynorsk"` | "Norwegian" |
|`"nyo"` | "Nyoro" |
|`"nyoro"` | "Nyoro" |
|`"nzi"` | "Nzima" |
|`"nzima"` | "Nzima" |
|`"n’ko"` | "N’Ko" |
|`"oc"` | "Occitan" |
|`"occitan"` | "Occitan" |
|`"oj"` | "Ojibwa" |
|`"ojibwa"` | "Ojibwa" |
|`"old english"` | "Old English" |
|`"old french"` | "Old French" |
|`"old high german"` | "Old High German" |
|`"old irish"` | "Old Irish" |
|`"old norse"` | "Old Norse" |
|`"old persian"` | "Old Persian" |
|`"old provençal"` | "Old Provençal" |
|`"olusoga"` | "Soga" |
|`"om"` | "Oromo" |
|`"or"` | "Oriya" |
|`"oriya"` | "Oriya" |
|`"oromo"` | "Oromo" |
|`"oromoo"` | "Oromo" |
|`"os"` | "Ossetic" |
|`"osa"` | "Osage" |
|`"osage"` | "Osage" |
|`"ossetic"` | "Ossetic" |
|`"ota"` | "Ottoman Turkish" |
|`"ottoman turkish"` | "Ottoman Turkish" |
|`"oʻzbekcha"` | "Uzbek" |
|`"o‘zbek"` | "Uzbek" |
|`"pa"` | "Punjabi" |
|`"pag"` | "Pangasinan" |
|`"pahlavi"` | "Pahlavi" |
|`"pal"` | "Pahlavi" |
|`"palauan"` | "Palauan" |
|`"pali"` | "Pali" |
|`"pam"` | "Pampanga" |
|`"pampanga"` | "Pampanga" |
|`"pangasinan"` | "Pangasinan" |
|`"pap"` | "Papiamento" |
|`"papiamento"` | "Papiamento" |
|`"pashto"` | "Pashto" |
|`"pau"` | "Palauan" |
|`"peo"` | "Old Persian" |
|`"pershin"` | "Persian" |
|`"persian"` | "Persian" |
|`"phn"` | "Phoenician" |
|`"phoenician"` | "Phoenician" |
|`"pi"` | "Pali" |
|`"pl"` | "Polish" |
|`"pl_pl"` | "Polish" |
|`"pohnpeian"` | "Pohnpeian" |
|`"polish"` | "Polish" |
|`"polish (poland)"` | "Polish" |
|`"polska (polen)"` | "Polish" |
|`"polski"` | "Polish" |
|`"polski (polska)"` | "Polish" |
|`"pon"` | "Pohnpeian" |
|`"portugues"` | "Portuguese" |
|`"portugues (brasil)"` | "Portuguese" |
|`"portuguese"` | "Portuguese" |
|`"portuguese (brazil)"` | "Portuguese" |
|`"portuguese (portugal)"` | "Portuguese" |
|`"português"` | "Portuguese" |
|`"português do brasil"` | "Portuguese" |
|`"português europeu"` | "Portuguese" |
|`"pro"` | "Old Provençal" |
|`"ps"` | "Pashto" |
|`"pt"` | "Portuguese" |
|`"pt-br"` | "Portuguese" |
|`"pt-pt"` | "Portuguese" |
|`"pt_br"` | "Portuguese" |
|`"pt_pt"` | "Portuguese" |
|`"pulaar"` | "Fulah" |
|`"punjabi"` | "Punjabi" |
|`"pushto"` | "Pashto" |
|`"qafar"` | "Afar" |
|`"qu"` | "Quechua" |
|`"quechua"` | "Quechua" |
|`"raj"` | "Rajasthani" |
|`"rajasthani"` | "Rajasthani" |
|`"rap"` | "Rapanui" |
|`"rapanui"` | "Rapanui" |
|`"rar"` | "Rarotongan" |
|`"rarotongan"` | "Rarotongan" |
|`"rikpa"` | "Bafia" |
|`"rm"` | "Romansh" |
|`"rn"` | "Rundi" |
|`"ro"` | "Romanian" |
|`"ro-md"` | "Moldavian" |
|`"rof"` | "Rombo" |
|`"rom"` | "Romany" |
|`"romanian"` | "Romanian" |
|`"romanian (romania)"` | "Romanian" |
|`"romansh"` | "Romansh" |
|`"romany"` | "Romany" |
|`"rombo"` | "Rombo" |
|`"română"` | "Romanian" |
|`"root"` | "Root" |
|`"ru"` | "Russian" |
|`"ru_ru"` | "Russian" |
|`"rukiga"` | "Chiga" |
|`"rumantsch"` | "Romansh" |
|`"rundi"` | "Rundi" |
|`"runyankore"` | "Nyankole" |
|`"rup"` | "Aromanian" |
|`"russia"` | "Russian" |
|`"russian"` | "Russian" |
|`"russian (russia)"` | "Russian" |
|`"russo (russia)"` | "Russian" |
|`"rw"` | "Kinyarwanda" |
|`"rwa"` | "Rwa" |
|`"rwk"` | "Rwa" |
|`"sa"` | "Sanskrit" |
|`"sad"` | "Sandawe" |
|`"sah"` | "Sakha" |
|`"saho"` | "Saho" |
|`"sakha"` | "Sakha" |
|`"sam"` | "Samaritan Aramaic" |
|`"samaritan aramaic"` | "Samaritan Aramaic" |
|`"samburu"` | "Samburu" |
|`"samoan"` | "Samoan" |
|`"sandawe"` | "Sandawe" |
|`"sango"` | "Sango" |
|`"sangu"` | "Sangu" |
|`"sanskrit"` | "Sanskrit" |
|`"santali"` | "Santali" |
|`"saq"` | "Samburu" |
|`"sardinian"` | "Sardinian" |
|`"sas"` | "Sasak" |
|`"sasak"` | "Sasak" |
|`"sat"` | "Santali" |
|`"sba"` | "Ngambay" |
|`"sbp"` | "Sangu" |
|`"sc"` | "Sardinian" |
|`"schweizer hochdeutsch"` | "German" |
|`"schwiizertüütsch"` | "Swiss German" |
|`"scn"` | "Sicilian" |
|`"sco"` | "Scots" |
|`"scots"` | "Scots" |
|`"scottish gaelic"` | "Scottish Gaelic" |
|`"sd"` | "Sindhi" |
|`"se"` | "Northern Sami" |
|`"see"` | "Seneca" |
|`"seh"` | "Sena" |
|`"sel"` | "Selkup" |
|`"selkup"` | "Selkup" |
|`"sena"` | "Sena" |
|`"seneca"` | "Seneca" |
|`"serbian"` | "Serbian" |
|`"serbian (latin, serbia)"` | "Serbian" |
|`"serbo-croatian"` | "Serbo-Croatian" |
|`"serer"` | "Serer" |
|`"ses"` | "Koyraboro Senni" |
|`"sesotho"` | "Southern Sotho" |
|`"sesotho sa leboa"` | "Northern Sotho" |
|`"setswana"` | "Tswana" |
|`"sg"` | "Sango" |
|`"sga"` | "Old Irish" |
|`"sh"` | "Serbo-Croatian" |
|`"shambala"` | "Shambala" |
|`"shan"` | "Shan" |
|`"shi"` | "Tachelhit" |
|`"shn"` | "Shan" |
|`"shona"` | "Shona" |
|`"shqip"` | "Albanian" |
|`"shqipe"` | "Albanian" |
|`"shu"` | "Chadian Arabic" |
|`"shwóŋò ngiembɔɔn"` | "Ngiemboon" |
|`"si"` | "Sinhala" |
|`"sichuan yi"` | "Sichuan Yi" |
|`"sicilian"` | "Sicilian" |
|`"sid"` | "Sidamo" |
|`"sidamo"` | "Sidamo" |
|`"siksika"` | "Siksika" |
|`"simplified chinese"` | "Chinese" |
|`"sindhi"` | "Sindhi" |
|`"sinhala"` | "Sinhala" |
|`"siswati"` | "Swati" |
|`"sk"` | "Slovak" |
|`"skolt sami"` | "Skolt Sami" |
|`"sl"` | "Slovenian" |
|`"slave"` | "Slave" |
|`"slovak"` | "Slovak" |
|`"slovak (slovakia)"` | "Slovak" |
|`"slovenian"` | "Slovenian" |
|`"slovenian (slovenia)"` | "Slovenian" |
|`"slovenský"` | "Slovak" |
|`"slovenčina"` | "Slovak" |
|`"slovenščina"` | "Slovenian" |
|`"sm"` | "Samoan" |
|`"sma"` | "Southern Sami" |
|`"smj"` | "Lule Sami" |
|`"smn"` | "Inari Sami" |
|`"sms"` | "Skolt Sami" |
|`"sn"` | "Shona" |
|`"snk"` | "Soninke" |
|`"so"` | "Somali" |
|`"sog"` | "Sogdien" |
|`"soga"` | "Soga" |
|`"sogdien"` | "Sogdien" |
|`"somali"` | "Somali" |
|`"soninke"` | "Soninke" |
|`"soomaali"` | "Somali" |
|`"sorani kurdish"` | "Sorani Kurdish" |
|`"south ndebele"` | "South Ndebele" |
|`"southern altai"` | "Southern Altai" |
|`"southern sami"` | "Southern Sami" |
|`"southern sotho"` | "Southern Sotho" |
|`"spagnolo (uruguay)"` | "Spanish" |
|`"spanish"` | "Spanish" |
|`"spanish (argentina)"` | "Spanish" |
|`"spanish (bolivarian republic of venezuela)"` | "Spanish" |
|`"spanish (chile)"` | "Spanish" |
|`"spanish (colombia)"` | "Spanish" |
|`"spanish (costa rica)"` | "Spanish" |
|`"spanish (dominican republic)"` | "Spanish" |
|`"spanish (ecuador)"` | "Spanish" |
|`"spanish (el salvador)"` | "Spanish" |
|`"spanish (guatemala)"` | "Spanish" |
|`"spanish (honduras)"` | "Spanish" |
|`"spanish (international sort)"` | "Spanish" |
|`"spanish (mexico)"` | "Spanish" |
|`"spanish (panama)"` | "Spanish" |
|`"spanish (puerto rico)"` | "Spanish" |
|`"spanish (spain, international sort)"` | "Spanish" |
|`"spanish (spain, traditional sort)"` | "Spanish" |
|`"spanish (uruguay)"` | "Spanish" |
|`"sq"` | "Albanian" |
|`"sr"` | "Serbian" |
|`"sranan tongo"` | "Sranan Tongo" |
|`"srn"` | "Sranan Tongo" |
|`"srpski"` | "Serbian" |
|`"srr"` | "Serer" |
|`"ss"` | "Swati" |
|`"ssy"` | "Saho" |
|`"st"` | "Southern Sotho" |
|`"standard moroccan tamazight"` | "Standard Moroccan Tamazight" |
|`"su"` | "Sundanese" |
|`"suk"` | "Sukuma" |
|`"sukuma"` | "Sukuma" |
|`"sumerian"` | "Sumerian" |
|`"sundanese"` | "Sundanese" |
|`"suomi"` | "Finnish" |
|`"suomi (suomi)"` | "Finnish" |
|`"sus"` | "Susu" |
|`"susu"` | "Susu" |
|`"sux"` | "Sumerian" |
|`"sv"` | "Swedish" |
|`"svenska"` | "Swedish" |
|`"svenska (sverige)"` | "Swedish" |
|`"sw"` | "Swahili" |
|`"swahili"` | "Swahili" |
|`"swati"` | "Swati" |
|`"swb"` | "Comorian" |
|`"swc"` | "Congo Swahili" |
|`"swedish"` | "Swedish" |
|`"swedish (sweden)"` | "Swedish" |
|`"swiss french"` | "French" |
|`"swiss german"` | "Swiss German" |
|`"swiss high german"` | "German" |
|`"syc"` | "Classical Syriac" |
|`"syr"` | "Syriac" |
|`"syriac"` | "Syriac" |
|`"sängö"` | "Sango" |
|`"ta"` | "Tamil" |
|`"tachelhit"` | "Tachelhit" |
|`"tagalog"` | "Tagalog" |
|`"tahitian"` | "Tahitian" |
|`"taita"` | "Taita" |
|`"tajik"` | "Tajik" |
|`"tamashek"` | "Tamashek" |
|`"tamaziɣt"` | "Central Atlas Tamazight" |
|`"tamil"` | "Tamil" |
|`"taqbaylit"` | "Kabyle" |
|`"taroko"` | "Taroko" |
|`"tasawaq"` | "Tasawaq" |
|`"tasawaq senni"` | "Tasawaq" |
|`"tatar"` | "Tatar" |
|`"te"` | "Telugu" |
|`"telugu"` | "Telugu" |
|`"tem"` | "Timne" |
|`"teo"` | "Teso" |
|`"ter"` | "Tereno" |
|`"tereno"` | "Tereno" |
|`"teso"` | "Teso" |
|`"tet"` | "Tetum" |
|`"tetum"` | "Tetum" |
|`"tg"` | "Tajik" |
|`"th"` | "Thai" |
|`"th_th"` | "Thai" |
|`"thai"` | "Thai" |
|`"thai (thailand)"` | "Thai" |
|`"thok nath"` | "Nuer" |
|`"ti"` | "Tigrinya" |
|`"tibetan"` | "Tibetan" |
|`"tig"` | "Tigre" |
|`"tigre"` | "Tigre" |
|`"tigrinya"` | "Tigrinya" |
|`"timne"` | "Timne" |
|`"tiv"` | "Tiv" |
|`"tiếng việt"` | "Vietnamese" |
|`"tk"` | "Turkmen" |
|`"tkl"` | "Tokelau" |
|`"tl"` | "Tagalog" |
|`"tlh"` | "Klingon" |
|`"tli"` | "Tlingit" |
|`"tlingit"` | "Tlingit" |
|`"tmh"` | "Tamashek" |
|`"tn"` | "Tswana" |
|`"to"` | "Tongan" |
|`"tog"` | "Nyasa Tonga" |
|`"tok pisin"` | "Tok Pisin" |
|`"tokelau"` | "Tokelau" |
|`"tongan"` | "Tongan" |
|`"tpi"` | "Tok Pisin" |
|`"tr"` | "Turkish" |
|`"traditional chinese"` | "Chinese" |
|`"trv"` | "Taroko" |
|`"ts"` | "Tsonga" |
|`"tshiluba"` | "Luba-Katanga" |
|`"tshivenḓa"` | "Venda" |
|`"tsi"` | "Tsimshian" |
|`"tsimshian"` | "Tsimshian" |
|`"tsonga"` | "Tsonga" |
|`"tswana"` | "Tswana" |
|`"tt"` | "Tatar" |
|`"tum"` | "Tumbuka" |
|`"tumbuka"` | "Tumbuka" |
|`"turkish"` | "Turkish" |
|`"turkish (turkey)"` | "Turkish" |
|`"turkmen"` | "Turkmen" |
|`"tuvalu"` | "Tuvalu" |
|`"tuvinian"` | "Tuvinian" |
|`"tvl"` | "Tuvalu" |
|`"tw"` | "Twi" |
|`"twi"` | "Twi" |
|`"twq"` | "Tasawaq" |
|`"ty"` | "Tahitian" |
|`"tyap"` | "Tyap" |
|`"tyv"` | "Tuvinian" |
|`"tzm"` | "Central Atlas Tamazight" |
|`"türkçe"` | "Turkish" |
|`"u.k. english"` | "English" |
|`"u.s. english"` | "English" |
|`"udm"` | "Udmurt" |
|`"udmurt"` | "Udmurt" |
|`"ug"` | "Uyghur" |
|`"uga"` | "Ugaritic" |
|`"ugaritic"` | "Ugaritic" |
|`"uighur"` | "Uyghur" |
|`"uk"` | "Ukrainian" |
|`"ukrainian"` | "Ukrainian" |
|`"ukrainian (ukraine)"` | "Ukrainian" |
|`"umb"` | "Umbundu" |
|`"umbundu"` | "Umbundu" |
|`"upper sorbian"` | "Upper Sorbian" |
|`"ur"` | "Urdu" |
|`"urdu"` | "Urdu" |
|`"uyghur"` | "Uyghur" |
|`"uz"` | "Uzbek" |
|`"uzbek"` | "Uzbek" |
|`"vai"` | "Vai" |
|`"ve"` | "Venda" |
|`"venda"` | "Venda" |
|`"vi"` | "Vietnamese" |
|`"vi_vn"` | "Vietnamese" |
|`"vietnam"` | "Vietnamese" |
|`"vietnamese"` | "Vietnamese" |
|`"vietnamese (vietnam)"` | "Vietnamese" |
|`"vlaams"` | "Flemish" |
|`"vo"` | "Volapük" |
|`"volapük"` | "Volapük" |
|`"vot"` | "Votic" |
|`"votic"` | "Votic" |
|`"vun"` | "Vunjo" |
|`"vunjo"` | "Vunjo" |
|`"wa"` | "Walloon" |
|`"wae"` | "Walser" |
|`"wal"` | "Wolaytta" |
|`"walloon"` | "Walloon" |
|`"walser"` | "Walser" |
|`"war"` | "Waray" |
|`"waray"` | "Waray" |
|`"was"` | "Washo" |
|`"washo"` | "Washo" |
|`"welsh"` | "Welsh" |
|`"west-frysk"` | "Western Frisian" |
|`"western frisian"` | "Western Frisian" |
|`"wo"` | "Wolof" |
|`"wolaytta"` | "Wolaytta" |
|`"wolof"` | "Wolof" |
|`"xal"` | "Kalmyk" |
|`"xh"` | "Xhosa" |
|`"xhosa"` | "Xhosa" |
|`"xitsonga"` | "Tsonga" |
|`"xog"` | "Soga" |
|`"yangben"` | "Yangben" |
|`"yao"` | "Yao" |
|`"yap"` | "Yapese" |
|`"yapese"` | "Yapese" |
|`"yav"` | "Yangben" |
|`"ybb"` | "Yemba" |
|`"yemba"` | "Yemba" |
|`"yi"` | "Yiddish" |
|`"yiddish"` | "Yiddish" |
|`"yo"` | "Yoruba" |
|`"yoruba"` | "Yoruba" |
|`"yue"` | "Cantonese" |
|`"za"` | "Zhuang" |
|`"zap"` | "Zapotec" |
|`"zapotec"` | "Zapotec" |
|`"zarma"` | "Zarma" |
|`"zarmaciine"` | "Zarma" |
|`"zaza"` | "Zaza" |
|`"zbl"` | "Blissymbols" |
|`"zen"` | "Zenaga" |
|`"zenaga"` | "Zenaga" |
|`"zgh"` | "Standard Moroccan Tamazight" |
|`"zh"` | "Chinese" |
|`"zh-hans"` | "Chinese" |
|`"zh-hant"` | "Chinese" |
|`"zh_cn"` | "Chinese" |
|`"zhuang"` | "Zhuang" |
|`"zu"` | "Zulu" |
|`"zulu"` | "Zulu" |
|`"zun"` | "Zuni" |
|`"zuni"` | "Zuni" |
|`"zza"` | "Zaza" |
|`"èdè yorùbá"` | "Yoruba" |
|`"íslenska"` | "Icelandic" |
|`"österreichisches deutsch"` | "German" |
|`"čeština"` | "Czech" |
|`"ɓàsàa"` | "Basaa" |
|`"ʻōlelo hawaiʻi"` | "Hawaiian" |
|`"ελληνικά"` | "Greek" |
|`"беларуская"` | "Belarusian" |
|`"български"` | "Bulgarian" |
|`"български език"` | "Bulgarian" |
|`"ирон"` | "Ossetic" |
|`"кыргызча"` | "Kyrgyz" |
|`"македонски"` | "Macedonian" |
|`"монгол"` | "Mongolian" |
|`"русский"` | "Russian" |
|`"русский язык"` | "Russian" |
|`"саха тыла"` | "Sakha" |
|`"српски"` | "Serbian" |
|`"српски језик"` | "Serbian" |
|`"тоҷикӣ"` | "Tajik" |
|`"українська"` | "Ukrainian" |
|`"ўзбек"` | "Uzbek" |
|`"қазақ тілі"` | "Kazakh" |
|`"հայերեն"` | "Armenian" |
|`"עברית"` | "Hebrew" |
|`"ئۇيغۇرچە"` | "Uyghur" |
|`"اردو"` | "Urdu" |
|`"العربية"` | "Arabic" |
|`"العربية الرسمية الحديثة"` | "Arabic" |
|`"العربيه مصر"` | "Arabic" |
|`"فارسى"` | "English" |
|`"فارسي"` | "Persian" |
|`"فارسی"` | "Persian" |
|`"پښتو"` | "Pashto" |
|`"کٲشُر"` | "Kashmiri" |
|`"कोंकणी"` | "Konkani" |
|`"नेपाली"` | "Nepali" |
|`"बड़ो"` | "Bodo" |
|`"मराठी"` | "Marathi" |
|`"हिंदी"` | "Hindi" |
|`"हिन्दी"` | "Hindi" |
|`"অসমীয়া"` | "Assamese" |
|`"বাংলা"` | "Bengali" |
|`"ਪੰਜਾਬੀ"` | "Punjabi" |
|`"ગુજરાતી"` | "Gujarati" |
|`"ଓଡ଼ିଆ"` | "Oriya" |
|`"தமிழ்"` | "Tamil" |
|`"తెలుగు"` | "Telugu" |
|`"ಕನ್ನಡ"` | "Kannada" |
|`"മലയാളം"` | "Malayalam" |
|`"සිංහල"` | "Sinhala" |
|`"ไทย"` | "Thai" |
|`"ລາວ"` | "Lao" |
|`"པོད་སྐད་"` | "Tibetan" |
|`"རྫོང་ཁ"` | "Dzongkha" |
|`"ဗမာ"` | "Burmese" |
|`"ქართული"` | "Georgian" |
|`"ብሊን"` | "Blin" |
|`"ትግረ"` | "Tigre" |
|`"ትግርኛ"` | "Tigrinya" |
|`"አማርኛ"` | "Amharic" |
|`"ወላይታቱ"` | "Wolaytta" |
|`"ᏣᎳᎩ"` | "Cherokee" |
|`"ខ្មែរ"` | "Khmer" |
|`"ភាសាខ្មែរ"` | "Khmer" |
|`"ⵜⴰⵎⴰⵣⵉⵖⵜ"` | "Tachelhit" |
|`"中文"` | "Chinese" |
|`"日本語"` | "Japanese" |
|`"简体中文"` | "Chinese" |
|`"繁體中文"` | "Chinese" |
|`"ꆈꌠꉙ"` | "Sichuan Yi" |
|`"ꕙꔤ"` | "Vai" |
|`"한국어"` | "Korean" |

{{/partial:collapse}}

## Request 

`POST https://api2.amplitude.com/2/httpapi`

{{partial:collapse name="Example: Simple request"}}
This example uploads a 'watch_tutorial' event with a few properties and user properties for the user `12345`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST 'https://api.amplitude.com/2/httpapi' \
--header 'Content-Type: application/json' \
--data-raw '{
    "api_key": "YOUR_API_KEY",
    "events": [
        {
            "user_id": "12345",
            "event_type": "watch_tutorial",
            "user_properties": {
                "Cohort": "Test A"
            },
            "country": "United States",
            "ip": "127.0.0.1",
            "time": 1396381378123
        }
    ]
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /2/httpapi HTTP/1.1
Host: api.amplitude.com
Content-Type: application/json
Content-Length: 360

{
    "api_key": "YOUR_API_KEY",
    "events": [
        {
            "user_id": "12345",
            "event_type": "watch_tutorial",
            "user_properties": {
                "Cohort": "Test A"
            },
            "country": "United States",
            "ip": "127.0.0.1",
            "time": 1396381378123
        }
    ]
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Request with many fields"}}
This example uploads a 'watch_tutorial' event with many event properties and user properties for the user `12345`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://api.amplitude.com/2/httpapi' \
--header 'Content-Type: application/json' \
--data-raw '{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "user_id": "12345@gmail.com",
      "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
      "event_type": "watch_tutorial",
      "time": 1396381378123,
      "event_properties": {
        "load_time": 0.8371,
        "source": "notification",
        "dates": [
          "monday",
          "tuesday"
        ]
      },
      "user_properties": {
        "age": 25,
        "gender": "female",
        "interests": [
          "chess",
          "football",
          "music"
        ]
      },
      "groups": {
        "team_id": "1",
        "company_name": [
          "Amplitude",
          "DataMonster"
        ]
      },
      "app_version": "2.1.3", 
      "platform": "iOS", 
      "os_name": "Android",
      "os_version": "4.2.2",
      "device_brand": "Verizon",
      "device_manufacturer": "Apple",
      "device_model": "iPhone 9,1",
      "carrier": "Verizon",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "dma": "San Francisco-Oakland-San Jose, CA",
      "language": "English",
      "price": 4.99,
      "quantity": 3,
      "revenue": -1.99,
      "productId": "Google Pay Store Product Id",
      "revenueType": "Refund",
      "location_lat": 37.77,
      "location_lng": -122.39,
      "ip": "127.0.0.1",
      "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "android_app_set_id": "087e666f-72f3-4d6c-8cce-e8bedce9304e",
      "event_id": 23,
      "session_id": 1396381378123,
      "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
    }
  ]
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /2/httpapi HTTP/1.1
Host: api.amplitude.com
Content-Type: application/json
Content-Length: 1719

{
  "api_key": "YOUR_API_KEY",
  "events": [
    {
      "user_id": "datamonster@gmail.com",
      "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
      "event_type": "watch_tutorial",
      "time": 1396381378123,
      "event_properties": {
        "load_time": 0.8371,
        "source": "notification",
        "dates": [
          "monday",
          "tuesday"
        ]
      },
      "user_properties": {
        "age": 25,
        "gender": "female",
        "interests": [
          "chess",
          "football",
          "music"
        ]
      },
      "groups": {
        "team_id": "1",
        "company_name": [
          "Amplitude",
          "DataMonster"
        ]
      },
      "app_version": "2.1.3", #[tl! collapse:start]
      "platform": "iOS",
      "os_name": "Android",
      "os_version": "4.2.2",
      "device_brand": "Verizon",
      "device_manufacturer": "Apple",
      "device_model": "iPhone 9,1",
      "carrier": "Verizon",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "dma": "San Francisco-Oakland-San Jose, CA",
      "language": "English",
      "price": 4.99,
      "quantity": 3,
      "revenue": -1.99,
      "productId": "Google Pay Store Product Id",
      "revenueType": "Refund",
      "location_lat": 37.77,
      "location_lng": -122.39,
      "ip": "127.0.0.1",
      "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "event_id": 23,
      "session_id": 1396381378123,
      "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841" #[tl! collapse:end]
    }
  ]
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Request with option "}}
This example uploads a 'watch_tutorial' event with many event properties and user properties for the user `12345`, but sets the `min_id_length` option to 3.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
# [tl! ~~:5,2]
curl --location --request POST 'https://api.amplitude.com/2/httpapi' \
--header 'Content-Type: application/json' \
--data-raw '{
  "api_key": "YOUR_API_KEY",
  "options": {
    "min_id_length": 3
    },
  "events": [
    {
      "user_id": "12345",
      "device_id": "123",
      "event_type": "watch_tutorial",
      "time": 1396381378123,
      "event_properties": {
        "load_time": 0.8371,
        "source": "notification",
        "dates": [
          "monday",
          "tuesday"
        ]
      },
      "user_properties": {
        "age": 25,
        "gender": "female",
        "interests": [
          "chess",
          "football",
          "music"
        ]
      },
      "groups": {
        "team_id": "1",
        "company_name": [
          "Amplitude",
          "DataMonster"
        ]
      },
      "app_version": "2.1.3",
      "platform": "iOS",
      "os_name": "Android",
      "os_version": "4.2.2",
      "device_brand": "Verizon",
      "device_manufacturer": "Apple",
      "device_model": "iPhone 9,1",
      "carrier": "Verizon",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "dma": "San Francisco-Oakland-San Jose, CA",
      "language": "English",
      "price": 4.99,
      "quantity": 3,
      "revenue": -1.99,
      "productId": "Google Pay Store Product Id",
      "revenueType": "Refund",
      "location_lat": 37.77,
      "location_lng": -122.39,
      "ip": "127.0.0.1",
      "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "android_app_set_id": "087e666f-72f3-4d6c-8cce-e8bedce9304e",
      "event_id": 23,
      "session_id": 1396381378123,
      "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
    }
  ]
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /2/httpapi HTTP/1.1
Host: api.amplitude.com
Content-Type: application/json
Content-Length: 1731

{
  "api_key": "YOUR_API_KEY",
  "options": { #[tl! ~~:1]
    "min_id_length": 3
    },
  "events": [
    {
      "user_id": "datamonster@gmail.com",
      "device_id": "123",
      "event_type": "watch_tutorial",
      "time": 1396381378123,
      "event_properties": {
        "load_time": 0.8371,
        "source": "notification",
        "dates": [
          "monday",
          "tuesday"
        ]
      },
      "user_properties": {
        "age": 25,
        "gender": "female",
        "interests": [
          "chess",
          "football",
          "music"
        ]
      },
      "groups": {
        "team_id": "1",
        "company_name": [
          "Amplitude",
          "DataMonster"
        ]
      },
      "app_version": "2.1.3",
      "platform": "iOS",
      "os_name": "Android",
      "os_version": "4.2.2",
      "device_brand": "Verizon",
      "device_manufacturer": "Apple",
      "device_model": "iPhone 9,1",
      "carrier": "Verizon",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "dma": "San Francisco-Oakland-San Jose, CA",
      "language": "English",
      "price": 4.99,
      "quantity": 3,
      "revenue": -1.99,
      "productId": "Google Pay Store Product Id",
      "revenueType": "Refund",
      "location_lat": 37.77,
      "location_lng": -122.39,
      "ip": "127.0.0.1",
      "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "android_app_set_id": "087e666f-72f3-4d6c-8cce-e8bedce9304e",
      "event_id": 23,
      "session_id": 1396381378123,
      "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
    }
  ]
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Headers

To send data to Amplitude HTTP V2 API, a `Content-Type` header must be set to `application/json`.

### Body parameters

| Name                                     | Description                                                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                                | <span class="required">Required</span>. String. Amplitude project API key.                                                                   |
| [`events`](#keys-for-the-event-argument) | <span class="required">Required</span>. []. Array of Events to upload. |
| [`options`](#options)                    | <span class="optional">Optional</span>. []. Object.         |

#### Event array keys

You can send these keys in the JSON event object. Note that one of `user_id` or `device_id` is required, as well as the `event_type`.

| <div class="big-column">Name</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`                          | <span class="required">Required if `device_id` isn't used</span>. String. ID for the user. Must have a minimum length of 5 characters unless overridden with the `min_id_length` option.                                                                                                                                                                                                                                                        |
| `device_id`                        | <span class="required">Required if `user_id` isn't used</span>. String. A device-specific identifier, such as the Identifier for Vendor on iOS. If a `device_id` isn't sent with the event, then it's set to a hashed version of the `user_id`.                                                                                                                                                                                                 |
| `event_type`                       | <span class="required">Required</span>. String. A unique identifier for your event. Amplitude reserves the following event names for internal use: `[Amplitude]` Start Session", `[Amplitude]` End Session", `[Amplitude]` Revenue", `[Amplitude]` Revenue (Verified)", `[Amplitude]` Revenue (Unverified)", and `[Amplitude]` Merged User". Note: `$identify` and `$groupidentify` are predefined for identification and group identification. |
| `time`                             | <span class="optional">Optional</span>. The timestamp of the event in milliseconds since epoch. If time isn't sent with the event, then it's set to the request upload time.                                                                                                                                                                                                                                                                    |
| `event_properties`                 | <span class="optional">Optional</span>. Object. A dictionary of key-value pairs that represent data to send along with the event. You can store property values in an array. Date values are transformed into string values. Object depth may not exceed 40 layers.                                                                                                                                                                             |
| `user_properties`                  | <span class="optional">Optional</span>. Object. A dictionary of key-value pairs that represent data tied to the user. You can store property values in an array. Date values are transformed into string values. User property operations (`$set`, `$setOnce`, `$add`, `$append`, `$unse`t) are supported when `event_type` is `$identify`. Object depth may not exceed 40 layers.                                                              |
| `groups`                           | <span class="optional">Optional</span>. Object. This feature is available to Growth or Enterprise customers who've purchased the Accounts add-on. This field adds a dictionary of key-value pairs that represent groups of users to the event as an event-level group. You can track up to 5 unique group types and 10 total group values per event. Any groups past that threshold aren't tracked.                                             |
| `group_properties`                 | <span class="optional">Optional</span>. Object. This feature is available to customers who've purchased the Accounts add-on. When "event_type" is `$groupidentify`, the field is a dictionary of key-value pairs that represent properties tied to the groups listed in the "groups" field. The field is ignored for other event types. Group property operations (`$set`, `$setOnce`, `$add`, `$append`, `$unset`) are also supported.         |
| `$skip_user_properties_sync`       | <span class="optional">Optional</span>. Boolean. When `true` user properties aren't synced. Defaults to `false`.                                                                                                                                                                                                                     |
| `app_version`                      | <span class="optional">Optional</span>. String. The current version of your application.                                                                                                                                                                                                                                                                                                                                                        |
| `platform`                         | <span class="optional">Optional</span>. String. Platform of the device.                                                                                                                                                                                                                                                                                                                                                                         |
| `os_name`                          | <span class="optional">Optional</span>. String. The name of the mobile operating system or browser that the user is using.                                                                                                                                                                                                                                                                                                                      |
| `os_version`                       | <span class="optional">Optional</span>. String. The version of the mobile operating system or browser the user is using.                                                                                                                                                                                                                                                                                                                        |
| `device_brand`                     | <span class="optional">Optional</span>. String. The device brand that the user is using.                                                                                                                                                                                                                                                                                                                                                        |
| `device_manufacturer`              | <span class="optional">Optional</span>. String. The device manufacturer that the user is using.                                                                                                                                                                                                                                                                                                                                                 |
| `device_model`                     | <span class="optional">Optional</span>. String. The device model that the user is using.                                                                                                                                                                                                                                                                                                                                                        |
| `carrier`                          | <span class="optional">Optional</span>. String. The carrier that the user is using.                                                                                                                                                                                                                                                                                                                                                             |
| `country`                     | <span class="optional">Optional</span>. String. The current country of the user.                                                                                                                                                                                                                                                                                                                                                                |
| `region`                      | <span class="optional">Optional</span>. String. The current region of the user.                                                                                                                                                                                                                                                                                                                                                                 |
| `city`                        | <span class="optional">Optional</span>. String. The current city of the user.                                                                                                                                                                                                                                                                                                                                                                   |
| `dma`                         | <span class="optional">Optional</span>. String. The current Designated Market Area of the user.                                                                                                                                                                                                                                                                                                                                                 |
| `language`                         | <span class="optional">Optional</span>. String. The language set by the user.                                                                                                                                                                                                                                                                                                                                                                   |
| `price`                            | <span class="optional">Optional</span>. Float. The price of the item purchased. Required for revenue data if the revenue field isn't sent. You can use negative values for refunds.                                                                                                                                                                                                                                                             |
| `quantity`                         | <span class="optional">Optional</span>. Integer. The quantity of the item purchased. Defaults to 1 if not specified.                                                                                                                                                                                                                                                                                                                            |
| `revenue`                          | <span class="optional">Optional</span>. Float. Revenue = (price x quantity). If you send all 3 fields of price, quantity, and revenue, then the revenue value is (price x quantity). Use negative values for refunds.                                                                                                                                                                                                                           |
| `productId`                        | <span class="optional">Optional</span>. String. An identifier for the item purchased. You must send a price and quantity or revenue with this field.                                                                                                                                                                                                                                                                                            |
| `revenueType`                      | <span class="optional">Optional</span>. String. The type of revenue for the item purchased. You must send a price and quantity or revenue with this field.                                                                                                                                                                                                                                                                                      |
| `location_lat`                     | <span class="optional">Optional</span>. Float. The current Latitude of the user.                                                                                                                                                                                                                                                                                                                                                                |
| `location_lng`                     | <span class="optional">Optional</span>. Float. The current Longitude of the user.                                                                                                                                                                                                                                                                                                                                                               |
| `ip`                               | <span class="optional">Optional</span>. String. The IP address of the user. Use `$remote` to use the IP address on the upload request. Amplitude uses the IP address to reverse lookup a user's location (city, country, region, and DMA). Amplitude can drop the location and IP address from events after they reach Amplitude servers. Contact the Support team to configure this.                                                           |
| `idfa`                        | <span class="optional">Optional</span>. String. (iOS) Identifier for Advertiser.                                                                                                                                                                                                                                                                                                                                                                |
| `idfv`                             | <span class="optional">Optional</span>. String. (iOS) Identifier for Vendor.                                                                                                                                                                                                                                                                                                                                                                    |
| `android_app_set_id`             | <span class="optional">Optional</span>. String. (Android) Identifier for vendor+                                                                                                                                                                                                                                                                                                                                            |
| `adid`                        | <span class="optional">Optional</span>. String. (Android) Google Play Services advertising ID                                                                                                                                                                                                                                                                                                                                                   |
| `android_id`                       | <span class="optional">Optional</span>. String. (Android) Android ID (not the advertising ID)                                                                                                                                                                                                                                                                                                                                                   |
| `event_id`                         | <span class="optional">Optional</span>. Integer. (Optional) An incrementing counter to distinguish events with the same `user_id` and timestamp from each other. Amplitude recommends you send an `event_id`, increasing over time, especially if you expect events to occur simultaneously.                                                                                                                                                    |
| `session_id`                       | <span class="optional">Optional</span>. Long. The start time of the session in milliseconds since epoch (Unix Timestamp), necessary if you want to associate events with a particular system. A `session_id` of -1 is the same as no `session_id` specified.                                                                                                                                                                                    |
| `insert_id`                        | <span class="optional">Optional</span>. String. A unique identifier for the event. Amplitude deduplicates subsequent events sent with the same `device_id` and `insert_id` within the past 7 days. Amplitude recommends generating a UUID or using some combination of `device_id`, `user_id`, `event_type`, `event_id`, and time.                                                                                                              |
| `plan`                             | <span class="optional">Optional</span>. Object. Tracking plan properties. Amplitude supports only branch, source, version properties.                                                                                                                                                                                                                                                                                                           |
| `plan.branch`                      | <span class="optional">Optional</span>. String. The tracking plan branch name. For example: "main".                                                                                                                                                                                                                                                                                                                                             |
| `plan.source`                      | <span class="optional">Optional</span>. String. The tracking plan source. For example: "web".                                                                                                                                                                                                                                                                                                                                                   |
| `plan.version`                     | <span class="optional">Optional</span>. String. The tracking plan version. For example: "1", "15".                                                                                                                                                                                                                                                                                                                                              |


#### Options

| <div class="big-column">Name</div> | Description                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `min_id_length`                    | <span class="optional">Optional</span>. Integer. Overrides the default minimum length of 5 for `user_id` & `device_id` fields. |

## Response

Amplitude recommends that you implement retry logic and send an `insert_id` (used for deduplication of the same event) in your events.
This prevents lost events or duplicated events if the API is unavailable or a request fails.

{{partial:admonition type="note" heading="Logging errors"}}
Amplitude recommends that you add your own logging to capture responses that receive a response other than `200`.
{{/partial:admonition}}

### 200

[200 OK](https://tools.ietf.org/html/rfc7231#section-6.3.1): Successful real time event upload. If you don't receive a `200 OK` response, retry your request.

```json
{
  "code": 200,
  "events_ingested": 50,
  "payload_size_bytes": 50,
  "server_upload_time": 1396381378123
}

```

| <div class="big-column">Name</div> | Description                                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `code`                             | Integer. 200 success code                                                                                               |
| `events_ingested`                  | Integer. The number of events ingested from the upload request.                                                         |
| `payload_size_bytes`               | Integer. The size of the upload request payload in bytes.                                                               |
| `server_upload_time`               | Long. The time in milliseconds since epoch (Unix Timestamp) that Amplitude's event servers accepted the upload request. |

### 400

[400 Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1). A 400 indicates invalid upload request. Check the response for more information.

Possible reasons for an invalid request:

- The request body isn't valid JSON. The `error` returned is "Invalid JSON request body".
- The request body is missing required fields. The `error` returned is "Request missing required field", and indicates which fields are missing.  
- The events object has invalid fields. `events_with_invalid_fields` maps field names to the index of the first event that returns an error.
- Some devices are silenced.

{{partial:collapse name="Example response: Invalid fields"}}
```json
{
  "code": 400,
  "error": "Request missing required field",
  "missing_field": "api_key",
  "events_with_missing_fields": {
    "event_type": [
      3
    ]
  }
}

```
{{/partial:collapse}}

{{partial:collapse name="Example response: Silenced devices"}}
```json
{
    "code": 400,
    "eps_threshold": 100,
    "error": "Events silenced for device_id",
    "exceeded_daily_quota_devices":
    {},
    "silenced_devices":
    [
        "silenced_device_id_1",
        "silenced_device_id_2"
    ],
    "silenced_events":
    [
        5,
        6
    ],
    "throttled_devices":
    {
        "throttled_device_id_1": 0,
        "throttled_device_id_2": 100
    },
    "throttled_events":
    [
        3,
        4
    ]
}
```
{{/partial:collapse}}

#### Properties (invalid or missing JSON)

| <div class="big-column">Name</div> | Description                                                                                                                                                                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`                             | Integer. 400 error code                                                                                                                                                                                                                      |
| `error`                            | String. Error description. Possible values are `Invalid request path`, `Missing request body`, `Invalid JSON request body`, `Request missing required field`, `Invalid event JSON`, `Invalid API key`, `Invalid field values on some events` |
| `missing_field`                    | String. Indicates which request-level required field is missing.                                                                                                                                                                             |
| `events_with_invalid_fields`       | Object. A map from field names to an array that contains the index of the first event to encounter an error.                                                                                                                                 |
| `events_with_missing_fields`       | Object. A map from field names to an array that contains the index of the first event to encounter an error.                                                                                                                                 |

#### Properties (SilencedDeviceID)

| <div class="big-column">Name</div> | Description                                                                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `code`                             | Integer. 400 error code                                                                                                      |
| `error`                            | String. Error description.                                                                                                   |
| `eps_threshold`                    | Integer. Your app's current events per second threshold. If you exceed this rate your requests are throttled.                |
| `exceeded_daily_quota_devices`     | Object. A map from device_id to its current number of daily events, for all devices that exceed the app's daily event quota. |
| `silenced_devices`                 | [string]. Array of `device_id`s that Amplitude has silenced.                                                                 |
| `silenced_events`                  | [integer]. Array of indexes in the events array indicating events whose device_id got silenced.                              |
| `throttled_devices`                | Object. A map from device_id to its current events per second rate, for all devices that exceed the app's current threshold. |
| `throttled_events`                 | [integer]. Array of indexes in the events array indicating events whose `user_id` or `device_id` got throttled               |

### 403 (forbidden)

[403 Forbidden](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3). The request is blocked by Amplitude's Web Application Firewall (WAF).

Possible reasons for the response:

- The request contains invalid values within the Header, Body, and/or URI that match our security filters
- The request is from a sanctioned region from which Amplitude isn't allowed to accept requests.

```json
{
  "code": 403,
  "error": "Forbidden"
}

```

#### Properties

| Name    | Description                |
| ------- | -------------------------- |
| `code`  | Integer. 403 error code    |
| `error` | String. Error description. |

### 413 (payload too large)

[413 Payload Too Large](https://tools.ietf.org/html/rfc7231#section-6.5.11). The payload size is too big (request size exceeds 1MB). Split your events array payload into multiple requests and try again.

```json
{
  "code": 413,
  "error": "Payload too large"
}

```

#### Properties

| Name    | Description                |
| ------- | -------------------------- |
| `code`  | Integer. 413 error code    |
| `error` | String. Error description. |

### 429 (too many requests)

[429 Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4). Too many requests for a user or device. Amplitude throttles requests for users and devices that exceed 30 events per second
 (measured as an average over a recent time window).
  You should pause sending events for that user or device for a period of 30 seconds before retrying and continue retrying until you no longer receive a 429 response.

```json
{
  "code": 429,
  "error": "Too many requests for some devices and users",
  "eps_threshold": 30,
  "throttled_devices": {
    "C8F9E604-F01A-4BD9-95C6-8E5357DF265D": 31
  },
  "throttled_users": {
    "datamonster@amplitude.com": 32
  },
  "throttled_events": [
    3,
    4,
    7
  ]
}

```

#### Properties

| <div class="big-column">Name</div> | Description                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `code`                             | Integer. 429 error code                                                                                                        |
| `error`                            | String. Error description.                                                                                                     |
| `eps_threshold`                    | Integer. Your app's current events per second threshold. If you exceed this rate your requests are throttled.                  |
| `throttled_devices`                | Object. A map from `device_id` to its current events per second rate, for all devices that exceed the app's current threshold. |
| `throttled_users`                  | Object. A map from `user_id` to their current events per second rate, for all users that exceed the app's current threshold.   |
| `throttled_events`                 | Array of indexes in the events array indicating events whose `user_id` or `device_id` were throttled.                          |

### Server Error 500, 502, 504

500, 502, and 504  [Server Error](https://tools.ietf.org/html/rfc2616#section-10.5.1). Amplitude encountered an error while handling the request. A request with this response may not have been accepted by Amplitude. If you retry the request, it could duplicate the events. To avoid duplication, send an `insert_id` in your requests.

### 503 Service Unavailable

[503 Service Unavailable](https://tools.ietf.org/html/rfc2616#section-10.5.4).  Request failed because of an internal Amplitude issue. Retrying a request with a `503` response doesn't risk duplicating events.
