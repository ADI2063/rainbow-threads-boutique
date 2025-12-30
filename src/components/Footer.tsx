import { Sparkles, Instagram, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "#" },
      { name: "Pride Collection", href: "#" },
      { name: "New Arrivals", href: "#" },
      { name: "Sale", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Shipping", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Mission", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Careers", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-pride-purple" />
              <span className="text-xl font-bold gradient-rainbow-text">
                halovera
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Fashion that celebrates every color of the rainbow. Express your authentic self with pride.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-pride-pink/20 hover:text-pride-pink transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-pride-blue/20 hover:text-pride-blue transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} halovera. Made with{" "}
              <Heart className="w-4 h-4 text-pride-pink fill-current" /> for the
              community.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Pride Flag Strip */}
          <div className="mt-8 h-1 w-full gradient-rainbow rounded-full opacity-60" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
