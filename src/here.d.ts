declare namespace H {
  namespace service {
    class Platform {
      constructor(options: { apikey: string });
      createDefaultLayers(): DefaultLayers;
    }

    interface DefaultLayers {
      vector: {
        normal: {
          map: object;
        };
      };
    }
  }

  namespace Map {
    interface Options {
      zoom: number;
      center: {
        lat: number;
        lng: number;
      };
    }
  }

  class Map {
    constructor(element: HTMLElement, defaultLayers: object, options: Map.Options);
  }
}
