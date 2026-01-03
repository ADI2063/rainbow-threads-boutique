import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingBag, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrintful } from "@/hooks/usePrintful";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryFilters = [
  { id: "all", name: "All Products", keywords: [] },
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
    toast.success(`${product.name} added to cart!`);
  };

  // Filter products based on category
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
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {activeCategory.name === "All Products" ? (
              <>Shop All <span className="gradient-rainbow-text">Pride</span></>
            ) : (
              <span className="gradient-rainbow-text">{activeCategory.name}</span>
            )}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Authentic pride apparel, printed on demand and shipped worldwide.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryFilters.map((filter) => (
            <Link
              key={filter.id}
              to={`/shop?category=${filter.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                categoryParam === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              {filter.name}
            </Link>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading products from Printful...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24">
            <p className="text-destructive mb-4">Failed to load products</p>
            <p className="text-muted-foreground text-sm">Please check your Printful API key configuration.</p>
          </div>
        )}

        {/* No Products */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground">No products found in this category.</p>
            <Link to="/shop?category=all">
              <Button variant="pride-outline" className="mt-4">View All Products</Button>
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => {
              const isHovered = hoveredId === product.id;
              const isFavorite = favorites.includes(product.id);
              const detailedProduct = detailedProducts?.find((d) => d?.id === product.id);
              const price = detailedProduct?.sync_variants?.[0]?.retail_price || "29.99";

              return (
                <div
                  key={product.id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Container */}
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5] mb-4">
                      {product.thumbnail_url ? (
                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isHovered ? "scale-110" : "scale-100"
                          }`}
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-secondary transition-transform duration-700 ${
                          isHovered ? "scale-110" : "scale-100"
                        }`}>
                          <div className="text-center">
                            <span className="text-6xl block mb-2">👕</span>
                            <p className="text-xs text-muted-foreground">Pride Apparel</p>
                          </div>
                        </div>
                      )}

                      {/* Overlay */}
                      <div
                        className={`absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full h-12 w-12 hover:scale-110 transition-transform"
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickAdd(product);
                          }}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className={`rounded-full h-12 w-12 hover:scale-110 transition-transform ${
                            isFavorite ? "text-pride-pink" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product.id);
                          }}
                        >
                          <Heart
                            className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                          />
                        </Button>
                      </div>

                      {/* Favorite Button (Mobile) */}
                      <button
                        className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isFavorite ? "text-pride-pink fill-current" : "text-foreground"
                          }`}
                        />
                      </button>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold mb-1 group-hover:gradient-rainbow-text transition-all duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-pride-yellow fill-current" />
                      <span className="text-sm ml-1">4.9</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      (120+ reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${price}</span>
                  </div>
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
