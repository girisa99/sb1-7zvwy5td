import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': [
    'authorization',
    'x-client-info',
    'apikey',
    'content-type',
    'x-api-key',
    'x-goog-api-key',
    'x-anthropic-api-key',
    'x-openai-api-key',
    'x-fda-api-key',
    'x-youtube-api-key',
    'x-maps-api-key'
  ].join(', '),
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
  // Security headers
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; connect-src 'self' https://*.openai.com https://*.anthropic.com https://*.googleapis.com https://api.fda.gov https://*.youtube.com https://*.google.com; img-src 'self' https: data:;"
};

const FDA_API_KEY = Deno.env.get('FDA_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

async function searchFDA(params: any) {
  const { manufacturer, brandName, therapy, indication } = params;
  let searchQuery = [];
  
  if (manufacturer) {
    searchQuery.push(`openfda.manufacturer_name:"${manufacturer}"`);
  }
  if (brandName) {
    searchQuery.push(`openfda.brand_name:"${brandName}"`);
  }
  if (indication) {
    searchQuery.push(`indications_and_usage:"${indication}"`);
  }
  if (therapy) {
    searchQuery.push(`openfda.pharm_class_epc:"${therapy}"`);
  }

  const query = searchQuery.join('+AND+');
  
  try {
    const [labelResponse, clinicalResponse] = await Promise.all([
      fetch(`https://api.fda.gov/drug/label.json?api_key=${FDA_API_KEY}&search=${query}&limit=10`),
      fetch(`https://api.fda.gov/drug/ndc.json?api_key=${FDA_API_KEY}&search=${query}&limit=10`)
    ]);

    const [labelData, clinicalData] = await Promise.all([
      labelResponse.json(),
      clinicalResponse.json()
    ]);

    return {
      label: labelData.results,
      clinical: clinicalData.results
    };
  } catch (error) {
    console.error('FDA API Error:', error);
    return null;
  }
}

async function getCommercialData(ndc: string) {
  try {
    const response = await fetch(
      `https://api.medicalpricingdata.com/v1/ndc/${ndc}`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('MEDICAL_PRICING_API_KEY')}`
        }
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Pricing API Error:', error);
    return null;
  }
}

async function getPublications(params: any) {
  const { therapy, indication, brandName } = params;
  const query = [therapy, indication, brandName].filter(Boolean).join(' AND ');
  
  try {
    const response = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&apikey=${Deno.env.get('PUBMED_API_KEY')}`
    );
    const data = await response.json();
    
    if (data.esearchresult.idlist.length > 0) {
      const detailsResponse = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${data.esearchresult.idlist.join(',')}&retmode=json&apikey=${Deno.env.get('PUBMED_API_KEY')}`
      );
      return await detailsResponse.json();
    }
    return null;
  } catch (error) {
    console.error('PubMed API Error:', error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { manufacturer, brandName, therapy, indication } = await req.json();

    // Parallel API calls
    const [fdaData, publications] = await Promise.all([
      searchFDA({ manufacturer, brandName, therapy, indication }),
      getPublications({ therapy, indication, brandName })
    ]);

    // Get commercial data if NDC is available
    let commercialData = null;
    if (fdaData?.clinical?.[0]?.product_ndc) {
      commercialData = await getCommercialData(fdaData.clinical[0].product_ndc);
    }

    // Get competitor products
    let competitors = null;
    if (indication) {
      const competitorSearch = await searchFDA({ indication });
      competitors = competitorSearch?.label?.filter(product => 
        !product.openfda?.brand_name?.includes(brandName)
      );
    }

    return new Response(
      JSON.stringify({
        fda: fdaData?.label,
        clinical: fdaData?.clinical,
        commercial: commercialData,
        publications,
        competitors,
        therapy
      }),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
          code: 'INTERNAL_ERROR'
        }
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});