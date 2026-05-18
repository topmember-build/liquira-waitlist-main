import { BRAND } from "@/lib/brand";

export function Footer() {
  const cols = [
    { h: "Product", links: ["Router", "Pools", "Analytics", "View-key"] },
    { h: "Developers", links: ["Docs", "SDK", "API reference", "GitHub"] },
    { h: "Network", links: ["Arc", "Validators", "Audits", "Status"] },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="absolute inset-0 bg-dot-grid opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20">
        <div className="grid gap-12 border-b border-border pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              / liquira labs
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              The native FX layer for stablecoin money. Built on Arc, audited for treasuries,
              designed for size.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-border bg-surface-1 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              all systems · operational
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                / {c.h}
              </div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <span className="font-mono text-[12px] text-foreground/60" aria-disabled>
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              / ed.
            </div>
            <div className="mt-5 font-mono text-[12px] text-foreground">{BRAND.edition}</div>
          </div>
        </div>

        <div
          aria-hidden
          className="select-none pt-12 text-center font-sans font-light leading-none tracking-tightest text-gradient-soft"
          style={{ fontSize: "clamp(72px, 20vw, 240px)" }}
        >
          liquira<span className="font-serif italic text-primary">/fx</span>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border py-6 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground sm:flex-row">
          <span>© 2026 liquira labs · ed. {BRAND.edition}</span>
          <span>built on Arc</span>
        </div>
      </div>
    </footer>
  );
}
