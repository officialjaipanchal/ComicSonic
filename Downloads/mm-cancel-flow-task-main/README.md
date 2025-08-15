# MigrateMate Cancellation Flow

A comprehensive subscription cancellation flow with A/B testing, dynamic pricing, user feedback collection, and complete data persistence.

## 🚀 Quick Start (Single Command)

**Want to run everything with one command?** After setup, just run:

```bash
./start.sh
```

This starts both Supabase and the Next.js application automatically!

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

### Required Software:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)

### Required Ports:
Make sure these ports are available on your machine:
- **3000** - Next.js application
- **54321** - Supabase API
- **54322** - Supabase Database
- **54323** - Supabase Studio

## 🛠️ Installation & Setup

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd mm-cancel-flow-task-main
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 4: Start Docker Desktop
Make sure Docker Desktop is running on your machine.

### Step 5: Set Up Environment Variables
Create a `.env.local` file in the project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# JWT Secret
SUPABASE_JWT_SECRET=super-secret-jwt-token-with-at-least-32-characters-long
```

### Step 6: Initialize Database
```bash
supabase start
```

This will:
- Start the Supabase services
- Create the database schema
- Seed the database with sample data

## 🎯 Running the Application

### Option 1: Single Command (Recommended)
```bash
./start.sh
```

### Option 2: Manual Start
If you prefer to start services manually:

1. **Start Supabase:**
   ```bash
   supabase start
   ```

2. **Start Next.js:**
   ```bash
   npm run dev
   ```

### Option 3: Windows Users
```cmd
start.bat
```

## 🌐 Accessing the Application

Once everything is running, you can access:

- **📱 Main Application:** http://localhost:3000
- **📊 Supabase Studio:** http://127.0.0.1:54323
- **🔌 API Endpoints:** http://127.0.0.1:54321

## 🧪 Testing the Application

### Sample Users
The database comes with 5 test users:

1. **John Doe** - `john.doe@example.com` (Active subscription)
2. **Jane Smith** - `jane.smith@example.com` (Active subscription)
3. **Bob Wilson** - `bob.wilson@example.com` (Pending cancellation)
4. **Alice Johnson** - `alice.johnson@example.com` (Cancelled)
5. **Charlie Brown** - `charlie.brown@example.com` (Active subscription)

### Test the Cancellation Flow
1. Go to http://localhost:3000/cancel
2. The application will automatically assign you to a test user
3. Follow the cancellation flow to see A/B testing in action

## 🔧 Troubleshooting

### Common Issues:

**1. Port Already in Use**
```bash
# Check what's using the port
lsof -i :3000
lsof -i :54321

# Kill the process if needed
kill -9 <PID>
```

**2. Docker Not Running**
- Make sure Docker Desktop is started
- Restart Docker Desktop if needed

**3. Supabase Won't Start**
```bash
# Reset Supabase
supabase stop
supabase start
```

**4. Database Connection Issues**
```bash
# Reset the database
supabase db reset
```

**5. Environment Variables Not Loading**
- Make sure `.env.local` is in the project root
- Restart the Next.js development server

### Reset Everything
If you need to start fresh:
```bash
# Stop all services
supabase stop
pkill -f "next dev"

# Reset database
supabase db reset

# Start again
./start.sh
```

## 📁 Project Structure

```
mm-cancel-flow-task-main/
├── src/                    # Next.js application source
│   ├── app/               # App router pages
│   ├── lib/               # Utility functions
│   └── middleware.ts      # Next.js middleware
├── supabase/              # Database configuration
│   ├── config.toml        # Supabase configuration
│   ├── migrations/        # Database migrations
│   └── seed.sql           # Sample data
├── start.sh               # Single command startup (macOS/Linux)
├── start.bat              # Single command startup (Windows)
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Features

- **Progressive Flow**: Pixel-perfect cancellation journey
- **A/B Testing**: Deterministic variant assignment (50/50 split)
- **Dynamic Pricing**: Variant A (50% off) vs Variant B ($10 off)
- **Complete Feedback Collection**: Comprehensive user feedback
- **User Interaction Logging**: Track user clicks and interactions
- **Data Persistence**: Full database integration
- **Security**: Input validation, CSRF/XSS protection, RLS
- **Responsive Design**: Mobile-first approach

## 🛑 Stopping the Application

### Single Command Stop
Press `Ctrl+C` in the terminal where you ran `./start.sh`

### Manual Stop
```bash
# Stop Next.js
pkill -f "next dev"

# Stop Supabase
supabase stop
```

## 📚 Additional Resources

- **Supabase Documentation:** https://supabase.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Need help?** Check the troubleshooting section above or create an issue in the repository.
