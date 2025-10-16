export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.APP_BASE_URL}/api/auth/github/callback`,
    }),
  });

  const data = await tokenRes.json();
  const access_token = data.access_token

  return new Response(
    `<script>
      window.opener.postMessage({ githubToken: "${access_token}" }, "*");
      window.close();
    </script>`,
    { headers: { "Content-Type": "text/html" } },
  );
};
