---
id: 9215c03e-bf2a-4715-b7c3-cbf1979f6969
blueprint: event-segmentation
title: '이벤트 세분화 분석 구축'
origin: 61370d33-6a3c-41a3-ba21-85ccaf8e861b
this_article_will_help_you:
  - '이벤트 및 속성을 사용하여 이벤트 세분화 분석 만들기'
translated_on: 1733874863
---
대부분의 사용자에게 이벤트 세분화는 기본적인 앰플리튜드 차트입니다. 이 차트는 사용자가 제품에서 무엇을 하고 있는지 보여줍니다. 이벤트 세분화 차트를 사용하면 다음과 같은 분석을 작성할 수 있습니다:

* 선택한 기간 동안 수행된 상위 이벤트 측정
* 이벤트 트리거 빈도 분석
* 제품에서 이벤트를 트리거하는 고유 사용자 수 확인
* 어떤 사용자가 특정 이벤트를 트리거하는 경향이 있는지 명확히 합니다.

대부분의 진폭 차트와 마찬가지로 이벤트 세분화 차트는 이벤트 및 이벤트 속성을 사용자 세그먼트와 결합하여 작성됩니다. 예를 들어 특정 이벤트를 실행한 사용자 수를 세는 것과 같이 간단할 수도 있고, 복잡한 이벤트 공식이 될 수도 있습니다.

이 문서에서는 Amplitude에서 세그먼트 분석을 구축하는 데 필요한 단계를 간략하게 설명합니다.

### 기능 가용성

이 기능은 **모든 Amplitude 요금제**의 사용자가 사용할 수 있습니다. 자세한 내용은 [pricing page](https://amplitude.com/pricing)을 참조하세요.

시작하기 전에 ###

아직 [building charts in Amplitude](/docs/analytics/charts/build-charts-add-events)의 기본 사항을 읽어보지 않았다면 계속 진행하기 전에 읽어보시기 바랍니다.

이 문서를 참조하여 [selecting the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement)에 대해 읽어보세요.

## 이벤트 세분화 분석 설정하기

이벤트 세분화 분석은 다양한 사용자 그룹이 제품에서 어떤 활동을 하는지 보여줍니다. 관심 있는 이벤트와 분석에 포함할 사용자를 Amplitude에 알려야 합니다.

{{partial:admonition type='note'}}
세분화 분석에 활성 이벤트와 비활성 이벤트를 모두 포함할 수 있지만, 대부분의 고객은 활성 이벤트에 초점을 맞출 때 앰플리튜드 차트에서 더 많은 인사이트를 얻을 수 있습니다.
{{/partial:admonition}}

이벤트 세분화 차트를 만들려면 다음 단계를 따르세요:

1. 이벤트 모듈에서 시작 이벤트 또는 메트릭을 선택합니다. Amplitude에서 계측되는 특정 이벤트를 선택하거나, 사용 가능한 이벤트 목록에서 *모든 이벤트*를 선택하여 모든 이벤트를 이 분석의 시작 이벤트로 간주하도록 Amplitude에 지시할 수 있습니다.  
  
    필요한 경우 이 시점에서 [create an in-line custom event](/docs/analytics/charts/event-segmentation/event-segmentation-in-line-events) 또는 [create a new metric](/docs/analytics/charts/data-tables/data-tables-create-metric)를 입력할 수도 있습니다.

2. 원하는 경우 *+ 필터링 기준*을 클릭하고 속성 이름을 선택한 다음 관심 있는 속성 값을 지정하여 시작 이벤트에 속성을 추가합니다.

    {{partial:admonition type='note'}}
    속성 값 목록에는 지난 30일 동안 프로젝트에 수집된 속성 값이 포함됩니다.
    {{/partial:admonition}}
   
3. 다음으로, 원하는 경우 포함할 다른 이벤트를 선택합니다. 최대 10개까지 선택할 수 있으며, 이러한 이벤트에도 속성을 추가할 수 있습니다.

4. 4. 측정 기준 모듈에서 결과를 측정할 방법을 지정합니다. 고유 사용자 및 이벤트 합계가 가장 일반적으로 사용되지만 다른 여러 가지 옵션 중에서 선택할 수 있습니다. 자세한 내용은 아래의 [Choose the right measurement section](#h_01GVGPDKW7VFAVB62CNXJ8BVEC)을 참조하세요.

5. 세그먼트 모듈에서 이 분석에 포함할 사용자 세그먼트를 식별합니다. 저장됨*을 클릭하고 목록에서 원하는 세그먼트를 선택하여 이전에 저장한 세그먼트를 가져올 수 있습니다. 그렇지 않으면 Amplitude는 분석이 모든 사용자를 대상으로 한다는 가정에서 시작합니다.  
  
{{partial:admonition type='note'}}
선택한 사용자 세그먼트는 선택한 모든 이벤트에 적용됩니다.
{{/partial:admonition}}

6. 이전에 저장한 사용자 세그먼트를 가져오지 않으려면 속성을 추가하여 직접 사용자 세그먼트를 만들 수 있습니다. 이렇게 하려면 *+ 필터링 기준*을 클릭하고 포함하려는 속성을 선택한 다음 관심 있는 속성 값을 지정합니다.

7. 이미 특정 작업을 수행한 사용자만 포함하도록 앰플리튜드에 지시하여 범위를 더욱 좁힐 수 있습니다. 이렇게 하려면 *+ 수행*을 클릭한 다음 관심 있는 이벤트를 선택합니다.

8. 원하는 경우 *+ 세그먼트 추가*를 클릭하고 6단계와 7단계를 반복하여 다른 사용자 세그먼트를 추가합니다.

{{partial:admonition type='note'}}
원하는 경우 세분화 모듈에서 *세그먼트 기준 그룹화*를 클릭하여 사용자 속성별로 시작 이벤트를 세분화할 수 있습니다. 예를 들어, 사용자가 시작 이벤트를 트리거했을 때 위치한 도시를 기준으로 사용자를 그룹화하려면 속성 목록에서 *도시*를 선택하면 됩니다. 그러면 앰플리튜드가 도시별로 세분화 분석을 제공합니다.
{{/partial:admonition}}

이제 차트 영역에 이벤트 세분화 차트와 함께 결과의 표 보기가 표시됩니다.

[Read this article to find out how to choose the best measurement for your Event Segmentation chart](/docs/analytics/charts/event-segmentation/event-segmentation-choose-measurement).

고유_플레이스홀더_15__}}를 만드는 방법을 알아보려면 이 도움말 센터 문서를 참조하세요.