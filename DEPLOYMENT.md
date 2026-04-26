# Sepang Room Rental Management System - Deployment Guide

This project is fully ready to be deployed to Vercel and connected to Supabase.

## 1. Setup Supabase
1. Create a new project at [Supabase](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run it.
4. Enable Authentication and select "Email".

## 2. Environment Variables
You need to set up the environment variables before deploying or running locally. 
Rename `.env.example` to `.env.local` and fill in your keys:

```ini
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
```

## 3. Deploy to Vercel
1. Push this code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add the same variables from your `.env.local` file.
5. Click **Deploy**.

## 4. Default Mock Data Note
If you deploy *without* providing the Supabase environment variables, the system will fall back to using mock data (in `src/app/rooms/page.tsx` and the Supabase clients will bypass throwing errors) so that the UI can still be previewed. To use live data, ensure the variables are set!

## Tech Stack Used
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Shadcn UI concept
- **Database + Auth**: Supabase
- **Icons**: Lucide React
