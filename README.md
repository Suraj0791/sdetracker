# 🎯 Career Tracker: The Ultimate Job Search Hub

Career Tracker is a powerful, open-source web application designed to help students and professionals manage their job search for **Software Engineering (SDE)** and **Product Management** roles. Say goodbye to messy spreadsheets and hello to a streamlined, interactive dashboard.

![Project Preview](https://github.com/user-attachments/assets/ae91c621-8824-42cb-b0a0-e8e2df65bae9)

## ✨ Core Features

### 🚀 Dual Specialized Trackers

- **SDE Tracker**: Optimized for engineering roles with tracking for Hiring Seasons, Intern Types, and PPO Probabilities.
- **Product Tracker**: Tailored for PM/APM roles with fields for SQL Level, Case Interview focus, and Product Sense evaluation.

### 📊 Interactive Dashboards

- **Quick-Filter Stats Cards**: Instantly filter your view by clicking on summary cards (e.g., see only "Interviews", "BigTech", or "High Priority" roles).
- **Visual Feedback**: Active filters are highlighted with beautiful glowing effects and animations.

### 📄 Detailed Job Insights

- **Clean Detail Modals**: Click any company to open a structured view of all data without cluttering your table.
- **Interview Experience Journal**: Record specific questions, feedback, and process details for every company.
- **Referral Tracking**: Keep track of who referred you and the current status of your referral.

### 🛠️ Powerful Tools

- **CSV Data Migration**: Bulk import your existing data or export your current tracker to a CSV file.
- **Advanced Global Search**: Find any company, role, or note instantly with real-time searching.
- **Sidebar Filters**: Granite-level control with multi-select filters for category, status, and priority.

### 🔒 Modern Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons.
- **Backend & Auth**: Supabase (PostgreSQL) for secure, real-time data persistence.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/career-tracker.git
   cd career-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing (Open Source)

We love contributions! Whether you're fixing a bug or implementing a brilliant new feature, here's how you can help:

### 🐛 Reporting & Fixing Bugs

1. **Report**: Found an issue? Open a GitHub Issue with clear steps to reproduce.
2. **Setup**: Follow the installation steps above.
3. **Branch**: Create a fix branch:
   ```bash
   git checkout -b fix/issue-name
   ```
4. **Solve**: Implement the fix and verify it locally.
5. **Submit**: Push your branch and open a Pull Request (PR).

### 💡 Implementing New Ideas

1. **Discuss**: Start a Discussion or open an Issue to share your idea before building it.
2. **Branch**: Create a feature branch:
   ```bash
   git checkout -b feature/cool-new-feature
   ```
3. **Build**: Implement your logic. Ensure you follow the project's design system.
4. **PR**: Detail your changes in the PR description, including screenshots if you've added UI elements.

### 📂 Branching Strategy

- `main`: Production-ready code.
- `feature/*`: New features/enhancements.
- `fix/*`: Bug fixes.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for the community. If you like this project, give it a ⭐!**
