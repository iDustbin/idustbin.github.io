import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[200] max-w-lg mx-auto"
        >
          <div className="bg-card border border-border rounded-lg p-4 shadow-2xl backdrop-blur-md flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs font-mono text-foreground font-semibold mb-1">🍪 Cookies</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diese Website verwendet keine Tracking-Cookies. Es werden nur technisch notwendige Daten
                (z.B. diese Einstellung) lokal gespeichert.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={accept}
                className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-mono font-semibold rounded-md hover:bg-primary/90 transition-colors"
              >
                OK
              </button>
              <button
                onClick={accept}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Schliessen"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
