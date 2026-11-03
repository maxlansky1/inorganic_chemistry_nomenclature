# 🧪 Inorganic Compound Nomenclature

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)](https://maxlansky1.github.io/inorganic_chemistry_nomenclature/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Stack](https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-blue)
![Offline](https://img.shields.io/badge/Works-100%25%20Offline-8A2BE2)

An educational **HTML/CSS/JS** app for practicing **IUPAC nomenclature** of **inorganic** species.
It includes an **interactive quiz**, **flashcards**, **performance analysis**, a **light/dark theme**, **category** and **difficulty** selection, and **game modes** (Formula → Name, Name → Formula, and Mixed).
It runs **100% in the browser** – no external dependencies.

**🔗 Demo:** https://maxlansky1.github.io/inorganic_chemistry_nomenclature/

---

## 📌 Table of Contents

- [Features](#features)
- [How to use](#how-to-use)
- [Run locally](#run-locally)
- [How it works](#how-it-works)
- [Exporting results](#exporting-results)
- [Appearance and accessibility](#appearance-and-accessibility)
- [Data structure (question bank)](#data-structure-question-bank)
- [Adding/editing content](#addingediting-content)
- [Publishing to GitHub Pages](#publishing-to-github-pages)
- [Compatibility](#compatibility)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## ✨ Features

- **Interactive Quiz**
  - Categories: **cations, anions, salts, acids, bases, oxides**
  - Difficulties: **easy, medium, hard**
  - Modes: **Formula → Name**, **Name → Formula**, **Mixed**
  - Score, **percentage correct**, **streak**, and **progress bar**
  - **Explanations** after each question and a **“Next Question”** button
  - **Export results** (CSV spreadsheet)
- **Flashcards** with flip (front ↔ back) and previous/next navigation
- **Performance analysis** by category/difficulty + a focused **Reinforcement Quiz**
- **Light/dark theme** and **responsive layout**
- Works **offline** – just open `index.html`

---

## 🚀 How to use

1. Open the **[online demo](https://maxlansky1.github.io/inorganic_chemistry_nomenclature/)** or open `index.html` locally.
2. In the **Interactive Quiz** tab, select **categories**, **difficulties**, and **game mode**.
3. Click **🚀 Start Quiz** and answer the questions.
4. Read the **explanation**, advance with **Next Question**, and follow your performance in the stats bar.
5. Explore **Flashcards** and the **Tables** (rules, cations, anions, acids, bases, oxides, salts).

---

## 🏠 Run locally

- **Quick option:** double-click `index.html`.
- **Local server (optional)** — helps with routes and caching in some browsers:

```bash
# Python 3
python -m http.server 8000
# Then open: http://localhost:8000
```

---

## 🧠 How it works

The app is a static **Single-Page App**:

- **Tabs** switch content sections (quiz, flashcards, analysis, rules, and tables).
- The **quiz** is generated from a JavaScript database with standardized items (see the next section).
- The **mode** defines the direction of the challenge:
  - *Formula → Name*: shows the formula and asks for the name.
  - *Name → Formula*: shows the name and asks for the formula.
  - *Mixed*: switches randomly.
- **Difficulties** and **categories** filter the question set.
- **Analysis** uses the metadata (type, difficulty, tags) to highlight strengths/weaknesses and enables a focused **Reinforcement Quiz**.

---

## 📤 Exporting results

Click **📊 Export** to download a CSV file with:
- Date/time
- Total score
- Percentage correct
- Maximum streak
- Summary by category/difficulty

> Note: the file is downloaded locally; no data is sent to any server.

---

## 🎨 Appearance and accessibility

- **Light/dark theme** (🌙/☀️ button at the top).
- **Responsive layout** (desktop, tablet, and mobile).
- **Typography** that is legible with high contrast.
- **Keyboard**: controls are native form/button elements, so they are navigable with `Tab` and activated with `Enter`/`Space`.

---

## 🗂️ Data structure (question bank)

Each item in the database follows the structure below (real example):

```js
{
  formula: "Fe<sup>2+</sup>",         // Formula (supports <sup>/<sub> for indices/exponents)
  name: "Iron(II) cation",            // Displayed name
  type: "cation",                     // cation | anion | salt | acid | base | oxide
  difficulty: "medio",                // facil | medio | dificil
  tags: ["transicao", "carga_variavel", "ferro"] // free metadata for analysis
}
```

**Accepted types (`type`):** `cation`, `anion`, `salt`, `acid`, `base`, `oxide`.
**Difficulties:** `facil`, `medio`, `dificil`.
**Note:** the **formula** may use HTML (`<sup>`, `<sub>`) for better chemical readability (e.g., `SO<sub>4</sub><sup>2-</sup>`).

---

## ✍️ Adding/editing content

1. Open the `data.js` file.
2. Locate the `const compounds = [ ... ]` array.
3. **Add** new objects following the pattern above.
4. **Tips:**
   - Use **tags** to make analysis easier (e.g., `"haleto"`, `"oxianion"`, `"transicao"`).
   - Keep **types** and **difficulties** consistent.
   - Prefer **IUPAC names**; historical variants may be included in parentheses when relevant.

> The **reference tables** (rules, cations, anions, acids, bases, oxides, salts) live in dedicated HTML sections inside `index.html`.
> Update them as needed to keep the supporting material aligned with the question bank.

---

## 🌐 Publishing to GitHub Pages

1. Push the repository with `index.html` at the root.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch** and select the **gh-pages** branch with the **/** (root) folder.
4. Save. The link will be shown (e.g., `https://<your-user>.github.io/<your-repo>/`).

This repository also includes a GitHub Actions workflow that publishes the site to the `gh-pages` branch on every push to `main`.

---

## 🧭 Compatibility

- Modern browsers (Chromium, Firefox, Safari, Edge).
- No external dependencies, no build step – **static files only**.

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the project.
2. Create a branch: `git checkout -b feat/my-improvement`.
3. Commit: `git commit -m "feat: describe your improvement"`.
4. Push: `git push origin feat/my-improvement`.
5. Open a **Pull Request** explaining what changed and why.

**Suggested standards:**
- Clear code, commented when necessary.
- Prefer HTML semantics and consistent styles.
- Keep IUPAC names and examples consistent across the tables.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Credits

Development and content:

**Federal Rural University of Rio de Janeiro**
**Institute of Chemistry, Department of Fundamental Chemistry**
**Prof. Henrique C. S. Junior**
