import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const flags = [
  {
    id: 1,
    name: "Gay Pride",
    slug: "gay-pride",
    colors: ["#E40303", "#FF8C00", "#FFED00", "#008026", "#24408E", "#732982"],
  },
  {
    id: 2,
    name: "Lesbian Pride",
    slug: "lesbian-pride",
    colors: ["#D52D00", "#EF7627", "#FF9A56", "#FFFFFF", "#D162A4", "#B55690", "#A30262"],
  },
  {
    id: 3,
    name: "Bisexual Pride",
    slug: "bisexual-pride",
    colors: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
  },
];

const Categories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="collections" className="py-32 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 font-body">
            Collections
          </p>
          <h2 className="text-4xl md:text-6xl font-light font-display">
            Shop by <span className="italic">Pride</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {flags.map((flag) => {
            const isHovered = hoveredId === flag.id;

            return (
              <Link
                key={flag.id}
                to={`/shop?category=${flag.slug}`}
                className="group block"
                onMouseEnter={() => setHoveredId(flag.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  {/* Flag visualization */}
                  <div className="absolute inset-0 flex flex-col">
                    {flag.colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex-1 transition-transform duration-700"
                        style={{
                          backgroundColor: color,
                          transform: isHovered ? "scaleY(1.02)" : "scaleY(1)",
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Overlay */}
                  <div 
                    className={`absolute inset-0 bg-foreground/0 transition-all duration-500 flex items-end justify-center pb-8 ${
                      isHovered ? "bg-foreground/30" : ""
                    }`}
                  >
                    <span 
                      className={`text-sm tracking-widest uppercase text-background font-body flex items-center gap-2 transition-all duration-300 ${
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-center text-lg tracking-wide font-light font-display">
                  {flag.name}
                </h3>
              </Link>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors premium-link font-body"
          >
            View All Collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
