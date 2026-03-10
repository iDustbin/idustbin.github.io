import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Eye, Download, X } from "lucide-react";

const experiences = [
  {
    company: "AEW Energie AG",
    role: "Information Security Officer",
    period: "05/2025 – heute",
    durationMonths: 10,
    highlights: [
      "Aufbau & Betrieb des ISMS nach ISO 27001",
      "Erfolgreiche ISO 27001 Erstzertifizierung ohne Beanstandungen",
      "Security Governance Framework & unternehmensweite Security Policies",
      "Risikobewertungen & Compliance-Audits, Reporting an Geschäftsleitung",
      "Azure AD, M365 & Endpoint Security Monitoring",
    ],
  },
  {
    company: "USZ (Spitalsektor)",
    role: "System Engineer Linux & Kubernetes",
    period: "07/2023 – heute",
    durationMonths: 32,
    highlights: [
      "Hospital-grade Container-Infrastruktur mit 9+ Microservices",
      "Automatisiertes Patching & Kubernetes/Namespace Provisioning mit Ansible",
      "Penetration Testing & CVE-Validierung in K8s-Umgebungen",
      "Python-Tooling für CSV Inventory Parsing",
    ],
  },
  {
    company: "Swisscom AG (Government)",
    role: "Senior ICT Security Engineer",
    period: "01/2023 – 06/2023",
    durationMonths: 6,
    highlights: [
      "Cisco ACI Upgrades & Firewall-Änderungen via REST & Ansible",
      "Infrastruktur-Reviews & Vulnerability Patching für Regierungsnetzwerke",
      "Mail-Security (SMTP/IMAP) & Web-Firewall-Konfiguration",
    ],
  },
  {
    company: "Comdirect AG (Banking)",
    role: "Senior DevOps Engineer",
    period: "09/2022 – 02/2023",
    durationMonths: 6,
    highlights: [
      "Migration 3+ Java-Applikationen zu Podman Containern",
      "Static Code Analysis & Java Security Flaws Reporting",
      "Sichere OpenShift Cluster & SSL-Zertifikate",
    ],
  },
  {
    company: "RMGroup AG (ISP)",
    role: "Senior DevOps Engineer",
    period: "07/2020 – 10/2022",
    durationMonths: 28,
    highlights: [
      "Ansible Automation für MPTCP-Migration von 38.000+ Kunden",
      "OpenStack Cluster & hybrides 5G Bonding mit Nokia FMR",
      "Kubernetes App Deployments & Backend Rollouts",
    ],
    workReference: {
      title: "Arbeitszeugnis – RMGroup AG",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/36b63f14e763c9957879f64e1b463fcc94cc32d8/degree/Work%20reference%20-%20Dustin%20Keinert.pdf",
    },
  },
  {
    company: "ESPRIT Holding Europe",
    role: "IT-Security Specialist",
    period: "04/2019 – 10/2019",
    durationMonths: 7,
    highlights: [
      "Automatisierte Vulnerability Scanning & Remediation Pipelines",
      "Security Consulting & Engineering",
    ],
    workReference: {
      title: "Arbeitszeugnis – ESPRIT Europe GmbH",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    },
  },
  {
    company: "ESPRIT Holding Europe",
    role: "IT Infrastructure & Technology Management",
    period: "06/2018 – 03/2019",
    durationMonths: 10,
    highlights: [
      "Globale Netzwerk-Topologie & Software-Landschaft redesigned",
      "NOOS & IAM Infrastruktur Cloud-Migration",
      "MPLS-zu-Azure Konnektivität & Architektur-Richtlinien",
    ],
    workReference: {
      title: "Arbeitszeugnis – ESPRIT Europe GmbH",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    },
  },
  {
    company: "ESPRIT Holding Europe",
    role: "IT DataCenter Specialist",
    period: "12/2017 – 06/2018",
    durationMonths: 7,
    highlights: [
      "Solaris zu Debian Linux Migration",
      "Disaster Recovery auf Azure für bshop.esprit.com",
      "IAM-Migration von Oracle LDAP zu Azure",
    ],
    workReference: {
      title: "Arbeitszeugnis – ESPRIT Europe GmbH",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    },
  },
  {
    company: "Seven Principles AG",
    role: "Junior Consultant – DevOps OpenShift",
    period: "05/2017 – 12/2017",
    durationMonths: 8,
    highlights: [
      "Deployment-Pipelines für OpenShift 3.2 automatisiert",
      "LDAP/NIS Analyse für Vodafone Backend-Integration",
      "Oracle Secure Global Desktop & Custom LDAP",
    ],
  },
  {
    company: "RedTecLab GmbH",
    role: "DevOps Engineer",
    period: "02/2015 – 05/2017",
    durationMonths: 28,
    highlights: [
      "CI/CD Pipelines mit Jenkins & Bitbucket",
      "DDoS Protection & CDN Hardening mit Akamai",
      "DB & App Layer Optimierung, DNS Migration",
    ],
  },
];

const ExperienceSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <span className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> git log --oneline career
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-mono mt-3">
            Berufs<span className="text-gradient">erfahrung</span>
          </h2>
        </motion.div>

        {/* Slider controls */}
        <div className="flex items-center gap-2 mb-4 justify-end">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-md border border-border bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            aria-label="Nach links scrollen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-md border border-border bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            aria-label="Nach rechts scrollen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal slider */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-w-[320px] max-w-[360px] flex-shrink-0 snap-start p-5 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-mono font-bold text-foreground truncate">{exp.role}</h3>
                  <p className="text-primary font-mono text-xs">{exp.company}</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-1 flex-grow">
                {exp.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>

              {exp.workReference && (
                <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedPdf({
                        title: exp.workReference!.title,
                        url: exp.workReference!.pdfUrl,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border rounded-md text-[10px] font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Award className="w-3 h-3" />
                    <Eye className="w-3 h-3" />
                    Zeugnis ansehen
                  </button>
                  <a
                    href={exp.workReference.pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-7 h-7 bg-secondary border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    title="Herunterladen"
                  >
                    <Download className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PDF Overlay */}
      <AnimatePresence>
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
                src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedPdf.url)}&embedded=true`}
                className="w-full h-[calc(90vh-52px)]"
                title={selectedPdf.title}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceSlider;
