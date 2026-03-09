# 🇮🇳 InternSetu - Government Internships Made Simple

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)

**InternSetu** is a comprehensive government internship platform that connects students with verified government internship opportunities across India. Built with modern web technologies and designed with government compliance and accessibility in mind.

![InternSetu App Preview](docs/app-preview.png)

## 🌟 Key Features

- 🏛️ **Government-Verified Opportunities**: All internships are verified and sourced from official government departments
- � **AI-Powered Matching**: Smart recommendation system that matches students with suitable internships
- 📝 **Streamlined Application Process**: Simple 2-step application with resume upload and cover letter
- � **Secure & Compliant**: Built with government security standards and data protection
- 📱 **Mobile-First Design**: Responsive design optimized for all devices

## ⚙️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **UI Components**: Custom components with ShadCN base
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Secure government-grade authentication
- **Deployment**: Vercel with automatic CI/CD
- **Animations**: Framer Motion for smooth interactions
- **Styling**: Tailwind CSS with government color schemes

## 🏗️ Architecture

```
src/
├── app/
│   ├── intern-setu/           # Main internship platform
│   │   ├── apply/[id]/        # Application flow
│   │   ├── dashboard/         # User dashboard
│   │   ├── explore/           # Browse internships
│   │   └── recommendations/   # AI recommendations
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Reusable UI components
│   └── [feature-specific]/   # Feature components
└── lib/                      # Utilities and helpers
```

## 🚀 Features Overview

### 🎯 **Smart Application System**
- **2-Step Application Process**: Personal information and document upload
- **Resume Upload**: PDF support with validation
- **Cover Letter Integration**: Built-in editor for personalized applications
- **Application Tracking**: Real-time status updates

### 🔍 **Advanced Search & Discovery**
- **Ministry-wise Filtering**: Browse by government departments
- **Location-based Search**: Find opportunities by state/city
- **Skill Matching**: Filter by required skills and qualifications
- **Real-time Updates**: Latest opportunities updated regularly

### 🎨 **Modern User Experience**
- **Government Branding**: Official colors and styling
- **Smooth Animations**: Framer Motion powered interactions
- **Loading States**: Beautiful loading animations
- **Success Celebrations**: Engaging success pages with confetti effects

## 🚀 UI PREVIEW

https://github.com/user-attachments/assets/140ba76a-4057-4443-b231-68069dc06e1e

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database (optional for frontend-only development)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Vibhor-choudhary/S-UI.git
cd S-UI
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your environment**
Edit the `.env` file with your configuration:

```env
# Database (at least one required for full functionality)
POSTGRES_URL="postgresql://user:password@localhost:5432/internsetu"
# OR
DATABASE_URL="postgresql://user:password@localhost:5432/internsetu"

# Development (optional)
DEV_RELAX_LINT=true  # Disable strict linting in development
```

5. **Start development server**
```bash
pnpm run dev
```

Visit `http://localhost:3000` to see InternSetu in action!

### 🚀 Quick Start Script

For convenience, use the automated setup script:

```bash
chmod +x start-internsetu.sh
./start-internsetu.sh
```

This script will:
- Check and install dependencies
- Set up environment files
- Build and start the application
- Provide helpful feedback and error handling

## 📁 Project Structure

```
InternSetu/
├── src/
│   ├── app/
│   │   ├── intern-setu/           # Main platform
│   │   │   ├── apply/[id]/        # Application flow
│   │   │   ├── dashboard/         # User dashboard
│   │   │   ├── explore/           # Browse internships
│   │   │   ├── recommendations/   # AI recommendations
│   │   │   └── onboarding/        # User onboarding
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Homepage
│   ├── components/
│   │   ├── ui/                    # Reusable components
│   │   └── [feature]/             # Feature-specific components
│   └── lib/                       # Utilities and helpers
├── public/                        # Static assets
└── docs/                          # Documentation
```

## 🎨 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with government branding |
| `/intern-setu` | Main platform entry point |
| `/intern-setu/explore` | Browse all internships |
| `/intern-setu/apply/[id]` | Application flow |
| `/intern-setu/dashboard` | User dashboard |
| `/intern-setu/recommendations` | AI-powered suggestions |
| `/intern-setu/onboarding` | Profile setup |

**Note:** Production builds enforce strict ESLint and TypeScript checking. Use `DEV_RELAX_LINT=true` only for development.

## 🤝 Contributing

We welcome contributions to make InternSetu better for students across India!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the students of India 🇮🇳
- Inspired by the need for transparent government internship access
- Thanks to all contributors and the open-source community

---

**Made with ❤️ for Indian Students**

*Empowering the next generation through government internship opportunities*

