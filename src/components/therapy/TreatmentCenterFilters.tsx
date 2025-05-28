import React from 'react';
import { CommercialProduct } from './types';

type TreatmentCenterFiltersProps = {
  products: CommercialProduct[];
  therapy: string;
  selectedIndication: string;
  selectedManufacturer: string;
  selectedProduct: string;
  selectedState: string;
  selectedCity: string;
  onFilterChange: (filterType: string, value: string) => void;
};

export function TreatmentCenterFilters({
  products,
  therapy,
  selectedIndication,
  selectedManufacturer,
  selectedProduct,
  selectedState,
  selectedCity,
  onFilterChange,
}: TreatmentCenterFiltersProps) {
  // Extract unique values from products for this specific therapy
  const manufacturers = Array.from(new Set(products.map(p => p.company)));
  const indications = Array.from(new Set(products.flatMap(p => 
    typeof p.indication === 'string' ? [p.indication] : p.approvedIndications || []
  )));

  // Mock data for states and cities
  const states = ['California', 'New York', 'Texas', 'Florida', 'Massachusetts'];
  const cities = {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    'New York': ['New York City', 'Buffalo', 'Rochester'],
    Texas: ['Houston', 'Dallas', 'Austin'],
    Florida: ['Miami', 'Orlando', 'Tampa'],
    Massachusetts: ['Boston', 'Cambridge', 'Worcester']
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Authorized Treatment Centers for {therapy}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Indication
          </label>
          <select
            value={selectedIndication}
            onChange={(e) => onFilterChange('indication', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Indications</option>
            {indications.map((indication, index) => (
              <option key={index} value={indication}>{indication}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturer
          </label>
          <select
            value={selectedManufacturer}
            onChange={(e) => onFilterChange('manufacturer', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Manufacturers</option>
            {manufacturers.map((manufacturer, index) => (
              <option key={index} value={manufacturer}>{manufacturer}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => onFilterChange('product', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            disabled={!selectedManufacturer}
          >
            <option value="">All Products</option>
            {products
              .filter(p => !selectedManufacturer || p.company === selectedManufacturer)
              .map((product, index) => (
                <option key={index} value={product.name}>{product.name}</option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => onFilterChange('state', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All States</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            disabled={!selectedState}
          >
            <option value="">All Cities</option>
            {selectedState && cities[selectedState as keyof typeof cities].map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}