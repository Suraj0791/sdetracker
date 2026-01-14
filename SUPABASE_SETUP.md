# Environment Variables Setup

## Create `.env.local` file in project root

Add these variables (already done - just for reference):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xqfmcemfsgdfmwotyoqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_of-Wbn0F8jAm7uh9J-InQQ_OCFqd74D
```

## Steps to Run Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/xqfmcemfsgdfmwotyoqo/sql
2. Click "SQL Editor"
3. Click "+ New query"
4. Copy the contents of `supabase/schema.sql`
5. Paste into the editor
6. Click "Run" button
7. Wait for "Success" message

This will create:

- `sde_jobs` table
- `product_jobs` table
- Row Level Security policies (each user sees only their data)
- Indexes for performance
- Auto-update timestamps

## Enable Google Auth (Optional)

1. Go to Authentication > Providers
2. Enable Google
3. Add OAuth credentials (or skip for now, email/password works)
