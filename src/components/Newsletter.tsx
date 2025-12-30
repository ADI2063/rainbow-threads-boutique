import { useState } from "react";
import { Send, Heart, Sparkles } from "lucide-react";
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
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Welcome to the family! 🌈", {
      description: "Check your inbox for exclusive offers.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pride-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pride-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-rainbow mb-8">
            <Sparkles className="w-8 h-8 text-background" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Join Our <span className="gradient-rainbow-text">Community</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Get exclusive access to new drops, special discounts, and be the first to know about our pride events.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-secondary border-border pl-5 pr-12 text-base placeholder:text-muted-foreground focus:border-primary"
                required
              />
              <Heart className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <Button
              type="submit"
              variant="pride"
              size="xl"
              disabled={isSubmitting}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Joining...</span>
              ) : (
                <>
                  Subscribe
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground mt-6">
            We respect your privacy. Unsubscribe anytime. 💜
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
