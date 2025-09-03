# ProgressLens - Student Early Warning System

A powerful dashboard that helps educators track student progress across attendance, grades, and behavior—so you can support every learner's journey.

![ProgressLens Dashboard](https://img.shields.io/badge/ProgressLens-Dashboard-blue?style=for-the-badge&logo=react)

## 🚀 Features

- **📊 Real-time Dashboard** - Visual analytics and risk distribution charts
- **📈 Student Progress Tracking** - Monitor attendance, grades, and risk levels
- **🎯 Early Warning System** - Color-coded risk indicators (Safe, Warning, Critical)
- **📁 CSV Data Import** - Easy bulk upload of student data
- **🔍 Advanced Filtering** - Search and filter students by multiple criteria
- **📋 Sortable Tables** - Click any column to sort student data
- **🔐 Secure Authentication** - Clerk-powered user management
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🌙 Dark Mode Support** - Toggle between light and dark themes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Clerk
- **Charts**: Recharts
- **Data Fetching**: SWR
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/student-early-warning.git
   cd student-early-warning
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your Clerk credentials:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 CSV Data Format

Upload your student data using this CSV format:

```csv
id,name,email,class,riskLevel,riskScore,attendance,averageGrade,lastActivity
s-001,Alex Johnson,alex.johnson@example.edu,10A,warning,62,86,72,2025-08-30T09:50:51.927Z
s-002,Priya Patel,priya.patel@example.edu,11B,safe,18,96,89,2025-08-30T09:50:51.927Z
```

### Required Fields:

- `name` - Student's full name
- `email` - Student's email address
- `class` - Class/grade level
- `riskLevel` - Risk assessment (safe/warning/critical)
- `riskScore` - Numerical risk score (0-100)
- `attendance` - Attendance percentage (0-100)
- `averageGrade` - Average grade percentage (0-100)
- `lastActivity` - Last activity timestamp

## 🎨 Color Scheme

The application uses a professional blue color scheme:

- **Primary Blue**: `#3b82f6` (Blue-500)
- **Secondary Blue**: `#1d4ed8` (Blue-700)
- **Light Blue**: `#dbeafe` (Blue-100)
- **Risk Colors**:
  - 🟢 Safe: Green
  - 🟡 Warning: Yellow
  - 🔴 Critical: Red

## 📱 Usage

### Dashboard

- View overall student statistics
- Monitor risk distribution with interactive charts
- Track recent alerts and interventions

### Student Management

- Upload CSV files with student data
- View individual student profiles
- Filter and sort students by various criteria
- Export filtered data to CSV

### Data Upload

1. Navigate to the Upload page
2. Drag and drop your CSV file or click to browse
3. Map CSV columns to system fields
4. Choose to add to existing data or replace all
5. Process the upload

## 🔧 Configuration

### Risk Thresholds

The system automatically calculates risk levels based on scores:

- **Safe**: 0-39
- **Warning**: 40-74
- **Critical**: 75-100

### Authentication

Configure Clerk webhooks for email domain restrictions:

- Only allows specific email domains (e.g., `@muj.manipal.edu`)
- Validates user registration

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
student-early-warning/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (marketing)/       # Public marketing pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── students/          # Student management components
│   ├── upload/            # File upload components
│   └── ui/                # Base UI components
├── lib/                   # Utility functions and types
├── public/                # Static assets
└── styles/                # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Read the docs](https://docs.progresslens.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/student-early-warning/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/student-early-warning/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.com/)
- Charts powered by [Recharts](https://recharts.org/)

---

**Made with ❤️ for educators everywhere**

