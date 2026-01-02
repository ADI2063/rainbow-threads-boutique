import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { addToCart } = useCart();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product, 1, "M");
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section id="pride" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Black Tees, <span className="gradient-rainbow-text">Bold Pride</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Classic black t-shirts with vibrant pride designs. Simple, stylish, powerful.
            </p>
          </div>
          <Button variant="pride-outline" className="mt-6 md:mt-0">
            View All Products
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const isHovered = hoveredId === product.id;
            const isFavorite = favorites.includes(product.id);

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
                    {/* Placeholder */}
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-secondary transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}>
                      <div className="text-center">
                        <span className="text-6xl block mb-2">👕</span>
                        <p className="text-xs text-muted-foreground">Black Tee</p>
                      </div>
                    </div>

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

                    {/* Category Tag */}
                    <div className="absolute bottom-4 left-4 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                      {product.category}
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
                  <h3 className="font-semibold mb-1 group-hover:gradient-rainbow-text transition-all duration-300">
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
                  <span className="text-lg font-bold">${product.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
