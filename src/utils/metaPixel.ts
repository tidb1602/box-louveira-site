import type { MouseEvent } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getCookie(name: string): string | undefined {
  try {
    return document.cookie
      .split(";")
      .map((row) => row.trim())
      .find((row) => row.startsWith(`${name}=`))
      ?.slice(name.length + 1) || undefined;
  } catch {
    return undefined;
  }
}

export function trackWhatsAppLead(): void {
  const eventId = typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");

  try {
    window.fbq?.("track", "Lead", {
      content_name: "aula_experimental",
    }, { eventID: eventId });
  } catch {
    // Uma falha do Pixel não deve impedir o envio ao servidor ou a navegação.
  }

  try {
    void fetch("/api/meta-event", {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: "Lead",
        event_id: eventId,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        event_source_url: window.location.href,
      }),
    }).catch(() => {
      // O rastreamento é best effort e não bloqueia a abertura do WhatsApp.
    });
  } catch {
    // Também preserva a navegação se fetch falhar de forma síncrona.
  }
}

export function trackInitiateCheckout(event: MouseEvent<HTMLAnchorElement>) {
  const contentName = event.currentTarget.textContent?.trim();

  window.fbq?.("track", "InitiateCheckout", {
    ...(contentName && { content_name: contentName }),
  });
}
