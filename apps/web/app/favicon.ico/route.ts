const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="LabFlowDeck icon">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="18" fill="#0b1020" />
  <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#bg)" />
  <path d="M20 18h8v28h16v8H20V18Zm16 0h8v20h-8V18Z" fill="#f8fafc" />
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
