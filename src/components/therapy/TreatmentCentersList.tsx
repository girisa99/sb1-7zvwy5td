import React from 'react';
import { MapPin, Phone, Mail, Globe, User } from 'lucide-react';

type Doctor = {
  name: string;
  specialty: string;
  credentials: string;
  image?: string;
};

type TreatmentCenter = {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  doctors: Doctor[];
  therapies: string[];
  indications: string[];
};

type TreatmentCentersListProps = {
  centers: TreatmentCenter[];
  therapy: string;
  indication?: string;
};

export function TreatmentCentersList({ centers, therapy, indication }: TreatmentCentersListProps) {
  const filteredCenters = centers.filter(center => 
    center.therapies.includes(therapy) && 
    (!indication || center.indications.includes(indication))
  );

  return (
    <div className="space-y-6">
      {filteredCenters.map((center, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{center.name}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                {center.address}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2 text-primary-500" />
                {center.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2 text-primary-500" />
                <a href={`mailto:${center.email}`} className="text-primary-600 hover:underline">
                  {center.email}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-2 text-primary-500" />
                <a href={center.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  Visit Website
                </a>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {center.specialties.map((specialty, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Specialists</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {center.doctors.map((doctor, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      {doctor.image ? (
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-sm text-gray-600">{doctor.specialty}</div>
                      <div className="text-sm text-gray-500">{doctor.credentials}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}