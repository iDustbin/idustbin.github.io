import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, X, Eye } from "lucide-react";

const certificates = [
  {
    title: "Arbeitszeugnis – RMGroup AG",
    issuer: "RMGroup AG",
    role: "Senior DevOps Engineer",
    pdfUrl: "https://github.com/iDustbin/idustbin.github.io/blob/36b63f14e763c9957879f64e1b463fcc94cc32d8/degree/Work%20reference%20-%20Dustin%20Keinert.pdf",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/36b63f14e763c9957879f64e1b463fcc94cc32d8/degree/Work%20reference%20-%20Dustin%20Keinert.pdf",
  },
  {
    title: "Arbeitszeugnis – ESPRIT Europe GmbH",
    issuer: "ESPRIT Europe GmbH",
    role: "IT-Security Specialist / Infrastructure",
    pdfUrl: "https://github.com/iDustbin/idustbin.github.io/blob/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
  },
  {
    title: "Arbeitszeugnis – Xsite GmbH",
    issuer: "Xsite GmbH",
    role: "DevOps Engineer",
    pdfUrl: "https://github.com/iDustbin/idustbin.github.io/blob/08bba53ec0d0e59510ab71685a67f8b2074984ad/degree/xsite-zeugnis.pdf",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/08bba53ec0d0e59510ab71685a67f8b2074984ad/degree/xsite-zeugnis.pdf",
  },
];

const CertificatesSection = () => {
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);

  return (
    <>
      <section id="certificates" className="py-24 relative terminal-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> ls ~/certificates/
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
              Zertifikate & <span className="text-gradient">Zeugnisse</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-primary truncate">{cert.issuer}</p>
                  </div>
                </div>

                <h3 className="font-mono font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-6">{cert.role}</p>

                <div className="mt-auto flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPdf({ title: cert.title, url: cert.rawPdfUrl })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    PDF ansehen
                  </button>
                  <a
                    href={cert.rawPdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    title="Herunterladen"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Overlay */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={() => setSelectedPdf(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-[95vw] h-[90vh] max-w-5xl bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/50">
              <h3 className="font-mono text-sm text-foreground truncate pr-4">{selectedPdf.title}</h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                aria-label="Schliessen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* PDF iframe */}
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedPdf.url)}&embedded=true`}
              className="w-full h-[calc(90vh-52px)]"
              title={selectedPdf.title}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CertificatesSection;
