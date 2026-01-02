import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Rainbow Pride Tote Bag",
    category: "Tote Bags",
    price: 28,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=500&fit=crop",
    badge: "Bestseller",
    badgeColor: "from-pride-orange to-pride-red",
  },
  {
    id: 2,
    name: "Pride Flag Sticker Pack",
    category: "Stickers",
    price: 12,
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
    badge: "Popular",
    badgeColor: "from-pride-purple to-pride-pink",
  },
  {
    id: 3,
    name: "Bi Pride Enamel Pin Set",
    category: "Accessories",
    price: 18,
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
    badge: "New",
    badgeColor: "from-pride-pink via-pride-purple to-pride-blue",
  },
  {
    id: 4,
    name: "Canvas Pride Tote",
    category: "Tote Bags",
    price: 32,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1597633125097-5a9ae21a7df2?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Holographic Pride Stickers",
    category: "Stickers",
    price: 8,
    originalPrice: 12,
    rating: 4.9,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&h=500&fit=crop",
    badge: "Sale",
    badgeColor: "from-pride-green to-pride-blue",
  },
  {
    id: 6,
    name: "Pride Bracelet Bundle",
    category: "Accessories",
    price: 24,
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=500&fit=crop",
    badge: "Bundle",
    badgeColor: "from-pride-yellow to-pride-orange",
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
              Totes, Stickers & <span className="gradient-rainbow-text">More</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Express yourself with our most-loved accessories and essentials.
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

                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                    {product.category}
                  </div>

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
