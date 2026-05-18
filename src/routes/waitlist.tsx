import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/liquira/Navbar";
import { Waitlist } from "@/components/liquira/Waitlist";
import { Footer } from "@/components/liquira/Footer";
import ogImage from "@/assets/og-liquira.jpg";

export const Route = createFileRoute("/waitlist")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  head: () => ({
    meta: [
      { title: "Join the Liquira Waitlist" },
      {
        name: "description",
        content:
          "Reserve early access to Liquira. The first cohort moves from testnet into mainnet with priority routing and SDK access.",
      },
      { property: "og:title", content: "Join the Liquira Waitlist" },
      {
        property: "og:description",
        content:
          "Reserve early access to Liquira. Priority routing, governance weight, and gated SDK access for the first cohort.",
      },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: WaitlistPage,
});

function WaitlistPage() {
  const { email } = Route.useSearch();
  return (
    <div className="relative min-h-screen bg-background bg-dot-grid">
      <Navbar />
      <main>
        <Waitlist initialEmail={email} />
      </main>
      <Footer />
    </div>
  );
}
