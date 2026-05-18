CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION citext SET SCHEMA extensions;

-- Explicit deny policy for clarity (no permissive policies = deny by default,
-- but this also satisfies the linter and documents intent).
CREATE POLICY "Deny all client access to waitlist_signups"
  ON public.waitlist_signups
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
