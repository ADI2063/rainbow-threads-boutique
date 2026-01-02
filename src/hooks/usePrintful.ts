import { supabase } from "@/integrations/supabase/client";

interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
}

interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
}

interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  sync_variants: PrintfulSyncVariant[];
}

export const usePrintful = () => {
  const getProducts = async (): Promise<PrintfulProduct[]> => {
    const { data, error } = await supabase.functions.invoke('printful', {
      body: { action: 'get-products' },
    });

    if (error) throw error;
    return data.result || [];
  };

  const getProduct = async (id: number): Promise<PrintfulSyncProduct> => {
    const { data, error } = await supabase.functions.invoke('printful', {
      body: { action: 'get-product', data: { id } },
    });

    if (error) throw error;
    return data.result;
  };

  const getStoreInfo = async () => {
    const { data, error } = await supabase.functions.invoke('printful', {
      body: { action: 'get-store-info' },
    });

    if (error) throw error;
    return data.result;
  };

  const estimateCosts = async (order: {
    recipient: {
      name: string;
      address1: string;
      city: string;
      state_code: string;
      country_code: string;
      zip: string;
    };
    items: Array<{
      sync_variant_id: number;
      quantity: number;
    }>;
  }) => {
    const { data, error } = await supabase.functions.invoke('printful', {
      body: { action: 'estimate-costs', data: { order } },
    });

    if (error) throw error;
    return data.result;
  };

  const createOrder = async (order: {
    recipient: {
      name: string;
      address1: string;
      city: string;
      state_code: string;
      country_code: string;
      zip: string;
      email: string;
    };
    items: Array<{
      sync_variant_id: number;
      quantity: number;
    }>;
  }) => {
    const { data, error } = await supabase.functions.invoke('printful', {
      body: { action: 'create-order', data: { order } },
    });

    if (error) throw error;
    return data.result;
  };

  return {
    getProducts,
    getProduct,
    getStoreInfo,
    estimateCosts,
    createOrder,
  };
};
