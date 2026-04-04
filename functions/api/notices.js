export async function onRequestGet(context) {
  const { env } = context;

  try {
    const result = await env.DB
      .prepare("SELECT * FROM notices ORDER BY is_pinned DESC, created_at DESC")
      .all();

    return new Response(JSON.stringify(result.results), {
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
