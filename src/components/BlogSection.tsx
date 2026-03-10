import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye, X, Newspaper } from "lucide-react";

const posts = [
  {
    title: "Ansible, Cisco-ACI, EvE-NG, AWS CloudFormation Integration & Information Gathering Role",
    excerpt:
      "Ein umfassender Leitfaden zur Integration von Ansible mit Cisco ACI, EvE-NG-Netzwerksimulation und AWS CloudFormation für automatisierte Infrastruktur.",
    url: "https://medium.com/@idustbin/ansible-cisco-aci-eve-ng-aws-cloudformation-integration-information-gathering-role-24c70ea0e167",
    type: "blog" as const,
  },
  {
    title: "Install iOS & iPadOS 14 Developer Beta – Fix European Queue Issues",
    excerpt:
      "Anleitung zur Installation der iOS 14 Developer Beta auf iPad Mini 4 & iPhone 11 mit Lösungen für europäische Queue-Probleme.",
    url: "https://medium.com/@idustbin/install-ios-ipados-14-developer-beta-fix-european-queue-issues-873276543384",
    type: "blog" as const,
  },
];

const pressArticles = [
  {
    title: "Daten und Informationen sind bei der AEW sicher – sagt dieses neu verliehene Zertifikat",
    excerpt:
      "Die AEW Energie AG wurde erstmals nach ISO 27001 zertifiziert – ohne jegliche Abweichungen. Die Aargauer und Solothurner Presse berichtet über die erfolgreiche Zertifizierung – ein unabhängiger Beleg für das erreichte Sicherheitsniveau.",
    links: [
      {
        source: "AEW Energie AG",
        url: "https://www.aew.ch/news/iso-27001-ohne-abweichungen-aew-auf-top-niveau-der-informationssicherheit",
        date: "2026",
      },
      {
        source: "Aargauer Zeitung",
        url: "https://www.aargauerzeitung.ch/wirtschaft/aargau/aew-energie-ag-erhaelt-iso-zertifikat-fuer-datensicherheit-ld.4122067",
        date: "16.02.2026",
      },
      {
        source: "Solothurner Zeitung",
        url: "https://www.solothurnerzeitung.ch/wirtschaft/aargau/aew-energie-ag-erhaelt-iso-zertifikat-fuer-datensicherheit-ld.4122067",
        date: "16.02.2026",
      },
    ],
  },
  {
    title: "Connext Vivendi – Screenshot Magazin",
    excerpt:
      "Beitrag im Connext Vivendi Magazin (Februar 2011) über den Einsatz von Vivendi Connext beim Caritasverband Geldern-Kevelaer e.V. während der Ausbildung zum Fachinformatiker Systemintegration.",
    links: [
      {
        source: "Connext Magazin (PDF)",
        url: "https://connext.de/pdf/Magazin/Connext-Screenshot-2011-02.pdf",
        date: "02/2011",
      },
    ],
  },
];

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<{ title: string; url: string } | null>(null);

  return (
    <>
      <section id="blog" className="py-24 relative">
        <div className="container mx-auto px-6">
          {/* Blog Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> cat /var/log/blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
              Blog <span className="text-gradient">Posts</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base leading-snug">
                    {post.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>

                <div className="mt-4">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Auf Medium öffnen
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Press Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$</span> cat /var/log/press
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
              In der <span className="text-gradient">Presse</span>
            </h2>
          </motion.div>

          {/* Newspaper Articles */}
          <div className="grid grid-cols-1 gap-6">
            {pressArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Newspaper className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary">Pressebericht</span>
                </div>
                <h3 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {article.links.map((link) => (
                    link.source === "AEW Energie AG" ? (
                      <a
                        key={link.source}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {link.source} · {link.date}
                      </a>
                    ) : (
                      <button
                        key={link.source}
                        onClick={() => setSelectedPost({ title: `${article.title} – ${link.source}`, url: link.url })}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {link.source} · {link.date}
                      </button>
                    )
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Overlay */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
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
              <h3 className="font-mono text-sm text-foreground truncate pr-4">{selectedPost.title}</h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={selectedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                  title="Auf Medium öffnen"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Schliessen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Embedded Medium post */}
            <iframe
              src={selectedPost.url}
              className="w-full h-[calc(90vh-52px)]"
              title={selectedPost.title}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BlogSection;
