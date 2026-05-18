CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL UNIQUE,
  organization text,
  interests text[] NOT NULL DEFAULT '{}',
  referral_code text NOT NULL UNIQUE,
  edition_number bigserial NOT NULL,
  user_agent text,
  ip_address inet,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE INDEX waitlist_signups_created_at_idx ON public.waitlist_signups (created_at DESC);
