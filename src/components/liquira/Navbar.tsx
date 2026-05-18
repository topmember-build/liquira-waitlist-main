import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Navbar() {
  const [block, setBlock] = useState(8421930);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setBlock((b) => b + 1);
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, "0");
      const m = String(d.getUTCMinutes()).padStart(2, "0");
      const s = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const i = setInterval(tick, 2400);
    return () => clearInterval(i);
  }, []);

  const links = [
    { i: "01", label: "Router", hash: "router" },
    { i: "02", label: "Pools", hash: "pools" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 shrink-0" />
          <div className="flex flex-col justify-center leading-none">
            <div className="font-mono text-[13px] font-semibold tracking-[-0.01em]">
              liquira<span className="text-muted-foreground">/fx</span>
            </div>
            <div className="mt-1 hidden font-mono text-[9px] uppercase tracking-mono-wide text-muted-foreground sm:block">
              stable fx · Arc
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.i}
              to="/"
              hash={l.hash}
              className="group flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-primary/70">{l.i}</span>
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/waitlist"
            className="rounded-sm bg-primary px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-mono-wide text-primary-foreground transition hover:bg-primary-glow"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
