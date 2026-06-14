import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Experience = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
          <span className="font-mono font-bold text-primary">Berufserfahrung</span>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> git log --oneline career
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-mono mt-3">
              Berufs<span className="text-gradient">erfahrung</span>
            </h1>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              10+ Jahre Information Security und Engineering in Healthcare, Finance, Telecom und Energiesektor.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Stationen, Verantwortlichkeiten und konkrete Ergebnisse stelle ich gerne nach kurzer Anfrage zur Verfügung. So entscheide ich für jeden Empfänger individuell, welche Details sinnvoll sind.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors glow-green"
              >
                Details anfragen
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-mono font-semibold text-sm rounded-md hover:bg-primary/10 transition-colors"
              >
                Zur Übersicht
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Experience;
