# 🚀 Quick Start Guide for GymBuddy HQ

## Option 1: Live Server (Recommended)
1. Install "Live Server" extension in VS Code (by Ritwick Dey)
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically at `http://localhost:5500`

## Option 2: Python HTTP Server
```bash
cd c:\Users\yiche\Documents\C240\C240-FA-vibe-coding
python -m http.server 8000
```
Then visit: `http://localhost:8000`

## Option 3: PowerShell HTTP Server (Windows)
```powershell
cd 'c:\Users\yiche\Documents\C240\C240-FA-vibe-coding'
python -m http.server 8000
```

## Project Ready!

✅ All files created:
- index.html — HTML5 boilerplate with all sections
- css/styles.css — Complete design system with variables
- js/app.js — Main app logic (modular functions)
- js/coach.js — Coach chat UI + webhook template
- .vscode/settings.json — Live Server config
- .gitignore — Git ignore rules
- README.md — Full documentation

✅ Git initialized with first commit

## Features Ready to Use

1. **Workout Builder** — Generate custom workouts
2. **Calorie Calculator** — TDEE with Mifflin-St Jeor
3. **Weekly Split Planner** — Auto-generate schedules
4. **Diet Goals** — Nutrition guidance by goal
5. **FAQ Accordion** — Searchable Q&A
6. **Ask the Coach** — Chat assistant (dummy + webhook ready)
7. **localStorage** — All data persists locally

## Customization Points

- Add exercises in `WorkoutData.exercises` (js/app.js)
- Add diet tips in `dietTips` object (js/app.js)
- Add FAQ items in `faqData` array (js/app.js)
- Connect external chatbot in `js/coach.js` (see webhook template)

## Documentation

See README.md for:
- Feature details
- Accessibility compliance
- Deployment options
- Customization guide
- API integration template
- Performance optimization tips

---

**Ready to go! 💪**
