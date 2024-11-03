# Pokémon Card Viewer

Ein webbasierter Viewer für Pokémon-Karten, der die API von [PokeAPI](https://pokeapi.co/) nutzt, um Pokémon-Daten zu laden und anzuzeigen.

## Funktionen

- **Pokémon-Karten-Rendering**: Zeigt eine Liste von Pokémon-Karten mit Bildern und Details.
- **Detail-Overlay**: Öffnet eine detaillierte Ansicht eines ausgewählten Pokémon mit Typ, Basiswerten, Fähigkeiten und Evolutionskette.
- **Filter**: Ermöglicht die Suche nach Pokémon durch die Eingabe von Namen.
- **Unendliches Scrollen**: Lädt automatisch mehr Pokémon, wenn der Benutzer nach unten scrollt.
- **Caching**: Verwendet `localStorage` für Caching und reduziert API-Aufrufe.

## Installation

1. **Projekt klonen**:
  ```bash
  git clone [https://github.com/Marco-Ammann/Pokedex.git]
  ```

2. **In das Projektverzeichnis wechseln**:
  ```bash
  cd repository
  ```

3. **Abhängigkeiten installieren (falls Node.js verwendet wird)**:
  ```bash
  npm install
  ```
# Nutzung

Öffne die `index.html`-Datei in deinem Browser oder starte einen lokalen Server (z. B. mit `Live Server` in VS Code).

## Projektstruktur

- **`colors.js`**: Enthält Funktionen zur Anpassung der Hintergrundfarben basierend auf Pokémon-Typen.
- **`data-fetching.js`**: Beinhaltet Funktionen zum Laden und Verarbeiten von Daten aus der PokeAPI.
- **`navigation.js`**: Stellt Funktionen zur Steuerung der Detailansicht bereit.
- **`render.js`**: Verantwortlich für das Rendern der Pokémon-Karten im DOM.
- **`script.js`**: Initialisiert die App, setzt Event-Listener und behandelt Fehler.
- **`scroll.js`**: Fügt Funktionen für unendliches Scrollen hinzu.
- **`search.js`**: Implementiert die Suchfunktion für Pokémon.
- **`templates.js`**: Generiert dynamische HTML-Templates für Pokémon-Details und -Karten.
- **`utils.js`**: Hilfsfunktionen für API-Aufrufe und Bildverarbeitung.
- **`state.js`**: Enthält den globalen Zustand der App.

## API-Quelle

Die App verwendet die [PokeAPI](https://pokeapi.co/) für den Abruf von Pokémon-Daten.

## Vorschau

*![2_smaller](https://github.com/user-attachments/assets/a3c3420a-99a6-4144-be45-3476d619980f)
*

## Mitwirken

Beiträge sind willkommen! Erstelle einen Pull-Request oder öffne ein Issue, um Ideen oder Fehler zu melden.

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

---

**Viel Spaß beim Nutzen der App und beim Entdecken der Pokémon-Welt!**

> **Hinweis**: Passen Sie den Inhalt an, insbesondere den GitHub-Repository-Link und die Bild-URL für den Screenshot. Viel Erfolg auf GitHub!
