import { motion } from "framer-motion";
import avatarImg from "@/assets/dustbin.png";
import TerminalAnimation from "./TerminalAnimation";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-sm text-muted-foreground"
          >
            <span className="text-primary">$</span> whoami
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 glow-green">
              <img
                src={avatarImg}
                alt="Dustin Keinert - Information Security Officer"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight">
              <span className="text-gradient glow-text">iDustBin.com</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-mono">
              Information Security Officer | CISM
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 font-mono">
              Information Security Officer & DevSecOps Engineer aus der Schweiz. Spezialisiert auf ISMS, ISO 27001, Ansible, Kubernetes und Cloud-Infrastruktur für Enterprise-Umgebungen.
            </p>
          </motion.div>


          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <a
              href="#experience"
              className="px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors glow-green"
            >
              Erfahrung ansehen
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-primary/30 text-primary font-mono font-semibold text-sm rounded-md hover:bg-primary/10 transition-colors"
            >
              Kontakt aufnehmen
            </a>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {["ISMS", "ISO 27001", "CISM", "Ansible", "Kubernetes", "Docker", "CI/CD"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-secondary border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Terminal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="w-full mt-4"
          >
            <TerminalAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
