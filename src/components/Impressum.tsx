import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ImpressumProps {
  trigger: React.ReactNode;
}

const Impressum = ({ trigger }: ImpressumProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-card border-border font-mono text-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Impressum</DialogTitle>
            <DialogDescription className="sr-only">Impressum und Kontaktdaten</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-muted-foreground text-xs leading-relaxed">
            <div>
              <p className="text-foreground font-semibold mb-1">Angaben gemäss Art. 3 UWG / § 5 TMG</p>
              <p>Dustin Keinert</p>
              <p>Aarau, Schweiz</p>
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1">Kontakt</p>
              <p>E-Mail: spam@idustbin.com</p>
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1">Haftungsausschluss</p>
              <p>
                Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt. Der Anbieter übernimmt
                jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte.
              </p>
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1">Urheberrecht</p>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Impressum;
