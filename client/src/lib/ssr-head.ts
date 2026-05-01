let buffer: string[] = [];

export function resetHead() {
  buffer = [];
}

export function pushHead(html: string) {
  buffer.push(html);
}

export function getHeadHtml(): string {
  return buffer.join("\n    ");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeJsonLd(value: string): string {
  return value.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}
