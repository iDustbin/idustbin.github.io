import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ExternalLink, X, Server, Shield, Cloud, Container, Terminal,
  Award, Eye, Download, GraduationCap, Briefcase, Building2, Users
} from "lucide-react";
import { Link } from "react-router-dom";
import ihkLogo from "@/assets/certs/ihk.png";
import bbbkLogo from "@/assets/certs/bbbk.png";

/* ───────────────── PROJECTS ───────────────── */
const projects = [
  {
    id: "aew-iso27001",
    title: "ISO 27001 Zertifizierung",
    company: "AEW Energie AG",
    category: "Security",
    icon: Shield,
    summary: "Aufbau des ISMS und erfolgreiche ISO 27001 Erstzertifizierung ohne Beanstandungen.",
    description:
      "Aufbau und Implementierung eines umfassenden Information Security Management Systems (ISMS) nach ISO 27001. Verantwortlich für Risikomanagement, Security Policies, Awareness-Schulungen und Auditvorbereitung. Erstzertifizierung ohne Beanstandungen bestanden.",
    tech: ["ISO 27001", "ISMS", "Risk Management", "CISM", "Security Awareness"],
    highlights: [
      "Erstzertifizierung ohne Beanstandungen bestanden",
      "ISMS von Grund auf aufgebaut",
      "In Aargauer Zeitung & Solothurner Zeitung publiziert",
      "Sicherheitskultur im Energiesektor etabliert",
    ],
  },
  {
    id: "systronaut",
    title: "Systronaut – Cloud Environment Platform",
    company: "Eigenprojekt",
    category: "Cloud",
    icon: Cloud,
    summary: "Cloud-Plattform zum Provisioning und Management von virtualisierten Umgebungen.",
    description:
      "Systronaut ist eine Cloud-Plattform zum schnellen Provisioning und Management von virtualisierten Umgebungen. Features: Libvirt Hypervisor & VMware ESXi Datacenter Management, TFTPBoot Management, HTML5 Kickstart Config Generator, Chart.JS Performance Overview, Multi-Networking mit ARP Security, Full Disk Encryption und OpenStack/Cisco VLAN Management.",
    tech: ["Docker", "Python3", "Libvirt", "VMware ESXi", "Chart.JS", "OpenStack"],
    highlights: ["Hypervisor & Datacenter Management", "HTML5 Kickstart Config Generator", "Multi-Networking mit ARP Security", "Full Disk Encryption & Security"],
    externalUrl: "https://www.systronaut.com",
  },
  {
    id: "loadzone",
    title: "Load.Zone – File Download Tool",
    company: "Eigenprojekt",
    category: "DevOps",
    icon: Server,
    summary: "Werkzeug zum schnellen und sicheren Herunterladen von Dateien mit Dashboard.",
    description: "Load.Zone ist ein Werkzeug zum effizienten Herunterladen von Dateien mit sicherer Benutzerregistrierung und übersichtlichem Dashboard.",
    tech: ["Backend", "File Management", "Dashboard", "Authentication"],
    highlights: ["Schnelles & sicheres File-Download", "Benutzerregistrierung & -verwaltung", "Übersichtliches Dashboard", "Optimierte Download-Prozesse"],
    externalUrl: "https://backend.dev.load.zone",
  },
  {
    id: "diabetes-app",
    title: "Diabetes Management App",
    company: "Eigenprojekt",
    category: "App",
    icon: Terminal,
    summary: "Applikation zur Verwaltung und Überwachung von Diabetes-relevanten Gesundheitsdaten.",
    description: "Entwicklung einer Diabetes-Management-Applikation zur täglichen Erfassung und Analyse von Blutzuckerwerten, Insulindosen und Mahlzeiten.",
    tech: ["App Development", "Health Tech", "Data Tracking", "UX Design"],
    highlights: ["Blutzucker-Tracking & Analyse", "Insulindosen-Verwaltung", "Benutzerfreundliches Interface", "Gesundheitsdaten-Visualisierung"],
  },
  {
    id: "swisscom-rmgroup",
    title: "Swisscom Internet-Infrastruktur",
    company: "RMGroup AG · Endkunde Swisscom",
    category: "Automation",
    icon: Terminal,
    summary: "Nokia 5G FMR Firmware-Integration, MPTCP-Migration für 38.000 Kunden, OpenStack Migration (~10.000 VMs).",
    description: "Umfassendes Infrastrukturprojekt für Swisscom: Firmware-Deployment für Nokia 5G FMR Receiver, MPTCP-Migration für 38.000 Endkunden, Live-Migration von ~10.000 VMs in neuen OpenStack Cluster, Kubernetes-Cluster-Aufbau mit Cloud-Init.",
    tech: ["Ansible", "Kubernetes", "Python", "OpenStack", "Cloud-Init", "5G", "Nokia", "KVM", "Ceph", "MPTCP", "Linux"],
    highlights: ["38.000 Kunden auf MPTCP migriert", "~10.000 VMs live migriert", "Nokia 5G FMR Firmware-Rollout automatisiert", "Kubernetes Cluster mit Cloud-Init", "Zero-Downtime Migration", "Automatisierte Rollback-Strategie"],
  },
  {
    id: "security-consulting",
    title: "Security Consulting & Engineering",
    company: "ESPRIT Europe GmbH",
    category: "Security",
    icon: Shield,
    summary: "Vulnerability Management, MFA-Implementierung und Threat Intelligence.",
    description: "Aufbau und Betrieb eines Vulnerability-Management-Programms. Implementierung von NetIQ Multi-Faktor-Authentifizierung und Aufbau einer Threat-Intelligence-Pipeline.",
    tech: ["NetIQ", "Qualys", "SIEM", "MFA", "IAM"],
    highlights: ["Vulnerability-Management-Programm aufgebaut", "MFA für 500+ Benutzer implementiert", "Threat Intelligence Pipeline erstellt", "Security-Prozesse dokumentiert & geschult"],
  },
  {
    id: "azure-dr",
    title: "Disaster Recovery auf Azure",
    company: "ESPRIT Europe GmbH",
    category: "Cloud",
    icon: Cloud,
    summary: "Aufbau einer DR-Lösung auf Microsoft Azure mit automatisiertem Failover.",
    description: "Migration der DR-Infrastruktur von On-Premise auf Azure. Automatisierter Failover, DR-Tests und Veritas NetBackup zu Azure Cloud Storage Migration.",
    tech: ["Azure", "Veritas NetBackup", "Oracle 11g", "Debian", "Apache"],
    highlights: ["DR-Failover von Stunden auf Minuten reduziert", "Oracle DB & Tablespace Migration", "Apache 2.2 → 2.4 mit SSL/TLS Hardening", "Automatisierte DR-Tests"],
  },
  {
    id: "kubernetes-automation",
    title: "Kubernetes & Traffic Server Cluster",
    company: "RMGroup AG",
    category: "Container",
    icon: Container,
    summary: "Aufbau und Automatisierung von Kubernetes-Clustern und Apache Traffic Server.",
    description: "Design und Implementierung von Kubernetes-Clustern für Microservices. Hochverfügbarer Apache Traffic Server Cluster mit automatisierter Konfiguration via Ansible.",
    tech: ["Kubernetes", "Docker", "Ansible", "Apache Traffic Server", "HAProxy"],
    highlights: ["Multi-Node K8s Cluster aufgebaut", "Traffic Server HA-Cluster", "Automatisierte Deployments via CI/CD", "Monitoring mit Prometheus & Grafana"],
  },
];

const categories = ["Alle", ...Array.from(new Set(projects.map((p) => p.category)))];

/* ───────────────── ALL CAREER POSITIONS ───────────────── */
const experienceEntries = [
  {
    company: "AEW Energie AG",
    industry: "Energie",
    role: "Information Security Officer",
    period: "05/2025 – heute",
    durationMonths: 10,
    highlights: [
      "<strong>Erfolgreiche ISO 27001 Erstzertifizierung ohne Beanstandungen</strong>",
      "Aufbau & Betrieb des ISMS nach ISO 27001",
      "Security Governance Framework & unternehmensweite Security Policies",
      "Risikobewertungen & Compliance-Audits, Reporting an Geschäftsleitung",
      "Azure AD, M365 & Endpoint Security Monitoring",
      "<strong>Projektleitung: Darktrace – KI-basierte Cyber-Bedrohungserkennung</strong>",
      "Darktrace: Deployment von Netzwerk-Sensoren & Cloud-Anbindung",
      "Darktrace: Ransomware-Erkennung, Insider-Threat-Detection & Anomalie-Analyse",
      "Darktrace: Reduzierung der Reaktionszeit bei Security Incidents",
      "<strong>Projektleitung: eMail Security – Absicherung der E-Mail-Infrastruktur</strong>",
      "eMail Security: SPF, DKIM & DMARC Policy-Implementierung",
      "eMail Security: Anti-Phishing Gateway & Sandboxing",
      "eMail Security: Signifikante Reduktion von Phishing-Vorfällen & Compliance-Konformität",
      "<strong>Projektleitung: Klassifizieren von Informationen</strong>",
    ],
    pressLink: {
      title: "ISO 27001 – AEW auf Top-Niveau der Informationssicherheit",
      url: "https://www.aew.ch/news/iso-27001-ohne-abweichungen-aew-auf-top-niveau-der-informationssicherheit",
    },
  },
  {
    company: "USZ – Universitätsspital Zürich",
    industry: "Healthcare",
    role: "System Engineer Linux & Kubernetes",
    period: "07/2023 – heute",
    durationMonths: 32,
    highlights: [
      "Hospital-grade Container-Infrastruktur mit 9+ Microservices",
      "Automatisiertes Patching & Kubernetes/Namespace Provisioning mit Ansible",
      "Penetration Testing & CVE-Validierung in K8s-Umgebungen",
      "Python-Tooling für CSV Inventory Parsing",
      "<strong>Projektleitung: Aufbau VMware Broadcom Tanzu Umgebung mit NSX & AVI Load Balancer</strong>",
      "Automatisierung von Workflows & Prozessen in der Tanzu-Plattform",
    ],
  },
  {
    company: "Swisscom AG",
    industry: "Government / Telekom",
    role: "Senior ICT Security Engineer",
    period: "01/2023 – 06/2023",
    durationMonths: 6,
    highlights: [
      "Cisco ACI Network Review & REST-basierte Upgrades (Post/Get/Put/Patch)",
      "Ansible Automation für Infrastruktur-Analysen",
      "VMware ESXi 6.5 → 7.03 Upgrade",
      "SMTP/IMAP & Phishing Mail-Security",
      "Fortigate Firewall Changes & F5 WAF Review/Signature Updates",
      "REMAS Settings & Change Implementation",
      "SSL-Zertifikate & Netzwerk-Analyse",
    ],
  },
  {
    company: "Comdirect AG",
    industry: "Banking",
    role: "Senior DevOps Engineer",
    period: "09/2022 – 02/2023",
    durationMonths: 6,
    highlights: [
      "Maven Docker (Podman) Deployment",
      "Migration ~3 Java-Applikationen inkl. Oracle SQL Clients zu Podman",
      "Firewall Changes & Review",
      "Reporting Malicious Java Implementations",
      "OpenShift Preparation & Hardening",
      "SSL-Zertifikate",
    ],
  },
  {
    company: "RMGroup AG (Endkunde Swisscom)",
    industry: "Telekom / ISP",
    role: "Senior DevOps Engineer",
    period: "07/2020 – 10/2022",
    durationMonths: 28,
    highlights: [
      "Ansible Automation MPTCP-Migration für 38.000 Kunden",
      "Migration ~10.000 VMs in neuen OpenStack Cluster",
      "Nokia 5G FMR Receiver Firmware-Integration",
      "Kubernetes Cluster-Aufbau mit Cloud-Init & Ansible",
      "Internet Bonding (MPTCP, LTE, 5G & Kupferleitung)",
      "TR069/TR181/TR157 Datamodel Automation",
      "Juniper BGP Routing & IPv4 Subnetting",
      "Apache Traffic Server & Kubernetes Application Cluster",
    ],
    workReference: {
      title: "Arbeitszeugnis – RMGroup AG",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/36b63f14e763c9957879f64e1b463fcc94cc32d8/degree/Work%20reference%20-%20Dustin%20Keinert.pdf",
    },
  },
  {
    company: "ESPRIT Holding Europe",
    industry: "Fashion / Retail",
    role: "IT-Security Specialist",
    period: "04/2019 – 10/2019",
    durationMonths: 7,
    highlights: [
      "Vulnerability Scanning, Analyse & Remediation",
      "Security Audits & automatisierte Security Upgrades",
      "Implementierung NetIQ MFA Authentication",
      "Implementierung Spiderfoot & Cuckoo Sandbox",
      "Threat Intelligence inkl. Prozessdefinition & User Training",
      "Verantwortlich für Vulnerabilities & Exploits",
    ],
    workReference: {
      title: "Arbeitszeugnis – ESPRIT Europe GmbH",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    },
  },
  {
    company: "ESPRIT Holding Europe",
    industry: "Fashion / Retail",
    role: "IT Infrastructure & Technology Management",
    period: "06/2018 – 03/2019",
    durationMonths: 10,
    highlights: [
      "Globale Netzwerk-Topologie & Software-Landschaft Redesign",
      "NOOS Datenbank-Migration & IAM Cloud-Replikation",
      "MPLS-zu-Azure Konnektivität & Architektur-Richtlinien",
      "EvE-NG Netzwerk-Emulation für Architecture Review",
      "Java Application & Version Analysis",
      "IT-Globalisation Initiative",
    ],
    workReference: {
      title: "Arbeitszeugnis – ESPRIT Europe GmbH",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    },
  },
  {
    company: "ESPRIT Holding Europe",
    industry: "Fashion / Retail",
    role: "IT DataCenter Specialist",
    period: "12/2017 – 06/2018",
    durationMonths: 7,
    highlights: [
      "Solaris zu Debian Linux Migration (bshop.esprit.com)",
      "Disaster Recovery Setup auf Microsoft Azure",
      "Oracle 11g Tablespace Fulldump zu Azure DB & VM",
      "Oracle LDAP → Azure IAM Migration",
      "Veritas NetBackup zu Azure Cloud Storage Blob",
      "Apache 2.2 → 2.4 Migration inkl. SSL/TLS Update",
      "Implementierung Outpost24 Security Appliance",
      "Ansible Automation & Cloud Security",
    ],
    workReference: {
      title: "Arbeitszeugnis – ESPRIT Europe GmbH",
      pdfUrl: "https://raw.githubusercontent.com/iDustbin/idustbin.github.io/09e71916f29240fb481fece2655e6a10f5859896/degree/esprit.pdf",
    },
  },
  {
    company: "Seven Principles AG",
    industry: "Telekom / Consulting",
    role: "Junior Consultant – DevOps OpenShift",
    period: "05/2017 – 12/2017",
    durationMonths: 8,
    highlights: [
      "Ansible Automation & Dockerized Services",
      "OpenShift 3.2 Deployment-Pipelines & CaCert HotFix",
      "Vodafone Projekt: NIS User & Mount Analyse",
      "Vodafone Projekt: LDAP Implementation & rSyslog Appliance",
      "Oracle Secure Global Desktop (SGD)",
      "SAP ByDesign Zeit- & Projektmanagement",
    ],
  },
  {
    company: "RedTecLab GmbH",
    industry: "Web Operations",
    role: "DevOps Engineer / Vice Head of Operations",
    period: "02/2015 – 05/2017",
    durationMonths: 28,
    highlights: [
      "CI/CD Pipelines mit Jenkins & Bitbucket",
      "DDoS Protection mit Akamai (Prolexic) & CDN Hardening",
      "DNS Migration zu DNSMadeEasy",
      "FortiGate Firewall Appliance Administration",
      "HAProxy Setup & Application Redesign (HAProxy → Apache → Tomcat → MySQL)",
      "Percona InnoDB Database Cluster Implementation",
      "DB-Optimierung (sort_buffer/key_buffer)",
      "Projekt- & Zeitmanagement mit Jira & Confluence",
    ],
  },
  {
    company: "Best Job IT-Experts",
    industry: "Staffing / HR",
    role: "Ressourcen Manager – IT Recruiter",
    period: "08/2014 – 01/2015",
    durationMonths: 6,
    highlights: [
      "IT-Recruiting & Consulting",
      "Core Skill Area: Administration, Technical Consulting & UHD",
      "StaffIT-Pro Ressourcen-Management",
    ],
  },
  {
    company: "Unisys Deutschland GmbH",
    industry: "IT Services",
    role: "Customer Service Engineer (10.000+ User)",
    period: "02/2014 – 07/2014",
    durationMonths: 6,
    highlights: [
      "3rd Level Support (EMEA) – Remote, OnSite, Phone & Mail",
      "Incident- & Change-Management",
      "Dell Repair & Part Replacement",
      "Administration Lotus Notes & IBM Domino Mailserver",
      "Exchange Rollout & technisches Consulting",
      "Group Policy Analyse, Definition & Rollout",
      "Nokia Smartphone & Mobile Exchange Rollout",
    ],
  },
  {
    company: "Caritasverband Geldern-Kevelaer e.V.",
    industry: "Sozialwesen / IT",
    role: "IT-Systemadministrator (300+ User)",
    period: "08/2013 – 01/2014",
    durationMonths: 6,
    highlights: [
      "Administration heterogener Infrastruktur (Novell/Oracle/Linux/Windows/VMware)",
      "Nagios 3 Monitoring mit SMS-Alerting bei kritischen Ausfällen",
      "Novell ZenWorks Application Provisioning",
      "1st, 2nd & 3rd Level Support",
      "SNOM VoIP Phone Rollout",
      "OpenVPN Tunnel auf Gentoo Basis",
      "Bacula & VEEAM Backup-Administration",
      "Firewall Cluster auf FreeBSD & iptables",
    ],
  },
  {
    company: "Caritasverband Geldern-Kevelaer e.V.",
    industry: "Sozialwesen / IT",
    role: "Auszubildender – Fachinformatiker Systemintegration (IHK)",
    period: "08/2010 – 07/2013",
    durationMonths: 36,
    highlights: [
      "Windows Server 2000 → 2008R2 & Win 7 RDP Migration",
      "Heterogene Infrastruktur (VMware ESX, Windows, Debian, FreeBSD, Gentoo)",
      "Cisco VLAN Konfiguration & Patching",
      "Novell ZenWorks Software-Deployment",
      "Nagios Monitoring Implementation (Nagios, NRPE, GSM)",
      "Oracle SGD & Vivendi Connext ERP Administration",
      "Support für 300+ Client PC Workstations",
      "IHK-Abschluss: Fachinformatiker Systemintegration",
    ],
    pressLink: {
      title: "Connext Magazin – Februar 2011",
      url: "https://connext.de/pdf/Magazin/Connext-Screenshot-2011-02.pdf",
    },
  },
];

const expMaxDuration = Math.max(...experienceEntries.map(e => e.durationMonths));
const expMinDuration = Math.min(...experienceEntries.map(e => e.durationMonths));
const getDotSize = (months: number) => {
  if (expMaxDuration === expMinDuration) return 14;
  return 8 + ((months - expMinDuration) / (expMaxDuration - expMinDuration)) * 12;
};

/* ───────────────── EDUCATION (popup data) ───────────────── */
const educationEntries = [
  {
    title: "Fachinformatiker Systemintegration",
    institution: "IHK Niederrhein",
    logo: ihkLogo,
    period: "2010 – 2013",
    description: "Duale Ausbildung beim Caritasverband Geldern-Kevelaer e.V. mit IHK-Abschlussprüfung. Schwerpunkte: Netzwerkadministration, Serverinfrastruktur, Monitoring und heterogene Systemlandschaften.",
    highlights: [
      "IHK-Abschluss Fachinformatiker Systemintegration",
      "Windows Server, Linux (Debian, Gentoo, FreeBSD)",
      "VMware ESX, Cisco VLAN, Nagios Monitoring",
      "300+ User Support & Infrastruktur",
    ],
  },
  {
    title: "Berufliches Gymnasium Bertolt Brecht",
    institution: "Berufskolleg Duisburg (BBBK)",
    logo: bbbkLogo,
    period: "2010 – 2013",
    description: "Schulische Ausbildung begleitend zur dualen IHK-Ausbildung am Berufskolleg in Duisburg.",
    highlights: [
      "Berufsschule begleitend zur Ausbildung",
      "Fachrichtung Informatik / Systemintegration",
    ],
  },
  {
    title: "Realschulabschluss",
    institution: "Realschule an der Fleuth, Geldern",
    period: "1999 – 2010",
    description: "Mittlere Reife an der Realschule an der Fleuth in Geldern.",
    highlights: ["Mittlere Reife"],
  },
];

/* ───────────────── COMPONENT ───────────────── */
const Portfolio = () => {
  const [filter, setFilter] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);
  const [selectedEdu, setSelectedEdu] = useState<(typeof educationEntries)[0] | null>(null);

  const filtered = filter === "Alle" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
          <span className="font-mono font-bold text-primary">Portfolio</span>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> cat ~/profile/summary.md
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-mono mt-3">
              Projekt<span className="text-gradient">portfolio</span>
            </h1>
            <div className="mt-6 max-w-3xl">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Information Security professional with <span className="text-primary font-semibold">13+ years</span> of experience
                across <span className="text-foreground">online pharmacy</span>, <span className="text-foreground">healthcare</span>, <span className="text-foreground">finance</span>, <span className="text-foreground">telecommunications</span>, and <span className="text-foreground">energy</span> sectors.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-3">
                Specialized in <span className="text-foreground">security architecture</span>, <span className="text-foreground">DevOps</span>, and <span className="text-foreground">cloud infrastructure</span> with
                a strong focus on automation, resilience, and real-world threat defense.
              </p>
            </div>
          </motion.div>

          {/* ──── Kernkompetenzen ──── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> cat ~/skills/core.yml
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-mono mt-3 mb-8">
              Kern<span className="text-gradient">kompetenzen</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Information Security", items: ["ISMS / ISO 27001", "CISM-zertifiziert (ISACA)", "Risikomanagement & Compliance", "Security Governance & Policies", "Vulnerability Management"] },
                { label: "DevOps & Automation", items: ["Ansible, Terraform, CI/CD", "Kubernetes (CKA-zertifiziert)", "Docker, Podman, OpenShift", "GitOps & Infrastructure as Code", "Jenkins, Bitbucket Pipelines"] },
                { label: "Cloud & Infrastruktur", items: ["Microsoft Azure & OpenStack", "VMware ESXi & KVM", "Linux (LPIC, RHCE-Trainings)", "Netzwerk: Cisco, Fortinet (NSE 1-3)", "Monitoring: Nagios, Prometheus, Grafana"] },
                { label: "Branchen-Erfahrung", items: ["Healthcare (USZ)", "Banking (Comdirect AG)", "Telecom (Swisscom / RMGroup)", "Energie (AEW Energie AG)", "Fashion (ESPRIT)"] },
                { label: "Soft Skills", items: ["Projektleitung & Stakeholder-Mgmt", "Audit-Vorbereitung & Reporting", "Technische Dokumentation", "Interdisziplinäre Zusammenarbeit", "IT-Recruiting Erfahrung"] },
                { label: "Sprachen", items: ["Deutsch – Muttersprache", "Englisch – fliessend"] },
              ].map((group) => (
                <div key={group.label} className="p-5 bg-card border border-border rounded-lg hover:border-primary/20 transition-all">
                  <h3 className="font-mono font-semibold text-primary text-sm mb-3">{group.label}</h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ──── Ausbildung (clickable popups) ──── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16">
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> ls ~/education/
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-mono mt-3 mb-8">
              Aus<span className="text-gradient">bildung</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {educationEntries.map((edu, i) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  onClick={() => setSelectedEdu(edu)}
                  className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green cursor-pointer flex gap-4"
                >
                  <div className="w-12 h-12 rounded-md bg-white/90 border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                    {edu.logo ? (
                      <img src={edu.logo} alt={edu.institution} className="w-10 h-10 object-contain" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-foreground text-sm group-hover:text-primary transition-colors">{edu.title}</h3>
                    <p className="text-primary font-mono text-xs">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ──── Berufserfahrung Timeline ──── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-16">
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> git log --oneline career
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-mono mt-3 mb-12">
              Berufs<span className="text-gradient">erfahrung</span>
            </h2>

            <div className="relative">
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-10">
                {experienceEntries.map((exp, index) => (
                  <motion.div
                    key={`${exp.company}-${exp.role}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-mono font-bold text-foreground">{exp.role}</h3>
                          <p className="text-primary font-mono text-sm">{exp.company}</p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{exp.industry}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full whitespace-nowrap self-start">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((item, idx) => {
                          const isGroupHeader = item.startsWith('<strong>');
                          return (
                            <li
                              key={item}
                              className={`flex items-start gap-2 text-sm text-muted-foreground ${isGroupHeader ? 'mt-4 pt-3 border-t border-border/40 first:mt-0 first:pt-0 first:border-0' : 'ml-4'}`}
                              style={idx === 0 || !isGroupHeader ? {} : {}}
                            >
                              <span className={`mt-1.5 flex-shrink-0 ${isGroupHeader ? 'text-primary' : 'text-muted-foreground/50'}`}>›</span>
                              <span className={isGroupHeader ? 'text-foreground/90' : ''} dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          );
                        })}
                      </ul>
                      {(exp.workReference || exp.pressLink) && (
                        <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2">
                          {exp.workReference && (
                            <>
                              <button
                                onClick={() => setSelectedPdf({ title: exp.workReference!.title, url: exp.workReference!.pdfUrl })}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                              >
                                <Award className="w-3.5 h-3.5" />
                                <Eye className="w-3.5 h-3.5" />
                                Zeugnis ansehen
                              </button>
                              <a
                                href={exp.workReference.pdfUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-8 h-8 bg-secondary border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                title="Herunterladen"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            </>
                          )}
                          {exp.pressLink && (
                            <a
                              href={exp.pressLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              {exp.pressLink.title}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ──── Projekte ──── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> ls ~/projects/ --detailed
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-mono mt-3 mb-8">
              Projekt<span className="text-gradient">highlights</span>
            </h2>
          </motion.div>

          {/* Filter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-mono rounded-md border transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary border-border text-muted-foreground hover:text-primary hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedProject(project)}
                    className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green cursor-pointer flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-wider">{project.category}</span>
                        <p className="text-xs text-muted-foreground truncate">{project.company}</p>
                      </div>
                    </div>
                    <h3 className="font-mono font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-grow">{project.summary}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-secondary border border-border rounded text-muted-foreground">{t}</span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground">+{project.tech.length - 3}</span>
                      )}
                      {project.externalUrl && (
                        <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-primary hover:text-primary/80 transition-colors">
                          <ExternalLink className="w-3 h-3" />
                          Link
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ──── Project Detail Overlay ──── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card border border-border rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-card/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  {(() => { const Icon = selectedProject.icon; return <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center"><Icon className="w-4 h-4 text-primary" /></div>; })()}
                  <div>
                    <h2 className="font-mono font-bold text-foreground text-sm">{selectedProject.title}</h2>
                    <p className="text-xs text-primary font-mono">{selectedProject.company}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedProject(null)} className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Schliessen">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-mono text-xs text-primary mb-2 uppercase tracking-wider">Beschreibung</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selectedProject.description}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">Ergebnisse</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-0.5 flex-shrink-0">✓</span><span dangerouslySetInnerHTML={{ __html: h }} /></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs font-mono bg-secondary border border-border rounded-full text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
                {selectedProject.externalUrl && (
                  <a href={selectedProject.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-mono font-semibold text-xs rounded-md hover:bg-primary/90 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Projekt öffnen
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ──── Education Popup ──── */}
      <AnimatePresence>
        {selectedEdu && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4" onClick={() => setSelectedEdu(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-white/90 border border-border flex items-center justify-center overflow-hidden">
                    {selectedEdu.logo ? (
                      <img src={selectedEdu.logo} alt={selectedEdu.institution} className="w-8 h-8 object-contain" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-mono font-bold text-foreground text-sm">{selectedEdu.title}</h2>
                    <p className="text-xs text-primary font-mono">{selectedEdu.institution}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEdu(null)} className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Schliessen">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">{selectedEdu.period}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{selectedEdu.description}</p>
                <ul className="space-y-2">
                  {selectedEdu.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: h }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ──── PDF Overlay ──── */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm" onClick={() => setSelectedPdf(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-[95vw] h-[90vh] max-w-5xl bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/50">
              <h3 className="font-mono text-sm text-foreground truncate pr-4">{selectedPdf.title}</h3>
              <button onClick={() => setSelectedPdf(null)} className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors flex-shrink-0" aria-label="Schliessen">
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

export default Portfolio;
