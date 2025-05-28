import { Loader } from '@googlemaps/js-api-loader';
import { config } from './config';

class MapsService {
  private loader: Loader;

  constructor() {
    this.loader = new Loader({
      apiKey: config.google.maps.apiKey,
      version: 'weekly',
      libraries: ['places']
    });
  }

  async loadGoogleMaps(): Promise<typeof google> {
    try {
      return await this.loader.load();
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      throw error;
    }
  }

  createMap(element: HTMLElement, options: google.maps.MapOptions): google.maps.Map {
    return new google.maps.Map(element, options);
  }

  createMarker(options: google.maps.MarkerOptions): google.maps.Marker {
    return new google.maps.Marker(options);
  }

  createInfoWindow(options?: google.maps.InfoWindowOptions): google.maps.InfoWindow {
    return new google.maps.InfoWindow(options);
  }

  async geocode(address: string): Promise<google.maps.GeocoderResult[]> {
    const geocoder = new google.maps.Geocoder();
    try {
      const { results } = await geocoder.geocode({ address });
      return results;
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }
}

export const mapsService = new MapsService();