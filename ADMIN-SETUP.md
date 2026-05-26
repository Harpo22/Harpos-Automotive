# 🚗 Harpo Automotives — Admin Setup Guide

This guide gets your admin dashboard live so you can add, edit, and delete cars from your phone or computer — no coding ever needed.

---

## What You're Setting Up

- **Supabase** — free database that stores your cars and images
- **Admin dashboard** at `/admin` — your private management panel
- **Live website** — automatically shows your latest inventory

---

## Step 1 — Create Your Free Supabase Account

1. Go to **[supabase.com](https://supabase.com)** and click **Start for Free**
2. Sign up with your email (it's completely free)
3. Click **New Project**
4. Give it a name: `harpo-automotives`
5. Set a strong **Database Password** (save this somewhere safe)
6. Choose region: **Europe West** (closest to Northern Ireland)
7. Click **Create new project** — wait about 1 minute

---

## Step 2 — Set Up the Database

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file **`supabase-setup.sql`** from your project folder
4. Copy the entire contents and paste into Supabase
5. Click **Run** (the green button)
6. You should see "Success" — your database is ready ✓

---

## Step 3 — Get Your API Keys

1. In Supabase, click **Settings** (⚙️ icon) in the left sidebar
2. Click **API**
3. You'll see two things you need:
   - **Project URL** — looks like `https://abcxyz.supabase.co`
   - **anon public key** — a long string starting with `eyJ...`
4. Copy both of these

---

## Step 4 — Create Your Admin Login

1. In Supabase, click **Authentication** in the sidebar
2. Click **Users** → **Add User** → **Create New User**
3. Enter your email: `crwh02@icloud.com`
4. Set a strong password (you'll use this to log into your admin)
5. Click **Create User**

---

## Step 5 — Add Your Keys to the Project

1. In your `harpo-automotives` folder, find the file called **`.env.example`**
2. Make a copy of it and rename the copy to **`.env.local`**
3. Open `.env.local` and fill in your values:

```
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

---

## Step 6 — Deploy to Vercel

1. Push your project to GitHub (if not already done):
```bash
git add .
git commit -m "Add admin dashboard"
git push
```

2. Go to **[vercel.com](https://vercel.com)** → your project → **Settings → Environment Variables**
3. Add these two variables:
   - Name: `VITE_SUPABASE_URL` → Value: your Supabase URL
   - Name: `VITE_SUPABASE_ANON_KEY` → Value: your anon key
4. Click **Save** then **Redeploy**

---

## How to Log In and Manage Cars

### Logging In
1. Go to your website URL + `/admin`  
   Example: `https://harpoautomotives.vercel.app/admin`
2. Enter your email and the password you set in Step 4
3. Click **Sign In**

### Adding a New Car
1. Click **+ Add New Car** (gold button, top right)
2. Upload photos — tap the upload box and select from your phone camera roll or computer
3. Fill in all the car details
4. Tick **Featured on homepage** if you want it on the front page
5. Click **+ Add Vehicle** — it appears on the live site instantly ✓

### Editing a Car
1. Find the car in the list
2. Click **Edit**
3. Change whatever you need — you can swap photos too
4. Click **✓ Save Changes**

### Deleting a Car
1. Find the car
2. Click **Delete** → confirm
3. It's removed from the live site immediately ✓

### Uploading Photos
- Tap the photo area on the form
- On your **phone**: it opens your camera roll — pick any photo
- On your **computer**: opens file browser — pick your images
- You can upload multiple photos at once
- The **first photo** is the main listing photo — drag to reorder
- Photos upload directly to your secure Supabase storage

---

## Accessing Admin on Your Phone

Just go to:
```
https://your-site.vercel.app/admin
```

The admin is fully mobile-friendly. You can add a new car listing in under 2 minutes from your phone.

**Tip:** Add it to your iPhone home screen:
1. Open the admin URL in Safari
2. Tap the Share button
3. Tap **Add to Home Screen**
4. Now it works like an app ✓

---

## Costs

Everything used here is **completely free**:
- Supabase: Free tier (500MB database, 1GB image storage)
- Vercel: Free tier (unlimited deployments)

You only pay if you grow massively beyond a typical dealership's needs.

---

## Troubleshooting

**"Invalid login credentials"** → Check your email/password are exactly what you set in Supabase Authentication

**Cars not appearing** → Check your `.env.local` file has the correct Supabase URL and key (no spaces, no quotes)

**Images not uploading** → Make sure you ran the full `supabase-setup.sql` script including the storage section

**Admin page not found** → Make sure your `vercel.json` has the rewrite rule (it's already included)

---

*Harpo Automotives Admin System — Built for zero-code stock management*
