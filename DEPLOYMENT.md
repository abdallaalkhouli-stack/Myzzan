# HalalData API Deployment Guide

Follow these steps to deploy the Halal Crypto API platform to production using Supabase, Stripe, and Vercel.

## Step 1: Set up Supabase (Database & Auth)
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to the **SQL Editor** in the Supabase dashboard.
3. Open `src/lib/schema.sql` from your project code, copy the contents, and run it in the SQL Editor to create your tables (`users`, `api_keys`, `coin_verdicts`, `audit_log`).
4. Go to **Project Settings > API** and copy your `Project URL` (NEXT_PUBLIC_SUPABASE_URL) and `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY).
5. Also, copy the `service_role` secret key (SUPABASE_SERVICE_ROLE_KEY) - *never expose this to the client*.
6. In Supabase **Authentication > URL Configuration**, ensure your deployment URL (e.g., `https://myzzan.com`) is added to the Site URL and Redirect URLs.

## Step 2: Set up Stripe Products
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Go to **Products** and create two new subscription products:
   - **Pro Plan:** Set the price to $29/month. Copy the `Price ID` (starts with `price_`).
   - **Enterprise Plan:** Set the price to $199/month. Copy the `Price ID` (starts with `price_`).
3. Go to **Developers > API Keys** and copy your **Secret Key** (STRIPE_SECRET_KEY).
4. Go to **Developers > Webhooks** and add an endpoint:
   - URL: `https://your-domain.com/api/webhook/stripe`
   - Events to listen to: `checkout.session.completed`
5. Reveal the **Signing Secret** for the webhook and copy it (STRIPE_WEBHOOK_SECRET).

## Step 3: Deploy on Vercel
1. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Upload the provided zip file (or link your GitHub repository containing the code).
3. In the deployment configuration, expand **Environment Variables** and add ALL the variables listed in your `.env.local` template:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRO_PRICE_ID`
   - `STRIPE_ENTERPRISE_PRICE_ID`
   - `NEXT_PUBLIC_SITE_URL` (Set this to `https://myzzan.com` or your Vercel URL)
4. Click **Deploy**. Vercel will build the app (`npm run build`) and launch it.

## Step 4: Connect Domain (myzzan.com)
1. In your Vercel dashboard, click on your project and go to **Settings > Domains**.
2. Enter `myzzan.com` and click **Add**.
3. Vercel will provide you with DNS records (typically an `A` record or `CNAME`).
4. Log into your domain registrar (e.g., GoDaddy, Namecheap) and update your DNS settings with the records Vercel provided.
5. Wait for the SSL certificate to generate.

## Step 5: Test Everything is Working
1. **Public Checker:** Go to `https://myzzan.com` and search a coin to ensure the UI loads.
2. **Auth:** Click "Sign up", create an account, and ensure you are redirected to `/dashboard`.
3. **Database:** Check your Supabase `users` and `api_keys` tables to ensure your new account was recorded.
4. **Data Fetching:** Go to `/dashboard/coins` to ensure the live CoinGecko API and Sharia engine are correctly rendering the 50 coins.
5. **PDF Export:** Click on a coin detail page and click "Download PDF Report".
6. **Payments:** Go to `/pricing`, select a Pro plan, enter Stripe test cards (if in test mode), and verify your tier updates to `PRO` in the Supabase dashboard.
