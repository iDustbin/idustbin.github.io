import { motion } from "framer-motion";

const experiences = [
  {
    company: "RMGroup AG",
    role: "Senior DevOps Engineer",
    period: "07/2019 – 06/2020",
    highlights: [
      "Ansible Automation für MPTCP-Migration von 38.000 Kunden",
      "Migration ~10.000 virtueller Instanzen in neuen OpenStack Cluster",
      "Nokia 5G FMR Receiver Firmware-Integration",
      "Kubernetes-Automation & Traffic-Server-Cluster",
      "4G/5G Bonding & Internet Bonding (LTE + Kupferleitung)",
    ],
  },
  {
    company: "ESPRIT Europe GmbH",
    role: "IT-Security Specialist",
    period: "2016 – 2019",
    highlights: [
      "Security Consulting & Engineering",
      "Vulnerability Scanning, Analyse & Remediation",
      "Implementierung NetIQ MFA-Authentifizierung",
      "Threat Intelligence inkl. Prozessdefinition",
      "NOOS-Datenbank-Migration & IAM Cloud-Replikation",
    ],
  },
  {
    company: "ESPRIT Europe GmbH",
    role: "IT DataCenter Specialist",
    period: "12/2017 – 06/2018",
    highlights: [
      "Solaris zu Debian Linux Migration",
      "Disaster Recovery Setup auf Microsoft Azure",
      "Oracle 11g Database & Tablespace Migration",
      "Apache 2.2 zu 2.4 Migration inkl. SSL/TLS Update",
      "Veritas NetBackup zu Azure Cloud Storage",
    ],
  },
  {
    company: "Seven Principles AG",
    role: "Junior Consultant – DevOps OpenShift",
    period: "05/2017 – 12/2017",
    highlights: [
      "Ansible Automatisierung & Dockerized Services",
      "OpenShift 3.2 CaCert HotFix",
      "Vodafone Projekt: LDAP-Implementierung",
      "Oracle Secure Global Desktop",
      "Projektmanagement mit SAP ByDesign",
    ],
  },
  {
    company: "Xsite GmbH",
    role: "DevOps Engineer",
    period: "2016 – 2017",
    highlights: [
      "Infrastructure as Code mit Ansible",
      "DDOS Protection mit Akamai Prolexic",
      "Percona Database Cluster (InnoDB)",
      "CI/CD mit Bitbucket & Jenkins",
      "Applikations-Redesign (HAProxy – Apache – Tomcat – MySQL)",
    ],
  },
];

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
                <div className="absolute left-0 md:left-8 top-2 w-2 h-2 -translate-x-[3.5px] rounded-full bg-primary glow-green" />

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
