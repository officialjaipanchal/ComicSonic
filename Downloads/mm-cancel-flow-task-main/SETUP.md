# Quick Setup Guide

## 🚀 One-Command Setup

After cloning the repository, run this single command to set up everything:

```bash
npm run setup
```

This will:
1. Install all dependencies
2. Start Supabase locally
3. Set up the database with all tables and test data using the seed.sql file

## 🎯 Alternative Manual Setup

If you prefer to set up step by step:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Supabase
```bash
supabase start
```

### 3. Set up Database
```bash
PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -f ./seed.sql
```

### 4. Start Development Server
```bash
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Supabase Dashboard**: http://localhost:54323
- **Database**: localhost:54322

## 👥 Test Users

Use these test users to explore the cancellation flows:

1. **John Doe** (`john.doe@example.com`) - $25/month → Variant B ($15/month)
2. **Sarah Smith** (`sarah.smith@example.com`) - $29/month → Variant A ($14.50/month)
3. **Mike Johnson** (`mike.johnson@example.com`) - $25/month → Variant A ($12.50/month)

## 🔧 Troubleshooting

### If Supabase fails to start:
```bash
supabase stop
supabase start
```

### If database setup fails:
```bash
# Try stopping and restarting Supabase first
supabase stop
supabase start

# Then run the database setup again
PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -f ./seed.sql
```

### If you get connection errors:
Make sure ports 54322 and 54323 are available on your machine.

## 📚 Next Steps

1. Visit http://localhost:3000
2. Sign in with any test user
3. Click "Cancel Subscription" to explore the flows
4. Check the README.md for detailed documentation
