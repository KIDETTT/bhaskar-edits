import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "CapCut", primary: true },
  { name: "Alight Motion", primary: false },
  { name: "Motion Graphics", primary: false },
  { name: "Premiere Pro", primary: false },
  { name: "Canva", primary: false },
  { name: "Photoshop", primary: false },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Skills</span> & Tools
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-default ${
                skill.primary
                  ? "bg-primary text-primary-foreground shadow-[0_0_25px_hsl(174_72%_52%/0.3)]"
                  : "glass-card glow-border text-foreground hover:text-primary"
              }`}
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
