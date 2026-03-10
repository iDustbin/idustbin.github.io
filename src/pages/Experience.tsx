import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Download, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";

const workReferences = [
  {
    title: "Arbeitszeugnis – RMGroup AG",
    issuer: "RMGroup AG",
    role: "Senior DevOps Engineer",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/36b63f14e763c9957879f64e1b463fcc94cc32d8/degree/Work%20reference%20-%20Dustin%20Keinert.pdf",
  },
  {
    title: "Arbeitszeugnis – ESPRIT Europe GmbH",
    issuer: "ESPRIT Europe GmbH",
    role: "IT-Security Specialist / Infrastructure",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
  },
  {
    title: "Arbeitszeugnis – Xsite GmbH",
    issuer: "Xsite GmbH",
    role: "DevOps Engineer",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/08bba53ec0d0e59510ab71685a67f8b2074984ad/degree/xsite-zeugnis.pdf",
  },
  {
    title: "Zeugnisse – Sammel-PDF",
    issuer: "Diverse Arbeitgeber",
    role: "Arbeitszeugnisse-Sammlung",
    rawPdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/main/%21archiv/degree/Zeugnisse.pdf",
  },
];

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

const maxDuration = Math.max(...experiences.map(e => e.durationMonths));
const minDuration = Math.min(...experiences.map(e => e.durationMonths));
const getDotSize = (months: number) => {
  if (maxDuration === minDuration) return 14;
  const ratio = (months - minDuration) / (maxDuration - minDuration);
  return 8 + ratio * 12;
};

const Experience = () => {
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);

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
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> git log --oneline career
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-mono mt-3">
              Berufs<span className="text-gradient">erfahrung</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              10+ Jahre Erfahrung in Healthcare, Finance, Telecom und Energiesektor – von DevOps Engineering bis Information Security.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative pl-8 md:pl-20"
                >
                  <div
                    className="absolute left-0 md:left-8 top-2 rounded-full bg-primary glow-green"
                    style={{
                      width: getDotSize(exp.durationMonths),
                      height: getDotSize(exp.durationMonths),
                      transform: `translateX(-${getDotSize(exp.durationMonths) / 2}px)`,
                    }}
                  />

                  <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-mono font-bold text-foreground">{exp.role}</h3>
                        <p className="text-primary font-mono text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full whitespace-nowrap self-start">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 flex-shrink-0">›</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arbeitszeugnisse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24"
          >
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> ls ~/references/
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-mono mt-3 mb-8">
              Arbeits<span className="text-gradient">zeugnisse</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workReferences.map((ref, index) => (
                <motion.div
                  key={ref.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-primary truncate">{ref.issuer}</p>
                    </div>
                  </div>

                  <h3 className="font-mono font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                    {ref.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6">{ref.role}</p>

                  <div className="mt-auto flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPdf({ title: ref.title, url: ref.rawPdfUrl })}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      PDF ansehen
                    </button>
                    <a
                      href={ref.rawPdfUrl}
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
          </motion.div>
        </div>
      </main>

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
              src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedPdf.url)}&embedded=true`}
              className="w-full h-[calc(90vh-52px)]"
              title={selectedPdf.title}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Experience;
