# Fraction Fun! - Project Overview

An interactive, kid-friendly React application designed to teach fractions through visual models and interactive mini-games.

## 🚀 Key Technologies
- **Frontend:** React 18 (Functional Components, Hooks)
- **Routing:** React Router DOM v7
- **Styling:** Vanilla CSS (CSS Variables, Keyframes, Glassmorphism)
- **Interactions:** SVG, HTML5 Drag and Drop API
- **Deployment:** GitHub Pages (via `gh-pages`)

## 📂 Architecture & Structure
- `src/App.js`: Main entry point and routing logic.
- `src/pages/`:
    - `HomePage.jsx`: Mode selection screen.
    - `PlayPage.jsx`: Dynamic wrapper for interactive modes.
- `src/components/modes/`: Core game logic for 8 interactive modes:
    - `BakeMode.jsx`: Mixing measurements in a bowl.
    - `BattleMode.jsx`: Comparing fraction sizes.
    - `PizzaMode.jsx`: Building pizzas with slices.
    - `WallMode.jsx`: Visualizing fraction breakdowns.
    - ... and others (FreePlay, Journey, Line, Match, VisualEquivalence).
- `src/styles/`: Centralized CSS files for global styles, components, and modes.

## 🛠️ Development Workflow

### Key Commands
- **Start Development Server:** `npm start`
- **Build for Production:** `npm run build`
- **Run Tests:** `npm test`
- **Deploy to GitHub Pages:** `npm run deploy`

### Conventions
- **Component Style:** Functional components using hooks (`useState`, `useEffect`, `useMemo`, `useParams`).
- **Styling:** Preference for Vanilla CSS in external files, with inline styles used primarily for dynamic values (e.g., fractional heights, colors).
- **Navigation:** Routes follow the pattern `/play/:modeId`.
- **UI/UX:** Focus on "kid-friendly" design: rounded fonts (Nunito), vibrant gradients, and bouncy animations.

## 🍎 Educational Goals
The app focuses on overcoming common fraction hurdles:
- **Denominator Confusion:** Visualizing that $1/8 < 1/2$.
- **Equivalence:** Proving $2/4 = 1/2$.
- **Number Sense:** Connecting shapes to number line positions.
