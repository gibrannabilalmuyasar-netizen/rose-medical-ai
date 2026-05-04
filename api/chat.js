export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: message
                }
              ]
            }
          ],
          systemInstruction: {
            role: "system",
            parts: [
              {
                text: "Kamu adalah asisten kesehatan profesional. Jawab seperti dokter yang ramah, jelaskan kemungkinan kondisi, dan beri saran sederhana. Jangan terlalu kaku."
              }
            ]
          }
        })
      }
    );

    const data = await response.json();

    let reply = "Maaf, AI belum merespon.";

    if (data.candidates && data.candidates.length > 0) {
      reply = data.candidates[0].content.parts
        .map(p => p.text)
        .join(" ");
    }

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({
      reply: "Error: " + error.message
    });
  }
}
