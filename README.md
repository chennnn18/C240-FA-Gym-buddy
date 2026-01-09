# 💪 GymBuddy HQ

**Your Personal Gym Coach — Plan workouts, calculate calories, and build your perfect weekly split.**

A clean, beginner-friendly web application for fitness planning with an intuitive interface, smart recommendations, and local data persistence.

---

## 🎯 Features

### 🏋️ Workout Builder
- **Customizable workouts** based on:
  - Training goal (strength, muscle gain, fat loss, fitness)
  - Muscle group (chest, back, legs, shoulders, arms, core)
  - Experience level (beginner, intermediate)
  - Available equipment (full gym, dumbbells, bodyweight)
- **Complete workout details**: warm-up, exercise instructions, sets × reps, rest times, form cues, alternatives
- **Save & manage** workouts locally
- **Copy to clipboard** for easy sharing

### 🔢 Calorie Calculator
- **Mifflin-St Jeor equation** for accurate TDEE calculation
- **Unit toggle** (metric ↔ imperial)
- **Smart recommendations** for:
  - Maintenance, fat loss, weight gain, muscle building
  - Daily protein intake ranges
  - Hydration guidelines
- **Safety safeguards** (no extreme deficits/surpluses)
- **Save settings** for quick recalculation

### 📅 Weekly Split Planner
- **Auto-generate splits** for 2-6 days per week
- **Smart split types**:
  - Full Body
  - Upper/Lower
  - Push/Pull/Legs
  - Custom options
- **Intelligent scheduling** (avoids same muscle groups back-to-back for beginners)
- **Export as text** for easy sharing
- **Save multiple splits** locally

### 🍽️ Diet Goals
- **Tailored nutrition guidance** by goal:
  - 📈 Weight Gain
  - 💪 Muscle Building
  - ⚡ Fat Loss
- **Plate method** meal templates
- **Protein & snack options** for each goal
- **Pre/post-workout timing** recommendations

### ❓ FAQ Accordion
- **Searchable Q&A** organized by category:
  - Workout questions
  - Nutrition & diet tips
  - Recovery & sleep basics
- **Fully accessible** keyboard navigation and ARIA attributes
- **Smooth animations** with reduced-motion support

### 🤖 Ask the Coach
- **AI-powered chat assistant** (placeholder with dummy responses)
- **Floating drawer UI** for easy access
- **Integration-ready** for external chatbots (n8n, Flowise, custom APIs)
- See `js/coach.js` for webhook integration template

### 💾 Data Persistence
- All data saved to **localStorage**:
  - Workouts
  - Calculator settings
  - Weekly splits
- No account needed, no data sent anywhere

---

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#4a9eff` — Trust + Energy
- **Secondary Green**: `#10b981` — Health
- **Accent Orange**: `#ff7a5c` — CTA Energy
- **Neutrals**: Near-white backgrounds, white cards, dark slate text
- **Accessibility**: WCAG AA compliant contrast ratios

### Responsive Design
- Mobile-first approach
- Optimized for phones, tablets, and desktops
- Flexible grid layouts
- Touch-friendly buttons (min 44px)

### Accessibility Features
- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators
- `prefers-reduced-motion` support
- High contrast text
- Readable font sizes

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Local Development

#### Option 1: Live Server (Recommended)
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Opens at `http://localhost:5500` (or configured port)

#### Option 2: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

#### Option 3: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run in project directory
http-server

# Then visit: http://localhost:8080
```

---

## 📁 Project Structure

```
GymBuddy HQ/
├── index.html              # Main HTML5 boilerplate
├── css/
│   └── styles.css         # Complete design system (CSS variables, components)
├── js/
│   ├── app.js             # Main app logic (modular functions)
│   └── coach.js           # Chat assistant UI + webhook template
├── .gitignore             # Git ignore rules
├── .vscode/
│   └── settings.json      # Live Server + prettier config
└── README.md              # This file
```

---

## 💻 Code Architecture

### Modular Design

#### `StorageManager`
Handles all localStorage operations:
- `saveWorkout()`, `getWorkouts()`, `deleteWorkout()`
- `saveCalorieSettings()`, `getCalorieSettings()`
- `saveSplit()`, `getSplit()`

#### `WorkoutData`
Expandable exercise database and form cues:
- Organized by muscle group
- Equipment variations (full gym, dumbbells, bodyweight)
- Form tips per muscle group

#### `CalorieCalculator`
TDEE & nutrition calculations:
- `calculateBMR()` — Mifflin-St Jeor equation
- `calculateTDEE()` — Activity-based multipliers
- `calculateTargetCalories()` — Goal-based adjustments
- Unit conversions (kg ↔ lb, cm ↔ in)

#### `SplitGenerator`
Weekly schedule generation:
- Pre-built templates for common splits
- Intelligent day distribution
- Text export functionality

#### UI Functions
- `initWorkoutBuilder()` — Workout form + results
- `initCalorieCalculator()` — Calculator form + nutrition targets
- `initWeeklySplit()` — Split planner + calendar
- `initDietGoals()` — Goal selector + diet guides
- `initFAQ()` — Dynamic accordion
- `initCoachChat()` — Chat drawer UI

---

## 🔧 Customization & Expansion

### Add New Exercises
Edit `WorkoutData.exercises` in `js/app.js`:

```javascript
'chest': {
    'full-gym': [
        { name: 'Your Exercise', sets: 3, reps: '8-10', rest: '90 sec', alt: 'Alternative' },
        // ...
    ]
}
```

### Add New Diet Tips
Modify `dietTips` in `initDietGoals()`:

```javascript
const dietTips = {
    'your-goal': {
        title: '📍 Your Goal Guide',
        mealItems: [...],
        proteinOptions: [...],
        snacks: [...],
        timing: {...}
    }
}
```

### Add More FAQ Items
Edit `faqData` in `initFAQ()`:

```javascript
const faqData = [
    {
        category: 'Your Category',
        items: [
            { q: 'Question?', a: 'Answer.' },
            // ...
        ]
    }
]
```

### Connect External Chatbot
See webhook template in `js/coach.js`:

```javascript
// 1. Replace getDummyResponse() call with:
const response = await sendMessageToCoach(userMessage);

// 2. Implement webhook request (see template in coach.js)

// 3. Test with your API (n8n, Flowise, etc.)
```

---

## 🌐 Deployment

### Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Auto-deploy on push

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Auto-deploy

### GitHub Pages
```bash
git add .
git commit -m "Initial commit: GymBuddy HQ"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Enable Pages in Settings → Pages → Source: main
```

---

## 📊 Performance

- **Vanilla JS only** (no frameworks)
- **Deferred scripts** for faster page load
- **CSS Variables** for efficient styling
- **Event delegation** for dynamic elements
- **localStorage** instead of server calls
- Minimal DOM reflows
- Image lazy-loading ready

**Lighthouse Score Goal**: 90+

---

## ♿ Accessibility Compliance

- ✅ WCAG 2.1 Level AA
- ✅ Semantic HTML5
- ✅ ARIA landmarks & labels
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus indicators (3px outline)
- ✅ Color contrast 4.5:1 (AA)
- ✅ Reduced motion support
- ✅ Screen reader tested

---

## 🔒 Data Privacy

- **No data sent anywhere** — all storage is local
- Uses browser's `localStorage` API
- Data persists across sessions (unless browser data cleared)
- No analytics, no tracking, no ads
- Safe for personal use

---

## 🐛 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## ⚠️ Disclaimer

GymBuddy HQ provides **general fitness and nutrition information for educational purposes only**. 

Always consult with:
- Qualified healthcare professionals
- Registered dietitians
- Certified fitness trainers

Especially before starting new exercise programs or making significant dietary changes if you have pre-existing health conditions.

---

## 📝 License

Open source. Feel free to use, modify, and redistribute.

---

## 🤝 Contributing

Found a bug? Want to add a feature? Ideas are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🚀 Future Enhancements

- [ ] User accounts (Firebase/Supabase)
- [ ] Exercise video library integration
- [ ] Social sharing (completed workouts, splits)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered workout personalization
- [ ] Integration with wearables (Apple Watch, Fitbit)
- [ ] Offline mode (Service Workers)
- [ ] Dark mode toggle
- [ ] Multi-language support

---

## 📞 Support

Questions? Feedback? Found an issue?

- Check the FAQ section in-app
- Review code comments in `js/app.js` and `js/coach.js`
- Test with different browsers

---

## 🎓 Learning Resources

Inside the code, you'll find extensive comments explaining:
- Modular function organization
- localStorage API usage
- Event delegation patterns
- Accessibility implementations
- CSS variable systems
- Progressive enhancement

Perfect for beginners learning vanilla JavaScript!

---

## 💪 Stay Consistent

**Remember:** The best workout is the one you'll actually do. The best diet is the one you'll stick to.

GymBuddy HQ is here to help you plan, track, and stay motivated.

**Now go lift! 🏋️**

---

*Made with ❤️ for beginners, busy students, and fitness enthusiasts everywhere.*
