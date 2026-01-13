import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import ParallaxSection from "@/components/ParallaxSection";
import ParallaxShowcase from "@/components/ParallaxShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ParallaxShowcase />
        <ParallaxSection speed={0.3} pattern="diagonal">
          <Categories />
        </ParallaxSection>
        <ParallaxSection speed={0.2} pattern="dots">
          <FeaturedProducts />
        </ParallaxSection>
        <ParallaxSection speed={0.4} pattern="geometric">
          <Newsletter />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
