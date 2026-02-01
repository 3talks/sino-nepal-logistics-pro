
# Netlify Deployment Plan for SNLH Project

## Overview

This plan will guide you through deploying your React + Vite project to Netlify. The good news is that **Netlify fully supports your project's architecture**, including the Supabase backend integration.

---

## Important Notes Before Deployment

Your project uses **Supabase** for backend functionality (database, authentication, edge functions). Since Supabase is a separate hosted service, it will continue to work when deployed to Netlify. The edge functions are already deployed on Supabase's infrastructure, so they don't need any changes.

---

## Step-by-Step Deployment Guide

### Step 1: Push Code to GitHub

Before deploying to Netlify, your code needs to be in a GitHub repository.

1. Go to your Lovable project settings
2. Navigate to **GitHub** under "Connectors"
3. Connect your GitHub account and create/link a repository
4. Your code will automatically sync to GitHub

### Step 2: Create a Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up using your GitHub account (recommended for easy integration)

### Step 3: Create a New Site on Netlify

1. Click **"Add new site"** → **"Import an existing project"**
2. Select **GitHub** as your Git provider
3. Authorize Netlify to access your repositories
4. Select your project repository

### Step 4: Configure Build Settings

When Netlify asks for build settings, enter the following:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | `18` or higher |

### Step 5: Add Environment Variables (Optional but Recommended)

In Netlify dashboard, go to **Site settings** → **Environment variables** and add:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://trwxtwgelkcokkvujblz.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon key |
| `VITE_SUPABASE_PROJECT_ID` | `trwxtwgelkcokkvujblz` |

Note: Since your Supabase credentials are already hardcoded in the client file, this step is optional. However, using environment variables is a better practice for flexibility.

### Step 6: Create Netlify Configuration File

I will create a `netlify.toml` file to handle:
- SPA routing (so direct links like `/tracking` work correctly)
- Build settings
- Redirect rules

```text
File: netlify.toml

[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 7: Deploy

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be live at a Netlify URL like `https://your-site-name.netlify.app`

### Step 8: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the DNS configuration instructions

---

## Technical Details

### What I Will Create/Modify

1. **Create `netlify.toml`** - Configuration file for Netlify with:
   - Build command and publish directory
   - SPA redirect rules for React Router

### What Features Will Work

| Feature | Status | Notes |
|---------|--------|-------|
| Home Page | Works | Static content |
| Services/About/Contact pages | Works | Static content |
| Duty Calculator | Works | Client-side calculations |
| Freight Calculator | Works | Client-side calculations |
| CBM Calculator | Works | Client-side calculations |
| PDF Download | Works | Client-side generation |
| Shipment Tracking | Works | Uses Supabase (hosted separately) |
| Admin Login | Works | Uses Supabase Auth |
| Admin Panel | Works | Uses Supabase database |
| Contact Form Emails | Works | Uses Supabase Edge Functions |

---

## Summary of Changes

1. Create `netlify.toml` configuration file
2. Optionally update vite config for production optimization

All your existing functionality will continue to work since Supabase handles the backend independently.
