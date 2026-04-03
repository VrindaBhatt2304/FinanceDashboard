# Finance Dashboard

A modern React-based financial management dashboard with dark/light mode, role-based access, and transaction tracking.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm 8+
- Modern browser

### Installation
```bash
# Clone repository
git clone <repository-url>
cd finance-dashboard

npm install

npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Overview of Approach

**Architecture**: Component-based React app with custom hooks(eg: useFinance) for logic
- **useFinance Hook**: Manages all transaction operations, filtering, and statistics
- **Modular Components**: Separate UI components for different features
- **State Management**: React hooks (useState, useMemo) with localStorage persistence
- **Responsive Design**: Made with Tailwind CSS
- **Performance**: Optimized with useMemo for expensive calculations

**Data Flow**:
1. User interactions → Component events
2. Events → useFinance hook methods
3. Hook updates → localStorage + state changes
4. State changes → UI re-renders with new data

## ✨ Features Explanation

### Core Features
- **Transaction CRUD**: Add, edit, delete financial transactions with form validation
- **Role-Based Access**: Admin (full CRUD) vs Viewer (read-only) permissions
- **Real-Time Stats**: Live calculation of balance, income, and expenses
- **Advanced Filtering**: Filter by type (income/expense), category, and search queries
- **Data Persistence**: Automatic localStorage saving with instant sync

### User Interface
- **Dark/Light Mode**: Complete theme system with professional slate colors
- **Responsive Layout**: Mobile hamburger menu, adaptive grid layouts
- **Interactive Charts**: Balance trend (line chart) and spending breakdown (pie chart)
- **Modern Design**: Clean UI with Tailwind CSS and Lucide React icons

### Technical Features
- **Performance Optimized**: useMemo prevents unnecessary recalculations
- **Type Safety**: Consistent data structures and validation
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Handling**: Graceful error states and user feedback
- **Mobile Ready**: Touch-friendly interactions and responsive design

---

Built with React, Vite, Tailwind CSS, and modern web technologies.
