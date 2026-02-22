const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-muted-foreground">
          © {new Date().getFullYear()} iDustBin. Alle Rechte vorbehalten.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/idustbin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://medium.com/@idustbin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            Medium
          </a>
          <a
            href="https://github.com/iDustbin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
