"use client";
import { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  flightData: any;
}

const Map: React.FC<MapProps> = ({ flightData }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Initialize the map only once
  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
        center: [0, 0],
        zoom: 2,
        pitch: 60
      });

      mapRef.current = map;

      // Add navigation controls
      map.addControl(new maplibregl.NavigationControl(), 'top-right');
    }
  }, []);

  // Update flight path when flightData changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing source and layer if they exist
    if (map.getSource('flight')) {
      if (map.getLayer('flight-line')) {
        map.removeLayer('flight-line');
      }
      map.removeSource('flight');
    }

    if (flightData && flightData.geojson) {
      map.addSource('flight', {
        type: 'geojson',
        data: flightData.geojson
      });

      map.addLayer({
        id: 'flight-line',
        type: 'line',
        source: 'flight',
        paint: {
          'line-color': '#007aff',
          'line-width': 3
        }
      });

      // Fit the map view to the flight path bounds
      const coords = flightData.geojson.features[0].geometry.coordinates;
      const bounds = coords.reduce((b: any, coord: any) => {
        return b.extend(coord);
      }, new maplibregl.LngLatBounds(coords[0], coords[0]));

      map.fitBounds(bounds, { padding: 40, animate: true });
    }
  }, [flightData]);

  return <div ref={mapContainer} style={{ height: '500px', width: '100%' }} />;
};

export default Map;
