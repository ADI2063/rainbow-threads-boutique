import { useState } from "react";
import { Button } from "@/components/ui/button";

const flags = [
  {
    id: 1,
    name: "Gay Pride",
    colors: ["#E40303", "#FF8C00", "#FFED00", "#008026", "#24408E", "#732982"],
  },
  {
    id: 2,
    name: "Lesbian Pride",
    colors: ["#D52D00", "#EF7627", "#FF9A56", "#FFFFFF", "#D162A4", "#B55690", "#A30262"],
  },
  {
    id: 3,
    name: "Bisexual Pride",
    colors: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
  },
];

const Categories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="shop" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Wear Your <span className="gradient-rainbow-text">Pride</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore collections inspired by the colors that represent you.
          </p>
        </div>

        {/* Horizontal scrolling flags */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {flags.map((flag) => {
            const isHovered = hoveredId === flag.id;

            return (
              <a
                key={flag.id}
                href={`#${flag.name.toLowerCase().replace(" ", "-")}`}
                className="group flex flex-col items-center gap-4"
                onMouseEnter={() => setHoveredId(flag.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Flag visualization - waving stripes */}
                <div 
                  className={`relative w-48 h-32 md:w-56 md:h-36 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    isHovered ? "scale-110 rotate-1" : ""
                  }`}
                  style={{
                    boxShadow: isHovered 
                      ? `0 20px 60px ${flag.colors[0]}40, 0 0 40px ${flag.colors[flag.colors.length - 1]}30`
                      : "0 10px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Flag stripes */}
                  <div className="absolute inset-0 flex flex-col">
                    {flag.colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex-1 transition-transform duration-500"
                        style={{
                          backgroundColor: color,
                          transform: isHovered 
                            ? `scaleX(${1 + Math.sin((index + 1) * 0.5) * 0.02})` 
                            : "scaleX(1)",
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Shine overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-50"
                    }`}
                  />
                  
                  {/* Hover CTA */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Button variant="secondary" size="sm" className="font-semibold">
                      Shop Now
                    </Button>
                  </div>
                </div>

                {/* Label */}
                <span 
                  className={`text-lg font-semibold transition-all duration-300 ${
                    isHovered ? "gradient-rainbow-text" : "text-foreground"
                  }`}
                >
                  {flag.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="pride-outline" size="lg">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
