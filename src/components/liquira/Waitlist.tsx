import { useState } from "react";
import { Crosshairs } from "./Crosshair";
import { BRAND } from "@/lib/brand";
import { isValidEmail } from "@/lib/utils";

const interests = [
  "Routing API",
  "Liquidity provision",
  "SDK integration",
  "Institutional onboarding",
];

export function Waitlist({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [edition, setEdition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;
    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/public/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          name,
          organization: org,
          interests: picked,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Signup failed");
      setEdition(data.edition);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative border-b border-border bg-background">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              / early access
            </div>
            <h2 className="mt-3 font-sans text-[36px] font-light leading-[1] tracking-tightest md:text-[52px]">
              <span className="text-gradient-soft">Be first to </span>
              <span className="font-serif italic text-primary">route</span>
              <span className="text-gradient-soft">.</span>
            </h2>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground md:block">
            β · waitlist
          </div>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              The first cohort moves with us through testnet into mainnet. Early members receive
              priority routing, governance weight at genesis, and gated access to the Liquira SDK
              before public release.
            </p>

            <ul className="mt-8 space-y-5 border-t border-border pt-6">
              {[
                [
                  "α / fees",
                  "50% maker rebate for the first 90 days (subject to mainnet launch terms)",
                ],
                ["β / governance", "Genesis votes on pool whitelisting"],
                ["γ / sdk", "Preview access to routing + view-key SDK"],
                ["δ / support", "Direct line to the protocol team"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-5">
                  <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-mono-wide text-primary">
                    {k}
                  </span>
                  <span className="text-[14px] text-foreground/80">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7">
            <div className="relative rounded-sm border border-border-strong bg-surface-1 p-7 shadow-card">
              <Crosshairs />
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                  join / waitlist
                </span>
                <span className="text-muted-foreground">{BRAND.version}</span>
              </div>

              {submitted ? (
                <div className="py-10 text-center animate-rise">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 font-mono text-primary">
                    ✓
                  </div>
                  <h3 className="mt-6 font-sans text-[28px] font-light tracking-tightest text-gradient-soft">
                    You're on the list.
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-mono-wide text-muted-foreground">
                    Edition n° {edition ? String(edition).padStart(4, "0") : "—"}
                  </p>
                </div>
              ) : (
                <form noValidate onSubmit={submit} className="mt-6 space-y-5">
                  <Field label="email">
                    <input
                      required
                      disabled={loading}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@institution.com"
                      className="w-full rounded-sm border border-border bg-surface-2 px-3 py-2.5 font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                    />
                  </Field>
                  <Field label="name (optional)">
                    <input
                      disabled={loading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name or team lead"
                      className="w-full rounded-sm border border-border bg-surface-2 px-3 py-2.5 font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                    />
                  </Field>
                  <Field label="organization (optional)">
                    <input
                      disabled={loading}
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Treasury, market maker, fintech…"
                      className="w-full rounded-sm border border-border bg-surface-2 px-3 py-2.5 font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                    />
                  </Field>
                  <Field label="interested in">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {interests.map((i) => {
                        const on = picked.includes(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggle(i)}
                            disabled={loading}
                            aria-pressed={on}
                            className={`flex items-center gap-2.5 rounded-sm border px-3 py-2.5 text-left font-mono text-[11px] transition disabled:opacity-60 ${
                              on
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-surface-2 text-muted-foreground hover:border-border-strong hover:text-foreground"
                            }`}
                          >
                            <span
                              className={`flex h-3 w-3 items-center justify-center rounded-[2px] border ${
                                on ? "border-primary bg-primary" : "border-border-strong"
                              }`}
                            >
                              {on && <span className="text-[8px] text-primary-foreground">✓</span>}
                            </span>
                            {i}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  {error && (
                    <div className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 font-mono text-[11px] text-destructive">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="shimmer relative h-12 w-full overflow-hidden rounded-sm bg-primary font-mono text-[12px] font-medium uppercase tracking-mono-wide text-primary-foreground transition hover:bg-primary-glow glow-mint disabled:opacity-60"
                  >
                    {loading ? "Routing…" : "Join waitlist →"}
                  </button>

                  <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                    <span>No spam · Early access only · Unsubscribe anytime</span>
                    <span className="text-primary">
                      ▌<span className="animate-blink">▌</span> ready
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
        <span>{label}</span>
        <span className="text-border-strong">↳</span>
      </div>
      {children}
    </div>
  );
}
