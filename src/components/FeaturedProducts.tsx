import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Rainbow Pride Hoodie",
    price: 65,
    originalPrice: 85,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    badge: "Bestseller",
    badgeColor: "from-pride-orange to-pride-red",
  },
  {
    id: 2,
    name: "Love Wins Crop Top",
    price: 35,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
    badge: "New",
    badgeColor: "from-pride-purple to-pride-pink",
  },
  {
    id: 3,
    name: "Trans Pride Denim Jacket",
    price: 95,
    rating: 5.0,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    badge: "Limited",
    badgeColor: "from-pride-blue to-pride-pink",
  },
  {
    id: 4,
    name: "Non-Binary Vibes Tee",
    price: 32,
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Pride Flag Sneakers",
    price: 120,
    originalPrice: 150,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    badge: "Sale",
    badgeColor: "from-pride-green to-pride-blue",
  },
  {
    id: 6,
    name: "Bi Pride Bomber",
    price: 88,
    rating: 4.8,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
    badge: "Popular",
    badgeColor: "from-pride-pink via-pride-purple to-pride-blue",
  },
];

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <section id="pride" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-rainbow-text">Favorites</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Our most-loved pieces, handpicked by the community.
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
                <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />

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
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`rounded-full h-12 w-12 hover:scale-110 transition-transform ${
                        isFavorite ? "text-pride-pink" : ""
                      }`}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${product.badgeColor} text-xs font-semibold text-background`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Favorite Button (Mobile) */}
                  <button
                    className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite ? "text-pride-pink fill-current" : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold mb-1 group-hover:gradient-rainbow-text transition-all duration-300">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-pride-yellow fill-current" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
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
