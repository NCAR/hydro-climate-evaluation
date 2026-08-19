import { useEffect, useRef } from 'react'
import { useMapbox } from '../maps'

const SOURCE_ID = 'nca-regions'
const FILL_LAYER_ID = 'nca-regions-fill'
const OUTLINE_LAYER_ID = 'nca-regions-outline'
const IMAGE_BASE =
  '/hydro-climate-eval/data/refactor/regionmaps/cmip5_cmip6_analysis'

const REGION_IMAGE_SLUGS = {
  Northeast: 'northeast',
  Southeast: 'southeast',
  Midwest: 'midwest',
  'Northern Great Plains': 'northerngreatplains',
  'Southern Plains': 'southerngreatplains',
  Southwest: 'southwest',
  Northwest: 'northwest',
}

const createPopupImage = (source, alt) => {
  const link = document.createElement('a')
  const image = document.createElement('img')

  link.href = source
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.setAttribute('aria-label', `${alt}; open the full-size image`)
  Object.assign(link.style, {
    display: 'block',
    marginTop: '12px',
  })

  image.src = source
  image.alt = alt
  image.decoding = 'async'
  Object.assign(image.style, {
    background: '#fff',
    cursor: 'zoom-in',
    display: 'block',
    height: 'auto',
    width: '100%',
  })

  link.appendChild(image)
  return link
}

const ClickableNcaRegions = ({
  source = '/hydro-climate-eval/data/refactor/regionmaps/nca-regions.geojson',
  onRegionSelect,
}) => {
  const { map } = useMapbox()
  const popupRef = useRef(null)
  const outsideClickRef = useRef(null)

  useEffect(() => {
    if (!map) return

    let hoveredRegionId = null
    let mapRemoved = false

    const handleMapRemove = () => {
      mapRemoved = true
    }

    const closePopup = () => {
      if (outsideClickRef.current) {
        document.removeEventListener(
          'pointerdown',
          outsideClickRef.current,
          true
        )
        outsideClickRef.current = null
      }

      popupRef.current?.remove()
      popupRef.current = null
    }

    const clearHoveredRegion = () => {
      if (hoveredRegionId !== null) {
        map.setFeatureState(
          { source: SOURCE_ID, id: hoveredRegionId },
          { hover: false }
        )
        hoveredRegionId = null
      }
    }

    const handleMouseMove = (event) => {
      const feature = event.features?.[0]
      if (!feature) return

      if (hoveredRegionId !== feature.id) {
        clearHoveredRegion()
        hoveredRegionId = feature.id
        map.setFeatureState(
          { source: SOURCE_ID, id: hoveredRegionId },
          { hover: true }
        )
      }

      map.getCanvas().style.cursor = 'pointer'
    }

    const handleMouseLeave = () => {
      clearHoveredRegion()
      map.getCanvas().style.cursor = ''
    }

    const handleClick = (event) => {
      const feature = event.features?.[0]
      if (!feature) return

      const regionName = feature.properties?.RegionName ?? 'NCA region'
      const objectId = feature.properties?.OBJECTID
      const imageSlug = REGION_IMAGE_SLUGS[regionName]
      const content = document.createElement('div')
      const title = document.createElement('strong')

      title.textContent = regionName
      Object.assign(title.style, {
        display: 'block',
        fontSize: '18px',
      })
      Object.assign(content.style, {
        color: '#111',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        height: '600px',
        overflowY: 'auto',
        paddingRight: '4px',
        width: '760px',
      })

      content.appendChild(title)

      if (imageSlug) {
        const metricArraySource = `${IMAGE_BASE}/metricarray_${imageSlug}.png`
        const errorScoresSource = `${IMAGE_BASE}/errorscores_${imageSlug}.png`

        content.appendChild(
          createPopupImage(
            errorScoresSource,
            `Error scores for ${regionName}`
          )
        )
        content.appendChild(
          createPopupImage(
            metricArraySource,
            `Metric array for ${regionName}`
          )
        )
      }

      closePopup()

      const popupElement = document.createElement('div')
      const closeButton = document.createElement('button')

      popupElement.setAttribute('role', 'dialog')
      popupElement.setAttribute('aria-label', regionName)
      Object.assign(popupElement.style, {
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 3px 14px rgba(0, 0, 0, 0.35)',
        boxSizing: 'border-box',
        height: '640px',
        left: '50%',
        overflow: 'hidden',
        padding: '20px',
        position: 'fixed',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        zIndex: '10000',
      })

      closeButton.type = 'button'
      closeButton.textContent = '×'
      closeButton.setAttribute('aria-label', `Close ${regionName}`)
      Object.assign(closeButton.style, {
        background: 'transparent',
        border: 'none',
        color: '#111',
        cursor: 'pointer',
        fontSize: '24px',
        lineHeight: '24px',
        padding: '4px',
        position: 'absolute',
        right: '6px',
        top: '4px',
      })

      closeButton.addEventListener('click', closePopup)
      popupElement.addEventListener('keydown', (keyboardEvent) => {
        if (keyboardEvent.key === 'Escape') closePopup()
      })

      popupElement.appendChild(closeButton)
      popupElement.appendChild(content)
      document.body.appendChild(popupElement)
      closeButton.focus()

      popupRef.current = popupElement
      outsideClickRef.current = (pointerEvent) => {
        if (!popupElement.contains(pointerEvent.target)) closePopup()
      }
      document.addEventListener(
        'pointerdown',
        outsideClickRef.current,
        true
      )
      onRegionSelect?.({ objectId, regionName, feature })
    }

    map.on('remove', handleMapRemove)
    map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: source,
      generateId: true,
    })
    map.addLayer({
      id: FILL_LAYER_ID,
      type: 'fill',
      source: SOURCE_ID,
      paint: {
        'fill-color': '#007aff',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.2,
          0.06,
        ],
      },
    })
    map.addLayer({
      id: OUTLINE_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      paint: {
        'line-color': '#111111',
        'line-opacity': 0.75,
        'line-width': 1.5,
      },
    })

    map.on('mousemove', FILL_LAYER_ID, handleMouseMove)
    map.on('mouseleave', FILL_LAYER_ID, handleMouseLeave)
    map.on('click', FILL_LAYER_ID, handleClick)

    return () => {
      closePopup()

      if (mapRemoved) return

      map.off('mousemove', FILL_LAYER_ID, handleMouseMove)
      map.off('mouseleave', FILL_LAYER_ID, handleMouseLeave)
      map.off('click', FILL_LAYER_ID, handleClick)
      map.off('remove', handleMapRemove)
      map.getCanvas().style.cursor = ''

      if (map.getLayer(OUTLINE_LAYER_ID)) map.removeLayer(OUTLINE_LAYER_ID)
      if (map.getLayer(FILL_LAYER_ID)) map.removeLayer(FILL_LAYER_ID)
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID)
    }
  }, [map, source, onRegionSelect])

  return null
}

export default ClickableNcaRegions
