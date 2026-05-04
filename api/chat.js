export default async function handler(req, res) {
  res.status(200).json({
    reply: "AI sedang aktif, tapi belum terhubung OpenAI"
  });
}
