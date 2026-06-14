import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Send } from "lucide-react";

const CONTACT_EMAIL = "spam@idustbin.com";

const TOPICS = [
  "Berufserfahrung im Detail",
  "Projekte",
  "Ausbildung",
  "Arbeitszeugnisse",
] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  topics: string[];
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  topics: [],
  message: "",
};

const INFO_CARDS = [
  { Icon: Mail, label: "Anfrage", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { Icon: MapPin, label: "Standort", value: "Aarau, Schweiz", href: undefined as string | undefined },
  { Icon: Linkedin, label: "LinkedIn", value: "Profil ansehen", href: "https://www.linkedin.com/in/idustbin/" },
];

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (topic: string) => {
    setForm((f) => ({
      ...f,
      topics: f.topics.includes(topic)
        ? f.topics.filter((t) => t !== topic)
        : [...f.topics, topic],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Anfrage CISO-Profil von ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `E-Mail: ${form.email}`,
      `Unternehmen / Rolle: ${form.company || "—"}`,
      `Anfrage betrifft: ${form.topics.length ? form.topics.join(", ") : "—"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          className="mb-12"
        >
          <span className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> request access
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mt-3">
            Kontakt<span className="text-gradient">aufnahme</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-2xl">
            Für Details zu Berufserfahrung, Projekten oder Arbeitszeugnissen genügt eine kurze Anfrage. Ich melde mich persönlich.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {INFO_CARDS.map(({ Icon, label, value, href }) => (
            <div key={label} className="group">
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block p-5 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:glow-green"
                >
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <p className="text-xs font-mono text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm font-mono text-foreground group-hover:text-primary transition-colors">{value}</p>
                </a>
              ) : (
                <div className="p-5 bg-card border border-border rounded-lg">
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <p className="text-xs font-mono text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm font-mono text-foreground">{value}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 bg-card border border-border rounded-lg space-y-5"
        >
          <h3 className="font-mono font-semibold text-foreground text-sm">Anfrage senden</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="Dein Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1.5">E-Mail</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
                placeholder="deine@email.ch"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-mono text-muted-foreground mb-1.5">
              Unternehmen / Rolle <span className="text-muted-foreground/60">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
              placeholder="Firma & deine Rolle"
            />
          </div>

          <fieldset>
            <legend className="block text-xs font-mono text-muted-foreground mb-2">Anfrage betrifft</legend>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => {
                const active = form.topics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-mono border rounded-full transition-colors ${
                      active
                        ? "bg-primary/10 border-primary/40 text-primary"
                        : "bg-secondary border-border text-muted-foreground hover:text-primary hover:border-primary/30"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-1.5">Nachricht</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
              placeholder="Kurz zum Hintergrund deiner Anfrage..."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="submit"
              disabled={submitted}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors glow-green disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitted ? "Mailprogramm geöffnet ✓" : "Anfrage senden"}
            </button>
            <p className="text-xs font-mono text-muted-foreground/80">
              Die Anfrage öffnet dein Mailprogramm — der Versand erfolgt aus deinem Konto. Ich antworte manuell.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
