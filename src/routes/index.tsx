import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/liquira/Navbar";
import { Hero } from "@/components/liquira/Hero";
import { Features } from "@/components/liquira/Features";
import { NetworkViz } from "@/components/liquira/NetworkViz";
import { Waitlist } from "@/components/liquira/Waitlist";
import { Footer } from "@/components/liquira/Footer";
import ogImage from "@/assets/og-liquira.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liquira · The native FX layer for stablecoin money" },
      {
        name: "description",
        content:
          "Liquira settles cross-currency stablecoin payments on Arc with depth-aware routing and sub-basis-point slippage. Join the waitlist.",
      },
      { property: "og:title", content: "Liquira · Native FX on Arc" },
      {
        property: "og:description",
        content:
          "Thirteen native stables, one router. Sub-basis-point slippage in under 400ms. Join the early access waitlist.",
      },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background bg-dot-grid">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <NetworkViz />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
