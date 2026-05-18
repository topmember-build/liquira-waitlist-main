import { useId, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkline, MiniBars } from "./Sparkline";
import { BRAND } from "@/lib/brand";

const issuers = [
  { name: "Circle", style: "font-serif italic text-[15px]" },
  { name: "BDACS", style: "font-mono text-[12px] tracking-mono-wide uppercase" },
  { name: "JPYC", style: "font-sans font-medium text-[14px]" },
  { name: "StraitsX", style: "font-serif text-[15px]" },
  { name: "Bitso", style: "font-mono text-[12px] tracking-mono-wide uppercase" },
  { name: "Transfero", style: "font-sans font-light text-[15px]" },
  { name: "Poundtoken", style: "font-serif italic text-[14px]" },
];

export function Hero() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const emailId = useId();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid-fade opacity-60" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative mx-auto max-w-7xl px-5 pt-10 md:pt-14">
        {/* spec strip */}
        <div className="grid grid-cols-3 border-y border-border py-2 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
          <span>liquira · fx router · {BRAND.version}</span>
          <span className="text-center">
            edition n° {BRAND.edition} · {BRAND.network}
          </span>
          <span className="text-right">doc · {BRAND.docDate}</span>
        </div>

        <div className="grid gap-12 pt-14 pb-20 md:grid-cols-12 md:gap-10 md:pt-20">
          <div className="md:col-span-8 animate-rise">
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-dot" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-border-strong">·</span>
              <span>α · early access</span>
            </div>

            <h1 className="font-sans text-[44px] font-light leading-[0.95] tracking-tightest sm:text-[64px] md:text-[88px]">
              <span className="text-gradient-soft">The native FX </span>
              <span className="font-serif italic font-normal text-primary">layer</span>
              <span className="text-gradient-soft"> for stablecoin money.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
              Liquira settles cross-currency payments on Arc through depth-aware, multi-stablecoin
              liquidity. Thirteen native stables including USDC, EURC, KRW1, JPYC and more, routed
              at sub-basis-point slippage in under <span className="text-foreground">400 ms</span>.
            </p>

            {/* command bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/waitlist", search: email ? { email } : {} });
              }}
              className="relative mt-10 flex items-center gap-2 rounded-sm border border-border-strong bg-surface-2 p-1.5 shadow-card"
            >
              <span className="pl-3 pr-1 font-mono text-[13px] text-muted-foreground" aria-hidden>
                ⌘
              </span>
              <label htmlFor={emailId} className="sr-only">
                Email address
              </label>
              <input
                id={emailId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email to join the waitlist"
                className="flex-1 bg-transparent py-3 font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="shimmer relative overflow-hidden rounded-sm bg-primary px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-mono-wide text-primary-foreground transition hover:bg-primary-glow glow-mint"
              >
                Join ↵
              </button>
            </form>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              Try: EURC → JPYC · 100k USDC → BRZ
            </p>

            {/* stats */}
            <div className="mt-12 grid grid-cols-1 gap-3 overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
              <Stat label="TVL" value="$189.96M" delta="+2.4%">
                <Sparkline data={[12, 14, 13, 16, 18, 17, 19, 22, 21, 24, 26, 28]} />
              </Stat>
              <Stat label="24h Volume" value="$30.05M" delta="+11.7%" deltaTone="amber">
                <Sparkline
                  data={[8, 10, 9, 14, 11, 16, 12, 19, 17, 22, 18, 24]}
                  color="hsl(var(--accent))"
                />
              </Stat>
              <Stat label="Avg Slippage" value="0.71 bps" delta="-0.04">
                <MiniBars data={[5, 6, 4, 7, 3, 5, 4, 6, 3, 4, 2, 3]} />
              </Stat>
            </div>

            {/* issuers */}
            <div className="mt-12 flex flex-wrap items-baseline gap-x-7 gap-y-3 border-t border-border pt-6">
              <span className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                Issuers routed →
              </span>
              {issuers.map((i) => (
                <span key={i.name} className={`${i.style} text-foreground/75`}>
                  {i.name}
                </span>
              ))}
            </div>
          </div>

          {/* side panel */}
          <aside className="relative md:col-span-4 animate-rise">
            <div className="relative h-full rounded-sm border border-border-strong bg-surface-1 p-5 shadow-card">
              <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                <span>// last_route</span>
                <span className="text-primary">● live</span>
              </div>

              <div className="space-y-4">
                {[
                  { from: "EURC", to: "JPYC", size: "240,000", bps: "0.62", t: "318ms" },
                  { from: "USDC", to: "BRZ", size: "100,000", bps: "0.71", t: "362ms" },
                  { from: "KRW1", to: "USDC", size: "80,500", bps: "0.49", t: "281ms" },
                  { from: "GBPT", to: "EURC", size: "62,000", bps: "0.55", t: "344ms" },
                ].map((r, i) => (
                  <div key={i} className="border-b border-border pb-3 last:border-0">
                    <div className="flex items-baseline justify-between font-mono text-[12px]">
                      <span>
                        <span className="text-foreground">{r.from}</span>
                        <span className="text-muted-foreground"> → </span>
                        <span className="text-foreground">{r.to}</span>
                      </span>
                      <span className="text-muted-foreground">{r.size}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                      <span>slip {r.bps} bps</span>
                      <span>{r.t}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                <span>routes / 24h</span>
                <span className="text-foreground">128,402</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  delta,
  deltaTone = "mint",
  children,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone?: "mint" | "amber";
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-1 p-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
        <span>{label}</span>
        <span className={deltaTone === "amber" ? "text-accent" : "text-primary"}>{delta}</span>
      </div>
      <div className="mt-1 font-sans text-[22px] font-light tracking-tightest text-foreground">
        {value}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
