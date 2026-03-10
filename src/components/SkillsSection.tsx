import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Information Security",
    icon: "🛡️",
    skills: ["ISO 27001 / ISMS", "CISM", "Risk Management", "Security Awareness", "Incident Response"],
  },
  {
    title: "Operating Systems",
    icon: "🖥️",
    skills: ["Debian", "RedHat / CentOS", "Solaris", "Ubuntu", "Linux Administration"],
  },
  {
    title: "Automation & CI/CD",
    icon: "⚙️",
    skills: ["Ansible", "Jenkins", "Bitbucket Pipelines", "GitOps", "Infrastructure as Code"],
  },
  {
    title: "Container & Orchestration",
    icon: "🐳",
    skills: ["Docker", "Kubernetes", "OpenShift", "HAProxy", "Apache Tomcat"],
  },
  {
    title: "Networking & Security",
    icon: "🔒",
    skills: ["BGP Routing", "MPLS", "Firewall (FortiGate)", "Vulnerability Scanning", "DDOS Protection (Akamai)"],
  },
  {
    title: "Databases & Storage",
    icon: "💾",
    skills: ["Oracle 11g", "MySQL / Percona", "LDAP", "Veritas NetBackup", "Azure Blob Storage"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> cat skills.yml
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
            Technologie-<span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 bg-primary/50 rounded-full flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
