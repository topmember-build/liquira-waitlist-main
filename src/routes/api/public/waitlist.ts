import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().max(255).optional().nullable(),
  organization: z.string().trim().max(200).optional().nullable(),
  interests: z.array(z.string().min(1).max(80)).max(8).default([]),
});

// Internal-only referral code generator. The DB column is NOT NULL, so we keep
// populating it (cryptographically random) but never expose or accept it.
function makeReferralCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let str = "";
  for (const byte of bytes) {
    str += String.fromCharCode(byte);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Best-effort in-memory per-IP rate limit. Note: serverless isolates may not
// share state across invocations, so this is a soft throttle, not a guarantee.
// Limit: 5 signups per IP per 10 minutes.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ipHits = new Map<string, number[]>();

function checkRateLimit(ip: string | null): { ok: true } | { ok: false; retryAfter: number } {
  if (!ip) return { ok: true };
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const arr = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (arr.length >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((arr[0] + RATE_LIMIT_WINDOW_MS - now) / 1000);
    ipHits.set(ip, arr);
    return { ok: false, retryAfter };
  }
  arr.push(now);
  ipHits.set(ip, arr);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const fresh = v.filter((t) => t > cutoff);
      if (fresh.length === 0) ipHits.delete(k);
      else ipHits.set(k, fresh);
    }
  }
  return { ok: true };
}

// Only trust Cloudflare's edge-injected header. X-Forwarded-For and X-Real-IP
// are attacker-controllable on this stack and would allow rate-limit bypass.
function clientIp(request: Request): string | null {
  const ip = request.headers.get("cf-connecting-ip");
  return ip ? ip.trim() : null;
}

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? "Liquiralabs@outlook.com";
const RESEND_API_URL = "https://api.resend.com/emails";

async function sendAdminNotification(p: {
  edition: number;
  email: string;
  name: string | null;
  organization: string | null;
  interests: string[];
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("Resend not configured; skipping admin email");
    return;
  }

  const editionStr = String(p.edition).padStart(4, "0");
  const subject = `New waitlist signup #${editionStr} — ${p.email}`;
  const rows = [
    ["Edition", `#${editionStr}`],
    ["Email", p.email],
    ["Name", p.name || "—"],
    ["Organization", p.organization || "—"],
    ["Interests", p.interests.length ? p.interests.join(", ") : "—"],
  ];
  const html = `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111">
    <h2 style="margin:0 0 12px">New Liquira waitlist signup</h2>
    <table style="border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${v}</strong></td></tr>`,
      )
      .join("")}</table>
  </div>`;

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "Liquira Waitlist <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

export const Route = createFileRoute("/api/public/waitlist")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
      POST: async ({ request }) => {
        const cors = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        try {
          const ip = clientIp(request);
          const rl = checkRateLimit(ip);
          if (!rl.ok) {
            return new Response(
              JSON.stringify({ error: "Too many signups. Please try again later." }),
              {
                status: 429,
                headers: { ...cors, "Retry-After": String(rl.retryAfter) },
              },
            );
          }

          let raw: unknown;
          try {
            raw = await request.json();
          } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON" }), {
              status: 400,
              headers: cors,
            });
          }

          const parsed = BodySchema.safeParse(raw);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({ error: "Invalid input", issues: parsed.error.issues }),
              { status: 400, headers: cors },
            );
          }

          const { email, name, organization, interests } = parsed.data;
          const nameValue = name?.trim() ? name : null;
          const organizationValue = organization?.trim() ? organization : null;
          const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

          let data: { edition_number: number; email: string } | null = null;
          let lastError: unknown = null;
          for (let attempt = 0; attempt < 4; attempt++) {
            const referral_code = makeReferralCode();
            const res = await supabaseAdmin
              .from("waitlist_signups")
              .upsert(
                {
                  email,
                  name: nameValue,
                  organization: organizationValue,
                  interests,
                  referral_code,
                  referred_by: null,
                  user_agent: userAgent,
                  ip_address: ip ?? null,
                },
                { onConflict: "email", ignoreDuplicates: false },
              )
              .select("edition_number, email")
              .single();

            if (!res.error && res.data) {
              data = res.data;
              break;
            }
            lastError = res.error;
            if (res.error?.code !== "23505") break;
          }

          if (!data) {
            console.error("waitlist insert failed", lastError);
            return new Response(JSON.stringify({ error: "Could not save signup" }), {
              status: 500,
              headers: cors,
            });
          }

          void sendAdminNotification({
            edition: data.edition_number,
            email: data.email,
            name: nameValue,
            organization: organizationValue,
            interests,
          }).catch((err: unknown) => console.error("admin email failed", err));

          return new Response(
            JSON.stringify({
              ok: true,
              edition: data.edition_number,
            }),
            { status: 200, headers: cors },
          );
        } catch (error) {
          console.error("waitlist endpoint failed", error);
          return new Response(
            JSON.stringify({ error: "An unexpected server error occurred" }),
            {
              status: 500,
              headers: cors,
            },
          );
        }
      },
    },
  },
});
