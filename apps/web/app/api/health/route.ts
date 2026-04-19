export async function GET() {
  return Response.json({
    ok: true,
    app: 'labflowdeck-web',
    surface: 'control-plane-shell'
  });
}
