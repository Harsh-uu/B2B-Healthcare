# 🏥 B2B Healthcare Frontend Assignment Checklist

## 🎯 Goal
Build a production-quality healthcare dashboard using:
- React / Next.js + TypeScript
- Firebase Authentication
- Service Worker Notifications
- Clean UI + scalable architecture

---

# 🧱 1. PROJECT SETUP

- [ ] Initialize project (Next.js App Router or Vite + React)
- [ ] Setup TypeScript (strict mode)
- [ ] Install Tailwind CSS
- [ ] Setup folder structure:
- [ ] Setup ESLint + Prettier
- [ ] Setup environment variables

---

# 🎨 2. DESIGN SYSTEM

- [ ] Configure Tailwind theme:
  - Primary: #2563EB
  - Background: #F9FAFB
  - Border: #E5E7EB
  - Text colors

- [ ] Define spacing rules (consistent padding/margin)
- [ ] Define typography (font, sizes, weights)

- [ ] Create reusable UI components:
  - [ ] Button (primary, secondary)
  - [ ] Card
  - [ ] Input
  - [ ] Badge (status-based)
  - [ ] Table
  - [ ] Toggle switch

---

# 🧭 3. GLOBAL LAYOUT

- [ ] Create Sidebar:
  - [ ] Dashboard
  - [ ] Analytics
  - [ ] Patients
  - [ ] Active state styling

- [ ] Create Topbar:
  - [ ] User info
  - [ ] Logout button

- [ ] Create Layout wrapper for protected pages

---

# 🔐 4. AUTHENTICATION

- [ ] Setup Firebase project
- [ ] Enable Email/Password authentication
- [ ] Create auth service

- [ ] Build Login Page:
  - [ ] Email input (validation)
  - [ ] Password input
  - [ ] Show/Hide password toggle
  - [ ] Remember me checkbox (UI only)
  - [ ] Login button with loading state
  - [ ] Error message display

- [ ] Implement login logic
- [ ] Redirect to dashboard on success
- [ ] Handle invalid credentials

---

# 🔒 5. ROUTE PROTECTION

- [ ] Protect all routes except `/login`
- [ ] Redirect unauthenticated users → login
- [ ] Redirect logged-in users away from login

---

# 🏠 6. DASHBOARD PAGE

- [ ] Create KPI Cards:
  - [ ] Total Patients
  - [ ] Active Cases
  - [ ] Critical Alerts

- [ ] Create Recent Patients Table
- [ ] Create Notifications Preview panel

- [ ] Use grid layout
- [ ] Add icons to cards

---

# 📊 7. ANALYTICS PAGE

- [ ] Install chart library (Recharts)

- [ ] Create charts:
  - [ ] Line chart (patient trends)
  - [ ] Bar chart (departments)
  - [ ] Pie chart (status distribution)

- [ ] Add date filter (7d / 30d)
- [ ] Add loading states for charts

---

# 🧑‍⚕️ 8. PATIENT DETAILS PAGE

## Core Features

- [ ] Implement Grid View:
  - [ ] Patient cards
  - [ ] Name, age, condition, status

- [ ] Implement List View:
  - [ ] Table layout
  - [ ] Columns: Name, Age, Status, Last Visit

- [ ] Add toggle (Grid ↔️ List)

---

## High Impact Features

- [ ] Search patients by name
- [ ] Filter by status:
  - [ ] Stable
  - [ ] Moderate
  - [ ] Critical

- [ ] Add pagination OR infinite scroll
- [ ] Add colored status badges

---

# 🔔 9. NOTIFICATIONS (SERVICE WORKER)

- [ ] Setup service worker
- [ ] Request notification permission
- [ ] Implement browser notifications

- [ ] Add button:
  - [ ] "Simulate Critical Alert"

- [ ] Trigger notification on click

---

# ⚙️ 10. STATE MANAGEMENT

- [ ] Setup Zustand (or Context)
- [ ] Manage:
  - [ ] Auth state
  - [ ] UI state (filters, toggles)

- [ ] Optional:
  - [ ] Use React Query for data

---

# 📡 11. DATA HANDLING

- [ ] Create mock patient data
- [ ] Define TypeScript interfaces
- [ ] Separate data layer (services)

---

# 🚀 12. UX & PERFORMANCE

- [ ] Add loading states
- [ ] Add empty states
- [ ] Add error states

- [ ] Use skeleton loaders (optional)

---

# 🎨 13. UI POLISH

- [ ] Consistent spacing
- [ ] Clean alignment
- [ ] Subtle hover effects:
  - [ ] Buttons (slight darken + scale)
  - [ ] Cards (shadow increase)
  - [ ] Table rows (highlight)

- [ ] Responsive design

---

# 🌗 14. OPTIONAL (HIGH IMPACT)

- [ ] Dark mode toggle
OR
- [ ] Role-based UI (Admin / Doctor)
OR
- [ ] Editable patient modal

---

# 🚀 15. DEPLOYMENT

- [ ] Deploy to Vercel / Netlify
- [ ] Test all routes
- [ ] Ensure env variables work

---

# 📄 16. README

- [ ] Project overview
- [ ] Tech stack
- [ ] Features
- [ ] Screenshots
- [ ] Live link
- [ ] Architecture explanation

---

# ✅ FINAL CHECK

- [ ] Login works
- [ ] Routes protected
- [ ] Dashboard looks real
- [ ] Analytics functional
- [ ] Patient page polished
- [ ] Notifications working
- [ ] Clean code structure
- [ ] Deployed successfully

---

# 🧠 SUCCESS CRITERIA

The app should feel like:
"A real healthcare SaaS dashboard used in production"

NOT:
"A basic frontend assignment"