import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Rainbow accent line */}
      <div className="absolute top-20 left-0 right-0 h-[2px] gradient-rainbow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <p 
            className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8 animate-fade-up font-body"
            style={{ animationDelay: "0.1s" }}
          >
            Celebrating Identity Through Fashion
          </p>

          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-[1.1] animate-fade-up font-display"
            style={{ animationDelay: "0.2s" }}
          >
            Wear Your
            <br />
            <span className="italic">True Colors</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-up leading-relaxed font-body font-light"
            style={{ animationDelay: "0.3s" }}
          >
            Premium apparel that celebrates who you are. 
            Bold designs, inclusive sizing, timeless style.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/shop">
              <Button variant="pride" size="xl" className="group min-w-[200px]">
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="pride-outline" size="xl" className="min-w-[200px]">
              Our Story
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 md:gap-16 mt-24 pt-12 border-t border-border animate-fade-up max-w-2xl mx-auto"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "100%", label: "Inclusive Sizing" },
              { value: "∞", label: "Ways to Express" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-light mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-xs tracking-widest text-muted-foreground uppercase font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs tracking-widest text-muted-foreground uppercase font-body">Scroll</span>
          <div className="w-[1px] h-12 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-foreground animate-[slide-down_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
