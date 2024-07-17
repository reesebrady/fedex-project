/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import './Maps.css';

const MapPage: React.FC = () => {
  useEffect(() => {
    
    const loadScript = (src: string): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      const platform = new H.service.Platform({
        apikey: '1TeSNrJJHMBpWDHZbwwNs9UFCi_foEUqA1-ep9vyewM',
      });

      const defaultLayers = platform.createDefaultLayers();
      const map = new H.Map(
        document.getElementById('mapContainer') as HTMLElement,
        defaultLayers.vector.normal.map,
        {
          zoom: 10,
          center: { lat: 52.5, lng: 13.4 },
        }
      );
    };

    const loadMap = async () => {
      try {
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
        initializeMap();
      } catch (error) {
        console.error('Error loading HERE Maps scripts', error);
      }
    };

    loadMap();
  }, []);

  return (
    <div id="mapContainer"></div>
  );
};

export default MapPage;
