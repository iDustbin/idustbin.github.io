import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "E-Mail",
    value: "spam@idustbin.com",
    href: "mailto:spam@idustbin.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+41 79 764 6758",
    href: "tel:+41797646758",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Aarau, Schweiz",
    href: undefined,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Profil ansehen",
    href: "https://www.linkedin.com/in/idustbin/",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with form data
    const subject = encodeURIComponent(`Kontaktanfrage von ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nE-Mail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:spam@idustbin.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative terminal-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> ping idustbin
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
            Kontakt<span className="text-gradient">aufnahme</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info cards + Form */}
          <div className="space-y-8">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block p-5 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green"
                    >
                      <item.icon className="w-4 h-4 text-primary mb-2" />
                      <p className="text-xs font-mono text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm font-mono text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </a>
                  ) : (
                    <div className="p-5 bg-card border border-border rounded-lg">
                      <item.icon className="w-4 h-4 text-primary mb-2" />
                      <p className="text-xs font-mono text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm font-mono text-foreground">{item.value}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-card border border-border rounded-lg space-y-4"
            >
              <h3 className="font-mono font-semibold text-foreground text-sm mb-2">Nachricht senden</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                    placeholder="Dein Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1.5">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                    placeholder="deine@email.ch"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                  placeholder="Deine Nachricht..."
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors glow-green disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {submitted ? "Gesendet ✓" : "Absenden"}
              </button>
            </motion.form>
          </div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-full min-h-[400px] lg:min-h-0"
          >
            <div className="w-full h-full rounded-lg border border-border overflow-hidden glow-green">
              <iframe
                title="Standort Aarau, Schweiz"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.0300%2C47.3800%2C8.0700%2C47.4100&layer=mapnik&marker=47.3925%2C8.0514"
                className="w-full h-full min-h-[400px] lg:min-h-[600px] border-0"
                loading="lazy"
                style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
