import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isIP } from "node:net";

function optionalString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength && !/[\r\n\0]/.test(trimmed)
    ? trimmed
    : undefined;
}

function isSourceUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Invalid request body." });
  }

  const {
    event_name,
    event_id,
    fbp,
    fbc,
    event_source_url,
  } = req.body;

  if (event_name !== "Lead") {
    return res.status(400).json({
      error: "Only Lead is supported in this version.",
    });
  }

  if (typeof event_id !== "string" || !/^[A-Za-z0-9._:-]{1,128}$/.test(event_id)) {
    return res.status(400).json({ error: "Invalid event_id." });
  }

  if (!isSourceUrl(event_source_url)) {
    return res.status(400).json({ error: "Invalid event_source_url." });
  }

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return res.status(500).json({
      error: "META_PIXEL_ID or META_ACCESS_TOKEN not configured.",
    });
  }

  // Na Vercel, o proxy da hospedagem fornece x-forwarded-for.
  // Não usamos IP do socket (que pode ser o proxy), nem um valor fictício.
  const forwardedFor = req.headers["x-forwarded-for"];
  const clientIp = (Array.isArray(forwardedFor) ? forwardedFor.join(",") : forwardedFor)
    ?.split(",")
    .map((ip) => ip.trim())
    .find((ip) => isIP(ip) !== 0);
  const userAgent = optionalString(req.headers["user-agent"], 2048);
  const browserId = optionalString(fbp, 512);
  const clickId = optionalString(fbc, 512);

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_id,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url,
        user_data: {
          ...(userAgent && { client_user_agent: userAgent }),
          ...(clientIp && { client_ip_address: clientIp }),
          ...(browserId && { fbp: browserId }),
          ...(clickId && { fbc: clickId }),
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v23.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: "Meta event request failed." });
    }

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
}
