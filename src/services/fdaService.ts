const FDA_API_KEY = 'kscqZaXEXt5z9mXzGLlFOzmetkbHuWHkLaFKJTxT';
const FDA_BASE_URL = 'https://api.fda.gov/drug';

export interface FDADrugResponse {
  results: Array<{
    openfda: {
      brand_name: string[];
      generic_name: string[];
      manufacturer_name: string[];
      product_ndc: string[];
      route: string[];
      substance_name: string[];
    };
    indications_and_usage: string[];
    boxed_warnings?: string[];
    warnings_and_cautions?: string[];
    adverse_reactions?: string[];
    drug_interactions?: string[];
    dosage_forms_and_strengths?: string[];
    dosage_and_administration?: string[];
    contraindications?: string[];
    description?: string;
    clinical_pharmacology?: string[];
    mechanism_of_action?: string[];
    clinical_studies?: string[];
  }>;
  error?: string;
}

export async function searchDrug(brandName: string): Promise<FDADrugResponse> {
  // Try exact match first
  const exactQuery = encodeURIComponent(`brand_name:"${brandName}"`);
  const url = `${FDA_BASE_URL}/label.json?api_key=${FDA_API_KEY}&search=${exactQuery}&limit=1`;
  
  try {
    const response = await fetch(url);
    
    // If exact match fails, try a broader search
    if (response.status === 404) {
      const broadQuery = encodeURIComponent(`brand_name:"${brandName}"~2`); // Allow for fuzzy matching
      const broadUrl = `${FDA_BASE_URL}/label.json?api_key=${FDA_API_KEY}&search=${broadQuery}&limit=1`;
      
      const broadResponse = await fetch(broadUrl);
      if (!broadResponse.ok) {
        return { 
          results: [],
          error: 'No FDA data available for this product'
        };
      }
      return await broadResponse.json();
    }
    
    if (!response.ok) {
      return { 
        results: [],
        error: 'Error fetching FDA data'
      };
    }
    
    const data = await response.json();
    return data.results && Array.isArray(data.results) && data.results.length > 0
      ? data
      : { results: [], error: 'No FDA data available for this product' };
      
  } catch (error) {
    console.error('Error fetching FDA data:', error);
    return { 
      results: [],
      error: 'Error connecting to FDA database'
    };
  }
}

export async function getDrugLabeling(productNdc: string): Promise<FDADrugResponse> {
  const url = `${FDA_BASE_URL}/label.json?api_key=${FDA_API_KEY}&search=product_ndc:${productNdc}&limit=1`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { 
        results: [],
        error: 'No FDA labeling data available'
      };
    }
    const data = await response.json();
    return data.results && Array.isArray(data.results) && data.results.length > 0
      ? data
      : { results: [], error: 'No FDA labeling data available' };
  } catch (error) {
    console.error('Error fetching FDA labeling data:', error);
    return { 
      results: [],
      error: 'Error connecting to FDA database'
    };
  }
}