# Guitar Companion: Interactive Fretboard Visualizer

An interactive fretboard application for guitar players to visualize and learn scales, arpeggios, and chords. Select a root note and a musical pattern to see it instantly mapped out on the guitar neck, making complex music theory easy to understand.  Please ignore the mispelling of Arpeggio.

![Screenshot of Guitar Companion App](placeholder.png)
*(Note: You can replace `placeholder.png` with a screenshot of your application)*

---

## ✨ Key Features

- **Interactive Fretboard:** A visually appealing and responsive guitar fretboard that displays notes clearly.
- **Root Note Selection:** Easily switch between all 12 chromatic notes as the root for your pattern.
- **Multiple Pattern Types:** Choose to display Scales, Arpeggios, or Chords.
- **Comprehensive Music Theory Library:** Includes a wide variety of common patterns:
    - **Scales:** Major, Minor, Pentatonics, Blues, and all major modes.
    - **Arpeggios:** Major/Minor Triads, 7th arpeggios, and more.
    - **Chords:** Major/Minor Triads, 7th chords, and suspended chords.
- **Root Note Highlighting:** The selected root note is visually distinct from the other notes in the pattern for easy reference.
- **Responsive Design:** Looks great on both desktop and mobile devices.

## 🚀 How to Use

Using the application is simple:

1.  **Select a Root Note:** Use the first dropdown to pick the key you want to play in (e.g., C, G, A#).
2.  **Choose a Display Type:** Use the second dropdown to decide if you want to see a `scale`, `arpeggio`, or `chord`.
3.  **Select a Pattern:** A third dropdown will appear. Use it to choose the specific musical pattern you want to visualize (e.g., Minor Pentatonic, Major 7th).
4.  **Explore:** The fretboard will instantly update to show all the notes of your selected pattern across all strings.

## 🛠️ Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite (for local development)

## 💻 Running Locally

To get a copy of this project up and running on your local machine for development and testing purposes, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/howieh123/GuitarScalesArepeggiosChords.git
    cd GuitarScalesArepeggiosChords.git
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```

This will start the Vite development server, and you can view the application by navigating to `http://localhost:5173` (or whatever port is shown in your terminal) in your web browser. The app will automatically reload if you make any changes to the source files.
