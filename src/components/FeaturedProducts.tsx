import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { usePrintful } from "@/hooks/usePrintful";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { getProducts, getProduct } = usePrintful();

  const { data: printfulProducts, isLoading, error } = useQuery({
    queryKey: ["printful-products"],
    queryFn: getProducts,
  });

  const { data: detailedProducts } = useQuery({
    queryKey: ["printful-products-details", printfulProducts],
    queryFn: async () => {
      if (!printfulProducts) return [];
      const details = await Promise.all(
        printfulProducts.slice(0, 6).map((p) => getProduct(p.id))
      );
      return details;
    },
    enabled: !!printfulProducts && printfulProducts.length > 0,
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (product: any) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.retail_price ? parseFloat(product.retail_price) : 29.99,
      category: "T-Shirts",
    };
    addToCart(cartProduct, 1, "M");
    toast.success(`${product.name} added to cart`);
  };

  const displayProducts = printfulProducts?.slice(0, 6) || [];

  return (
    <section id="pride" className="py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 font-body">
              Featured
            </p>
            <h2 className="text-4xl md:text-6xl font-light font-display">
              New <span className="italic">Arrivals</span>
            </h2>
          </div>
          <Link 
            to="/shop"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors premium-link font-body"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground font-body">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body">Unable to load products.</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && displayProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {displayProducts.map((product, index) => {
              const isHovered = hoveredId === product.id;
              const isFavorite = favorites.includes(product.id);
              const detailedProduct = detailedProducts?.find((d) => d?.id === product.id);
              const price = detailedProduct?.sync_variants?.[0]?.retail_price || "29.99";

              return (
                <div
                  key={product.id}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Container */}
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden bg-card aspect-[3/4] mb-6">
                      {product.thumbnail_url ? (
                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isHovered ? "scale-105" : "scale-100"
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-6xl">👕</span>
                        </div>
                      )}

                      {/* Quick Actions Overlay */}
                      <div
                        className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-6 transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-12 w-12 rounded-none"
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickAdd(product);
                          }}
                        >
                          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className={`h-12 w-12 rounded-none ${isFavorite ? "bg-foreground text-background" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product.id);
                          }}
                        >
                          <Heart
                            className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                            strokeWidth={1.5}
                          />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-light text-lg mb-2 line-clamp-1 font-display">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground font-body text-sm">${price}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
