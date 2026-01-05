import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrintful } from "@/hooks/usePrintful";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryFilters = [
  { id: "all", name: "All", keywords: [] },
  { id: "gay-pride", name: "Gay Pride", keywords: ["gay", "rainbow", "pride"] },
  { id: "lesbian-pride", name: "Lesbian Pride", keywords: ["lesbian", "sapphic"] },
  { id: "bisexual-pride", name: "Bisexual Pride", keywords: ["bisexual", "bi pride", "bi-pride"] },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
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
        printfulProducts.map((p) => getProduct(p.id))
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

  const filteredProducts = printfulProducts?.filter((product) => {
    if (categoryParam === "all") return true;
    const filter = categoryFilters.find((f) => f.id === categoryParam);
    if (!filter) return true;
    const productNameLower = product.name.toLowerCase();
    return filter.keywords.some((keyword) => productNameLower.includes(keyword));
  }) || [];

  const activeCategory = categoryFilters.find((f) => f.id === categoryParam) || categoryFilters[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 font-body">
            {activeCategory.id === "all" ? "Shop" : "Collection"}
          </p>
          <h1 className="text-4xl md:text-6xl font-light font-display">
            {activeCategory.name === "All" ? (
              <>All <span className="italic">Products</span></>
            ) : (
              <span className="italic">{activeCategory.name}</span>
            )}
          </h1>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categoryFilters.map((filter) => (
            <Link
              key={filter.id}
              to={`/shop?category=${filter.id}`}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all font-body ${
                categoryParam === filter.id
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground"
              }`}
            >
              {filter.name}
            </Link>
          ))}
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
          <div className="text-center py-24">
            <p className="text-muted-foreground font-body">Unable to load products.</p>
          </div>
        )}

        {/* No Products */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground font-body mb-6">No products found in this category.</p>
            <Link to="/shop?category=all">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => {
              const isHovered = hoveredId === product.id;
              const isFavorite = favorites.includes(product.id);
              const detailedProduct = detailedProducts?.find((d) => d?.id === product.id);
              const price = detailedProduct?.sync_variants?.[0]?.retail_price || "29.99";

              return (
                <div
                  key={product.id}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
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
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
