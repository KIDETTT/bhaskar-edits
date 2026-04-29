import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "1.5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "35+", label: "Clients Served" },
  { value: "200K+", label: "Views Generated" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="py-24 md:py-32 border-t border-foreground/[0.08] relative">
      <div className="grain" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <div className="section-label justify-center mb-4">By The Numbers / 005</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.9]">
            RESULTS THAT <span className="text-primary">SPEAK.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-foreground/[0.08]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8 md:p-10 text-center group hover:bg-[#0f0f0f] transition-colors"
            >
              <div className="font-display text-5xl md:text-7xl text-gold leading-none group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-[0.6rem] md:text-xs tracking-[0.25em] uppercase text-foreground/50 mt-3">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
