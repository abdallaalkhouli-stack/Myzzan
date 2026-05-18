-- Supabase Schema for Halal Crypto API Platform
-- Copy and paste this into the Supabase SQL Editor

-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  tier TEXT DEFAULT 'FREE', -- FREE, PRO, ENTERPRISE
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. API Keys Table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  calls_today INTEGER DEFAULT 0,
  limit_per_day INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Coin Verdicts Table
CREATE TABLE coin_verdicts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticker TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL, -- halal, haram, doubtful
  confidence TEXT NOT NULL, -- high, medium, low
  reasoning JSONB NOT NULL, -- Array of strings stored as JSON
  certified_by TEXT, -- Optional certification institution
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Audit Log Table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  ticker_requested TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT
);
