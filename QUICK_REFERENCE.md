# GymBuddy HQ - Visual Quick Reference

## 🎯 Color Palette

```
Primary Blue     Secondary Green   Accent Orange    Success Green     Warning Amber
#4a9eff         #10b981          #ff7a5c          #10b981           #f59e0b
████████        ████████         ████████         ████████          ████████
Dark: #2e7fdb   Dark: #059669    Dark: #ea5e3e    
Light: #6bb3ff  Light: #34d399   Light: #ffa177
```

## 📐 Spacing Scale

```
xs    sm    md    lg    xl    2xl   3xl
4px   8px   16px  24px  32px  48px  64px
█     ██    ████  ██████  ████████  ████████████  ████████████████
```

## 🔤 Typography Scale

```
Text Sizes:
xs:   12px (0.75rem) — Small labels, captions
sm:   14px (0.875rem) — Secondary text, small UI
base: 16px (1rem) — Body text, form inputs
lg:   18px (1.125rem) — Card titles, subheadings
xl:   20px (1.25rem) — Section headings
2xl:  24px (1.5rem) — Large headings
3xl:  30px (1.875rem) — Main titles
4xl:  36px (2.25rem) — Hero headline

Font Weights:
Normal:     400 — Body text
Medium:     500 — Labels, secondary
Semibold:   600 — Buttons, emphasis
Bold:       700 — Headings
```

## 🎨 Component Usage

### Buttons

**Primary Button**
- Background: #4a9eff
- Color: white
- On hover: Dark blue (#2e7fdb) + lift (translateY -2px)
- Use for: Main CTAs

**Secondary Button**
- Background: #10b981
- Color: white
- On hover: Dark green (#059669) + lift
- Use for: Alternative actions

**Outline Button**
- Background: transparent
- Border: 2px #4a9eff
- Color: #4a9eff
- On hover: Blue background, white text
- Use for: Secondary actions

**Small Button** (--sm)
- Padding: 8px 12px
- Font size: 14px
- Use for: Compact actions

### Cards

- Background: #ffffff (white)
- Border: 1px #e5e7eb
- Border radius: 12px-16px
- Padding: 24px-32px
- Box shadow: subtle (--shadow-sm to --shadow-md)
- On hover: shadow increases, slight lift

### Forms

- Input background: #ffffff
- Border: 1px #e5e7eb
- Border radius: 12px
- Padding: 16px
- Focus: Blue border (#4a9eff) + blue shadow ring
- Font: 16px, inherited family

## 📋 Layout Grid

```
Desktop (1025px+):
[Logo] [Nav Links] [Ask Coach Button]
↓
[Hero Section - centered, max 1200px]
↓
[2-column grid: Form | Results]
↓
[Mobile-responsive at 1024px: stacks to 1 column]

Mobile (640px and below):
[Logo]
[Nav Links stacked]
↓
[Hero - single column]
↓
[Form - full width]
[Results - full width]
```

## 🎯 Feature Checklist Quick View

```
✅ 9 Core Sections
  ✅ Sticky Navigation
  ✅ Hero
  ✅ Workout Builder
  ✅ Calorie Calculator
  ✅ Weekly Split
  ✅ Diet Goals
  ✅ FAQ Accordion
  ✅ Ask the Coach Chat
  ✅ Footer

✅ Accessibility
  ✅ WCAG 2.1 Level AA
  ✅ Keyboard navigation
  ✅ ARIA labels & roles
  ✅ Focus indicators
  ✅ Reduced motion support

✅ Responsive Design
  ✅ Mobile (320px+)
  ✅ Tablet (641px+)
  ✅ Desktop (1025px+)

✅ JavaScript Features
  ✅ Workout generation (60+ exercises)
  ✅ Calorie calculation (Mifflin-St Jeor)
  ✅ Split generation (3 split types)
  ✅ localStorage persistence
  ✅ Form validation
  ✅ Clipboard copy
  ✅ Text export
  ✅ Chat UI (webhook-ready)
```

## 📁 File Organization

```
index.html (369 lines)
├─ <head> 
│  └─ Meta tags, title, CSS link
└─ <body>
   ├─ <nav> - Sticky navigation
   ├─ <div> - Coach chat drawer
   ├─ <section> - Hero (hero)
   ├─ <section> - Workout Builder (workout-builder)
   ├─ <section> - Calorie Calculator (calorie-calculator)
   ├─ <section> - Weekly Split (weekly-split)
   ├─ <section> - Diet Goals (diet-goals)
   ├─ <section> - FAQ (faq)
   ├─ <footer> - Footer
   └─ <script> - Deferred JS

css/styles.css (850+ lines)
├─ :root CSS Variables (30+ color, spacing, typography)
├─ Reset & Base Styles
├─ Typography
├─ Utilities & Grid
├─ Buttons (4 variants)
├─ Navbar
├─ Hero Section
├─ Forms & Validation
├─ Results Display
├─ Workouts
├─ Split Calendar
├─ Diet
├─ FAQ Accordion
├─ Coach Chat Drawer
├─ Footer
└─ @media queries (responsive)

js/app.js (1,058 lines)
├─ StorageManager (localStorage)
├─ WorkoutData (exercise database)
├─ CalorieCalculator (math)
├─ SplitGenerator (templates)
├─ initWorkoutBuilder()
├─ initCalorieCalculator()
├─ initWeeklySplit()
├─ initDietGoals()
├─ initFAQ()
├─ Utility functions
└─ DOMContentLoaded listener

js/coach.js (228 lines)
├─ CoachChat (dummy responses)
├─ initCoachChat()
├─ Message handlers
├─ Webhook template (commented)
└─ DOMContentLoaded listener
```

## 🔗 CSS Variable Reference

### Colors
```
--primary: #4a9eff              --accent: #ff7a5c
--primary-dark: #2e7fdb        --accent-dark: #ea5e3e
--primary-light: #6bb3ff       --accent-light: #ffa177

--secondary: #10b981           --success: #10b981
--secondary-dark: #059669      --warning: #f59e0b
--secondary-light: #34d399     --error: #ef4444

--bg-primary: #fafbfc          --text-primary: #1f2937
--bg-secondary: #f3f4f6        --text-secondary: #6b7280
--surface-primary: #ffffff     --text-tertiary: #9ca3af
--surface-secondary: #f9fafb   --border-color: #e5e7eb
```

### Sizing
```
--container-width: 1200px
--container-padding: 24px (var(--space-lg))
```

### Radius
```
--radius-sm: 6px      --radius-md: 8px
--radius-lg: 12px     --radius-xl: 16px
--radius-full: 9999px
```

### Shadows
```
--shadow-xs: minimal     --shadow-sm: subtle
--shadow-md: medium      --shadow-lg: prominent
--shadow-xl: strong
```

### Transitions
```
--transition-fast: 150ms     --transition-base: 250ms
--transition-slow: 350ms
```

## 📱 Responsive Breakpoints

```
Mobile: 0-640px
│
├─ Single column layouts
├─ Stacked forms
├─ Full-width buttons
├─ Larger touch targets
│
Tablet: 641-1024px
│
├─ Two-column layouts (with fallback)
├─ Side-by-side forms & results
├─ Flexible grids
│
Desktop: 1025px+
│
├─ Two-column grids
├─ Content grid layouts
├─ Max-width container (1200px)
└─ Optimal readability
```

## 🎯 Usage Examples

### Add New Exercise
```javascript
'chest': {
    'full-gym': [
        { 
            name: 'Machine Chest Press', 
            sets: 3, 
            reps: '10-12', 
            rest: '90 sec', 
            alt: 'Barbell Bench' 
        }
    ]
}
```

### Modify Color
```css
:root {
    --primary: #your-blue;
    --secondary: #your-green;
    --accent: #your-orange;
}
/* All components automatically update! */
```

### Add FAQ Item
```javascript
{
    q: 'How do I know if I lifted enough weight?',
    a: 'Your last 1-2 reps should feel challenging but achievable...'
}
```

## 📊 Data Persistence Locations

```
localStorage Keys:
├─ gymbuddy_workouts
│  └─ Array of saved workouts
├─ gymbuddy_calorie_settings
│  └─ User's saved calculator settings
├─ gymbuddy_split_[ID]
│  └─ Individual saved splits
└─ (User browser data)
   └─ Persists until browser data cleared
```

## 🚀 Deployment Checklist

- [ ] Test all features on desktop
- [ ] Test on mobile (Chrome Android, Safari iOS)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify localStorage works
- [ ] Check lighthouse score
- [ ] Optimize images (if any)
- [ ] Minify CSS/JS (optional)
- [ ] Choose hosting platform
- [ ] Deploy project
- [ ] Share link!

---

**Keep this file handy for quick reference during development! 💪**
