import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const printfulApiKey = Deno.env.get('PRINTFUL_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to get the first store ID
async function getStoreId(): Promise<number | null> {
  const response = await fetch('https://api.printful.com/stores', {
    headers: {
      'Authorization': `Bearer ${printfulApiKey}`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  console.log('Stores response:', JSON.stringify(data));
  
  if (data.result && data.result.length > 0) {
    return data.result[0].id;
  }
  return null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!printfulApiKey) {
      throw new Error('PRINTFUL_API_KEY is not configured');
    }

    const { action, data } = await req.json();
    console.log(`Printful API action: ${action}`, data);

    // Get store ID for store-specific endpoints
    const storeId = await getStoreId();
    console.log('Store ID:', storeId);

    if (!storeId) {
      throw new Error('No Printful store found. Please ensure your API key has access to at least one store.');
    }

    let endpoint = '';
    let method = 'GET';
    let body = null;

    switch (action) {
      case 'get-products':
        endpoint = `/stores/${storeId}/sync/products`;
        break;
      case 'get-product':
        endpoint = `/stores/${storeId}/sync/products/${data.id}`;
        break;
      case 'get-sync-product':
        endpoint = `/stores/${storeId}/sync/products/${data.id}`;
        break;
      case 'get-store-info':
        endpoint = `/stores/${storeId}`;
        break;
      case 'create-order':
        endpoint = `/stores/${storeId}/orders`;
        method = 'POST';
        body = JSON.stringify(data.order);
        break;
      case 'estimate-costs':
        endpoint = `/stores/${storeId}/orders/estimate-costs`;
        method = 'POST';
        body = JSON.stringify(data.order);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log(`Calling Printful API: ${method} ${endpoint}`);

    const response = await fetch(`https://api.printful.com${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${printfulApiKey}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Printful API error:', responseData);
      throw new Error(responseData.error?.message || JSON.stringify(responseData.error) || 'Printful API error');
    }

    console.log(`Printful API success for ${action}`);

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in printful function:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});