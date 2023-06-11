import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { MapProps } from '../utils/types';
import { mapboxAccessToken } from '../utils/consts';

mapboxgl.accessToken = mapboxAccessToken;

const Map: React.FC<MapProps> = ({ data }) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [data[0]?.long, data[0]?.lat] || [0, 0],
                zoom: 2,
                fadeDuration: 0
            });

            if (data) {
                data.forEach(point => {
                    new mapboxgl.Marker()
                    const el = document.createElement('div');
                    el.className = 'marker';
                    new mapboxgl.Marker(el).setLngLat([point.long, point.lat]).addTo(map);
                });
            }

            return () => map.remove();
        }
    }, [data]);

    return <div ref={ mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
