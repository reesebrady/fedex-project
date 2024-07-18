import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../components/useGeolocate';
import './Maps.css';

const MapPage: React.FC = () => {
  const { currentPosition, loadingStatus, getLocation } = useGeolocation();
  const [map, setMap] = useState<H.Map | null>(null);
  const [platform, setPlatform] = useState<H.service.Platform | null>(null);
  const { lat, lng } = currentPosition || { lat: 52.5, lng: 13.4 };

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.onload = () => {
          console.log(`Script loaded: ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`Failed to load script ${src}`);
          reject(new Error(`Failed to load script ${src}`));
        };
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      if (map) {
        map.dispose();
      }

      const platformInstance = new H.service.Platform({
        apikey: '1TeSNrJJHMBpWDHZbwwNs9UFCi_foEUqA1-ep9vyewM',
      });

      const defaultLayers = platformInstance.createDefaultLayers();
      const mapInstance = new H.Map(
        document.getElementById('mapContainer') as HTMLElement,
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: { lat, lng },
        }
      );

      const mapEvents = new H.mapevents.MapEvents(mapInstance);
      new H.mapevents.Behavior(mapEvents);

      H.ui.UI.createDefault(mapInstance, defaultLayers);

      setMap(mapInstance);
      setPlatform(platformInstance);

      const searchChargingStations = (map: H.Map, platform: H.service.Platform) => {
        const service = platform.getSearchService();
        service.discover(
          {
            at: `${lat},${lng}`,
            q: 'EV charging station',
          },
          (result: { items: { position: { lat: number, lng: number } }[] }) => {
            result.items.forEach((item) => {
              if (item.position && typeof item.position.lat === 'number' && typeof item.position.lng === 'number') {
                const marker = new H.map.Marker({ lat: item.position.lat, lng: item.position.lng });
                map.addObject(marker);
              } else {
                console.error('Invalid position for item:', item);
              }
            });
          },
          (error: Error) => {
            console.error('Error discovering charging stations:', error);
          }
        );
      };

      searchChargingStations(mapInstance, platformInstance);

      mapInstance.getViewPort().resize();
      window.addEventListener('resize', () => mapInstance.getViewPort().resize());
    };

    const loadMap = async () => {
      try {
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');
        initializeMap();
      } catch (error) {
        console.error('Error loading HERE Maps scripts:', error);
      }
    };

    if (currentPosition) {
      loadMap();
    } else {
      getLocation();
    }
  }, [lat, lng]);

  useEffect(() => {
    if (map && platform && currentPosition) {
      map.setCenter({ lat: currentPosition.lat, lng: currentPosition.lng });

      const userMarker = new H.map.Marker(
        { lat: currentPosition.lat, lng: currentPosition.lng },
        { icon: new H.map.Icon('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="blue"/></svg>') }
      );
      map.addObject(userMarker);

      const service = platform.getSearchService();
      service.discover(
        {
          at: `${currentPosition.lat},${currentPosition.lng}`,
          q: 'EV charging station',
        },
        (result: { items: { position: { lat: number, lng: number } }[] }) => {
          result.items.forEach((item) => {
            if (item.position && typeof item.position.lat === 'number' && typeof item.position.lng === 'number') {
              const marker = new H.map.Marker({ lat: item.position.lat, lng: item.position.lng });
              map.addObject(marker);
            } else {
              console.error('Invalid position for item:', item);
            }
          });
        },
        (error: Error) => {
          console.error('Error discovering charging stations:', error);
        }
      );
    }
  }, [currentPosition, map, platform]);

  if (loadingStatus === 'loading') {
    return (
      <div className="loading-spinner">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div id="mapContainer" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default MapPage;
