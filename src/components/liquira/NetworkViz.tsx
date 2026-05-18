import { Crosshairs } from "./Crosshair";

const orbit = [
  "EURC",
  "KRW1",
  "JPYC",
  "GBPT",
  "BRZ",
  "TRYB",
  "MXNT",
  "AUDC",
  "NZDT",
  "SGDC",
  "AEDC",
  "NGNX",
];

export function NetworkViz() {
  const cx = 200;
  const cy = 200;
  const r = 140;
  return (
    <section id="pools" className="relative border-b border-border">
      <div className="absolute inset-0 bg-dot-grid" />
      <div className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              / liquidity graph
            </div>
            <h2 className="mt-3 font-sans text-[36px] font-light leading-[1] tracking-tightest md:text-[52px]">
              <span className="text-gradient-soft">Thirteen stables, </span>
              <span className="font-serif italic text-primary">one router</span>
              <span className="text-gradient-soft">.</span>
            </h2>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground md:block">
            γ · graph
          </div>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          <div className="relative bg-surface-1 p-6 md:col-span-2">
            <Crosshairs />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              <span>// stable_graph</span>
              <span className="text-primary">● 34 / 42 pairs live</span>
            </div>
            <div className="relative mx-auto mt-6 aspect-square w-full max-w-[440px]">
              {/* orbit rings */}
              <div className="absolute inset-0 animate-orbit">
                <svg viewBox="0 0 400 400" className="h-full w-full">
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 30}
                    fill="none"
                    stroke="hsl(var(--border-strong))"
                    strokeDasharray="2 4"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 60}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeDasharray="2 8"
                  />
                </svg>
              </div>
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
                {orbit.map((_, i) => {
                  const a = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
                  const x = cx + Math.cos(a) * r;
                  const y = cy + Math.sin(a) * r;
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={x}
                      y2={y}
                      stroke="hsl(var(--primary) / 0.45)"
                      strokeWidth="1"
                      className="animate-flow"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  );
                })}
                {/* hub */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="34"
                  fill="hsl(var(--surface-3))"
                  stroke="hsl(var(--primary))"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="46"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.4)"
                  className="animate-pulse-dot"
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  className="fill-foreground font-mono text-[12px] font-medium"
                >
                  USDC
                </text>
              </svg>
              {orbit.map((s, i) => {
                const a = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + (Math.cos(a) * r) / 4;
                const y = 50 + (Math.sin(a) * r) / 4;
                return (
                  <div
                    key={s}
                    className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-border-strong bg-surface-2 font-mono text-[10px] text-foreground animate-drift"
                    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-1 p-6">
            <Crosshairs />
            <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
              // observation_log
            </div>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden bg-border">
              <Cell label="Hub" value="USDC" />
              <Cell label="Pairs live" value="34 / 42" />
            </div>
            <div className="mt-5 space-y-2.5 font-mono text-[11px]">
              {[
                ["EURC/USDC", "98.4"],
                ["JPYC/USDC", "94.1"],
                ["KRW1/USDC", "91.7"],
                ["GBPT/EURC", "88.3"],
                ["BRZ/USDC", "84.0"],
                ["MXNT/USDC", "76.5"],
                ["AEDC/USDC", "71.8"],
                ["NGNX/USDC", "64.3"],
                ["TRYB/USDC", "62.2"],
              ].map(([p, d]) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="w-24 text-muted-foreground">{p}</span>
                  <div className="relative h-1 flex-1 bg-surface-3">
                    <div
                      className="absolute inset-y-0 left-0 bg-primary/70"
                      style={{ width: `${d}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-foreground">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-2 p-3">
      <div className="font-mono text-[10px] uppercase tracking-mono-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-mono text-[14px] text-foreground">{value}</div>
    </div>
  );
}
