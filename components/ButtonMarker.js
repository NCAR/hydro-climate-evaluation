// ButtonMarker.jsx
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapbox } from '../maps/src/mapbox';
import CirclePicker from '../maps/src/region/region-picker/circle-picker'


export default function ButtonMarker({
  lng,
  lat,
  site,
  size = 18,
  color = '#007aff',
  borderColor = '#fff',
  borderWidth = 2,
  radius = 10,
}) {
  const { map } = useMapbox();
  const popupRef = useRef(null); // tracks current popup instance

  useEffect(() => {
    if (!map) return;

    // Circle marker
    const el = document.createElement('div');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Toggle info for ${site ?? 'site'}`);
    el.tabIndex = 0;

    Object.assign(el.style, {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: color,
      border: `${borderWidth}px solid ${borderColor}`,
      boxShadow: '0 1px 4px rgba(0,0,0,.35)',
      cursor: 'pointer',
      outline: 'none',
    });

    // Create a new popup
    const createPopup = () => {
      const box = document.createElement('div');
      Object.assign(box.style, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        color: '#111',
        minWidth: '140px',
      });
      box.textContent = `${String(site ?? 'site')}`;

      const popup = new mapboxgl.Popup({
        closeButton: false,     // no default X button
        closeOnClick: false,    // only our toggle closes it
        anchor: 'top',
        offset: 10,
      })
        .setLngLat([lng, lat])
        .setDOMContent(box)
        .addTo(map);

      // When popup closes (e.g., programmatic), clear ref
      popup.on('close', () => {
        if (popupRef.current === popup) popupRef.current = null;
      });

      popupRef.current = popup;
    };

    // Toggle handler: show if closed, hide if open
    const togglePopup = () => {
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      } else {
        createPopup();
      }
    };

    const handleClick = (e) => {
      e.stopPropagation();
      togglePopup();
    };
    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePopup();
      }
      if (e.key === 'Escape' && popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    };

    el.addEventListener('click', handleClick);
    el.addEventListener('keydown', handleKey);

    const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      popupRef.current?.remove();
      el.removeEventListener('click', handleClick);
      el.removeEventListener('keydown', handleKey);
      marker.remove();
    };
  }, [map, lng, lat, site, size, color, borderColor, borderWidth]);

  return null;
}
