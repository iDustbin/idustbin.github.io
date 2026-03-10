import { useState, useEffect } from "react";
import { Plus, Minus, Eye } from "lucide-react";

const FONT_STEPS = [87.5, 100, 112.5, 125, 150];
const DEFAULT_STEP = 1; // 100%

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [fontStep, setFontStep] = useState(DEFAULT_STEP);

  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_STEPS[fontStep]}%`;
  }, [fontStep]);

  const increase = () => setFontStep((s) => Math.min(s + 1, FONT_STEPS.length - 1));
  const decrease = () => setFontStep((s) => Math.max(s - 1, 0));
  const reset = () => setFontStep(DEFAULT_STEP);

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-lg animate-in fade-in slide-in-from-bottom-2"
          role="toolbar"
          aria-label="Barrierefreiheit"
        >
          {/* Font size */}
          <div className="flex items-center gap-2">
            <button
              onClick={decrease}
              disabled={fontStep === 0}
              className="rounded-lg bg-secondary p-2 text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Schrift verkleinern"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={reset}
              className="min-w-[3rem] rounded-lg bg-secondary px-2 py-1 text-center text-xs font-mono text-foreground hover:bg-muted transition-colors"
              aria-label="Schriftgrösse zurücksetzen"
            >
              {FONT_STEPS[fontStep]}%
            </button>
            <button
              onClick={increase}
              disabled={fontStep === FONT_STEPS.length - 1}
              className="rounded-lg bg-secondary p-2 text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Schrift vergrössern"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-border bg-card p-3 text-primary shadow-lg hover:bg-secondary transition-colors"
        aria-label="Barrierefreiheit öffnen"
      >
        <Eye size={20} />
      </button>
    </div>
  );
};

export default AccessibilityWidget;
