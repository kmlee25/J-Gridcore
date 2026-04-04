export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const {
      category,
      title,
      content,
      author = "관리자",
      created_at,
      is_pinned = 0,
    } = body;

    if (!category || !title || !content || !created_at) {
      return new Response(
        JSON.stringify({ error: "필수 항목이 누락되었습니다." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const stmt = env.DB.prepare(`
      INSERT INTO notices (category, title, content, author, created_at, is_pinned)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      category,
      title,
      content,
      author,
      created_at,
      Number(is_pinned)
    );

    await stmt.run();

    return new Response(
      JSON.stringify({ success: true, message: "공지사항이 등록되었습니다." }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
