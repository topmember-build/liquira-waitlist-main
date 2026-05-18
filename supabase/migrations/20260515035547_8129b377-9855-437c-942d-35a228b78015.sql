
ALTER TABLE public.waitlist_signups
  ADD COLUMN IF NOT EXISTS referred_by text;

CREATE INDEX IF NOT EXISTS waitlist_signups_referred_by_idx
  ON public.waitlist_signups (referred_by);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'waitlist_signups_referral_code_key'
  ) THEN
    ALTER TABLE public.waitlist_signups
      ADD CONSTRAINT waitlist_signups_referral_code_key UNIQUE (referral_code);
  END IF;
END$$;
