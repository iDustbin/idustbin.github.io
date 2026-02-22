import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, X, Server, Shield, Cloud, Container, GitBranch, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "mptcp-migration",
    title: "MPTCP-Migration 38.000 Kunden",
    company: "RMGroup AG",
    category: "Automation",
    icon: Terminal,
    summary: "Grossflächige Ansible-Automatisierung für die Migration von 38.000 Kunden auf MPTCP-Bonding.",
    description:
      "Vollständige Automatisierung der MPTCP-Migration für 38.000 Endkunden mit Ansible. Die Migration umfasste Firmware-Updates, Konfigurationsänderungen und Validierung der Netzwerkverbindungen in Echtzeit. Durch idempotente Playbooks konnte die Migration in Batches durchgeführt und bei Fehlern nahtlos fortgesetzt werden.",
    tech: ["Ansible", "Python", "MPTCP", "Linux", "Bash"],
    highlights: [
      "38.000 Kunden erfolgreich migriert",
      "Zero-Downtime Migration in Batches",
      "Automatisierte Rollback-Strategie",
      "Echtzeit-Monitoring & Reporting",
    ],
  },
  {
    id: "openstack-migration",
    title: "OpenStack Cluster Migration",
    company: "RMGroup AG",
    category: "Cloud",
    icon: Cloud,
    summary: "Migration von ~10.000 virtuellen Instanzen in einen neuen OpenStack Cluster.",
    description:
      "Planung und Durchführung der Live-Migration von rund 10.000 virtuellen Instanzen aus einem Legacy-OpenStack-Cluster in eine neue, optimierte Umgebung. Dabei wurden Netzwerk-Topologien, Storage-Backends und Security Groups automatisiert überführt.",
    tech: ["OpenStack", "Ansible", "KVM", "Ceph", "Linux"],
    highlights: [
      "~10.000 VMs live migriert",
      "Automatisierte Netzwerk- & Storage-Migration",
      "Minimale Serviceunterbrechung",
      "Parallele Cluster-Validierung",
    ],
  },
  {
    id: "5g-firmware",
    title: "Nokia 5G FMR Firmware-Integration",
    company: "RMGroup AG",
    category: "Networking",
    icon: Server,
    summary: "Integration und Automatisierung der Nokia 5G Fixed Mobile Receiver Firmware.",
    description:
      "Entwicklung eines automatisierten Firmware-Deployment-Prozesses für Nokia 5G FMR Receiver. Die Lösung umfasste automatische Firmware-Erkennung, gestaffeltes Rollout und automatisierte Funktionstests nach dem Update.",
    tech: ["Ansible", "5G", "Nokia", "Python", "REST API"],
    highlights: [
      "Automatisiertes Firmware-Rollout",
      "Gestaffelte Deployment-Strategie",
      "Automatische Post-Update-Validierung",
      "Integration in bestehendes Monitoring",
    ],
  },
  {
    id: "security-consulting",
    title: "Security Consulting & Engineering",
    company: "ESPRIT Europe GmbH",
    category: "Security",
    icon: Shield,
    summary: "Umfassendes IT-Security Consulting mit Vulnerability Management und MFA-Implementierung.",
    description:
      "Aufbau und Betrieb eines Vulnerability-Management-Programms inklusive regelmässiger Scans, Analyse und Remediation. Implementierung von NetIQ Multi-Faktor-Authentifizierung für kritische Systeme sowie Aufbau einer Threat-Intelligence-Pipeline.",
    tech: ["NetIQ", "Qualys", "SIEM", "MFA", "IAM"],
    highlights: [
      "Vulnerability-Management-Programm aufgebaut",
      "MFA für 500+ Benutzer implementiert",
      "Threat Intelligence Pipeline erstellt",
      "Security-Prozesse dokumentiert & geschult",
    ],
  },
  {
    id: "azure-dr",
    title: "Disaster Recovery auf Azure",
    company: "ESPRIT Europe GmbH",
    category: "Cloud",
    icon: Cloud,
    summary: "Aufbau einer Disaster-Recovery-Lösung auf Microsoft Azure mit automatisiertem Failover.",
    description:
      "Migration der Disaster-Recovery-Infrastruktur von On-Premise auf Microsoft Azure. Implementierung von automatisiertem Failover, regelmässigen DR-Tests und Veritas NetBackup zu Azure Cloud Storage Migration.",
    tech: ["Azure", "Veritas NetBackup", "Oracle 11g", "Debian", "Apache"],
    highlights: [
      "DR-Failover-Zeit von Stunden auf Minuten reduziert",
      "Oracle DB & Tablespace Migration",
      "Apache 2.2 → 2.4 mit SSL/TLS Hardening",
      "Automatisierte DR-Tests",
    ],
  },
  {
    id: "kubernetes-automation",
    title: "Kubernetes & Traffic Server Cluster",
    company: "RMGroup AG",
    category: "Container",
    icon: Container,
    summary: "Aufbau und Automatisierung von Kubernetes-Clustern und Apache Traffic Server.",
    description:
      "Design und Implementierung von Kubernetes-Clustern für Microservices-Workloads. Aufbau eines hochverfügbaren Apache Traffic Server Clusters für Load Balancing und Caching mit automatisierter Konfiguration via Ansible.",
    tech: ["Kubernetes", "Docker", "Ansible", "Apache Traffic Server", "HAProxy"],
    highlights: [
      "Multi-Node K8s Cluster aufgebaut",
      "Traffic Server HA-Cluster",
      "Automatisierte Deployments via CI/CD",
      "Monitoring mit Prometheus & Grafana",
    ],
  },
  {
    id: "cicd-pipeline",
    title: "CI/CD Pipeline & Infrastructure as Code",
    company: "Xsite GmbH",
    category: "DevOps",
    icon: GitBranch,
    summary: "Aufbau moderner CI/CD-Pipelines mit Jenkins und Infrastructure as Code mit Ansible.",
    description:
      "Implementierung einer vollständigen CI/CD-Pipeline mit Bitbucket und Jenkins für automatisierte Builds, Tests und Deployments. Parallel dazu wurde die gesamte Infrastruktur auf Infrastructure as Code mit Ansible umgestellt, inklusive DDOS Protection mit Akamai Prolexic.",
    tech: ["Jenkins", "Bitbucket", "Ansible", "Akamai", "Percona", "HAProxy"],
    highlights: [
      "Vollautomatisierte Build & Deploy Pipeline",
      "DDOS Protection implementiert",
      "Percona DB Cluster (InnoDB) aufgebaut",
      "Applikations-Stack komplett redesigned",
    ],
  },
];

const categories = ["Alle", ...Array.from(new Set(projects.map((p) => p.category)))];

const Portfolio = () => {
  const [filter, setFilter] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered = filter === "Alle" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
          <span className="font-mono font-bold text-primary">Portfolio</span>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> ls ~/projects/ --detailed
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-mono mt-3">
              Projekt<span className="text-gradient">portfolio</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Eine Auswahl meiner wichtigsten Projekte aus den Bereichen DevOps, Cloud-Infrastruktur, Security und Automation.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
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

          {/* Grid */}
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
                        <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                          {project.category}
                        </span>
                        <p className="text-xs text-muted-foreground truncate">{project.company}</p>
                      </div>
                    </div>

                    <h3 className="font-mono font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-grow">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono bg-secondary border border-border rounded text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card border border-border rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-card/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = selectedProject.icon;
                    return (
                      <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="font-mono font-bold text-foreground text-sm">{selectedProject.title}</h2>
                    <p className="text-xs text-primary font-mono">{selectedProject.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Schliessen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-mono text-xs text-primary mb-2 uppercase tracking-wider">Beschreibung</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">Ergebnisse</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-mono bg-secondary border border-border rounded-full text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
