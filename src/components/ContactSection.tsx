import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, Mail } from "lucide-react";

const contacts = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 93152 19956",
    href: "https://wa.me/919315219956",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@kidett",
    href: "https://instagram.com/kidett",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bhaskarpandey200608@gmail.com",
    href: "mailto:bhaskarpandey200608@gmail.com",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Ready to create something amazing together?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card glow-border p-6 text-center group block"
            >
              <contact.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
              <div className="font-semibold text-foreground mb-1">{contact.label}</div>
              <div className="text-muted-foreground text-sm break-all">{contact.value}</div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 text-muted-foreground text-sm"
        >
          © {new Date().getFullYear()} Bhaskar. Crafted with passion.
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
