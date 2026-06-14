# Spec: Recruiter-tauglicher Auftritt mit Anfrage-Modell

**Datum:** 2026-05-21
**Status:** Entwurf zur Freigabe (Rev. 2 — Passwort-Gate verworfen)
**Kontext:** `idustbin.github.io` — React 18 + Vite SPA, Deployment via GitHub Pages.

---

## 1. Ziel

Den öffentlichen Webauftritt so überarbeiten, dass Dustin Keinert für **CISO-Positionen**
in Frage kommt. Aktuelle Rolle: Information Security Officer mit CISM-Zertifizierung — der CISO
ist die ehrliche und glaubwürdige nächste Stufe. Keine Verwässerung durch CTO/CIO-Framing.

Geändert werden **nur Inhalte, Wording und die Zugangslogik** — **kein Design-, Layout- oder
Komponenten-Umbau**. Sensible Informationen liegen **gar nicht erst auf der Seite**: Recruiter
stellen eine E-Mail-Anfrage, Dustin entscheidet pro Anfrage individuell und versendet manuell.

### Festgelegte Entscheidungen

| Thema | Entscheidung |
|---|---|
| Schutzmechanismus | **Kein Passwort-Gate.** Detail-Material liegt nicht auf der Seite — Anfrage per E-Mail. |
| Umfang | Startseite recruiter-tauglich, `/portfolio` und `/experience` als Teaser-Seiten |
| Positionen | Alle 10 Karrierestationen behalten, Wording Richtung CISO/Leadership umformulieren |
| Öffentlich | Startseite inkl. aktueller Information-Security-Officer-Rolle, Skills, Zertifikate, Blog/Presse |
| Auf Anfrage | Detail-Berufserfahrung, Projekte, Ausbildung, Arbeitszeugnisse — manueller Versand nach Sichtung |
| Anfrage-Weg | `mailto:`-Formular — öffnet das Mailprogramm des Besuchers, keine Drittpartei |
| Git-Historie | Nur aktueller Stand bereinigt; alte Commit-Links bleiben (akzeptiert) |

---

## 2. Zugangsmodell

```
┌─ ÖFFENTLICH ──────────────────────────────────────────────┐
│  /  (Startseite)                                          │
│    Hero · Skills · Blog/Presse · Zertifikate · Anfrage    │
│  /portfolio  → Teaser + „Details auf Anfrage"             │
│  /experience → Teaser + „Details auf Anfrage"             │
│  → CISO-Positionierung, keine Telefonnummer, keine PDFs   │
└───────────────────────────────────────────────────────────┘
            │  Recruiter sendet E-Mail-Anfrage
            ▼
┌─ MANUELL (nicht auf der Seite) ───────────────────────────┐
│  Dustin sichtet die Anfrage und entscheidet pro Fall:     │
│   – Detail-Berufserfahrung & Projekte                     │
│   – Ausbildung                                            │
│   – Arbeitszeugnis-PDFs                                   │
│  Versand per E-Mail nach Einverständnis.                  │
└───────────────────────────────────────────────────────────┘
```

**Begründung:** Was nicht auf der Seite liegt, kann nicht ohne Einverständnis abfließen. Das
erfüllt die Anforderung „niemand erhält Informationen ohne mein Einverständnis" tatsächlich —
ohne die strukturellen Kompromisse eines clientseitigen Passwort-Gates (öffentlicher Chiffre-Blob,
Brute-Force-Risiko, gemeinsames Passwort, keine pro-Person-Sperre).

---

## 3. Anfrage-Mechanismus

### 3.1 Funktionsweise

Ein `RequestAccess`-Formular auf der Startseite und auf den Teaser-Seiten erfasst:

- **Name** des Anfragenden
- **E-Mail** des Anfragenden
- **Unternehmen / Rolle** (optional)
- **Was gewünscht wird** (Multi-Select oder Freitext): Berufserfahrung-Detail, Projekt-Details,
  Ausbildung, Arbeitszeugnisse
- **Nachricht / Kontext**

Beim Absenden wird ein `mailto:`-Link konstruiert: `mailto:<dustin>?subject=…&body=<vorausgefüllt>`.
Das Mailprogramm des Besuchers öffnet sich mit vorbereiteter Mail; der Versand erfolgt aus seinem
Konto. Dustin erhält die Anfrage, sichtet und antwortet manuell.

### 3.2 Vorteile dieses Ansatzes

- **Echte Kontrolle:** Dustin entscheidet pro Anfrage und versendet nur, was er versenden möchte.
- **Keine Drittpartei:** Kein Form-Dienst, kein Tracking, keine Datenverarbeitung außerhalb.
- **Kein Geheimnis im Code:** Keine Passwörter, Keys oder Chiffrate, die kompromittiert werden könnten.
- **Null Einrichtung:** Funktioniert sofort — kein Account, kein Key, kein Deploy-Zyklus für Rotation.

### 3.3 Trade-off

Das `mailto:`-Schema legt die Ziel-E-Mail-Adresse im HTML offen. Das ist akzeptabel, **wenn die
Adresse dafür gedacht ist**. Empfehlung: dedizierte Adresse für eingehende Recruiter-Anfragen,
z. B. `kontakt@idustbin.com` oder `careers@idustbin.com` (im Spec-Review vom Nutzer zu bestätigen).
Spam-Filter / Aliase auf eigener Domain lassen sich jederzeit rotieren, ohne den Code zu ändern.

### 3.4 Geänderte Dateien

| Datei | Änderung |
|---|---|
| `src/components/RequestAccess.tsx` | **neu** — Anfrage-Formular, baut `mailto:`-Link mit Pre-Fill |
| `src/pages/Portfolio.tsx` | Detail-Arrays (`projects`, `education`) entfernt → Teaser + `RequestAccess` |
| `src/pages/Experience.tsx` | Detail-Array entfernt, `workReferences`-PDF-Bereich entfernt → Teaser + `RequestAccess` |
| `src/App.tsx` | Route `/experience` ergänzen; Routen bleiben öffentlich |
| `src/components/ContactSection.tsx` | E-Mail/Map durch `RequestAccess`-Formular ersetzen |
| `src/components/HeroSection.tsx` | Toter Anker `#experience` → Route `/experience` |

Kein neuer Crypto-Code, kein Encrypt-Skript, kein Gate-Wrapper, kein Context für entschlüsselte Daten.

---

## 4. Inhaltliche Überarbeitung (Wording)

### 4.1 Leitprinzip — wahrheitsgemässe Umformulierung

Rollentitel und Zeiträume bleiben **exakt unverändert** (Verifizierbarkeit). Umformuliert werden
Tätigkeits-Highlights mit Betonung von **Verantwortung, Umfang, Geschäftswirkung, Governance und
Security-Bezug**. **Keine erfundenen Titel oder Verantwortlichkeiten.**

### 4.2 Konkrete Vorschläge (Auszug — Rest wird vor Code-Einbau zur Freigabe vorgelegt)

**`index.html` — Title & Meta**
- Title: `Dustin Keinert – Information Security Officer (CISM) | CISO-Track`
- Description: `Information Security Officer mit CISM-Zertifizierung und 10+ Jahren Erfahrung in
  regulierten Branchen — Healthcare, Finance, Telecom, Energiesektor. Aufbau und Betrieb von ISMS
  nach ISO 27001, Security-Governance, Risikomanagement, Reporting auf Geschäftsleitungsebene.`
- Keywords Richtung: `Information Security Officer, CISO, CISM, ISMS, ISO 27001, Security Governance,
  Risikomanagement, IT-Security Leadership, Schweiz`

**Hero (`HeroSection.tsx`)**
- Untertitel: `Information Security Officer (CISM) — auf dem Weg zum CISO`
- Absatz: `Information Security Officer mit CISM-Zertifizierung und über 10 Jahren Erfahrung in
  regulierten Branchen — Healthcare, Finance, Telecom und Energiesektor. Schwerpunkte: Aufbau und
  Betrieb von ISMS nach ISO 27001, Security-Governance, Risikomanagement und Reporting auf
  Geschäftsleitungsebene.`
- CTA „Erfahrung ansehen" → Route `/experience` (Teaser-Seite mit Anfrage-Möglichkeit).
- Tech-Pills Richtung Governance: `ISMS · ISO 27001 · CISM · Risk Management · Security Governance ·
  Cloud Security`.

**Teaser-Texte für gesperrte Seiten**
- `/experience`: `10+ Jahre Information Security & Engineering in Healthcare, Finance, Telecom und
  Energiesektor. Detaillierte Stationen, Verantwortungen und Ergebnisse auf Anfrage.`
- `/portfolio`: `Ausgewählte Projekte aus ISMS-Aufbau, ISO-27001-Zertifizierung und Security-
  Governance. Projekt-Details und Referenzen auf Anfrage.`

**Berufserfahrung — Beispiel-Umformulierungen** (für die Detail-Texte, die Dustin manuell verschickt)
- AEW (ISO-Rolle): `Aufbau & Betrieb des ISMS nach ISO 27001` →
  `Verantwortung für Aufbau und Betrieb des unternehmensweiten ISMS nach ISO 27001`.
- RedTecLab (DevOps Engineer): `CI/CD Pipelines mit Jenkins & Bitbucket` →
  `Etablierung standardisierter, sicherer CI/CD- und Release-Prozesse`.

Vollständige Texte für alle Abschnitte und alle 10 Stationen werden als zusammenhängender Entwurf
vorgelegt und **vor dem Schreiben in den Code freigegeben**.

---

## 5. Bereinigung öffentlicher Daten

- `index.html` JSON-LD: `telephone` entfernen, `email` durch dedizierte Anfrage-Adresse ersetzen.
  `addressLocality` (Aarau) und `addressCountry` bleiben für lokale SEO (im Review zu bestätigen).
- Arbeitszeugnis-PDFs aus dem aktuellen Repo-Stand entfernen (`!archiv/degree/*.pdf`).
- `spam@idustbin.com` aus `ContactSection.tsx` und `index.html` entfernen.
- *Optional:* `TerminalAnimation.tsx` enthält Pfade mit Benutzernamen und einen internen LAN-
  Hostnamen (`idustbin@local.horst.lan`) — auf Wunsch anonymisieren.
- *Hinweis:* Alte Git-Commits behalten die PDFs (per Entscheidung akzeptiert). Spätere Historie-
  Bereinigung (`git filter-repo` + Force-Push) bleibt als separater Schritt möglich.

---

## 6. Was unverändert bleibt

Layout, Farbschema, Komponenten-Struktur, Animationen, Tailwind-Theme, Terminal-/Mono-Ästhetik.
`RequestAccess` und die Teaser-Seiten werden im bestehenden Stil gehalten — keine neuen Designmuster.

---

## 7. Was diese Lösung leistet — und was nicht

**Leistet:**
- „Niemand erhält Informationen ohne mein Einverständnis" — wird **tatsächlich** erfüllt: Details
  sind nicht auf der Seite, der Versand ist immer eine manuelle Entscheidung von Dustin.
- Recruiter sehen das CISO-Positioning, Skills, Zertifikate und Pressepräsenz und können qualifiziert
  anfragen.
- Keine Crypto-Komplexität, kein Brute-Force-Risiko, keine Schlüsselverwaltung.

**Leistet nicht (bewusst):**
- Schutz der Inhalte, die **bewusst öffentlich bleiben** (Skills, Zertifikate, Blog, Presse, aktuelle
  Rolle) — dies ist Recruiter-Marketing und soll öffentlich sein.
- Schutz der **alten Git-Commits** mit den PDFs (`raw.githubusercontent.com/...@<commit>/degree/...`)
  — diese bleiben erreichbar, bis die Git-Historie bereinigt wird.

---

## 8. Vom Nutzer benötigte Aktionen

- [ ] Anfrage-E-Mail-Adresse bestätigen (Vorschlag: `kontakt@idustbin.com`).
- [ ] Bestätigen, ob `addressLocality`/`addressCountry` im JSON-LD bleiben dürfen.
- [ ] Entscheiden, ob `TerminalAnimation.tsx` anonymisiert werden soll.
- [ ] Finale Wording-Texte vor dem Code-Einbau freigeben.
- *Empfohlen separat:* SPF/DKIM/DMARC für `idustbin.com` prüfen — wer als CISO eine eigene Domain
  in der Signatur trägt, sollte sie sauber konfiguriert haben.

---

## 9. Offene Punkte für das Spec-Review

1. Anfrage-E-Mail-Adresse: `kontakt@idustbin.com`, `careers@idustbin.com`, oder andere?
2. Ortsangabe im JSON-LD behalten oder entfernen?
3. `TerminalAnimation`-Anonymisierung gewünscht (ja/nein)?
