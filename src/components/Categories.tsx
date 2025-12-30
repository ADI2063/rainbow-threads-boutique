import { useState } from "react";
import { Heart, Sparkles, Flag } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Gay Pride",
    description: "Bold rainbow styles for him",
    icon: Flag,
    color: "from-pride-red via-pride-orange to-pride-yellow",
    items: 52,
  },
  {
    id: 2,
    name: "Lesbian Pride",
    description: "Celebrate sapphic love",
    icon: Heart,
    color: "from-pride-orange via-pride-pink to-pride-purple",
    items: 48,
  },
  {
    id: 3,
    name: "Bisexual Pride",
    description: "Love without limits",
    icon: Sparkles,
    color: "from-pride-pink via-pride-purple to-pride-blue",
    items: 45,
  },
];

const Categories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="shop" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Shop by <span className="gradient-rainbow-text">Identity</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find fashion that represents you. Every collection celebrates a unique expression of pride.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredId === category.id;

            return (
              <a
                key={category.id}
                href={`#${category.name.toLowerCase().replace(" ", "-")}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all duration-500 hover:border-transparent hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 transition-transform duration-300 ${
                      isHovered ? "scale-110 rotate-3" : ""
                    }`}
                  >
                    <Icon className="w-7 h-7 text-background" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:gradient-rainbow-text transition-all duration-300">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Item Count */}
                  {category.items > 0 ? (
                    <span className="text-xs text-muted-foreground">
                      {category.items} items
                    </span>
                  ) : (
                    <span className="text-xs text-pride-pink">Coming Soon</span>
                  )}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <span className="text-foreground">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
