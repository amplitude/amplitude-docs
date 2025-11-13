import { ref, computed } from 'vue'

export function usePropertyView() {
  const properties = ref([])
  const expandedProperty = ref(null)

  const transformEventsToProperties = (eventsData) => {
    if (!eventsData || !eventsData.events) return []

    const propertiesMap = new Map()
    
    eventsData.events.forEach(event => {
      // Process core properties
      event.core_properties?.forEach(property => {
        addPropertyToMap(propertiesMap, property, event, 'core')
      })
      
      // Process product-specific properties
      event.product_specific_properties?.forEach(property => {
        addPropertyToMap(propertiesMap, property, event, 'product')
      })
      
      // Process event-specific properties
      event.event_specific_properties?.forEach(property => {
        addPropertyToMap(propertiesMap, property, event, 'event')
      })
    })
    
    // Convert to array and sort
    properties.value = Array.from(propertiesMap.values())
      .sort((a, b) => {
        // Sort by usage count (descending), then alphabetically
        if (a.usageCount !== b.usageCount) {
          return b.usageCount - a.usageCount
        }
        return a.title.localeCompare(b.title)
      })

    console.log(`Transformed ${properties.value.length} unique properties from ${eventsData.events.length} events`)
    return properties.value
  }

  const addPropertyToMap = (propertiesMap, property, event, relationshipType) => {
    if (!propertiesMap.has(property.id)) {
      propertiesMap.set(property.id, {
        ...property,
        relatedEvents: [],
        usageCount: 0,
        relationships: new Set()
      })
    }
    
    const prop = propertiesMap.get(property.id)
    prop.relatedEvents.push({
      id: event.id,
      title: event.title,
      description: event.description,
      platform: event.platform,
      product_area: event.product_area,
      relationship: relationshipType
    })
    prop.usageCount++
    prop.relationships.add(relationshipType)
  }

  const togglePropertyEvents = (propertyId) => {
    expandedProperty.value = expandedProperty.value === propertyId ? null : propertyId
  }

  const getRelatedEvents = (propertyId) => {
    const property = properties.value.find(p => p.id === propertyId)
    return property?.relatedEvents || []
  }

  const getPropertyByType = (type) => {
    return properties.value.filter(prop => prop.relationships.has(type))
  }

  const getMostUsedProperties = (limit = 10) => {
    return properties.value
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit)
  }

  const getLeastUsedProperties = (limit = 10) => {
    return properties.value
      .sort((a, b) => a.usageCount - b.usageCount)
      .slice(0, limit)
  }

  return {
    properties: computed(() => properties.value),
    expandedProperty,
    transformEventsToProperties,
    togglePropertyEvents,
    getRelatedEvents,
    getPropertyByType,
    getMostUsedProperties,
    getLeastUsedProperties
  }
}
