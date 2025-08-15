# Subscription Cancellation Flow

A comprehensive subscription cancellation flow with A/B testing, dynamic pricing, user feedback collection, and complete data persistence.

## Features

- **Progressive Flow**: Pixel-perfect cancellation journey with mobile and desktop support
- **A/B Testing**: Deterministic variant assignment (50/50 split) with persistence
- **Dynamic Pricing**: Variant A (50% off) vs Variant B ($10 off) with real-time calculation
- **Complete Feedback Collection**: Comprehensive user feedback for both cancellation flows
- **User Interaction Logging**: Track user clicks and interactions for analytics
- **Data Persistence**: Full database integration with subscription status updates
- **Security**: Input validation, CSRF/XSS protection, and Row Level Security (RLS)
- **Responsive Design**: Mobile-first approach with fixed bottom buttons and scrollable content

## Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase CLI (`npm install -g supabase`)
- npm or yarn

### 🚀 One-Command Setup (Recommended)

After cloning the repository, run this single command to set up everything:

```bash
npm run setup
```

This will install dependencies, start Supabase, and set up the database automatically.

### 🎯 Single Command Startup

To start both Supabase and the Next.js application with a single command:

**macOS/Linux:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

**npm script:**
```bash
npm run start:all
```

This will:
- ✅ Start Supabase database and API
- ✅ Start Next.js development server
- ✅ Wait for both services to be ready
- ✅ Display all available URLs
- ✅ Gracefully stop all services when you press Ctrl+C

### Manual Installation

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/officialjaipanchal/mm-cancel-flow-task.git
   cd cancel-flow-task-main
   npm install
   ```

2. **Set up the database:**
   ```bash
   # Start Supabase and set up database
   supabase start
   PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -f ./seed.sql
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### 📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)

## Database Schema

The `seed.sql` file contains everything needed to set up the database from scratch:

- **Users table**: User accounts with email addresses
- **Subscriptions table**: Subscription details with pricing and status
- **Cancellations table**: Complete cancellation records with all feedback fields
- **User Interactions table**: User interaction logging for analytics

### Test Data Included

The database includes 3 test users covering all scenarios:

#### Primary A/B Testing Users
- **John Doe** (`john.doe@example.com`): $25/month → Variant B ($15/month)
- **Sarah Smith** (`sarah.smith@example.com`): $29/month → Variant A ($14.50/month)  
- **Mike Johnson** (`mike.johnson@example.com`): $25/month → Variant A ($12.50/month)

### Sample Cancellation Data
The database includes sample cancellation records demonstrating:
- **Found Job Flow**: Users who found jobs and completed feedback
- **Still Looking Flow**: Users who declined offers and provided follow-up responses
- **Mixed Scenarios**: Both accepted and declined downsell offers

## A/B Testing Variants

- **Variant A**: 50% off original price
  - $25 → $12.50
  - $29 → $14.50

- **Variant B**: $10 off original price
  - $25 → $15.00
  - $29 → $19.00

## Cancellation Flows

### 1. "Found Job" Flow (`/cancel/flow`)
For users who have found a job:
- **Step 1**: Collect feedback about job search experience
- **Step 2**: Additional feedback collection
- **Step 3**: Immigration lawyer and visa type information
- **Completion**: Simple or detailed completion page

### 2. "Still Looking" Flow (`/cancel/flow-looking`)
For users still searching for jobs:
- **Step 1**: Display A/B testing offer with dynamic pricing
- **Step 2**: Offer acceptance/decline with pricing details
- **Step 3**: Cancellation reason selection and follow-up questions
- **Completion**: Based on offer acceptance/decline

## Feedback Collection

### Found Job Flow Feedback
- **Found job with MigrateMate?** (Yes/No)
- **What's one thing you wish we could've helped you with?** (Text)
- **Is your company providing an immigration lawyer?** (Yes/No)
- **Which visa type are you applying for?** (Dynamic input)

### Still Looking Flow Feedback
- **Cancellation reason selection**:
  - Too expensive
  - Platform not helpful
  - Not enough relevant jobs
  - Decided not to move
  - Other
- **Follow-up questions** based on selected reason
- **User interaction logging** for all clicks and selections

## Usage

1. **Sign in**: Select a test user from the sign-in page
2. **Navigate to cancellation**: Click "Cancel Subscription" on the profile page
3. **Choose flow**: Select "Yes, I've found a job" or "Not yet - I'm still looking"
4. **Experience the flow**: Go through the cancellation steps
5. **Test different scenarios**: Try different users to see various A/B testing outcomes

## Project Structure

```
src/
├── app/
│   ├── cancel/                    # Main cancellation flow
│   │   ├── page.tsx              # Entry point with job status selection
│   │   ├── flow/                 # "Found job" cancellation flow
│   │   │   ├── page.tsx          # Multi-step flow management
│   │   │   ├── step1.tsx         # Feedback collection
│   │   │   ├── step2.tsx         # Additional feedback
│   │   │   ├── step3.tsx         # Immigration lawyer info
│   │   │   ├── step3-alt.tsx     # Alternative step 3
│   │   │   └── completion.tsx    # Completion pages
│   │   └── flow-looking/         # "Still looking" downsell flow
│   │       ├── page.tsx          # Flow management
│   │       ├── step1.tsx         # A/B testing offer display
│   │       ├── step2.tsx         # Offer acceptance/decline
│   │       └── step3.tsx         # Cancellation reason & feedback
│   ├── api/                      # API routes
│   │   ├── ab-testing/           # A/B testing logic
│   │   ├── cancellation/         # Cancellation processing
│   │   ├── user-interaction/     # User interaction logging
│   │   └── clear-rate-limits/    # Rate limit management
│   └── page.tsx                  # Main profile page
├── lib/
│   ├── supabase.ts              # Database client and operations
│   ├── dataService.ts           # Data service layer
│   └── validation.ts            # Input validation and security
└── middleware.ts                # Security middleware
```

## API Endpoints

### A/B Testing
- `GET /api/ab-testing` - Get A/B testing data for a user
- `POST /api/ab-testing` - Assign A/B testing variant

### Cancellation
- `GET /api/cancellation` - Get cancellation data
- `POST /api/cancellation` - Process cancellation with complete feedback

### User Interactions
- `POST /api/user-interaction` - Log user interactions and clicks

### Rate Limiting
- `POST /api/clear-rate-limits` - Clear rate limits (development only)

## Security Features

- **Input Validation**: Comprehensive validation for all user inputs
- **XSS Protection**: Input sanitization to prevent cross-site scripting
- **CSRF Protection**: Token-based protection against cross-site request forgery
- **Rate Limiting**: Prevents abuse with configurable limits
- **Row Level Security**: Database-level security policies
- **Secure Headers**: Security headers via middleware

## Development

### Database Setup
```bash
# Initialize database with complete schema and test data
PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -f ./seed.sql

# Or if using Supabase CLI (may have config issues)
supabase db reset --linked
```

### Running Tests
```bash
# Test A/B testing API
curl "http://localhost:3000/api/ab-testing?userId=550e8400-e29b-41d4-a716-446655440001&subscriptionId=550e8400-e29b-41d4-a716-446655440011"

# Test cancellation API with feedback
curl -X POST "http://localhost:3000/api/cancellation" \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"550e8400-e29b-41d4-a716-446655440001",
    "subscriptionId":"550e8400-e29b-41d4-a716-446655440011",
    "downsellVariant":"B",
    "reason":"Too expensive",
    "acceptedDownsell":false,
    "followupResponse":"I would be willing to pay maximum $15 per month"
  }'

# Test user interaction logging
curl -X POST "http://localhost:3000/api/user-interaction" \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"550e8400-e29b-41d4-a716-446655440001",
    "interactionType":"job_status_selection",
    "interactionValue":"found_job",
    "page":"cancel_page"
  }'
```

### Rate Limiting
For development, you can clear rate limits:
```bash
curl -X POST "http://localhost:3000/api/clear-rate-limits"
```

## Environment Variables

Create a `.env.local` file with your database configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Data Analytics

The system logs comprehensive data for analytics:

### Cancellation Data
- A/B testing variant assignment
- Downsell offer acceptance/decline rates
- Cancellation reasons and follow-up responses
- Complete feedback from both flows

### User Interactions
- Job status selection (found job vs still looking)
- Button clicks and page interactions
- Flow progression tracking
- Offer acceptance/decline actions

### Database Queries
```sql
-- View all cancellations with feedback
SELECT * FROM cancellations ORDER BY created_at DESC;

-- View user interactions
SELECT * FROM user_interactions ORDER BY timestamp DESC;

-- A/B testing performance
SELECT 
  downsell_variant,
  COUNT(*) as total_cancellations,
  SUM(CASE WHEN accepted_downsell THEN 1 ELSE 0 END) as accepted_offers,
  ROUND(SUM(CASE WHEN accepted_downsell THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as acceptance_rate
FROM cancellations 
GROUP BY downsell_variant;
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
