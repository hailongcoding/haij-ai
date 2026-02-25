// Dummy file to override /api/auth/guest and prevent Auth.js crash
// Returns 404 so frontend gets a safe "not found" instead of 500

export async function GET() {
  return new Response("Guest mode disabled", { status: 404 });
}

export async function POST() {
  return new Response("Guest mode disabled", { status: 404 });
}
