export function getDomain(href?: string): string {
  if (!href) return "";

  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function faviconUrl(href?: string): string {
  const domain = getDomain(href);
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32` : "";
}
