# SNLH - Sea N Land Holdings Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Database Schema](#database-schema)
7. [Admin Panel](#admin-panel)
8. [Contact Form System](#contact-form-system)
9. [Shipment Tracking System](#shipment-tracking-system)
10. [Deployment](#deployment)
11. [Configuration](#configuration)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**SNLH (Sea N Land Holdings)** is a comprehensive logistics and shipping management web application built with modern web technologies. The platform provides:

- Professional logistics company website
- Real-time shipment tracking system
- Admin panel for shipment management
- Functional contact form with email notifications
- 3D interactive elements for enhanced user experience
- Compliance and testimonials sections

**Target Audience:** Logistics companies, shipping businesses, and their customers

**Primary Goals:**
- Provide transparent shipment tracking
- Streamline customer communication
- Simplify shipment management for administrators
- Present professional company information

---

## Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM 6.30.1** - Client-side routing

### UI Components
- **Shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library
- **React Three Fiber** - 3D graphics with Three.js
- **React Three Drei** - Helpers for Three.js

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication system
  - Edge Functions (serverless)
  - Row Level Security (RLS)

### State Management
- **TanStack Query (React Query)** - Server state management

### Form Management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Email Service
- **Resend** - Transactional email service

---

## Architecture

### Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── 3d/             # Three.js 3D components
│   ├── admin/          # Admin panel components
│   └── ui/             # Shadcn UI components
├── pages/              # Route pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client & types
└── main.tsx            # Application entry point

supabase/
├── functions/          # Edge Functions
│   └── send-contact-email/
├── migrations/         # Database migrations
└── config.toml         # Supabase configuration
```

### Data Flow

1. **User Interaction** → React Components
2. **State Management** → TanStack Query (caching, fetching)
3. **Backend Communication** → Supabase Client
4. **Database Operations** → PostgreSQL with RLS
5. **Email Notifications** → Edge Function → Resend API

---

## Features

### 1. Home Page
- Hero section with 3D interactive elements
- Services preview cards
- Compliance highlights
- Customer testimonials
- Responsive navigation

### 2. Shipment Tracking
- Real-time tracking by tracking number
- Detailed shipment information display
- Status indicators (Pending, In Transit, Delivered, Cancelled)
- Estimated delivery dates
- Origin and destination information

### 3. Admin Panel
- Secure login system (admin@example.com)
- Full CRUD operations for shipments
- Shipment creation with comprehensive details
- Edit and update shipment status
- View detailed shipment information
- Delete shipments

### 4. Contact Form
- Form validation with error handling
- Email notifications to both user and admin
- Success/error toast notifications
- Required fields: name, email, phone, message
- Powered by Resend email service

### 5. Additional Pages
- About Us - Company information
- Services - Detailed service offerings
- Compliance - Regulatory information
- 404 Not Found - Custom error page

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Resend API key

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd snlh-project
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Supabase Setup

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Copy project URL and anon key to `.env`

2. **Add Secrets**
   - In Supabase Dashboard → Project Settings → Edge Functions
   - Add `RESEND_API_KEY` secret with your Resend API key

3. **Run Migrations**
   ```bash
   npx supabase db push
   ```

4. **Create Admin User**
   - Go to Supabase Dashboard → Authentication → Users
   - Create a user with email: `admin@example.com`
   - Copy the user ID
   - Go to Table Editor → profiles table
   - Create a profile with `is_admin = true` and the user ID

### Step 5: Run Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

---

## Database Schema

### Tables

#### 1. shipments
Stores all shipment information and tracking data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| tracking_number | text | Unique tracking identifier |
| status | text | Current status (pending/in_transit/delivered/cancelled) |
| origin | text | Shipment origin location |
| destination | text | Shipment destination location |
| estimated_delivery | date | Expected delivery date |
| customer_name | text | Customer name |
| customer_email | text | Customer email address |
| customer_phone | text | Customer phone number |
| weight | numeric | Package weight |
| dimensions | text | Package dimensions |
| description | text | Shipment description |
| notes | text | Additional notes |
| created_at | timestamptz | Record creation timestamp |
| updated_at | timestamptz | Last update timestamp |

**Row Level Security:**
- Public can SELECT (read) all shipments
- Only authenticated admin users can INSERT, UPDATE, DELETE

#### 2. profiles
Extends user authentication with additional profile data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (references auth.users) |
| is_admin | boolean | Admin flag |
| created_at | timestamptz | Record creation timestamp |

**Row Level Security:**
- Users can SELECT their own profile
- Only the user can UPDATE their own profile

---

## Admin Panel

### Access
- URL: `/admin-login`
- Default credentials: `admin@example.com` / (set during user creation)

### Features

#### 1. Dashboard
- Overview of all shipments
- Quick actions: Create, Edit, View, Delete
- Search and filter capabilities

#### 2. Create Shipment
**Required Fields:**
- Tracking Number (auto-generated or custom)
- Customer Name
- Customer Email
- Origin
- Destination
- Status

**Optional Fields:**
- Customer Phone
- Estimated Delivery Date
- Weight
- Dimensions
- Description
- Notes

#### 3. Edit Shipment
- Update any shipment field
- Change shipment status
- Modify delivery dates
- Add notes

#### 4. View Shipment
- Detailed read-only view
- All shipment information displayed
- Customer contact details
- Package specifications

#### 5. Delete Shipment
- Confirmation dialog before deletion
- Permanent removal from database

### Security
- Protected routes (redirects to login if not authenticated)
- Admin-only access (requires `is_admin = true` in profiles)
- Session-based authentication via Supabase

---

## Contact Form System

### Frontend Component
**Location:** `src/pages/Contact.tsx`

**Features:**
- Form validation using Zod schema
- Loading states during submission
- Error handling with toast notifications
- Success confirmation messages

**Validation Rules:**
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Phone: Required, minimum 10 characters
- Message: Required, minimum 10 characters

### Backend Edge Function
**Location:** `supabase/functions/send-contact-email/index.ts`

**Functionality:**
1. Receives form data from frontend
2. Validates input data
3. Sends two emails via Resend:
   - Confirmation email to customer
   - Notification email to admin (info@snlh.com)

**Email Templates:**
- Professional HTML formatting
- Company branding
- Contact details included
- Responsive design

### Configuration
**Resend Setup:**
1. Create account at https://resend.com
2. Verify domain or use test domain
3. Generate API key
4. Add to Supabase secrets as `RESEND_API_KEY`

**Environment Variables:**
- `RESEND_API_KEY` - Required for email sending

---

## Shipment Tracking System

### Public Tracking
**URL:** `/tracking`

**Features:**
- Search by tracking number
- Real-time status display
- Delivery estimation
- Origin and destination information
- Customer details (for authenticated users)

**Status Types:**
- **Pending** - Shipment created, awaiting processing
- **In Transit** - Currently being transported
- **Delivered** - Successfully delivered to destination
- **Cancelled** - Shipment cancelled

### Implementation
**Data Fetching:**
- Uses TanStack Query for caching
- Automatic refetching on focus
- Error handling with user-friendly messages

**Database Query:**
```sql
SELECT * FROM shipments 
WHERE tracking_number = :tracking_number
```

**RLS Policy:** Public read access enabled

---

## Deployment

### Lovable Cloud Deployment

1. **Prepare for Deployment**
   - Ensure all changes are committed
   - Test locally thoroughly
   - Verify environment variables

2. **Deploy Frontend**
   - Click "Publish" button in Lovable
   - Frontend deploys automatically
   - Click "Update" to push changes live

3. **Deploy Edge Functions**
   - Edge functions deploy automatically
   - Changes are live immediately
   - Monitor logs for errors

4. **Database Migrations**
   - Run automatically on deployment
   - Review migration logs
   - Verify schema changes

### Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning
5. Test domain access

**Note:** Custom domains require a paid Lovable plan

---

## Configuration

### Supabase Configuration
**File:** `supabase/config.toml`

```toml
[functions.send-contact-email]
verify_jwt = false
```

**Why JWT verification is disabled:**
- Contact form is public-facing
- No authentication required for form submission
- Input validation handles security

### Tailwind Configuration
**File:** `tailwind.config.ts`

- Custom color scheme based on HSL values
- Responsive breakpoints
- Animation utilities
- Design system tokens

### Design System
**File:** `src/index.css`

- CSS custom properties for theming
- Dark/light mode support
- Consistent spacing and typography
- Color palette with semantic naming

---

## Troubleshooting

### Common Issues

#### 1. Contact Form Not Sending Emails
**Symptoms:** Form submits but no email received

**Solutions:**
- Verify `RESEND_API_KEY` is set in Supabase secrets
- Check Resend dashboard for API usage
- Review edge function logs for errors
- Confirm domain verification in Resend

#### 2. Admin Login Fails
**Symptoms:** Incorrect credentials or access denied

**Solutions:**
- Verify user exists in Supabase Auth
- Check `profiles` table has `is_admin = true`
- Clear browser cache and cookies
- Check console for authentication errors

#### 3. Shipment Tracking Not Working
**Symptoms:** No results found or error message

**Solutions:**
- Verify shipment exists in database
- Check tracking number format (case-sensitive)
- Review RLS policies on shipments table
- Check browser console for API errors

#### 4. Database Connection Errors
**Symptoms:** "Failed to fetch" or timeout errors

**Solutions:**
- Verify Supabase URL and anon key in `.env`
- Check Supabase project is active
- Review browser network tab for 4xx/5xx errors
- Ensure RLS policies allow necessary access

#### 5. 3D Elements Not Rendering
**Symptoms:** Blank spaces where 3D components should be

**Solutions:**
- Check browser WebGL support
- Clear browser cache
- Update graphics drivers
- Disable browser extensions interfering with canvas

### Performance Optimization

**Database:**
- Add indexes on frequently queried columns
- Use Supabase connection pooling
- Implement pagination for large datasets

**Frontend:**
- Enable code splitting
- Lazy load components
- Optimize images
- Use React.memo for expensive components

**Edge Functions:**
- Minimize cold starts
- Reduce function size
- Use efficient algorithms
- Cache external API responses

---

## API Reference

### Edge Functions

#### send-contact-email

**Endpoint:** `POST /functions/v1/send-contact-email`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I need information about shipping services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response:**
```json
{
  "error": "Error message details"
}
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- Review edge function logs
- Monitor error rates
- Check email delivery success rate

**Monthly:**
- Update dependencies
- Review database size and performance
- Analyze user feedback
- Test all features end-to-end

**Quarterly:**
- Security audit
- Performance optimization
- Feature usage analysis
- Documentation updates

---

## Support & Resources

- **Lovable Documentation:** https://docs.lovable.dev
- **Supabase Documentation:** https://supabase.com/docs
- **React Documentation:** https://react.dev
- **Tailwind CSS Documentation:** https://tailwindcss.com

---

## Version History

### v1.0.0 (Current)
- Initial release
- Shipment tracking system
- Admin panel with full CRUD
- Contact form with email notifications
- 3D interactive elements
- Responsive design

---

## License

[Add your license information here]

---

## Contact

For support or questions regarding this project:
- Email: info@snlh.com
- Website: [Your website URL]

---

**Document Last Updated:** November 2025
