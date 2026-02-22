import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye, X } from "lucide-react";

const posts = [
  {
    title: "Ansible, Cisco-ACI, EvE-NG, AWS CloudFormation Integration & Information Gathering Role",
    excerpt:
      "Ein umfassender Leitfaden zur Integration von Ansible mit Cisco ACI, EvE-NG-Netzwerksimulation und AWS CloudFormation für automatisierte Infrastruktur.",
    url: "https://medium.com/@idustbin/ansible-cisco-aci-eve-ng-aws-cloudformation-integration-information-gathering-role-24c70ea0e167",
  },
  {
    title: "Install iOS & iPadOS 14 Developer Beta – Fix European Queue Issues",
    excerpt:
      "Anleitung zur Installation der iOS 14 Developer Beta auf iPad Mini 4 & iPhone 11 mit Lösungen für europäische Queue-Probleme.",
    url: "https://medium.com/@idustbin/install-ios-ipados-14-developer-beta-fix-european-queue-issues-873276543384",
  },
];

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<{ title: string; url: string } | null>(null);

  return (
    <>
      <section id="blog" className="py-24 relative">
        <div className="container mx-auto px-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPost({ title: post.title, url: post.url })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Vorschau
                  </button>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2.5 bg-secondary border border-border rounded-md text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    title="Auf Medium öffnen"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
