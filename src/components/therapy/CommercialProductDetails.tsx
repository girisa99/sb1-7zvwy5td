import React, { useState, useEffect } from 'react';
import { fdaService } from '../../services';
import type { FDADrugResponse } from '../../services';
import { CommercialProduct } from './types';
import { AlertTriangle, Package, Activity, ShieldAlert, FileText, Pill, Clock, Building2, HeartPulse } from 'lucide-react';

interface CommercialProductDetailsProps {
  product: CommercialProduct;
}

export function CommercialProductDetails({ product }: CommercialProductDetailsProps) {
  const [fdaData, setFdaData] = useState<FDADrugResponse | null>(null);
  const [adverseEvents, setAdverseEvents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [key, setKey] = useState(0);

  useEffect(() => {
    setFdaData(null);
    setAdverseEvents(null);
    setLoading(true);
    setKey(prev => prev + 1);
  }, [product.name]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [drugData, eventsData] = await Promise.all([
          fdaService.searchDrug(product.name),
          fdaService.getAdverseEvents(product.name)
        ]);
        
        if (isMounted) {
          setFdaData(drugData);
          setAdverseEvents(eventsData);
        }
      } catch (error) {
        console.error('Error fetching FDA data:', error);
        if (isMounted) {
          setFdaData({ results: [], error: 'Failed to fetch FDA data' });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [product.name, key]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FileText size={16} /> },
    { id: 'indications', label: 'Indications', icon: <Activity size={16} /> },
    { id: 'safety', label: 'Safety', icon: <ShieldAlert size={16} /> },
    { id: 'dosing', label: 'Dosing', icon: <Pill size={16} /> },
    { id: 'packaging', label: 'Packaging', icon: <Package size={16} /> },
    { id: 'clinical', label: 'Clinical Data', icon: <HeartPulse size={16} /> },
    { id: 'competition', label: 'Competition', icon: <Building2 size={16} /> }
  ];

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    return status.toLowerCase().includes('approved')
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  const NoFDAData = () => (
    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
      <p className="text-sm text-yellow-700">
        {fdaData?.error || 'No FDA data available for this product'}
      </p>
    </div>
  );

  const fdaProduct = fdaData?.results[0];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-gray-500">Manufacturer:</span>
                <span className="ml-2 text-sm text-gray-900">{product.company}</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(product.approvalStatus)}`}>
                  {product.approvalStatus || 'Status Unknown'}
                </span>
              </div>
              {product.ndcCode && (
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-gray-500">NDC Code:</span>
                  <span className="ml-2 text-sm text-gray-900">{product.ndcCode}</span>
                </div>
              )}
              {product.patentExpiration && (
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-gray-500">Patent Expiration:</span>
                  <span className="ml-2 text-sm text-gray-900">{product.patentExpiration}</span>
                </div>
              )}
            </div>
            {fdaProduct?.openfda && (
              <div>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-gray-500">Route:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {fdaProduct.openfda.route?.join(', ')}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-gray-500">Active Ingredients:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {fdaProduct.openfda.substance_name?.join(', ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          {(!fdaData?.results || fdaData.results.length === 0) && <NoFDAData />}

          {activeTab === 'overview' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Product Overview</h4>
              <p className="text-gray-600">{product.description}</p>
              {fdaProduct?.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{fdaProduct.description}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'indications' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Approved Indications</h4>
              <ul className="space-y-3">
                {(product.approvedIndications || [product.indication]).map((indication, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary-600"></div>
                    <p className="ml-4 text-gray-600">{indication}</p>
                  </li>
                ))}
              </ul>
              {fdaProduct?.indications_and_usage && (
                <div className="mt-6">
                  <h5 className="font-medium mb-2">FDA Labeling</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.indications_and_usage.map((usage, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{usage}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'safety' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Safety Information</h4>
              {fdaProduct?.boxed_warnings && (
                <div className="mb-6">
                  <h5 className="font-medium text-red-600 mb-2">Boxed Warnings</h5>
                  <div className="p-4 bg-red-50 rounded-lg">
                    {fdaProduct.boxed_warnings.map((warning, index) => (
                      <p key={index} className="text-sm text-red-700 mb-2">{warning}</p>
                    ))}
                  </div>
                </div>
              )}
              {fdaProduct?.warnings_and_cautions && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Warnings and Precautions</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.warnings_and_cautions.map((warning, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{warning}</p>
                    ))}
                  </div>
                </div>
              )}
              {fdaProduct?.adverse_reactions && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Adverse Reactions</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.adverse_reactions.map((reaction, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{reaction}</p>
                    ))}
                  </div>
                </div>
              )}
              {adverseEvents && (
                <div>
                  <h5 className="font-medium mb-2">Reported Adverse Events</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adverseEvents.results?.slice(0, 6).map((event: any, index: number) => (
                        <div key={index} className="p-3 bg-white rounded border border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{event.patient?.reaction?.[0]?.reactionmeddrapt}</p>
                          <p className="text-xs text-gray-500 mt-1">Severity: {event.serious ? 'Serious' : 'Non-serious'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dosing' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Dosing Information</h4>
              {product.dosing && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Recommended Dosing</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Schedule: {product.dosing.schedule}</p>
                    <p className="text-sm text-gray-600 mb-2">Target Dose: {product.dosing.targetDose}</p>
                    {product.dosing.maxDose && (
                      <p className="text-sm text-gray-600">Maximum Dose: {product.dosing.maxDose}</p>
                    )}
                  </div>
                </div>
              )}
              {fdaProduct?.dosage_forms_and_strengths && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Dosage Forms and Strengths</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.dosage_forms_and_strengths.map((form, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{form}</p>
                    ))}
                  </div>
                </div>
              )}
              {fdaProduct?.dosage_and_administration && (
                <div>
                  <h5 className="font-medium mb-2">Administration</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.dosage_and_administration.map((admin, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{admin}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'packaging' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Packaging Information</h4>
              {product.packaging && (
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">{product.packaging}</p>
                </div>
              )}
              {product.storage && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Storage Requirements</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{product.storage}</p>
                  </div>
                </div>
              )}
              {product.shelfLife && (
                <div>
                  <h5 className="font-medium mb-2">Shelf Life</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{product.shelfLife}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'clinical' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Clinical Information</h4>
              {fdaProduct?.clinical_studies && (
                <div className="mb-6">
                  <h5 className="font-medium mb-2">Clinical Studies</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.clinical_studies.map((study, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{study}</p>
                    ))}
                  </div>
                </div>
              )}
              {fdaProduct?.mechanism_of_action && (
                <div>
                  <h5 className="font-medium mb-2">Mechanism of Action</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {fdaProduct.mechanism_of_action.map((moa, index) => (
                      <p key={index} className="text-sm text-gray-600 mb-2">{moa}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'competition' && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Competitive Landscape</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.competitors?.map((competitor, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-1">{competitor.name}</h5>
                    <p className="text-sm text-gray-600 mb-2">{competitor.company}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(competitor.status)}`}>
                      {competitor.status || 'Status Unknown'}
                    </span>
                    {competitor.differentiator && (
                      <p className="mt-2 text-sm text-gray-600">{competitor.differentiator}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}