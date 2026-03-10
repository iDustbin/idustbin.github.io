import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, X } from "lucide-react";
import isacaLogo from "@/assets/certs/isaca-logo.png";
import kubernetesLogo from "@/assets/certs/kubernetes-logo.png";
import fortinetLogo from "@/assets/certs/fortinet-logo.png";
import linuxLogo from "@/assets/certs/linux-logo.png";
import sqsLogo from "@/assets/certs/sqs-logo.png";
import dellLogo from "@/assets/certs/dell-logo.png";

const certificates = [
  {
    title: "CISM – Certified Information Security Manager",
    issuer: "ISACA",
    role: "Information Security Management",
    year: "2025",
    logo: isacaLogo,
    pdfUrl: "/certs/cism-certificate.pdf",
  },
  {
    title: "CKA – Certified Kubernetes Administrator",
    issuer: "CNCF / Linux Foundation",
    role: "Kubernetes Administration",
    year: "2024",
    logo: kubernetesLogo,
    pdfUrl: "/certs/cka-certificate.pdf",
  },
  {
    title: "Fortinet NSE 1-3",
    issuer: "Fortinet",
    role: "Network Security Associate & Expert",
    year: "2023",
    logo: fortinetLogo,
    pdfUrls: [
      { label: "NSE 1", url: "/certs/nse1-certificate.pdf" },
      { label: "NSE 2", url: "/certs/nse2-certificate.pdf" },
      { label: "NSE 3", url: "/certs/nse3-certificate.pdf" },
    ],
  },
  {
    title: "LPIC-1 – Linux Essentials",
    issuer: "LPI",
    role: "Linux System Administration",
    year: "2023",
    logo: linuxLogo,
  },
  {
    title: "SQS Web Application Security Tester",
    issuer: "SQS",
    role: "Web Application Security Testing",
    year: "2016",
    logo: sqsLogo,
  },
  {
    title: "Dell Certified Systems Expert",
    issuer: "Dell",
    role: "Windows 8 / Server",
    year: "2014",
    logo: dellLogo,
    pdfUrl: "/certs/dell-certificate.pdf",
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
              <span className="text-gradient">Zertifikate</span>
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
                  <div className="w-10 h-10 rounded-md bg-white/90 border border-border flex items-center justify-center overflow-hidden">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-primary truncate">{cert.issuer}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{cert.year}</p>
                  </div>
                </div>

                <h3 className="font-mono font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-6">{cert.role}</p>

                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-md text-xs font-mono text-primary">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Zertifiziert
                  </span>
                  {cert.pdfUrl && (
                    <button
                      onClick={() => setSelectedPdf({ title: cert.title, url: cert.pdfUrl! })}
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ansehen
                    </button>
                  )}
                  {cert.pdfUrls && cert.pdfUrls.map((pdf) => (
                    <button
                      key={pdf.label}
                      onClick={() => setSelectedPdf({ title: `${cert.title} – ${pdf.label}`, url: pdf.url })}
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {pdf.label}
                    </button>
                  ))}
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
            transition={{ duration: 0.2 }}
            className="relative w-[95vw] h-[90vh] max-w-5xl bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
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
            <iframe
              src={selectedPdf.url}
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
