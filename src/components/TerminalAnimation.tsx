import { useState, useEffect, useRef } from "react";

const commands = [
  { prompt: "$ ansible-playbook deploy.yml", output: "PLAY [Deploy Infrastructure] ✓" },
  { prompt: "$ kubectl get pods --all-namespaces", output: "All pods running (42/42) ✓" },
  { prompt: "$ terraform apply -auto-approve", output: "Apply complete! Resources: 12 added" },
  { prompt: "$ docker compose up -d", output: "All 8 services started ✓" },
  { prompt: "$ git push origin main", output: "CI/CD pipeline triggered ✓" },
];

const TerminalAnimation = () => {
  const [lines, setLines] = useState<{ text: string; type: "prompt" | "output" }[]>([]);
  const [currentCmd, setCurrentCmd] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cmd = commands[currentCmd];
    if (!cmd) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (currentChar < cmd.prompt.length) {
        timeout = setTimeout(() => setCurrentChar((c) => c + 1), 35 + Math.random() * 30);
      } else {
        timeout = setTimeout(() => setPhase("output"), 300);
      }
    } else if (phase === "output") {
      setLines((prev) => [
        ...prev,
        { text: cmd.prompt, type: "prompt" },
        { text: cmd.output, type: "output" },
      ]);
      setCurrentChar(0);
      timeout = setTimeout(() => setPhase("pause"), 400);
    } else if (phase === "pause") {
      const next = (currentCmd + 1) % commands.length;
      if (next === 0) {
        timeout = setTimeout(() => {
          setLines([]);
          setCurrentCmd(0);
          setPhase("typing");
        }, 2000);
      } else {
        setCurrentCmd(next);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [currentCmd, currentChar, phase]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentChar]);

  const cmd = commands[currentCmd];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Terminal window */}
      <div className="rounded-lg border border-border overflow-hidden glow-green">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/80 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="ml-2 text-xs font-mono text-muted-foreground">idustbin@devops:~</span>
        </div>
        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="bg-background/80 p-4 h-48 overflow-y-auto font-mono text-xs leading-relaxed"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "prompt"
                  ? "text-foreground"
                  : "text-primary ml-2 mb-2"
              }
            >
              {line.type === "prompt" && <span className="text-primary">$ </span>}
              {line.type === "prompt" ? line.text.slice(2) : line.text}
            </div>
          ))}
          {/* Currently typing line */}
          {phase === "typing" && cmd && (
            <div className="text-foreground">
              <span className="text-primary">$ </span>
              {cmd.prompt.slice(2, currentChar)}
              <span className="animate-blink text-primary">▋</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalAnimation;
