export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json({ error: "Missing code" }, { status: 400 });
  }

  return new Response(
    `<script>
      window.opener.postMessage({ code: "${code}" }, "*");
      window.close();
    </script>`,
    { headers: { "Content-Type": "text/html" } },
  );
};
