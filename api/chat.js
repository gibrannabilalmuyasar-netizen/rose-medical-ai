export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Kamu adalah asisten kesehatan." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    // DEBUG LOG
    console.log(data);

    if (!response.ok) {
      return res.status(500).json({
        reply: "Error dari OpenAI: " + (data.error?.message || "unknown")
      });
    }

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Tidak ada respon"
    });

  } catch (err) {
    res.status(500).json({
      reply: "Server error: " + err.message
    });
  }
}
