import React, { useEffect, useRef } from 'react';
import { mapsService } from '../../services';

type TreatmentCenter = {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  specialties: string[];
  doctors: {
    name: string;
    specialty: string;
    credentials: string;
  }[];
  therapies: string[];
  indications: string[];
};

type TreatmentCentersMapProps = {
  centers: TreatmentCenter[];
  therapy: string;
  indication?: string;
};

export function TreatmentCentersMap({ centers, therapy, indication }: TreatmentCentersMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        await mapsService.loadGoogleMaps();
        
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = mapsService.createMap(mapRef.current, {
            center: { lat: 39.8283, lng: -98.5795 },
            zoom: 4,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e9e9e9' }]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9e9e9e' }]
              }
            ]
          });

          infoWindowRef.current = mapsService.createInfoWindow();

          centers.forEach((center) => {
            const marker = mapsService.createMarker({
              position: center.location,
              map: mapInstanceRef.current,
              title: center.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#3b82f6',
                fillOpacity: 0.9,
                strokeWeight: 2,
                strokeColor: '#ffffff',
              }
            });

            const doctorsList = center.doctors
              .map(doctor => `
                <div class="mb-2">
                  <div class="font-semibold">${doctor.name}</div>
                  <div class="text-sm text-gray-600">${doctor.specialty}</div>
                  <div class="text-sm text-gray-500">${doctor.credentials}</div>
                </div>
              `)
              .join('');

            const content = `
              <div class="min-w-[300px] p-4">
                <h3 class="text-lg font-semibold mb-2">${center.name}</h3>
                <p class="text-gray-600 mb-4">${center.address}</p>
                <div class="mb-4">
                  <div class="font-medium mb-2">Specialties:</div>
                  <div class="flex flex-wrap gap-2">
                    ${center.specialties.map(specialty => 
                      `<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${specialty}</span>`
                    ).join('')}
                  </div>
                </div>
                <div class="mb-4">
                  <div class="font-medium mb-2">Specialists:</div>
                  ${doctorsList}
                </div>
              </div>
            `;

            marker.addListener('click', () => {
              if (infoWindowRef.current) {
                infoWindowRef.current.setContent(content);
                infoWindowRef.current.open(mapInstanceRef.current, marker);
              }
            });

            markersRef.current.push(marker);
          });
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [centers]);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}