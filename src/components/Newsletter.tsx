import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Welcome to our community", {
      description: "Check your inbox for exclusive offers.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-32 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60 font-body">
            Stay Connected
          </p>
          <h2 className="text-4xl md:text-6xl font-light mb-6 font-display">
            Join Our <span className="italic">Community</span>
          </h2>
          <p className="opacity-60 mb-12 max-w-md mx-auto font-body font-light">
            Get exclusive access to new drops, special offers, and be the first to know about our pride events.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-transparent border-background/30 text-background placeholder:text-background/50 rounded-none font-body"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-background text-foreground hover:bg-background/90 rounded-none min-w-[160px]"
            >
              {isSubmitting ? (
                <span className="animate-pulse font-body">Joining...</span>
              ) : (
                <>
                  <span className="font-body">Subscribe</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs opacity-40 mt-8 font-body">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
