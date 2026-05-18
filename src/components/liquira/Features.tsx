import { Network, Cpu, Shield, Eye } from "lucide-react";
import { Crosshairs } from "./Crosshair";

const features = [
  {
    icon: Network,
    title: "Depth-aware solver",
    desc: "Quote across up to eight pools per route. The solver weighs depth, fee tier, and oracle skew to land sub-basis-point execution on size.",
    label: "pools / quote",
    stat: "8",
  },
  {
    icon: Cpu,
    title: "Native to Arc",
    desc: "Built directly on Arc's L1 with no bridges, no wrapped assets, and no settlement risk. Median path completes inside a single block.",
    label: "median settle",
    stat: "0.41 s",
  },
  {
    icon: Shield,
    title: "Treasury-grade",
    desc: "Audited by two firms before mainnet. Risk-isolated pools, per-asset caps, and a deterministic kill-switch governed on chain.",
    label: "audits · incidents",
    stat: "2 · 0",
  },
  {
    icon: Eye,
    title: "Selectively private",
    desc: "View-key v1 lets institutions share read access with auditors and regulators while keeping counterparty data shielded by default.",
    label: "view-key",
    stat: "v1.0",
  },
];

export function Features() {
  return (
    <section id="router" className="relative border-y border-border bg-surface-1/30">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              / capabilities
            </div>
            <h2 className="mt-3 font-sans text-[36px] font-light leading-[1] tracking-tightest md:text-[52px]">
              <span className="text-gradient-soft">Engineered for </span>
              <span className="font-serif italic text-primary">size</span>
              <span className="text-gradient-soft">.</span>
            </h2>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground md:block">
            α · why
          </div>
        </div>

        <div className="mt-px grid gap-px overflow-hidden border-x border-b border-border bg-border md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={i}
              className="relative bg-background p-7 transition-colors hover:bg-surface-1"
            >
              <Crosshairs />
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong bg-surface-2">
                  <f.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-sans text-[20px] font-light tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
              <div className="mt-7 flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
                <span>{f.label}</span>
                <span className="text-foreground">{f.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
