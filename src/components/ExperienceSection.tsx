import { motion } from "framer-motion";

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

// Scale dot size: min 8px (short jobs) to 20px (longest job)
const maxDuration = Math.max(...experiences.map(e => e.durationMonths));
const minDuration = Math.min(...experiences.map(e => e.durationMonths));
const getDotSize = (months: number) => {
  if (maxDuration === minDuration) return 14;
  const ratio = (months - minDuration) / (maxDuration - minDuration);
  return 8 + ratio * 12; // 8px to 20px
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative terminal-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> git log --oneline career
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
            Berufs<span className="text-gradient">erfahrung</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
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
      </div>
    </section>
  );
};

export default ExperienceSection;
