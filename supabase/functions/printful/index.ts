import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const printfulApiKey = Deno.env.get('PRINTFUL_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    console.log(`Printful API action: ${action}`, data);

    let endpoint = '';
    let method = 'GET';
    let body = null;

    switch (action) {
      case 'get-products':
        endpoint = '/store/products';
        break;
      case 'get-product':
        endpoint = `/store/products/${data.id}`;
        break;
      case 'get-sync-product':
        endpoint = `/store/products/${data.id}`;
        break;
      case 'get-store-info':
        endpoint = '/stores';
        break;
      case 'create-order':
        endpoint = '/orders';
        method = 'POST';
        body = JSON.stringify(data.order);
        break;
      case 'estimate-costs':
        endpoint = '/orders/estimate-costs';
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
      throw new Error(responseData.error?.message || 'Printful API error');
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
