import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card glow-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="gradient-text">Bhaskar</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/919315219956"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_25px_hsl(174_72%_52%/0.4)] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
        <a
          href="https://wa.me/919315219956"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
