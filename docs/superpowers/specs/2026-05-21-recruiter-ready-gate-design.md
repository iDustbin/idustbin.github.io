# Spec: Recruiter-tauglicher Auftritt mit Zugangsschutz

**Datum:** 2026-05-21
**Status:** Entwurf zur Freigabe
**Kontext:** `idustbin.github.io` — React 18 + Vite SPA, Deployment via GitHub Pages.

---

## 1. Ziel

Den öffentlichen Webauftritt so überarbeiten, dass Dustin Keinert für **CISO / CTO / CIO**-Positionen
in Frage kommt. Geändert werden **nur Inhalte, Wording und die Zugangslogik** — **kein Design-,
Layout- oder Komponenten-Umbau**. Sensible Informationen dürfen nur mit ausdrücklichem Einverständnis
herausgegeben werden.

### Festgelegte Entscheidungen (aus der Abstimmung)

| Thema | Entscheidung |
|---|---|
| Schutzmechanismus | Clientseitiges Passwort-Gate mit echter AES-Verschlüsselung |
| Umfang | Startseite + Portfolio + Erfahrungs-Seite |
| Positionen | Alle 10 Karrierestationen behalten, Wording Richtung Leadership umformulieren |
| Öffentlich | Startseite inkl. der aktuellen Information-Security-Officer-Rolle |
| Geschützt | `/portfolio` und `/experience` vollständig hinter dem Gate |
| Arbeitszeugnisse | Nicht gehostet — nur händischer Versand nach Anfrage |
| Git-Historie | Nur aktueller Stand bereinigt; alte Commit-Links bleiben (akzeptiert) |

---

## 2. Zugangsmodell

```
┌─ ÖFFENTLICH ──────────────────────────────────────────────┐
│  /  (Startseite)                                          │
│  Hero · Skills · Blog/Presse · Zertifikate · Kontakt      │
│  → Positionierung als Information Security Leader         │
│  → keine Telefonnummer, keine privaten Dokumente          │
└───────────────────────────────────────────────────────────┘
            │  Passwort erforderlich
            ▼
┌─ GESCHÜTZT (AES-GCM-verschlüsselt) ───────────────────────┐
│  /portfolio   → Projekte, Detailbeschreibungen            │
│  /experience  → 10 Karrierestationen im Detail, Ausbildung│
└───────────────────────────────────────────────────────────┘
            │  Anfrage + Einverständnis
            ▼
┌─ NUR HÄNDISCH (nirgends gehostet) ────────────────────────┐
│  Arbeitszeugnis-PDFs → manueller E-Mail-Versand           │
└───────────────────────────────────────────────────────────┘
```

**Begründung:** Ein vollständig gesperrter Auftritt wird von Recruitern kaum angefragt. Die
öffentliche Startseite weckt Interesse; Details liegen hinter dem Gate; die sensibelsten Dokumente
(Arbeitszeugnisse) verlassen nie die Kontrolle des Eigentümers.

---

## 3. Technische Architektur des Gates

### 3.1 Verschlüsselung

- **Verfahren:** AES-256-GCM, Schlüsselableitung via PBKDF2-SHA-256.
- **Parameter:** 600.000 Iterationen, 16-Byte Zufalls-Salt, 12-Byte Zufalls-IV.
- **Bibliothek:** keine — ausschliesslich die native `crypto.subtle` (Web Crypto API).
- **Integrität:** Das GCM-Auth-Tag sorgt dafür, dass ein falsches Passwort die Entschlüsselung
  scheitern lässt (Exception) — es wird niemals Teil-Klartext oder „Müll" gerendert.

### 3.2 Datenfluss

1. Besucher öffnet `/portfolio` oder `/experience`.
2. `AccessGate` prüft den Context: entsperrt? → Inhalt rendern. Sonst → Passwort-Eingabe.
3. Passwort absenden → verschlüsselten Blob laden → `crypto.subtle` leitet Schlüssel ab und
   entschlüsselt.
4. Erfolg → entschlüsselte Daten in React-Context (optional `sessionStorage` für die Sitzung) →
   Seiten rendern. Fehler → Fehlermeldung, kein Inhalt.

### 3.3 Neue / geänderte Dateien

| Datei | Zweck |
|---|---|
| `scripts/encrypt-content.mjs` | Node-Skript: verschlüsselt Klartext-JSON mit dem gewählten Passwort |
| `content/gated-source.json` | **Klartext** der geschützten Inhalte — **`.gitignore`d, nie committet** |
| `public/gated-content.enc.json` | **Chiffre-Blob** `{v, salt, iv, iterations, ciphertext}` (base64), committet |
| `src/lib/crypto.ts` | `deriveKey()`, `decryptContent()` — Web-Crypto-Wrapper |
| `src/context/GatedContentContext.tsx` | hält Entsperr-Status + entschlüsselte Daten |
| `src/components/AccessGate.tsx` | Passwort-Bildschirm im bestehenden Terminal-/Mono-Stil |
| `src/components/RequestAccess.tsx` | Anfrage-Formular für Arbeitszeugnisse |
| `src/pages/Portfolio.tsx` | refaktoriert: Daten aus Context statt hartcodiert |
| `src/pages/Experience.tsx` | refaktoriert: Daten aus Context; PDF-Bereich entfernt |
| `src/App.tsx` | Route `/experience` ergänzen; `/portfolio` + `/experience` in `AccessGate` hüllen |
| `.gitignore` | `content/gated-source.json` ergänzen |

**Wichtig:** Die geschützten Strukturdaten (Stationen, Projekte, Ausbildung) sind aktuell als
Klartext-Arrays in `Portfolio.tsx` / `Experience.tsx` hartcodiert. Würden sie so bleiben, stünden
sie unverschlüsselt im JS-Bundle. Daher werden sie nach `content/gated-source.json` ausgelagert,
verschlüsselt und nur als Chiffre ausgeliefert. Die `.tsx`-Dateien werden zu reinen Render-Komponenten.

---

## 4. Arbeitszeugnisse & Kontakt

- Der bisherige `workReferences`-PDF-Bereich in `Experience.tsx` wird **vollständig entfernt** und
  durch einen Hinweis **„Arbeitszeugnisse auf Anfrage"** ersetzt.
- Ein **Anfrage-Formular** (`RequestAccess.tsx`) erfasst Name + E-Mail des Recruiters. Dustin sichtet
  die Anfrage und versendet die Zeugnisse **manuell** — damit erhält niemand sie ohne Einverständnis.
- **Übermittlung des Formulars (zur Bestätigung im Spec-Review):**
  - *Empfohlen:* Form-Dienst (z. B. Web3Forms) — keine E-Mail-Adresse/Telefonnummer im Quelltext
    oder auf der Seite sichtbar. **Erfordert eine einmalige Einrichtung durch Dustin** (kostenloser
    Account, Access-Key). Der Access-Key darf öffentlich im Code stehen (so vom Dienst vorgesehen).
  - *Alternative ohne Einrichtung:* `mailto:`-Formular — öffnet das Mailprogramm des Besuchers und
    legt damit eine E-Mail-Adresse offen.
- Die bestehende `ContactSection` der Startseite wird auf dasselbe Anfrage-Prinzip umgestellt
  (kein offen sichtbares E-Mail/Telefon).

---

## 5. Inhaltliche Überarbeitung (Wording)

### 5.1 Leitprinzip — wahrheitsgemässe Umformulierung

Rollentitel und Zeiträume bleiben **exakt unverändert** (Verifizierbarkeit). Umformuliert werden die
Tätigkeits-Highlights: Betonung von **Verantwortung, Umfang, Geschäftswirkung, Governance und
Security-Bezug**. **Keine erfundenen Titel oder Verantwortlichkeiten** — überzogene Angaben werden
von Recruitern auf Exec-Ebene erkannt und schaden mehr, als sie nützen.

### 5.2 Konkrete Vorschläge (Auszug — Rest wird in der Umsetzung pro Datei zur Freigabe vorgelegt)

**`index.html` — Title & Meta**
- Title: `Dustin Keinert – Information Security Officer (CISM) | Security & IT-Governance Leadership`
- Description: `Information Security Officer mit CISM-Zertifizierung und 10+ Jahren Erfahrung in
  regulierten Branchen. Aufbau und Betrieb von ISMS nach ISO 27001, Security-Governance,
  Risikomanagement und Reporting auf Geschäftsleitungsebene.`
- Keywords Richtung: `Information Security Officer, CISO, CISM, ISMS, ISO 27001, Security Governance,
  Risikomanagement, IT-Security Leadership`

**Hero (`HeroSection.tsx`)**
- Untertitel: `Information Security Officer (CISM) — Security & IT-Governance Leadership`
- Absatz: `Information Security Officer mit CISM-Zertifizierung und über 10 Jahren Erfahrung in
  regulierten Branchen — Healthcare, Finance, Telecom und Energiesektor. Schwerpunkte: Aufbau und
  Betrieb von ISMS nach ISO 27001, Security-Governance, Risikomanagement und Reporting auf
  Geschäftsleitungsebene.`
- CTA „Erfahrung ansehen": Ziel von totem Anker `#experience` → Route `/experience` (Gate).
- Tech-Pills Richtung Governance: `ISMS · ISO 27001 · CISM · Risk Management · Security Governance ·
  Cloud Security`.

**Berufserfahrung — Beispiel-Umformulierungen**
- AEW (ISO-Rolle): `Aufbau & Betrieb des ISMS nach ISO 27001` →
  `Verantwortung für Aufbau und Betrieb des unternehmensweiten ISMS nach ISO 27001`.
- RedTecLab (DevOps Engineer): `CI/CD Pipelines mit Jenkins & Bitbucket` →
  `Etablierung standardisierter, sicherer CI/CD- und Release-Prozesse`.

Die **vollständigen Texte** für alle Abschnitte und alle 10 Stationen werden während der Umsetzung
als zusammenhängender Entwurf vorgelegt und **vor dem Schreiben in den Code freigegeben**.

---

## 6. Bereinigung öffentlicher Daten

- `index.html` JSON-LD: `telephone` entfernen, `email` entfernen/ersetzen. `addressLocality`
  (Aarau) und `addressCountry` bleiben für lokale SEO (vom Nutzer im Spec-Review bestätigen).
- Arbeitszeugnis-PDFs aus dem aktuellen Repo-Stand entfernen (`!archiv/degree/*.pdf`).
- `spam@idustbin.com` aus `ContactSection.tsx` und `index.html` entfernen.
- *Optional, niedrige Priorität:* `TerminalAnimation.tsx` enthält Pfade mit Benutzernamen und einen
  internen LAN-Hostnamen (`idustbin@local.horst.lan`) — kann anonymisiert werden.
- *Hinweis:* Alte Git-Commits behalten die PDFs (per Entscheidung akzeptiert). Eine spätere
  Historie-Bereinigung (`git filter-repo` + Force-Push) bleibt als separater Schritt möglich.

---

## 7. Was unverändert bleibt

Layout, Farbschema, Komponenten-Struktur, Animationen, Tailwind-Theme, Terminal-/Mono-Ästhetik.
`AccessGate` und `RequestAccess` werden im bestehenden Stil gehalten — keine neuen Designmuster.

---

## 8. Ehrliche Sicherheits-Grenzen (unvermeidbar bei GitHub Pages)

1. Der verschlüsselte Blob ist öffentlich abrufbar → **Offline-Brute-Force ist möglich**. Das
   Passwort **muss** eine starke Passphrase sein (Empfehlung: 5+ zufällige Wörter bzw. 20+ Zeichen).
2. Ein **gemeinsames Passwort** für alle Recruiter — keine Sperrung einzelner Personen. Wer es hat,
   kann es weitergeben. Passwortwechsel = neu verschlüsseln + neu deployen.
3. 600.000 PBKDF2-Iterationen verlangsamen Angriffe, machen sie aber nicht unmöglich. Dies ist
   „echte Verschlüsselung + Abschreckung", nicht „unknackbar".
4. **Echte Vertraulichkeit** entsteht nur dort, wo Inhalte gar nicht gehostet werden — deshalb der
   händische Versand der Arbeitszeugnisse.
5. Alte Commit-URLs (`raw.githubusercontent.com/...`) bleiben erreichbar, bis die Git-Historie
   bereinigt wird.

---

## 9. Vom Nutzer benötigte Aktionen

- [ ] Starke Passphrase festlegen und `scripts/encrypt-content.mjs` damit ausführen.
- [ ] Kontaktweg bestätigen (Form-Dienst vs. `mailto:`) — bei Form-Dienst Account + Access-Key.
- [ ] Bestätigen, ob `addressLocality`/`addressCountry` im JSON-LD bleiben dürfen.
- [ ] Finale Wording-Texte vor dem Code-Einbau freigeben.

---

## 10. Offene Punkte für das Spec-Review

1. Kontaktweg: Form-Dienst (empfohlen) oder `mailto:`?
2. Ortsangabe im JSON-LD behalten oder entfernen?
3. `TerminalAnimation`-Anonymisierung gewünscht (ja/nein)?
